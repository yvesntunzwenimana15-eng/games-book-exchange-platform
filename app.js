// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set up navigation
    setupNavigation();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial data
    updateStats();
    loadItems();
    
    // Check if user is logged in
    if (currentUser) {
        updateUserInterface();
    }
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function setupEventListeners() {
    // File upload
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#3498db';
        uploadArea.style.backgroundColor = '#f8f9fa';
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#bdc3c7';
        uploadArea.style.backgroundColor = 'white';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#bdc3c7';
        uploadArea.style.backgroundColor = 'white';
        
        const files = e.dataTransfer.files;
        handleFiles(Array.from(files));
    });
    
    // Footer links
    const footerLinks = document.querySelectorAll('.footer-section a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });
}

// Section Management
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Update content based on section
        switch(sectionId) {
            case 'home':
                updateStats();
                break;
            case 'browse':
                loadItems();
                break;
            case 'upload':
                updateFileList();
                break;
        }
    }
}

// Stats Management
function updateStats() {
    document.getElementById('total-items').textContent = items.length;
    document.getElementById('total-users').textContent = users.length;
    document.getElementById('total-exchanges').textContent = exchanges.length;
    document.getElementById('total-files').textContent = uploadedFiles.length;
}

// Item Management
function loadItems(filter = 'all') {
    const itemsGrid = document.getElementById('items-grid');
    itemsGrid.innerHTML = '';
    
    let filteredItems = items;
    if (filter !== 'all') {
        filteredItems = items.filter(item => item.type === filter);
    }
    
    filteredItems.forEach(item => {
        const itemCard = createItemCard(item);
        itemsGrid.appendChild(itemCard);
    });
}

function createItemCard(item) {
    const div = document.createElement('div');
    div.className = 'item-card';
    
    const isOwner = currentUser && currentUser.id === item.ownerId;
    
    div.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="item-image" onerror="this.src='https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop'">
        <div class="item-details">
            <h3 class="item-title">${item.title}</h3>
            <div class="item-type ${item.type}">${item.type === 'book' ? '📚 Book' : '🎮 Game'}</div>
            <div class="item-condition">
                <span class="condition-dot ${item.condition}"></span>
                <span>${item.condition.charAt(0).toUpperCase() + item.condition.slice(1)}</span>
            </div>
            <p class="item-description">${item.description}</p>
            <div class="item-meta">
                <span>Owner: ${item.ownerName}</span>
                <span class="item-points">${item.points} points</span>
            </div>
            <div class="item-actions">
                ${isOwner ? 
                    `<button class="btn" onclick="removeItem(${item.id})">Remove</button>` :
                    `<button class="btn btn-add" onclick="requestExchange(${item.id})" ${!currentUser ? 'disabled' : ''}>Request Exchange</button>`
                }
            </div>
        </div>
    `;
    
    return div;
}

function filterItems(category) {
    loadItems(category);
}

// File Upload Functions
function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    handleFiles(files);
    e.target.value = '';
}

function handleFiles(files) {
    if (!currentUser) {
        showNotification('Please login to upload files', 'error');
        return;
    }
    
    files.forEach(file => {
        // Check file size (50MB max)
        if (file.size > 50 * 1024 * 1024) {
            showNotification(`File "${file.name}" is too large (max 50MB)`, 'error');
            return;
        }
        
        const fileObj = {
            id: Date.now() + Math.random(),
            name: file.name,
            size: file.size,
            type: file.type,
            file: file,
            uploadDate: new Date().toISOString(),
            owner: currentUser.name,
            status: 'pending'
        };
        
        uploadedFiles.push(fileObj);
        addFileToList(fileObj);
        createFilePreview(fileObj);
    });
    
    updateStats();
    updateFileList();
}

function addFileToList(fileObj) {
    const fileList = document.getElementById('file-list');
    
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.innerHTML = `
        <span class="file-icon">${getFileIcon(fileObj.type)}</span>
        <div class="file-info">
            <div class="file-name">${fileObj.name}</div>
            <div class="file-size">${formatFileSize(fileObj.size)}</div>
        </div>
        <button class="btn btn-clear" onclick="removeFile('${fileObj.id}')">Remove</button>
    `;
    
    fileList.appendChild(fileItem);
}

function createFilePreview(fileObj) {
    const container = document.querySelector('.preview-container');
    if (!container) return;
    
    const previewItem = document.createElement('div');
    previewItem.className = 'preview-item';
    previewItem.dataset.id = fileObj.id;
    
    if (fileObj.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewItem.innerHTML = `
                <button class="remove-btn" onclick="removeFile('${fileObj.id}')">×</button>
                <img src="${e.target.result}" class="preview-image" alt="${fileObj.name}">
                <div class="preview-text">${fileObj.name.substring(0, 15)}${fileObj.name.length > 15 ? '...' : ''}</div>
            `;
            container.appendChild(previewItem);
        };
        reader.readAsDataURL(fileObj.file);
    } else {
        previewItem.innerHTML = `
            <button class="remove-btn" onclick="removeFile('${fileObj.id}')">×</button>
            <div style="height: 120px; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
                <div style="font-size: 2rem;">${getFileIcon(fileObj.type)}</div>
            </div>
            <div class="preview-text">${fileObj.name.substring(0, 15)}${fileObj.name.length > 15 ? '...' : ''}</div>
        `;
        container.appendChild(previewItem);
    }
}

function updateFileList() {
    const fileList = document.getElementById('file-list');
    fileList.innerHTML = '';
    
    uploadedFiles.forEach(file => {
        addFileToList(file);
    });
}

function removeFile(fileId) {
    uploadedFiles = uploadedFiles.filter(file => file.id !== fileId);
    
    // Remove from preview
    const preview = document.querySelector(`.preview-item[data-id="${fileId}"]`);
    if (preview) preview.remove();
    
    updateFileList();
    updateStats();
}

function clearFiles() {
    if (uploadedFiles.length === 0) return;
    
    if (confirm('Are you sure you want to remove all files?')) {
        uploadedFiles = [];
        updateFileList();
        updateStats();
        
        // Clear previews
        const container = document.querySelector('.preview-container');
        if (container) container.innerHTML = '';
        
        showNotification('All files cleared', 'info');
    }
}

function startUpload() {
    if (uploadedFiles.length === 0) {
        showNotification('No files to upload', 'error');
        return;
    }
    
    if (!currentUser) {
        showNotification('Please login to upload files', 'error');
        return;
    }
    
    // Simulate upload process
    showNotification('Starting upload...', 'info');
    
    setTimeout(() => {
        uploadedFiles.forEach(file => {
            file.status = 'uploaded';
            
            // Create item from uploaded image
            if (file.type.startsWith('image/')) {
                const newItem = {
                    id: getNextId(items),
                    type: 'book',
                    title: file.name.split('.')[0],
                    genre: 'Uploaded',
                    condition: 'good',
                    points: 10,
                    ownerId: currentUser.id,
                    ownerName: currentUser.name,
                    description: `Uploaded file: ${file.name}`,
                    image: URL.createObjectURL(file.file),
                    date: new Date().toISOString().split('T')[0]
                };
                
                items.push(newItem);
                saveItems();
            }
        });
        
        showNotification('Files uploaded successfully!', 'success');
        clearFiles();
        loadItems();
    }, 2000);
}

// Authentication Functions
function showLoginModal() {
    document.getElementById('login-modal').style.display = 'block';
}

function showRegisterModal() {
    document.getElementById('register-modal').style.display = 'block';
}

function showAddItemModal() {
    if (!currentUser) {
        showNotification('Please login to add items', 'error');
        showLoginModal();
        return;
    }
    
    document.getElementById('add-item-modal').style.display = 'block';
}

function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        showNotification('Please enter email and password', 'error');
        return;
    }
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        saveCurrentUser();
        updateUserInterface();
        hideModal('login-modal');
        showNotification('Login successful!', 'success');
        
        // Clear form
        document.getElementById('login-email').value = '';
        document.getElementById('login-password').value = '';
    } else {
        showNotification('Invalid email or password', 'error');
    }
}

function register() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const grade = document.getElementById('register-grade').value;
    
    if (!name || !email || !password || !grade) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
        showNotification('Email already registered', 'error');
        return;
    }
    
    const newUser = {
        id: getNextId(users),
        name: name,
        email: email,
        password: password,
        grade: grade,
        joinDate: new Date().toISOString().split('T')[0],
        avatar: name.split(' ').map(n => n[0]).join('').toUpperCase()
    };
    
    users.push(newUser);
    saveUsers();
    
    currentUser = newUser;
    saveCurrentUser();
    updateUserInterface();
    hideModal('register-modal');
    showNotification('Account created successfully!', 'success');
    
    // Clear form
    document.getElementById('register-name').value = '';
    document.getElementById('register-email').value = '';
    document.getElementById('register-password').value = '';
    document.getElementById('register-grade').value = '';
}

function logout() {
    currentUser = null;
    saveCurrentUser();
    updateUserInterface();
    showNotification('Logged out successfully', 'info');
}

function updateUserInterface() {
    const userInfo = document.getElementById('user-info');
    const authButtons = document.getElementById('auth-buttons');
    const userName = document.getElementById('user-name');
    
    if (currentUser) {
        userInfo.style.display = 'flex';
        authButtons.style.display = 'none';
        userName.textContent = currentUser.name;
    } else {
        userInfo.style.display = 'none';
        authButtons.style.display = 'flex';
    }
}

// Item Functions
function updateItemType() {
    const type = document.getElementById('item-type').value;
    const label = document.getElementById('genre-label');
    
    if (type === 'book') {
        label.textContent = 'Book Genre';
    } else if (type === 'game') {
        label.textContent = 'Game Type';
    }
}

function addItem() {
    const type = document.getElementById('item-type').value;
    const title = document.getElementById('item-title').value;
    const genre = document.getElementById('item-genre').value;
    const condition = document.getElementById('item-condition').value;
    const description = document.getElementById('item-description').value;
    
    if (!type || !title || !genre || !condition) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Calculate points based on condition
    let points = 10;
    switch(condition) {
        case 'excellent': points = 15; break;
        case 'good': points = 12; break;
        case 'fair': points = 10; break;
        case 'worn': points = 8; break;
    }
    
    const newItem = {
        id: getNextId(items),
        type: type,
        title: title,
        genre: genre,
        condition: condition,
        points: points,
        ownerId: currentUser.id,
        ownerName: currentUser.name,
        description: description || 'No description provided',
        image: type === 'book' ? 
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop' :
            'https://images.unsplash.com/photo-1632501641765-e568d28b001f?w=400&h=300&fit=crop',
        date: new Date().toISOString().split('T')[0]
    };
    
    items.push(newItem);
    saveItems();
    
    hideModal('add-item-modal');
    showNotification('Item added successfully!', 'success');
    loadItems();
    
    // Clear form
    document.getElementById('item-type').value = '';
    document.getElementById('item-title').value = '';
    document.getElementById('item-genre').value = '';
    document.getElementById('item-condition').value = '';
    document.getElementById('item-description').value = '';
}

function removeItem(itemId) {
    if (confirm('Are you sure you want to remove this item?')) {
        items = items.filter(item => item.id !== itemId);
        saveItems();
        loadItems();
        showNotification('Item removed', 'info');
    }
}

function requestExchange(itemId) {
    if (!currentUser) {
        showNotification('Please login to request exchange', 'error');
        showLoginModal();
        return;
    }
    
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    
    if (item.ownerId === currentUser.id) {
        showNotification('You cannot request your own item', 'error');
        return;
    }
    
    const newExchange = {
        id: getNextId(exchanges),
        itemId: itemId,
        fromUserId: item.ownerId,
        toUserId: currentUser.id,
        fromUserName: item.ownerName,
        toUserName: currentUser.name,
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        points: item.points
    };
    
    exchanges.push(newExchange);
    saveExchanges();
    
    showNotification(`Exchange requested for "${item.title}"`, 'success');
    updateStats();
}

// Utility Functions
function browseFiles() {
    document.getElementById('file-input').click();
}

function pasteFile() {
    showNotification('Copy files and paste in the upload area', 'info');
}

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const text = document.getElementById('notification-text');
    
    text.textContent = message;
    
    // Set color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#27ae60';
            break;
        case 'error':
            notification.style.backgroundColor = '#e74c3c';
            break;
        case 'info':
            notification.style.backgroundColor = '#3498db';
            break;
    }
    
    notification.style.display = 'block';
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Close modals when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
};

// Export functions for global use
window.showSection = showSection;
window.showLoginModal = showLoginModal;
window.showRegisterModal = showRegisterModal;
window.showAddItemModal = showAddItemModal;
window.hideModal = hideModal;
window.login = login;
window.register = register;
window.logout = logout;
window.updateItemType = updateItemType;
window.addItem = addItem;
window.removeItem = removeItem;
window.requestExchange = requestExchange;
window.browseFiles = browseFiles;
window.pasteFile = pasteFile;
window.startUpload = startUpload;
window.clearFiles = clearFiles;
window.removeFile = removeFile;
window.filterItems = filterItems;
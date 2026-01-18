// Data storage
let items = [];
let users = [];
let currentUser = null;
let uploadedFiles = [];

// Load data from localStorage
function loadData() {
    const savedItems = localStorage.getItem('swapHubItems');
    const savedUsers = localStorage.getItem('swapHubUsers');
    const savedCurrentUser = localStorage.getItem('swapHubCurrentUser');

    if (savedItems) {
        items = JSON.parse(savedItems);
    } else {
        // Default items
        items = [
            {
                id: 1,
                type: 'book',
                title: 'The Great Gatsby',
                genre: 'Classic Fiction',
                condition: 'excellent',
                points: 15,
                owner: 'Sarah M.',
                description: 'Hardcover edition in perfect condition.',
                image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop'
            },
            {
                id: 2,
                type: 'game',
                title: 'Monopoly',
                genre: 'Board Game',
                condition: 'good',
                points: 12,
                owner: 'Alex T.',
                description: 'Complete set with all pieces.',
                image: 'https://images.unsplash.com/photo-1632501641765-e568d28b001f?w=400&h=300&fit=crop'
            },
            {
                id: 3,
                type: 'book',
                title: 'Harry Potter',
                genre: 'Fantasy',
                condition: 'fair',
                points: 10,
                owner: 'Jordan K.',
                description: 'Paperback, well-loved but intact.',
                image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=300&fit=crop'
            },
            {
                id: 4,
                type: 'game',
                title: 'Uno Cards',
                genre: 'Card Game',
                condition: 'excellent',
                points: 8,
                owner: 'Taylor R.',
                description: 'New deck, never opened.',
                image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&h=300&fit=crop'
            }
        ];
        saveItems();
    }

    if (savedUsers) {
        users = JSON.parse(savedUsers);
    }

    if (savedCurrentUser) {
        currentUser = JSON.parse(savedCurrentUser);
        updateAuthButtons();
    }

    updateStats();
    loadItems();
}

// Save data to localStorage
function saveItems() {
    localStorage.setItem('swapHubItems', JSON.stringify(items));
}

function saveUsers() {
    localStorage.setItem('swapHubUsers', JSON.stringify(users));
}

function saveCurrentUser() {
    if (currentUser) {
        localStorage.setItem('swapHubCurrentUser', JSON.stringify(currentUser));
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setupEventListeners();
    setupNavigation();
});

// Navigation setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Show home section by default
    showSection('home');
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');

        // Update content based on section
        if (sectionId === 'browse') {
            loadItems();
        } else if (sectionId === 'upload') {
            updateFileList();
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    // Login/Register buttons
    document.getElementById('login-btn').addEventListener('click', showLoginModal);
    document.getElementById('register-btn').addEventListener('click', showRegisterModal);
    document.getElementById('add-item-btn').addEventListener('click', showAddItemModal);
    document.getElementById('upload-btn').addEventListener('click', uploadFiles);
    document.getElementById('clear-btn').addEventListener('
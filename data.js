// Data storage for the application
let users = [];
let items = [];
let exchanges = [];
let uploadedFiles = [];
let currentUser = null;

// Load data from localStorage
function loadData() {
    const savedUsers = localStorage.getItem('swapHubUsers');
    const savedItems = localStorage.getItem('swapHubItems');
    const savedExchanges = localStorage.getItem('swapHubExchanges');
    const savedCurrentUser = localStorage.getItem('swapHubCurrentUser');

    if (savedUsers) {
        users = JSON.parse(savedUsers);
    } else {
        // Initialize with sample data
        users = [
            {
                id: 1,
                name: "Sarah Johnson",
                email: "sarah@school.edu",
                password: "password123",
                grade: "11",
                joinDate: "2024-01-15",
                avatar: "SJ"
            },
            {
                id: 2,
                name: "Alex Chen",
                email: "alex@school.edu",
                password: "password123",
                grade: "10",
                joinDate: "2024-01-20",
                avatar: "AC"
            },
            {
                id: 3,
                name: "Maria Garcia",
                email: "maria@school.edu",
                password: "password123",
                grade: "12",
                joinDate: "2024-02-01",
                avatar: "MG"
            }
        ];
        saveUsers();
    }

    if (savedItems) {
        items = JSON.parse(savedItems);
    } else {
        // Initialize with sample items
        items = [
            {
                id: 1,
                type: "book",
                title: "The Great Gatsby",
                genre: "Classic Literature",
                condition: "excellent",
                points: 15,
                ownerId: 1,
                ownerName: "Sarah Johnson",
                description: "Hardcover edition in perfect condition.",
                image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
                date: "2024-02-10"
            },
            {
                id: 2,
                type: "game",
                title: "Monopoly",
                genre: "Board Game",
                condition: "good",
                points: 12,
                ownerId: 2,
                ownerName: "Alex Chen",
                description: "Complete set with all pieces included.",
                image: "https://images.unsplash.com/photo-1632501641765-e568d28b001f?w=400&h=300&fit=crop",
                date: "2024-02-12"
            },
            {
                id: 3,
                type: "book",
                title: "Harry Potter and the Philosopher's Stone",
                genre: "Fantasy",
                condition: "fair",
                points: 10,
                ownerId: 3,
                ownerName: "Maria Garcia",
                description: "Well-loved but in good reading condition.",
                image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=300&fit=crop",
                date: "2024-02-15"
            },
            {
                id: 4,
                type: "game",
                title: "Uno Cards",
                genre: "Card Game",
                condition: "excellent",
                points: 8,
                ownerId: 1,
                ownerName: "Sarah Johnson",
                description: "New deck, never opened.",
                image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&h=300&fit=crop",
                date: "2024-02-18"
            }
        ];
        saveItems();
    }

    if (savedExchanges) {
        exchanges = JSON.parse(savedExchanges);
    } else {
        exchanges = [
            {
                id: 1,
                itemId: 1,
                fromUserId: 1,
                toUserId: 2,
                fromUserName: "Sarah Johnson",
                toUserName: "Alex Chen",
                date: "2024-02-11",
                status: "completed",
                points: 15
            },
            {
                id: 2,
                itemId: 2,
                fromUserId: 2,
                toUserId: 3,
                fromUserName: "Alex Chen",
                toUserName: "Maria Garcia",
                date: "2024-02-14",
                status: "completed",
                points: 12
            }
        ];
        saveExchanges();
    }

    if (savedCurrentUser) {
        currentUser = JSON.parse(savedCurrentUser);
        updateUserInterface();
    }
}

// Save data to localStorage
function saveUsers() {
    localStorage.setItem('swapHubUsers', JSON.stringify(users));
}

function saveItems() {
    localStorage.setItem('swapHubItems', JSON.stringify(items));
}

function saveExchanges() {
    localStorage.setItem('swapHubExchanges', JSON.stringify(exchanges));
}

function saveCurrentUser() {
    if (currentUser) {
        localStorage.setItem('swapHubCurrentUser', JSON.stringify(currentUser));
    } else {
        localStorage.removeItem('swapHubCurrentUser');
    }
}

// Helper functions
function getNextId(array) {
    return array.length > 0 ? Math.max(...array.map(item => item.id)) + 1 : 1;
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function getFileIcon(fileType) {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('document')) return '📝';
    if (fileType.includes('video')) return '🎥';
    return '📁';
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
}

// Initialize data when page loads
window.addEventListener('DOMContentLoaded', loadData);
/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f5f5f5;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Header */
.site-header {
    background-color: #2c3e50;
    color: white;
    padding: 2rem 0;
    text-align: center;
}

.site-title {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

.site-subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
}

/* Navigation */
.main-nav {
    background-color: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
}

.nav-links {
    display: flex;
    gap: 1.5rem;
}

.nav-link {
    text-decoration: none;
    color: #333;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.active {
    background-color: #3498db;
    color: white;
}

.user-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
}

/* Buttons */
.btn {
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
}

.btn-login {
    background-color: transparent;
    color: #3498db;
    border: 2px solid #3498db;
}

.btn-register {
    background-color: #3498db;
    color: white;
}

.btn-logout {
    background-color: #e74c3c;
    color: white;
}

.btn-add {
    background-color: #27ae60;
    color: white;
}

.btn-login:hover {
    background-color: #3498db;
    color: white;
}

.btn-register:hover {
    background-color: #2980b9;
}

.btn-logout:hover {
    background-color: #c0392b;
}

.btn-add:hover {
    background-color: #219653;
}

/* Main Content */
.main-content {
    min-height: 500px;
    padding: 2rem 0;
}

.content-section {
    display: none;
    animation: fadeIn 0.3s ease;
}

.content-section.active {
    display: block;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.section-header {
    margin-bottom: 2rem;
}

.section-header h2 {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
}

.section-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
}

/* Stats */
.stats-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
}

.stat-item {
    background-color: white;
    padding: 1.5rem;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.stat-number {
    font-size: 2.5rem;
    font-weight: bold;
    color: #3498db;
    margin-bottom: 0.5rem;
}

.stat-label {
    color: #7f8c8d;
    font-size: 0.9rem;
}

/* Features Grid */
.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
}

.feature-card {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 3px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-5px);
}

.feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.feature-card h3 {
    margin-bottom: 1rem;
    color: #2c3e50;
}

/* Items Grid */
.items-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
}

.item-card {
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
}

.item-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0,0,0,0.15);
}

.item-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    background-color: #ecf0f1;
}

.item-details {
    padding: 1.5rem;
}

.item-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #2c3e50;
}

.item-type {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background-color: #ecf0f1;
    border-radius: 20px;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

.item-type.book {
    border-left: 4px solid #27ae60;
}

.item-type.game {
    border-left: 4px solid #e74c3c;
}

.item-condition {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0.5rem 0;
    font-size: 0.9rem;
    color: #7f8c8d;
}

.condition-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
}

.condition-dot.excellent {
    background-color: #27ae60;
}

.condition-dot.good {
    background-color: #f39c12;
}

.condition-dot.fair {
    background-color: #e74c3c;
}

.item-points {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background-color: #3498db;
    color: white;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: bold;
}

.item-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
}

/* Upload Section */
.upload-container {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 3px 15px rgba(0,0,0,0.1);
}

.upload-area {
    border: 3px dashed #bdc3c7;
    border-radius: 8px;
    padding: 3rem 2rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 2rem;
}

.upload-area:hover {
    border-color: #3498db;
    background-color: #f8f9fa;
}

.upload-icon {
    font-size: 3rem;
    color: #3498db;
    margin-bottom: 1rem;
}

.upload-options {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    justify-content: center;
}

.upload-option {
    padding: 1rem 2rem;
    background-color: #ecf0f1;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: background-color 0.3s ease;
}

.upload-option:hover {
    background-color: #bdc3c7;
}

.option-icon {
    font-size: 1.2rem;
}

.file-list {
    margin-bottom: 2rem;
}

.file-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 4px;
    margin-bottom: 0.5rem;
}

.file-icon {
    margin-right: 1rem;
    font-size: 1.2rem;
}

.file-info {
    flex: 1;
}

.file-name {
    font-weight: bold;
    margin-bottom: 0.25rem;
}

.file-size {
    font-size: 0.9rem;
    color: #7f8c8d;
}

.upload-controls {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.btn-upload {
    background-color: #27ae60;
    color: white;
}

.btn-clear {
    background-color: #e74c3c;
    color: white;
}

/* Rules Section */
.rules-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.rule-card {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 3px 15px rgba(0,0,0,0.1);
}

.rule-card h3 {
    margin-bottom: 1rem;
    color: #2c3e50;
}

.rule-card ul,
.rule-card ol {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
}

.rule-card li {
    margin-bottom: 0.5rem;
}

.condition-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.condition-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

/* About Section */
.about-content {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 3px 15px rgba(0,0,0,0.1);
}

.about-content h3 {
    margin: 1.5rem 0 1rem 0;
    color: #2c3e50;
}

.about-content ul {
    margin-left: 1.5rem;
    margin-bottom: 1.5rem;
}

.about-content li {
    margin-bottom: 0.5rem;
}

/* Footer */
.site-footer {
    background-color: #2c3e50;
    color: white;
    padding: 3rem 0 1rem 0;
    margin-top: 3rem;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
}

.footer-section h3 {
    margin-bottom: 1rem;
    color: #ecf0f1;
}

.footer-section a {
    display: block;
    color: #bdc3c7;
    text-decoration: none;
    margin-bottom: 0.5rem;
    transition: color 0.3s ease;
}

.footer-section a:hover {
    color: white;
}

.footer-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid #34495e;
    color: #bdc3c7;
    font-size: 0.9rem;
}

/* Modals */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 2000;
    animation: fadeIn 0.3s ease;
}

.modal-content {
    background-color: white;
    width: 90%;
    max-width: 500px;
    margin: 10% auto;
    border-radius: 8px;
    overflow: hidden;
    animation: slideIn 0.3s ease;
}

@keyframes slideIn {
    from { transform: translateY(-50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    background-color: #3498db;
    color: white;
}

.modal-header h3 {
    margin: 0;
}

.modal-close {
    font-size: 1.5rem;
    cursor: pointer;
    transition: color 0.3s ease;
}

.modal-close:hover {
    color: #ecf0f1;
}

.modal-body {
    padding: 2rem;
}

/* Forms */
.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #2c3e50;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #ecf0f1;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #3498db;
}

.category-filter {
    padding: 0.5rem 1rem;
    border: 2px solid #ecf0f1;
    border-radius: 4px;
    font-size: 1rem;
    background-color: white;
}

/* Notification */
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background-color: #27ae60;
    color: white;
    border-radius: 4px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.2);
    z-index: 3000;
    display: none;
    animation: slideInRight 0.3s ease;
}

@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

/* Responsive Design */
@media (max-width: 768px) {
    .nav-content {
        flex-direction: column;
        gap: 1rem;
    }
    
    .nav-links {
        flex-wrap: wrap;
        justify-content: center;
    }
    
    .stats-container {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .features-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    .stats-container {
        grid-template-columns: 1fr;
    }
    
    .features-grid {
        grid-template-columns: 1fr;
    }
    
    .items-grid {
        grid-template-columns: 1fr;
    }
    
    .rules-container {
        grid-template-columns: 1fr;
    }
    
    .section-controls {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
    }
    
    .upload-options {
        flex-direction: column;
    }
}
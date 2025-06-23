// Restaurant Website JavaScript
// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
});
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
// Season Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const seasonButtons = document.querySelectorAll('.season-btn');
    const seasonMenus = document.querySelectorAll('.season-menu');
    seasonButtons.forEach(button => {
        button.addEventListener('click', function() {
            const season = this.dataset.season;
            
            // Remove active class from all buttons and menus
            seasonButtons.forEach(btn => btn.classList.remove('active'));
            seasonMenus.forEach(menu => menu.classList.remove('active'));
            
            // Add active class to clicked button and corresponding menu
            this.classList.add('active');
            document.getElementById(`${season}-menu`).classList.add('active');
        });
    });
});
// Enhanced news generation function
function generateNews(startDate) {
    const newsContainer = document.querySelector('.news-container');
    const today = new Date();
    const newsItems = [];
    const seasonalThemes = {
        spring: {
            themes: ['spring garden', 'new menu items', 'chef\'s table', 'wine pairing'],
            images: ['spring-garden', 'asparagus', 'chef-table', 'wine-pairing']
        },
        summer: {
            themes: ['summer specials', 'outdoor dining', 'seasonal ingredients', 'live music'],
            images: ['summer-patio', 'summer-dishes', 'outdoor-dining', 'live-music']
        },
        autumn: {
            themes: ['fall harvest', 'new seasonal menu', 'wine cellar', 'private events'],
            images: ['fall-harvest', 'autumn-dishes', 'wine-cellar', 'private-dining']
        },
        winter: {
            themes: ['winter specials', 'holiday menu', 'cozy atmosphere', 'special events'],
            images: ['winter-patio', 'winter-dishes', 'cozy-interior', 'holiday-events']
        }
    };
    while (startDate <= today) {
        if (startDate.getDay() === 3) { // Wednesday
            const season = getSeason(startDate);
            const theme = getRandomItem(seasonalThemes[season].themes);
            const image = getRandomItem(seasonalThemes[season].images);
            
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            
            const date = new Date(startDate);
            const dateString = date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            newsItem.innerHTML = `
                <div class="news-date">
                    <div class="day">${date.getDate()}</div>
                    <div class="month">${date.toLocaleString('default', { month: 'short' })}</div>
                </div>
                <div class="news-content">
                    <h3>${getNewsTitle(theme, season)}</h3>
                    <div class="news-image">
                        <img src="https://images.unsplash.com/featured/800x600/?${image}" 
                             alt="${theme} at Saison en Bouche">
                    </div>
                    <p>${getNewsContent(theme, season)}</p>
                    <div class="news-tag">${getNewsTag(theme)}</div>
                </div>
            `;
            
            newsContainer.appendChild(newsItem);
            newsItems.push(newsItem);
        }
        
        startDate.setDate(startDate.getDate() + 1);
    }
    
    return newsItems;
}
// Helper functions
function getSeason(date) {
    const month = date.getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
}
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function getNewsTitle(theme, season) {
    const titles = {
        'spring garden': `Spring Garden Update: Fresh Beginnings`,
        'new menu items': `New Seasonal Creations: ${season} Delights`,
        'chef\'s table': `Chef\'s Table Experience: Culinary Artistry`,
        'wine pairing': `Wine Pairing Evening: Perfect Harmony`,
        'summer specials': `Summer Special: Cool Refreshments`,
        'outdoor dining': `Al Fresco Dining: Under the Stars`,
        'seasonal ingredients': `Fresh Market Update: Peak Season`,
        'live music': `Live Music Night: Dinner & Entertainment`,
        'fall harvest': `Harvest Celebration: Autumn's Bounty`,
        'new seasonal menu': `Autumn Menu Launch: Comfort Classics`,
        'wine cellar': `Wine Cellar Tour: Vintage Discovery`,
        'private events': `Private Dining: Intimate Occasions`,
        'winter specials': `Winter Warmth: Cozy Comfort`,
        'holiday menu': `Holiday Menu Preview: Festive Flavors`,
        'cozy atmosphere': `Cozy Nights: Winter Ambiance`,
        'special events': `Special Event: Memorable Moments`
    };
    return titles[theme] || `Weekly Update: ${theme}`;
}
function getNewsContent(theme, season) {
    const contents = {
        'spring garden': `Our spring garden is in full bloom, providing fresh herbs and vegetables for our seasonal dishes. The scent of blooming flowers creates a magical atmosphere for our outdoor dining area.`,
        'new menu items': `Our culinary team has crafted new seasonal dishes featuring the freshest ingredients of the season. Each creation reflects the unique flavors and presentation of ${season}.`,
        'chef\'s table': `Join us at the chef's table for an intimate culinary experience. Watch our chefs prepare seasonal specialties while enjoying a specially paired wine selection.`,
        'wine pairing': `This week's wine pairing features exceptional selections that complement our seasonal menu. Our sommelier has carefully chosen wines to enhance each dish's unique flavors.`,
        'summer specials': `Beat the heat with our refreshing summer specials, featuring light and zesty dishes perfect for warm evenings.`,
        'outdoor dining': `Enjoy dining under the stars on our beautifully landscaped patio. Our outdoor space offers a serene atmosphere for any occasion.`,
        'seasonal ingredients': `This week's market selection brings us the finest seasonal ingredients. Our chefs are excited to incorporate these fresh elements into our dishes.`,
        'live music': `Join us for an evening of fine dining accompanied by live music. Our curated selection of musicians creates the perfect ambiance for your dining experience.`,
        'fall harvest': `Celebrate the harvest season with us as we showcase the best of autumn's bounty in our special menu creations.`,
        'new seasonal menu': `Our autumn menu has launched, featuring rich, comforting dishes that capture the essence of the season.`,
        'wine cellar': `Take a tour of our wine cellar and discover rare vintages perfectly paired with our seasonal offerings.`,
        'private events': `Looking for a unique venue for your special occasion? Our private dining rooms offer an intimate setting with personalized service.`,
        'winter specials': `Warm up with our hearty winter specials, crafted to comfort and delight during the colder months.`,
        'holiday menu': `Preview our special holiday menu, featuring traditional dishes with our signature twist.`,
        'cozy atmosphere': `Our restaurant transforms into a cozy haven during winter, complete with warm lighting and seasonal decor.`,
        'special events': `Join us for special themed evenings celebrating the magic of winter dining.`
    };
    return contents[theme] || `This week at Saison en Bouche, we're featuring ${theme} as part of our ${season} celebration.`;
}
function getNewsTag(theme) {
    const tags = {
        'spring garden': 'Garden & Dining',
        'new menu items': 'New Creations',
        'chef\'s table': 'Chef\'s Experience',
        'wine pairing': 'Wine & Dine',
        'summer specials': 'Summer Delights',
        'outdoor dining': 'Al Fresco',
        'seasonal ingredients': 'Fresh Market',
        'live music': 'Live Entertainment',
        'fall harvest': 'Harvest Celebration',
        'new seasonal menu': 'Autumn Menu',
        'wine cellar': 'Wine Experience',
        'private events': 'Private Dining',
        'winter specials': 'Winter Warmth',
        'holiday menu': 'Holiday Season',
        'cozy atmosphere': 'Winter Ambiance',
        'special events': 'Special Events'
    };
    return tags[theme] || 'Restaurant News';
}
// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your reservation request! We will contact you soon to confirm your booking.');
            this.reset();
        });
    }
});
// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
});
// Initialize news when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const startDate = new Date('2023-08-15');
    generateNews(startDate);
});
// Add animation to elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.menu-item, .news-item, .contact-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}
document.addEventListener('DOMContentLoaded', animateOnScroll);
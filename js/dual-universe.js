// Dual Universe Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get universe switch elements
    const universeSwitch = document.getElementById('universe-switch');
    const body = document.body;
    
    // Check for saved universe preference
    const currentUniverse = localStorage.getItem('universe') || 'tech';
    
    // Apply saved universe on page load
    if (currentUniverse === 'sport') {
        body.classList.add('sport-universe-active');
        body.classList.remove('tech-universe-active');
        if (universeSwitch) universeSwitch.checked = true;
    } else {
        body.classList.add('tech-universe-active');
        body.classList.remove('sport-universe-active');
        if (universeSwitch) universeSwitch.checked = false;
    }
    
    // Toggle universe when switch is clicked
    if (universeSwitch) {
        universeSwitch.addEventListener('change', function() {
            if (this.checked) {
                body.classList.add('sport-universe-active');
                body.classList.remove('tech-universe-active');
                localStorage.setItem('universe', 'sport');
                
                // Update contact form if it exists
                updateContactFormForUniverse('sport');
            } else {
                body.classList.add('tech-universe-active');
                body.classList.remove('sport-universe-active');
                localStorage.setItem('universe', 'tech');
                
                // Update contact form if it exists
                updateContactFormForUniverse('tech');
            }
        });
    }
    
    // Handle universe selection from homepage
    const techUniverseBtn = document.getElementById('tech-universe-btn');
    const sportUniverseBtn = document.getElementById('sport-universe-btn');
    
    if (techUniverseBtn) {
        techUniverseBtn.addEventListener('click', function(e) {
            body.classList.add('tech-universe-active');
            body.classList.remove('sport-universe-active');
            localStorage.setItem('universe', 'tech');
            if (universeSwitch) universeSwitch.checked = false;
        });
    }
    
    if (sportUniverseBtn) {
        sportUniverseBtn.addEventListener('click', function(e) {
            body.classList.add('sport-universe-active');
            body.classList.remove('tech-universe-active');
            localStorage.setItem('universe', 'sport');
            if (universeSwitch) universeSwitch.checked = true;
        });
    }
    
    // Update contact form based on universe
    function updateContactFormForUniverse(universe) {
        const universeSelect = document.getElementById('contact-universe-select');
        if (universeSelect) {
            universeSelect.value = universe;
        }
        
        // Update form placeholder and labels based on universe
        const messageLabel = document.querySelector('label[for="message"]');
        const messageField = document.getElementById('message');
        
        if (messageLabel && messageField) {
            if (universe === 'sport') {
                messageLabel.textContent = 'Comment puis-je vous aider avec votre coaching ?';
                messageField.placeholder = 'Je souhaite discuter d\'un programme d\'entraînement...';
            } else {
                messageLabel.textContent = 'Comment puis-je vous aider avec votre projet ?';
                messageField.placeholder = 'Je souhaite discuter d\'un projet de développement...';
            }
        }
    }
    
    // Initialize contact form universe selection
    const contactUniverseSelect = document.getElementById('contact-universe-select');
    if (contactUniverseSelect) {
        contactUniverseSelect.addEventListener('change', function() {
            updateContactFormForUniverse(this.value);
        });
        
        // Set initial value based on current universe
        contactUniverseSelect.value = currentUniverse;
        updateContactFormForUniverse(currentUniverse);
    }
    
    // Animate elements when they come into view
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Handle universe-specific content visibility
    function updateContentVisibility() {
        const currentUniverse = localStorage.getItem('universe') || 'tech';
        
        document.querySelectorAll('.tech-only').forEach(el => {
            el.style.display = currentUniverse === 'tech' ? 'block' : 'none';
        });
        
        document.querySelectorAll('.sport-only').forEach(el => {
            el.style.display = currentUniverse === 'sport' ? 'block' : 'none';
        });
    }
    
    // Update content visibility on page load and universe switch
    updateContentVisibility();
    if (universeSwitch) {
        universeSwitch.addEventListener('change', updateContentVisibility);
    }
    
    // Gestion de la navbar moderne
    // Gestion du menu burger pour mobile
    const burger = document.querySelector('.burger');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (burger) {
        burger.addEventListener('click', function() {
            // Toggle la classe active sur le menu
            navContainer.classList.toggle('active');
            // Animation du burger
            burger.classList.toggle('toggle');
        });
    }
    
    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navContainer.classList.remove('active');
            burger.classList.remove('toggle');
            
            // Ajouter la classe active au lien cliqué
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Détection de la section active lors du défilement
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Effet de fond pour la navbar lors du défilement
        const header = document.querySelector('header');
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

const CONFIG = {
    companyName: "Sakshi Market",
    tagline: "Steel & ERW Pipe Supplier – PAN India",
    city: "Pune, Maharashtra",
    establishedYear: "2025",
    experienceYears: "1 year",
    clientsCount: "300+",
    tonsSupplied: "15,000 MT",
    gstNo: "27ISIPS7035D1ZD",
    
    // Contact Info
    phone: "+91 9953939387",
    phoneRaw: "+919953939387",
    whatsappNumber: "919953939387",
    email: "sales@sakshimarket.com",
    address: "D-906, Vaishnavi City, Unnamad Road, Vaishnodevi Mandir, Uruli Devachi, Pune, Maharashtra 412308",
    businessHours: "7 Days: 10:00 AM – 8:00 PM",
    
    // Brands stocked
    brands: ["Tata", "Apollo", "JSW", "Sail", "NMDC", "SRJ", "MPL"],
    
    // Default pre-filled messages
    defaultWhatsappMsg: "Hello Sakshi Market, I would like to enquire about your steel & ERW pipes.",
};

// Expose globally
window.SITE_CONFIG = CONFIG;

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });

        // Close menu on link click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Dynamic WhatsApp Link Generator
    const waButtons = document.querySelectorAll('[data-wa-enquire]');
    waButtons.forEach(btn => {
        const item = btn.getAttribute('data-wa-enquire');
        let text = CONFIG.defaultWhatsappMsg;
        if (item) {
            text = `Hello Sakshi Market, I would like to get a price quote and details for: ${item}.`;
        }
        const encoded = encodeURIComponent(text);
        btn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encoded}`;
        btn.target = "_blank";
        btn.rel = "noopener noreferrer";
    });

    // Inquiry Form Handler (No backend, direct WhatsApp redirect)
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('formName')?.value.trim();
            const phone = document.getElementById('formPhone')?.value.trim();
            const company = document.getElementById('formCompany')?.value.trim();
            const product = document.getElementById('formProduct')?.value;
            const quantity = document.getElementById('formQuantity')?.value.trim();
            const message = document.getElementById('formMessage')?.value.trim();

            if (!name || !phone) {
                alert('Please fill in required fields (Name and Phone Number).');
                return;
            }

            const formattedMsg = `*New Website Inquiry - Sakshi Market*\n` +
                `-----------------------------------\n` +
                `*Name:* ${name}\n` +
                `*Phone:* ${phone}\n` +
                `*Company:* ${company || 'N/A'}\n` +
                `*Product:* ${product || 'General Requirement'}\n` +
                `*Quantity:* ${quantity || 'N/A'}\n` +
                `*Message:* ${message || 'N/A'}\n` +
                `-----------------------------------`;

            const encoded = encodeURIComponent(formattedMsg);
            const targetUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encoded}`;
            
            // Show confirmation toast/alert
            const alertBox = document.getElementById('formSuccessAlert');
            if (alertBox) {
                alertBox.style.display = 'block';
                alertBox.scrollIntoView({ behavior: 'smooth' });
            }

            setTimeout(() => {
                window.open(targetUrl, '_blank', 'noopener,noreferrer');
            }, 800);
        });
    }

    // Scroll Counter Animation for Stats
    const statsCounters = document.querySelectorAll('.stat-number');
    let animatedStats = false;

    const animateStats = () => {
        statsCounters.forEach(counter => {
            const target = counter.getAttribute('data-target');
            if (!target) return;

            // Extract numeric value and suffix
            const numericValue = parseInt(target.replace(/\D/g, ''), 10);
            const suffix = target.replace(/[0-9]/g, '');

            if (isNaN(numericValue)) {
                counter.innerText = target;
                return;
            }

            let start = 0;
            const duration = 2000; // ms
            const stepTime = 30;
            const totalSteps = duration / stepTime;
            const increment = numericValue / totalSteps;

            const timer = setInterval(() => {
                start += increment;
                if (start >= numericValue) {
                    counter.innerText = numericValue.toLocaleString() + suffix;
                    clearInterval(timer);
                } else {
                    counter.innerText = Math.floor(start).toLocaleString() + suffix;
                }
            }, stepTime);
        });
    };

    // Intersection Observer for scroll animations & stat count up
    const observerOptions = {
        threshold: 0.15
    };

    const statsSection = document.getElementById('stats-strip');
    if (statsSection && 'IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animatedStats) {
                    animatedStats = true;
                    animateStats();
                }
            });
        }, observerOptions);
        statsObserver.observe(statsSection);
    } else {
        // Fallback if no observer
        animateStats();
    }

    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('active'));
    }
});


        // Loading animation
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loading').classList.add('hidden');
            }, 1000);
        });

        // Custom cursor
        const cursor = document.getElementById('cursor');
        const hoverElements = document.querySelectorAll('a, button, .project-visual');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });

        // Smooth scrolling and active navigation
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

        // Active navigation tracking
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navItems = document.querySelectorAll('.nav-item');
            
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const navItem = document.querySelector(`a[href="#${section.id}"]`);
                
                if (rect.top <= 100 && rect.bottom >= 100) {
                    navItems.forEach(item => item.classList.remove('active'));
                    if (navItem) navItem.classList.add('active');
                }
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Project hover effects
        document.querySelectorAll('.project').forEach(project => {
            const visual = project.querySelector('.project-visual');
            
            project.addEventListener('mouseenter', () => {
                visual.style.transform = 'scale(1.02)';
                visual.style.transition = 'transform 0.3s ease';
            });
            
            project.addEventListener('mouseleave', () => {
                visual.style.transform = 'scale(1)';
            });
        });

        // Achievement counter animation
        const animateCounters = () => {
            const counters = document.querySelectorAll('.achievement-number');
            
            counters.forEach(counter => {
                const target = counter.textContent;
                const number = parseInt(target);
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        current = number;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current) + target.replace(/[0-9]/g, '');
                }, 50);
            });
        };

        // Trigger counter animation when achievements section is visible
        const achievementsSection = document.querySelector('#achievements');
        const achievementsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    achievementsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        achievementsObserver.observe(achievementsSection);



        // Text replacement animation from bottom to up
function startTextReplace() {
    const element = document.querySelector('.text-replace');
    const texts = JSON.parse(element.getAttribute('data-text'));
    let currentIndex = 0;
    
    // Create initial text element
    element.innerHTML = `<span class="text-content">${texts[currentIndex]}</span>`;
    
    // Show first text
    setTimeout(() => {
        element.querySelector('.text-content').classList.add('active');
    }, 100);
    
    const interval = setInterval(() => {
        currentIndex++;
        if (currentIndex < texts.length) {
            // Move current text up and out
            const currentText = element.querySelector('.text-content');
            currentText.style.transform = 'translateY(-100%)';
            
            // Create new text element from bottom
            setTimeout(() => {
                element.innerHTML = `<span class="text-content">${texts[currentIndex]}</span>`;
                
                // Animate new text up
                setTimeout(() => {
                    element.querySelector('.text-content').classList.add('active');
                }, 50);
            }, 300);
            
            if (currentIndex === texts.length - 1) {
                clearInterval(interval);
            }
        }
    }, 1000);
}
// Start text replacement animation after loading
window.addEventListener('load', () => {
    setTimeout(() => {
        startTextReplace();
    }, 1000); // Start after loading screen disappears
});
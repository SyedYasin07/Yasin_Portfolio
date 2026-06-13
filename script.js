/* ==========================================================================
   INTERACTIVE ENGINE: SAYED YASIN PORTFOLIO
   Aesthetic Theme: Futuristic Glassmorphic Cyber-Noir
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. INITIAL PAGE CYBER LOADER
       -------------------------------------------------------------------------- */
    const loader = document.getElementById('loader');
    const loaderPercent = document.getElementById('loader-percent');
    let loadCount = 0;
    
    // Simulate system resources boot
    const loadTimer = setInterval(() => {
        loadCount += Math.floor(Math.random() * 12) + 5;
        if (loadCount >= 100) {
            loadCount = 100;
            clearInterval(loadTimer);
            
            setTimeout(() => {
                loader.classList.add('loaded');
                setTimeout(initializeAnimations, 400);
            }, 300);
        }
        if (loaderPercent) {
            loaderPercent.textContent = `${loadCount}%`;
        }
    }, 40);

    function initializeAnimations() {
        // Run stats counts
        animateCounters();
        // Load initial Java Servlet snippet in the terminal
        switchTerminalTab('servlet');
    }

    /* --------------------------------------------------------------------------
       2. DOUBLE DYNAMIC CURSOR TRAILING
       -------------------------------------------------------------------------- */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    const trailDamping = 0.15; // Smooth trailing inertia
    
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (cursorDot) {
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }
    });

    // Tick loop for trail outline position
    function updateCursorTrail() {
        outlineX += (mouseX - outlineX) * trailDamping;
        outlineY += (mouseY - outlineY) * trailDamping;
        
        if (cursorOutline) {
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
        }
        
        requestAnimationFrame(updateCursorTrail);
    }
    requestAnimationFrame(updateCursorTrail);

    // Attach hover visual classes
    function attachCursorHoverListeners() {
        const hoverElements = document.querySelectorAll('a, button, .social-btn, .project-card, .tab-btn, #terminal-run');
        hoverElements.forEach(elem => {
            elem.addEventListener('mouseenter', () => document.body.classList.add('hovering-link'));
            elem.addEventListener('mouseleave', () => document.body.classList.remove('hovering-link'));
        });
    }
    attachCursorHoverListeners();

    /* --------------------------------------------------------------------------
       3. DYNAMIC CANVAS PARTICLE BACKGROUND (NEURAL NETWORK PHYSICS)
       -------------------------------------------------------------------------- */
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const maxParticles = 65;
        const connectionRadius = 110;
        
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;
        
        canvas.width = screenWidth;
        canvas.height = screenHeight;

        window.addEventListener('resize', () => {
            screenWidth = window.innerWidth;
            screenHeight = window.innerHeight;
            canvas.width = screenWidth;
            canvas.height = screenHeight;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * screenWidth;
                this.y = Math.random() * screenHeight;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 2 + 1;
                this.color = Math.random() > 0.5 ? 'rgba(6, 182, 212, 0.4)' : 'rgba(168, 85, 247, 0.4)';
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Wall bounces
                if (this.x < 0 || this.x > screenWidth) this.vx *= -1;
                if (this.y < 0 || this.y > screenHeight) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        // Initialize particles
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }

        // Physic loops
        function animateParticles() {
            ctx.clearRect(0, 0, screenWidth, screenHeight);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < connectionRadius) {
                        const alpha = (1 - distance / connectionRadius) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        }
        requestAnimationFrame(animateParticles);
    }

    /* --------------------------------------------------------------------------
       4. HERO DYNAMIC TYPING ROTATOR
       -------------------------------------------------------------------------- */
    const roles = [
        "Aspiring Full Stack Java Developer",
        "Java Developer",
        "Web Developer",
        "Problem Solver"
    ];
    
    const dynamicText = document.getElementById('dynamic-titles');
    let currentRoleIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeRole() {
        if (!dynamicText) return;
        const currentRole = roles[currentRoleIndex];
        
        if (isDeleting) {
            dynamicText.textContent = currentRole.substring(0, characterIndex - 1);
            characterIndex--;
            typeSpeed = 40;
        } else {
            dynamicText.textContent = currentRole.substring(0, characterIndex + 1);
            characterIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && characterIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause on full text
        } else if (isDeleting && characterIndex === 0) {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            typeSpeed = 400; // Pause before typing next title
        }

        setTimeout(typeRole, typeSpeed);
    }
    
    // Start typing rotator
    setTimeout(typeRole, 1500);

    /* --------------------------------------------------------------------------
       5. HERO INTERACTIVE CODE TERMINAL TABS & ASCI ART COMPILER
       -------------------------------------------------------------------------- */
    const codeSnippets = {
        servlet: `<span class="kw">package</span> <span class="cl">com.yasin.portfolio</span><span class="pc">;</span>

<span class="kw">import</span> <span class="cl">javax.servlet.http</span><span class="pc">.*;</span>
<span class="kw">import</span> <span class="cl">java.io.IOException</span><span class="pc">;</span>

<span class="cm">// Routing incoming request flows</span>
<span class="kw">public class</span> <span class="cl">YasinController</span> <span class="kw">extends</span> <span class="cl">HttpServlet</span> <span class="pc">{</span>
    
    <span class="pc">@Override</span>
    <span class="kw">protected void</span> <span class="mt">doGet</span><span class="pc">(</span><span class="cl">HttpServletRequest</span> <span class="pc">req,</span> 
                        <span class="cl">HttpServletResponse</span> <span class="pc">res)</span> 
                        <span class="kw">throws</span> <span class="cl">IOException</span> <span class="pc">{</span>
        
        <span class="pc">res.</span><span class="mt">setContentType</span><span class="pc">(</span><span class="str">"application/json"</span><span class="pc">);</span>
        <span class="pc">res.</span><span class="mt">getWriter</span><span class="pc">().</span><span class="mt">write</span><span class="pc">(</span>
            <span class="str">"{\\"status\\":\\"Ready\\", \\"java\\":17}"</span>
        <span class="pc">);</span>
    <span class="pc">}</span>
<span class="pc">}</span>`,

        sql: `<span class="cm">-- Setup Yasin Database schemas</span>
<span class="kw">CREATE TABLE</span> <span class="cl">portfolio_skills</span> <span class="pc">(</span>
    <span class="pc">id</span> <span class="kw">INT PRIMARY KEY AUTO_INCREMENT</span><span class="pc">,</span>
    <span class="pc">skill_name</span> <span class="kw">VARCHAR</span><span class="pc">(</span><span class="num">100</span><span class="pc">)</span> <span class="kw">UNIQUE</span><span class="pc">,</span>
    <span class="pc">skill_type</span> <span class="kw">VARCHAR</span><span class="pc">(</span><span class="num">50</span><span class="pc">),</span>
    <span class="pc">competency</span> <span class="kw">INT</span>
<span class="pc">);</span>

<span class="kw">INSERT INTO</span> <span class="cl">portfolio_skills</span> 
<span class="pc">(</span><span class="pc">skill_name, skill_type, competency</span><span class="pc">)</span>
<span class="kw">VALUES</span> 
<span class="pc">(</span><span class="str">'Java Core'</span><span class="pc">,</span> <span class="str">'Backend'</span><span class="pc">,</span> <span class="num">88</span><span class="pc">),</span>
<span class="pc">(</span><span class="str">'SQL'</span><span class="pc">,</span> <span class="str">'Database'</span><span class="pc">,</span> <span class="num">85</span><span class="pc">),</span>
<span class="pc">(</span><span class="str">'Servlets'</span><span class="pc">,</span> <span class="str">'Core API'</span><span class="pc">,</span> <span class="num">80</span><span class="pc">);</span>`,

        js: `<span class="cm">// Dynamic Web Spotlight Mouse Tracker</span>
<span class="kw">const</span> <span class="mt">trackSpotlight</span> <span class="pc">= (</span><span class="pc">event</span><span class="pc">) => {</span>
    <span class="kw">const</span> <span class="pc">{ clientX, clientY } = event;</span>
    <span class="kw">const</span> <span class="pc">cards = document.querySelectorAll(</span>
        <span class="str">'.hover-glow'</span>
    <span class="pc">);</span>

    <span class="pc">cards.forEach(card => {</span>
        <span class="kw">const</span> <span class="pc">rect = card.getBoundingClientRect();</span>
        <span class="kw">const</span> <span class="pc">x = clientX - rect.left;</span>
        <span class="kw">const</span> <span class="pc">y = clientY - rect.top;</span>
        
        <span class="pc">card.style.setProperty(</span><span class="str">'--mouse-x'</span><span class="pc">, \`\${x}px\`);</span>
        <span class="pc">card.style.setProperty(</span><span class="str">'--mouse-y'</span><span class="pc">, \`\${y}px\`);</span>
    <span class="pc">});</span>
<span class="pc">};</span>

<span class="pc">window.addEventListener(</span><span class="str">'mousemove'</span><span class="pc">, trackSpotlight);</span>`
    };

    const terminalTabs = document.querySelectorAll('.terminal-tabs .tab-btn');
    const codeContent = document.getElementById('code-content');

    terminalTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            terminalTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const fileType = tab.getAttribute('data-file');
            switchTerminalTab(fileType);
        });
    });

    function switchTerminalTab(tabName) {
        if (codeSnippets[tabName] && codeContent) {
            codeContent.innerHTML = codeSnippets[tabName];
        }
    }

    // Dynamic mouse spotlight coordinates for glowing gradients
    window.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.hover-glow, .code-terminal, .skill-card, .timeline-card, .project-card, .info-link-card, .cert-card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Run / Compile Terminal Code Action (with ASCI art sequence)
    const runBtn = document.getElementById('terminal-run');
    if (runBtn) {
        runBtn.addEventListener('click', () => {
            runBtn.style.color = '#ef4444'; // Processing state (red)
            
            const originalContent = codeContent.innerHTML;
            
            // ASCI Art Java Logo representation
            const asciArtJava = `
      ____   _   _  _   _ 
     |  _ \\ | | | || | | |
     | |_) || | | || | | |
     |  _ < | |_| || |_| |
     |_| \\_\\ \\___/  \\___/ 
            `;
            
            codeContent.innerHTML = `<span class="cm">// Spawning JVM compiler pipeline...</span>\n<span class="cl">Compiling Sayed Yasin enterprise project...</span>\n<span class="kw">JDBC: Established connection pools in 14ms!</span>\n<span class="str">SQL: Normalizations and schema checks clean.</span>\n<span class="text-green">Compilation Succeeded! Launching server engine...</span>\n\n<span class="text-cyan">${asciArtJava}</span>\n\n<span class="text-green">Yasin MVC Server online at http://localhost:8080/yasin-dev/</span>`;
            
            setTimeout(() => {
                runBtn.style.color = '#22c55e'; // Back to green
                setTimeout(() => {
                    codeContent.innerHTML = originalContent;
                }, 4000);
            }, 2000);
        });
    }

    /* --------------------------------------------------------------------------
       6. INTERSECTION OBSERVER (SCROLL REVEAL & SKILLS PROGRESS ANIMATIONS)
       -------------------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal-fade, .reveal-left, .reveal-right, .reveal-scale');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // If it is the skills container, trigger progress fills
                if (entry.target.id === 'skills') {
                    animateSkillsBars();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    function animateSkillsBars() {
        const progressFills = document.querySelectorAll('.progress-fill');
        progressFills.forEach(fill => {
            const targetPercent = fill.getAttribute('data-percent');
            fill.style.width = `${targetPercent}%`;
        });
    }

    /* --------------------------------------------------------------------------
       7. ACTIVE NAVIGATION LINK HIGHLIGHTING
       -------------------------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    /* --------------------------------------------------------------------------
       8. STICKY GLASSMORPHIC HEADER EFFECT
       -------------------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }
    });

    /* --------------------------------------------------------------------------
       9. RESPONSIVE HAMBURGER SLIDE DRAWER
       -------------------------------------------------------------------------- */
    const hamburger = document.getElementById('hamburger-toggle');
    const navMenu = document.getElementById('nav-menu');
    const links = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            const expanded = hamburger.classList.contains('active');
            hamburger.setAttribute('aria-expanded', expanded);
        });

        // Auto close on menu link clicks
        links.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', false);
            });
        });
    }

    /* --------------------------------------------------------------------------
       10. STATISTICS COUNTER INCREMENTS
       -------------------------------------------------------------------------- */
    function animateCounters() {
        const statNums = document.querySelectorAll('.stat-num');
        
        statNums.forEach(stat => {
            const targetVal = parseFloat(stat.getAttribute('data-val'));
            let currentVal = 0;
            const step = targetVal / 50; // Total count blocks
            
            const timer = setInterval(() => {
                currentVal += step;
                if (currentVal >= targetVal) {
                    stat.textContent = targetVal;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(currentVal);
                }
            }, 30);
        });
    }

    /* --------------------------------------------------------------------------
       11. SCROLL PROGRESS INDICATOR & BACK TO TOP BUTTON
       -------------------------------------------------------------------------- */
    const scrollBar = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (window.scrollY / windowHeight) * 100;
        
        if (scrollBar) {
            scrollBar.style.width = `${scrollPercent}%`;
        }
        
        if (backToTopBtn) {
            if (window.scrollY > 350) {
                backToTopBtn.classList.add('active');
                backToTopBtn.setAttribute('aria-hidden', false);
            } else {
                backToTopBtn.classList.remove('active');
                backToTopBtn.setAttribute('aria-hidden', true);
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // /* --------------------------------------------------------------------------
    //    12. SMTP FORM SUBMIT VERIFICATION RESPONSE
    //    -------------------------------------------------------------------------- */
    // const contactForm = document.getElementById('portfolio-contact-form');
    // const submitBtnText = document.getElementById('submit-btn-text');
    // const submitBtnIcon = document.getElementById('submit-btn-icon');

    // if (contactForm) {
    //     contactForm.addEventListener('submit', (e) => {
    //         e.preventDefault();
            
    //         // Lock form controls
    //         if (submitBtnText && submitBtnIcon) {
    //             submitBtnText.textContent = "TRANSMITTING DATA PACKET...";
    //             submitBtnIcon.className = "fa-solid fa-spinner fa-spin text-glow";
    //             contactForm.style.pointerEvents = "none";
                
    //             setTimeout(() => {
    //                 // Success callback
    //                 submitBtnText.textContent = "SMTP CONNECTION ESTABLISHED! TRANSMITTED.";
    //                 submitBtnIcon.className = "fa-solid fa-circle-check text-glow";
    //                 submitBtnIcon.style.color = "#22c55e";
                    
    //                 contactForm.reset();
                    
    //                 setTimeout(() => {
    //                     submitBtnText.textContent = "Transmit Payload";
    //                     submitBtnIcon.className = "fa-solid fa-paper-plane text-glow";
    //                     submitBtnIcon.style.color = "";
    //                     contactForm.style.pointerEvents = "auto";
    //                 }, 3500);
    //             }, 1800);
    //         }
    //     });
    // }
                  // Initialize EmailJS
emailjs.init("BN37ET1cRrGtQ3MTV");


// Select Form
const form = document.getElementById("portfolio-contact-form");


// Select Button Elements
const submitBtnText = document.getElementById("submit-btn-text");

const submitBtnIcon = document.getElementById("submit-btn-icon");


// Form Submit Event
form.addEventListener("submit", function (e) {

    e.preventDefault();

    // Loading State
    submitBtnText.innerText = "Transmitting...";

    submitBtnIcon.classList.remove("fa-paper-plane");

    submitBtnIcon.classList.add("fa-spinner", "fa-spin");


    // Send Email
    emailjs.sendForm(
        "service_zckjzv4",
        "template_dbvd9wn",
        "#portfolio-contact-form"
    )

    .then(() => {

        // Success State
        submitBtnText.innerText = "Payload Delivered!";

        submitBtnIcon.classList.remove("fa-spinner", "fa-spin");

        submitBtnIcon.classList.add("fa-check");


        alert("Message sent successfully!");

        form.reset();


        setTimeout(() => {

            submitBtnText.innerText = "Transmit Payload";

            submitBtnIcon.classList.remove("fa-check");

            submitBtnIcon.classList.add("fa-paper-plane");

        }, 3000);

    })

    .catch((error) => {

        console.log(error);

        // Error State
        submitBtnText.innerText = "Transmission Failed";

        submitBtnIcon.classList.remove("fa-spinner", "fa-spin");

        submitBtnIcon.classList.add("fa-xmark");


        alert("Failed to send message!");

    });

});


    /* --------------------------------------------------------------------------
       13. DYNAMIC PROJECT DETAIL MODALS
       -------------------------------------------------------------------------- */
    const projectModal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBodyContent = document.getElementById('modal-body-content');
    const projectTriggers = document.querySelectorAll('.preview-project-btn');

    const projectData = {
        flipkart: {
            badge: "E-Commerce System",
            title: "Flipkart Full Stack Application",
            description: "A robust digital storefront mimicking Flipkart's design paradigms. Built using core J2EE patterns with MVC separation. Presentation logic is powered by organized JSP tags, and request-response pathways are channeled via Java Servlets. Backed by a secure relational SQL database executing structured CRUD operators. Implements real-time responsive styling variables for premium interface layouts.",
            tech: ["Java SE 17", "JDBC API", "Servlets routing", "JSP Web Core", "MySQL Database", "Vanilla JS Interface"],
            source: "https://github.com/SyedYasin07"
        },
        student: {
            badge: "Institutional ERP",
            title: "Student SMS Database Engine",
            description: "An administrative student management registry tailored for high academic coordination. Implements robust Java OOP structures along with SQL PreparedStatements to block injection vectors. Features database pooling mechanisms to minimize overhead, secure personnel login pathways, chronological student performance tracking, and printable transcript reports.",
            tech: ["Java 8+", "Servlets", "PreparedStatements", "SQL Datastore", "Data Structures", "Secure Auth"],
            source: "https://github.com/SyedYasin07"
        },
        netflix: {
        badge: "OTT Streaming Platform",
        title: "Netflix Inspired OTT App",
        description: "A modern OTT streaming platform inspired by Netflix featuring cinematic intro animations, responsive content layouts, interactive hover effects, dynamic UI sections, and scalable frontend architecture for future streaming functionality and media integration.",
        tech: ["HTML5", "CSS3", "JavaScript ES6", "Responsive Design", "UI Animations"],
        source: "https://github.com/SyedYasin07"
}
    };

    if (projectModal && modalBodyContent) {
        projectTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const projectKey = trigger.getAttribute('data-project');
                const data = projectData[projectKey];
                
                if (data) {
                    let techPillsHtml = data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
                    
                    modalBodyContent.innerHTML = `
                        <div class="modal-project-header">
                            <span class="modal-project-badge">${data.badge}</span>
                            <h3 class="modal-project-title">${data.title}</h3>
                        </div>
                        <div class="modal-project-body">
                            <p>${data.description}</p>
                            
                            <div class="modal-project-tech">
                                <h4 class="modal-subtitle">Module Tech Stack</h4>
                                <div class="modal-tech-wrap">${techPillsHtml}</div>
                            </div>
                            
                            <div class="modal-actions">
                                <a href="${data.source}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                                    <i class="fa-brands fa-github"></i> Inspect GitHub Source Code
                                </a>
                            </div>
                        </div>
                    `;
                    
                    projectModal.classList.add('active');
                    projectModal.setAttribute('aria-hidden', false);
                    document.body.style.overflow = "hidden"; // Lock viewport scroll
                    document.body.classList.add('hovering-link'); // Resize custom cursors
                }
            });
        });

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }
        
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) closeModal();
        });
    }

    function closeModal() {
        if (projectModal) {
            projectModal.classList.remove('active');
            projectModal.setAttribute('aria-hidden', true);
            document.body.style.overflow = "";
            document.body.classList.remove('hovering-link');
        }
    }

    /* --------------------------------------------------------------------------
       14. RESUME PREVIEW MODALS
       -------------------------------------------------------------------------- */
    const resumeBtn = document.getElementById('resume-download-btn');
    const resumeModal = document.getElementById('resume-modal');
    const resumeClose = document.getElementById('resume-modal-close');

    if (resumeBtn && resumeModal && resumeClose) {
        resumeBtn.addEventListener('click', () => {
            resumeModal.classList.add('active');
            resumeModal.setAttribute('aria-hidden', false);
            document.body.style.overflow = "hidden";
            document.body.classList.add('hovering-link');
        });

        resumeClose.addEventListener('click', closeResumeModal);
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) closeResumeModal();
        });
    }

    function closeResumeModal() {
        if (resumeModal) {
            resumeModal.classList.remove('active');
            resumeModal.setAttribute('aria-hidden', true);
            document.body.style.overflow = "";
            document.body.classList.remove('hovering-link');
        }
    }

    /* --------------------------------------------------------------------------
       15. CPU-FRIENDLY 3D CARD TILT FOR DESKTOPS
       -------------------------------------------------------------------------- */
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    if (window.innerWidth > 900) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((centerY - y) / centerY) * 8;
                const rotateY = ((x - centerX) / centerX) * 8;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
            });
        });
    }
    

});
// Slider Veille Technologique
const slides = document.querySelectorAll('.slide-card');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');
const dots = document.querySelectorAll('.dot');

let currentSlide = 0;
const totalSlides = slides.length;

function showSlide(index) {
    if (!slides[index]) return;
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Écouteurs d'événements
if (prevBtn) prevBtn.addEventListener('click', prevSlide);
if (nextBtn) nextBtn.addEventListener('click', nextSlide);

// Gestion des points (dots)
if (dots.length > 0) {
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
}

// Bascule entre thème clair et sombre
const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i><span>Thème clair</span>';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i><span>Thème sombre</span>';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i><span>Thème sombre</span>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i><span>Thème clair</span>';
        }
    });
}

// MODALE POUR LES COMPÉTENCES
const modal = document.getElementById('skill-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const closeBtn = document.querySelector('.modal-close');
const prevSkillBtn = document.getElementById('prev-skill');
const nextSkillBtn = document.getElementById('next-skill');
const currentIndexSpan = document.getElementById('current-skill-index');
const totalSkillsSpan = document.getElementById('total-skills');

// Liste ordonnée des compétences (dans l'ordre d'affichage)
const skillsList = [
    "Ticketing",
    "Virtualisation",
    "TCP/IP & Réseaux",
    "Cisco Packet Tracer",
    "Linux",
    "VScode"
];

// Contenu des descriptions pour chaque compétence
const skillsContent = {
    "Ticketing": "J'ai appris à gérer et créer des tickets aussi bien en entreprise que durant les cours, notamment via l'outil GLPI. Aujourd'hui, je sais suivre un ticket du début à la résolution et assurer un support utilisateur organisé.",
    "Virtualisation": "La virtualisation fait partie de ma formation en BTS, avec des outils comme VMware et VirtualBox, ce qui me permet de créer et gérer des machines virtuelles pour tester différentes configurations réseaux et systèmes.",
    "TCP/IP & Réseaux": "J’ai acquis les bases solides du réseau (modèle TCP/IP, routage, VLAN, adressage IP…) en cours. Cela me permet de comprendre et configurer des environnements réseau simples à intermédiaires.",
    "Cisco Packet Tracer": "J’ai réalisé de nombreux TP avec Cisco Packet Tracer. Cela m’a permis de simuler des architectures réseau, configurer des équipements Cisco et renforcer ma compréhension du fonctionnement d’un réseau.",
    "Linux": "Je suis familier avec l'environnement Linux (Ubuntu/Debian), les commandes essentielles, l'administration système, la gestion des droits, des paquets et des services.",
    "VScode": "S Code est mon éditeur de référence aussi bien pour mes projets personnels, mes cours que certaines tâches professionnelles. Je l’utilise pour coder, organiser mes projets et travailler avec différentes extensions."
};

let currentSkillIndex = 0;
const totalSkills = skillsList.length;

// Afficher le nombre total de compétences
if (totalSkillsSpan) {
    totalSkillsSpan.textContent = totalSkills;
}

// Fonction pour afficher une compétence
function showSkill(index) {
    if (index < 0) index = 0;
    if (index >= totalSkills) index = totalSkills - 1;
    
    currentSkillIndex = index;
    const skillName = skillsList[currentSkillIndex];
    if (modalTitle) modalTitle.textContent = skillName;
    if (modalDescription) modalDescription.textContent = skillsContent[skillName] || "Description détaillée à venir.";
    
    if (currentIndexSpan) {
        currentIndexSpan.textContent = currentSkillIndex + 1;
    }
}

// Ouvrir la modale au clic sur "En savoir plus"
document.querySelectorAll('.skill-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const skillName = link.getAttribute('data-skill');
        const foundIndex = skillsList.indexOf(skillName);
        currentSkillIndex = foundIndex !== -1 ? foundIndex : 0;
        showSkill(currentSkillIndex);
        if (modal) modal.style.display = 'flex';
    });
});

// Navigation précédente
if (prevSkillBtn) {
    prevSkillBtn.addEventListener('click', () => {
        showSkill(currentSkillIndex - 1);
    });
}

// Navigation suivante
if (nextSkillBtn) {
    nextSkillBtn.addEventListener('click', () => {
        showSkill(currentSkillIndex + 1);
    });
}

// Fermer la modale avec la croix
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        if (modal) modal.style.display = 'none';
    });
}

// Fermer la modale en cliquant en dehors
window.addEventListener('click', (e) => {
    if (e.target === modal && modal) {
        modal.style.display = 'none';
    }
});

// Fermer la modale avec la touche Echap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
        modal.style.display = 'none';
    }
    // Navigation au clavier (flèches gauche/droite)
    if (modal && modal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            showSkill(currentSkillIndex - 1);
        } else if (e.key === 'ArrowRight') {
            showSkill(currentSkillIndex + 1);
        }
    }
});

// ============================================================
// NAVIGATION PAR ONGLETS
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
    const tabs  = [...document.querySelectorAll('.content > section')];
    const links = [...document.querySelectorAll('.nav-links a')];

    function showTab(id) {
        if (!tabs.some(s => s.id === id)) id = 'accueil';
        tabs.forEach(s => s.classList.toggle('active', s.id === id));
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
        window.scrollTo({ top: 0 });
        // Relance l'effet de particules depuis le centre à chaque section
        window.dispatchEvent(new Event('tabchange'));
    }

    // Tous les liens internes (sidebar + boutons "Voir mes projets", etc.)
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = a.getAttribute('href');
            if (target.length <= 1) return;          // ignore les "#" seuls
            e.preventDefault();
            const id = target.slice(1);
            history.replaceState(null, '', '#' + id);
            showTab(id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    window.addEventListener('hashchange', () => showTab(location.hash.slice(1)));
    showTab(location.hash.slice(1) || 'accueil');
});

// Certifications : fenêtre "En savoir plus"
document.addEventListener("DOMContentLoaded", function () {
    const certModal = document.getElementById('cert-modal');
    if (!certModal) return;
    const mImg = document.getElementById('cert-modal-img');
    const mDate = document.getElementById('cert-modal-date');
    const mTitle = document.getElementById('cert-modal-title');
    const mDesc = document.getElementById('cert-modal-desc');

    function openCert(card) {
        const img = card.querySelector('.cert-thumb img');
        mImg.src = img.getAttribute('src');
        mImg.alt = img.alt;
        mDate.textContent = card.querySelector('.cert-date').textContent;
        mTitle.textContent = card.querySelector('h3').textContent;
        mDesc.textContent = card.querySelector('.cert-body p').textContent;
        certModal.style.display = 'flex';
    }
    function closeCert() { certModal.style.display = 'none'; }

    document.querySelectorAll('.cert-card').forEach(card => {
        card.querySelectorAll('.cert-thumb, .cert-more').forEach(btn =>
            btn.addEventListener('click', () => openCert(card)));
    });
    document.getElementById('cert-modal-close').addEventListener('click', closeCert);
    certModal.addEventListener('click', e => { if (e.target === certModal) closeCert(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCert(); });
});
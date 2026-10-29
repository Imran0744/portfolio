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
            if (tabs.some(s => s.id === id)) {
                history.replaceState(null, '', '#' + id);
                showTab(id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    window.addEventListener('hashchange', () => { const id = location.hash.slice(1); if (tabs.some(s => s.id === id)) showTab(id); });
    showTab(location.hash.slice(1) || 'accueil');
});

// ============================================================
// CERTIFICATIONS : Panneaux et visionneuse
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
    const viewer = document.getElementById('cert-modal');
    
    // Gestion des fenêtres (Panneaux)
    function openPanel(id) {
        const p = document.getElementById(id);
        if (!p) return;
        p.classList.add('open');
        p.scrollTop = 0;
        document.body.style.overflow = 'hidden';
    }
    
    function closePanels() {
        document.querySelectorAll('.cert-panel.open').forEach(p => p.classList.remove('open'));
        document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-panel]').forEach(btn =>
        btn.addEventListener('click', () => openPanel(btn.dataset.panel)));
        
    document.querySelectorAll('.cert-panel').forEach(p => {
        p.addEventListener('click', e => { if (e.target === p) closePanels(); });
        const closeBtn = p.querySelector('.cert-panel-close');
        if (closeBtn) closeBtn.addEventListener('click', closePanels);
    });

    // Gestion de la visionneuse (Zoom sur l'image)
    if (viewer) {
        const vImg = document.getElementById('cert-modal-img');
        const vDate = document.getElementById('cert-modal-date');
        const vTitle = document.getElementById('cert-modal-title');
        const vDesc = document.getElementById('cert-modal-desc');

        function openViewer(leaf) {
            const img = leaf.querySelector('.leaf-thumb');
            vImg.src = img.getAttribute('src');
            vImg.alt = img.alt;
            vDate.textContent = leaf.querySelector('.cert-date').textContent;
            vTitle.textContent = leaf.querySelector('h4').textContent;
            vDesc.textContent = leaf.querySelector('.leaf-body p').textContent;
            viewer.style.display = 'flex';
        }
        
        function closeViewer() { viewer.style.display = 'none'; }

        document.querySelectorAll('.tree-leaf').forEach(leaf =>
            leaf.querySelectorAll('.leaf-view, .leaf-thumb').forEach(el =>
                el.addEventListener('click', () => openViewer(leaf))));

        document.getElementById('cert-modal-close').addEventListener('click', closeViewer);
        viewer.addEventListener('click', e => { if (e.target === viewer) closeViewer(); });
        
        document.addEventListener('keydown', e => {
            if (e.key !== 'Escape') return;
            if (viewer.style.display === 'flex') closeViewer(); else closePanels();
        });
    }
    
    window.addEventListener('tabchange', closePanels);
});

// ============================================================
// ACCUEIL : texte qui change, compteurs et terminal interactif
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1) Phrase du héros qui s'écrit puis s'efface
    const typed = document.querySelector('.typed');
    if (typed && !reduce) {
        let words = [];
        try { words = JSON.parse(typed.dataset.words); } catch (e) {}
        if (words.length > 1) {
            let w = 0, c = words[0].length, deleting = false;
            (function tick() {
                const word = words[w];
                typed.textContent = word.slice(0, c);
                let delay;
                if (!deleting) {
                    if (c < word.length) { c++; delay = 70; } else { deleting = true; delay = 1600; }
                } else if (c > 0) { c--; delay = 35; }
                else { deleting = false; w = (w + 1) % words.length; delay = 350; }
                setTimeout(tick, delay);
            })();
        }
    }

    // 2) Chiffres clés : calculés à partir du contenu réel du portfolio
    function runCounters() {
        document.querySelectorAll('.stat-num[data-count-selector]').forEach(el => {
            const target = document.querySelectorAll(el.dataset.countSelector).length;
            if (reduce || target < 2) { el.textContent = target; return; }
            let n = 0;
            const step = Math.max(1, Math.ceil(target / 20));
            const id = setInterval(() => {
                n = Math.min(n + step, target);
                el.textContent = n;
                if (n >= target) clearInterval(id);
            }, 50);
        });
    }
    const home = document.getElementById('accueil');
    if (home && home.classList.contains('active')) runCounters();
    window.addEventListener('tabchange', () => { if (home && home.classList.contains('active')) runCounters(); });

    // 3) Terminal interactif
    const term = document.getElementById('term');
    if (!term) return;
    const out = term.querySelector('.term-output');
    const input = term.querySelector('.term-input');
    const history = [];
    let hIndex = 0;

    const sections = {
        accueil: 'accueil', apropos: 'a-propos', 'a-propos': 'a-propos', bts: 'BTS-SIO', 'bts-sio': 'BTS-SIO',
        parcours: 'parcours', competences: 'competences', certifications: 'certifications', certifs: 'certifications',
        projets: 'projets', patrimoine: 'patrimoine', veille: 'veilles', veilles: 'veilles', contact: 'contact'
    };
    const texts = sel => [...document.querySelectorAll(sel)].map(e => e.textContent.trim());

    function print(text, cls) {
        const line = document.createElement('div');
        line.className = 'term-line' + (cls ? ' ' + cls : '');
        line.textContent = text;
        out.appendChild(line);
        out.scrollTop = out.scrollHeight;
    }
    function printAll(lines, cls) { lines.forEach(l => print(l, cls)); }

    const commands = {
        help: () => printAll([
            'Commandes disponibles :',
            '  help        affiche cette aide',
            '  whoami      qui suis-je ?',
            '  neofetch    résumé de mon profil',
            '  skills      mes compétences',
            '  projets     mes projets',
            '  certifs     mes certifications',
            '  ls          liste des rubriques',
            '  cd <nom>    ouvre une rubrique (ex : cd projets)',
            '  cv          ouvre mon CV',
            '  theme       bascule thème clair / sombre',
            '  clear       efface l\'écran'
        ]),
        whoami: () => print('Imran Poumalis, étudiant en BTS SIO option SISR, alternant technicien infogérance chez Axians.'),
        neofetch: () => printAll([
            'imran@sisr',
            '----------',
            'Formation  : BTS SIO option SISR, lycée Dick Ukeiwé',
            'Poste      : alternant technicien infogérance, Axians',
            'Réseaux    : TCP/IP, VLAN, ACL, Cisco, MikroTik',
            'Systèmes   : Linux, VMware ESXi, VirtualBox',
            'Outils     : Zabbix, GLPI, OCS Inventory, Wireshark, Nmap',
            'Certifs    : Cisco Networking Academy, PIX'
        ]),
        skills: () => print(texts('#competences .comp-card h4').join(' · ') || 'Aucune compétence trouvée.'),
        projets: () => printAll(texts('#projets .project-card h3').map(t => '• ' + t)),
        certifs: () => printAll(texts('.tree-leaf h4, .cert-item h4').map(t => '• ' + t)),
        ls: () => print(['accueil', 'a-propos', 'bts-sio', 'parcours', 'competences', 'certifications', 'projets', 'patrimoine', 'veilles', 'contact'].join('  ')),
        cd: args => {
            const key = (args[0] || '').toLowerCase().replace(/\/$/, '');
            const id = sections[key];
            if (!id) return print('cd : rubrique introuvable : ' + (args[0] || '') + ' (essaie ls)', 'err');
            print('ouverture de ' + key + '…', 'ok');
            location.hash = '#' + id;
        },
        cv: () => { print('ouverture du CV…', 'ok'); window.open('Documents/CV-POUMALIS Imran.pdf', '_blank', 'noopener'); },
        theme: () => { const t = document.getElementById('theme-toggle'); if (t) t.click(); print('thème modifié.', 'ok'); },
        clear: () => { out.textContent = ''; }
    };

    function run(raw) {
        const cmdLine = raw.trim();
        print('imran@sisr:~$ ' + raw, 'cmd');
        if (!cmdLine) return;
        history.push(cmdLine);
        hIndex = history.length;
        const [name, ...args] = cmdLine.split(/\s+/);
        const fn = commands[name.toLowerCase()];
        if (fn) fn(args); else print('commande introuvable : ' + name + ' (tape help)', 'err');
    }

    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') { run(input.value); input.value = ''; }
        else if (e.key === 'ArrowUp') { e.preventDefault(); if (hIndex > 0) input.value = history[--hIndex]; }
        else if (e.key === 'ArrowDown') { e.preventDefault(); input.value = hIndex < history.length - 1 ? history[++hIndex] : (hIndex = history.length, ''); }
        else if (e.key === 'Tab') {
            e.preventDefault();
            const parts = input.value.split(/\s+/);
            const pool = parts.length > 1 ? Object.keys(sections) : Object.keys(commands);
            const hit = pool.filter(c => c.startsWith(parts[parts.length - 1].toLowerCase()));
            if (hit.length === 1) { parts[parts.length - 1] = hit[0]; input.value = parts.join(' '); }
        }
    });
    term.addEventListener('click', () => input.focus());
    print('Bienvenue ! Tape help pour voir les commandes.', 'ok');
});

// ============================================================
// PAGES ADAPTÉES : filtres, traceroute, horloge, copie, formulaire
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
    // 1) Filtres (projets)
    document.querySelectorAll('.filters[data-filter-group]').forEach(group => {
        const target = document.getElementById(group.dataset.filterGroup);
        if (!target) return;
        group.querySelectorAll('.filter').forEach(btn => btn.addEventListener('click', () => {
            group.querySelectorAll('.filter').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
            const f = btn.dataset.filter;
            target.querySelectorAll('[data-cat]').forEach(it => { it.hidden = !(f === 'all' || it.dataset.cat === f); });
        }));
    });

    // 2) « traceroute » du parcours, construit à partir de la frise
    const trace = document.getElementById('trace');
    const items = [...document.querySelectorAll('#parcours .pt-item')];
    if (trace && items.length) {
        const short = t => t.length > 40 ? t.slice(0, 38).trim() + '…' : t;
        const hops = items.map((it, i) => {
            it.id = it.id || 'pt-' + (i + 1);
            return '<li><a href="#' + it.id + '"><span class="n">' + (i + 1) + '</span><span class="h"></span><span class="t"></span></a></li>';
        });
        trace.innerHTML = '<div class="term-bar"><i></i><i></i><i></i><span>imran@sisr: ~/parcours</span></div>' +
            '<p class="trace-cmd"><span class="p">$</span> traceroute alternance</p><ol class="trace-hops">' + hops.join('') + '</ol>';
        trace.querySelectorAll('li a').forEach((a, i) => {
            a.querySelector('.h').textContent = short((items[i].querySelector('h4') || {}).textContent || 'étape');
            a.querySelector('.t').textContent = ((items[i].querySelector('.pt-period') || {}).textContent || '').trim();
        });
    }

    // 3) Chiffres de la veille
    document.querySelectorAll('.vstat').forEach(el => {
        const nodes = [...document.querySelectorAll(el.dataset.sel)];
        el.textContent = el.dataset.distinct ? new Set(nodes.map(n => n.textContent.trim())).size : nodes.length;
    });

    // 4) Heure locale de Nouméa
    function tickClock() {
        let t = '--:--';
        try { t = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Pacific/Noumea', hour: '2-digit', minute: '2-digit' }).format(new Date()); } catch (e) {}
        document.querySelectorAll('[data-clock]').forEach(e => { e.textContent = t; });
    }
    tickClock();
    setInterval(tickClock, 30000);

    // 5) Copier l'adresse e-mail
    document.querySelectorAll('.copy-btn').forEach(btn => btn.addEventListener('click', async () => {
        const label = btn.querySelector('span');
        try { await navigator.clipboard.writeText(btn.dataset.copy); label.textContent = 'Copié !'; }
        catch (e) { label.textContent = 'Copie impossible'; }
        setTimeout(() => { label.textContent = 'Copier'; }, 2000);
    }));

    // 6) Formulaire : envoi par Formspree, sinon la messagerie s'ouvre avec le message prérempli
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    function showToast(msg) {
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
    }
    if (form) form.addEventListener('submit', async e => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const status = form.querySelector('.form-status');
        const label = btn.innerHTML;
        btn.disabled = true;
        btn.textContent = 'Envoi en cours…';
        try {
            const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            form.reset();
            showToast('✅ Message envoyé avec succès !');
            if (status) status.textContent = 'Message envoyé, merci !';
        } catch (err) {
            const d = new FormData(form);
            const subject = encodeURIComponent('[Portfolio] ' + (d.get('objet') || 'Message'));
            const body = encodeURIComponent((d.get('message') || '') + '\n\n' + (d.get('name') || '') + ' (' + (d.get('email') || '') + ')');
            showToast("L'envoi direct a échoué : ouverture de votre messagerie…");
            if (status) status.textContent = "L'envoi direct a échoué : votre messagerie s'ouvre avec le message prérempli.";
            window.location.href = 'mailto:' + form.dataset.mailto + '?subject=' + subject + '&body=' + body;
        }
        btn.disabled = false;
        btn.innerHTML = label;
    });
});
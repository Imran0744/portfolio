document.addEventListener('DOMContentLoaded', (event) => {
    const welcomeSection = document.getElementById('accueil');
    const welcomeText = document.querySelector('.neon-welcome');

    const observerOptions = {
        root: null, // utilise le viewport comme conteneur de défilement
        rootMargin: '0px',
        threshold: 0.5 // l'animation se déclenche quand la moitié de l'élément est visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // L'élément est dans le viewport, on ajoute la classe pour démarrer l'animation
                welcomeText.classList.add('typing-animation');
            } else {
                // L'élément n'est plus visible, on retire la classe pour réinitialiser
                welcomeText.classList.remove('typing-animation');
            }
        });
    }, observerOptions);

    observer.observe(welcomeSection);
});
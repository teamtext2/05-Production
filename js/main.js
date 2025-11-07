    // Menu mobile toggle
    document.querySelector('.menu-toggle').addEventListener('click', () => {
        document.querySelector('nav').classList.toggle('show');
    });

    // Change background depending on device
    function setHeroBackground() {
        const hero = document.querySelector('.hero');
        if (window.innerWidth <= 768) {
            hero.classList.add('mobile');
            hero.classList.remove('pc');
        } else {
            hero.classList.add('pc');
            hero.classList.remove('mobile');
        }
    }
    setHeroBackground();
    window.addEventListener('resize', setHeroBackground);
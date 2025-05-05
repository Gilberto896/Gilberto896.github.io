document.addEventListener('DOMContentLoaded', function() {
    // Animación al hacer scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__fadeInUp');
        }
      });
    }, {
      threshold: 0.1
    });
    
    // Observar las secciones que queremos animar
    document.querySelectorAll('.about, .knowledge, .price, .testimony, .questions, #contact').forEach(section => {
      section.classList.add('animate__animated');
      observer.observe(section);
    });
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
          
          // Cerrar menú móvil si está abierto
          const navLink = document.querySelector('.nav__link--menu');
          if (navLink.classList.contains('nav__link--show')) {
            navLink.classList.remove('nav__link--show');
            document.body.style.overflow = 'auto';
          }
        }
      });
    });
  });
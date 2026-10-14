
/* =========================================================
   1. FILTROS DINÁMICOS DE CATEGORÍAS DE HABILIDADES
   ========================================================= */

function filtrarSkills(categoria, boton) {
    // Actualizar el botón activo
    document.querySelectorAll('.skill-filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    boton.classList.add('active');

    // Filtrar las tarjetas de habilidades
    const tarjetas = document.querySelectorAll('.skill-card');

    tarjetas.forEach(tarjeta => {
        if (
            categoria === 'todos' ||
            tarjeta.getAttribute('data-category') === categoria
        ) {
            tarjeta.classList.remove('oculto');
        } else {
            tarjeta.classList.add('oculto');
        }
    });
}


/* =========================================================
   2. EFECTO CYBER GLOW: RASTREO DEL CURSOR
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const tarjetas = document.querySelectorAll('.skill-card');

    tarjetas.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});


/* =========================================================
   3. CARRUSEL DE PROYECTOS CON SCROLL HORIZONTAL
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const trackContainer = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');

    const cards = document.querySelectorAll('.proyecto-card');

    // Si no existe el carrusel o no hay proyectos, salir
    if (!trackContainer || cards.length === 0) {
        return;
    }

    // Crear los puntos indicadores del carrusel
    if (dotsContainer) {
        cards.forEach((_, index) => {
            const dot = document.createElement('div');

            dot.classList.add('dot');

            if (index === 0) {
                dot.classList.add('active');
            }

            dot.addEventListener('click', () => {
                scrollToCard(index);
            });

            dotsContainer.appendChild(dot);
        });
    }

    const dots = dotsContainer
        ? dotsContainer.querySelectorAll('.dot')
        : [];

    // Calcular el ancho de una tarjeta más el espacio entre ellas
    function getCardWidth() {
        return cards[0].getBoundingClientRect().width + 32;
    }

    // Desplazarse hasta una tarjeta específica
    function scrollToCard(index) {
        const cardWidth = getCardWidth();

        trackContainer.scrollTo({
            left: cardWidth * index,
            behavior: 'smooth'
        });

        updateDots(index);
    }

    // Actualizar el punto activo
    function updateDots(activeIndex) {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }

    // Botón siguiente
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const cardWidth = getCardWidth();

            trackContainer.scrollBy({
                left: cardWidth,
                behavior: 'smooth'
            });
        });
    }

    // Botón anterior
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const cardWidth = getCardWidth();

            trackContainer.scrollBy({
                left: -cardWidth,
                behavior: 'smooth'
            });
        });
    }

    // Actualizar los puntos al desplazar manualmente el carrusel
    trackContainer.addEventListener('scroll', () => {
        const cardWidth = getCardWidth();

        if (cardWidth <= 0) {
            return;
        }

        const activeIndex = Math.round(
            trackContainer.scrollLeft / cardWidth
        );

        updateDots(
            Math.max(0, Math.min(activeIndex, dots.length - 1))
        );
    });
});


/* =========================================================
   4. FORMULARIO DE CONTACTO
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) {
        return;
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombreInput = document.getElementById('nombre');
        const btnSubmit = contactForm.querySelector(
            "button[type='submit']"
        );

        // Comprobar que existen los elementos necesarios
        if (!nombreInput || !btnSubmit) {
            return;
        }

        const nombre = nombreInput.value;

        // Mostrar el estado de envío
        btnSubmit.innerHTML =
            '<span>¡Enviando...!</span> ' +
            '<i class="fa-solid fa-spinner fa-spin"></i>';

        btnSubmit.style.pointerEvents = 'none';

        setTimeout(() => {
            // Mostrar confirmación visual
            btnSubmit.innerHTML =
                '<span>¡Mensaje Enviado!</span> ' +
                '<i class="fa-solid fa-circle-check"></i>';

            btnSubmit.style.background = '#10b981';

            setTimeout(() => {
                alert(
                    `¡Gracias ${nombre}! Tu mensaje ha sido procesado. ` +
                    'Te responderé muy pronto.'
                );

                contactForm.reset();

                // Restaurar el botón a su estado original
                btnSubmit.innerHTML =
                    '<span>Enviar Mensaje</span> ' +
                    '<i class="fa-solid fa-paper-plane"></i>';

                btnSubmit.style.background = '';
                btnSubmit.style.pointerEvents = 'all';
            }, 1000);
        }, 1200);
    });
});

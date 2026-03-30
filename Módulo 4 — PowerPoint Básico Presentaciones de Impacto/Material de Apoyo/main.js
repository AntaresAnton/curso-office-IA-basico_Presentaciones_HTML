/**
 * PRESENTATION ENGINE v3.0 (Atomic Design Compatible)
 * Características:
 * - Navegación por pasos (Scaffolding Learning)
 * - Renderizado de Mermaid.js
 * - Gamification (Confeti al final)
 * - Control por Teclado y Touch
 */

document.addEventListener('DOMContentLoaded', () => {
    Presentation.init();
});

const Presentation = {
    state: {
        currentSlide: 1,
        totalSlides: 0,
        currentStep: 0, // Pasos internos (bullets)
        isTransitioning: false
    },

    config: {
        slidePrefix: 'slide-',
        activeClass: 'active',
        stepClass: 'bullet-point', // La clase de tus items animados
        visibleClass: 'visible',
        logoClass: 'logo-overlay',
        centeredLogoClass: 'centered', // Para la portada
        progressBarId: 'progressBar'
    },

    init() {
        // 1. Contar Slides
        this.state.totalSlides = document.querySelectorAll('.slide').length;
        
        // 2. Inicializar Mermaid (Gráficos)
        this.initMermaid();

        // 3. Setup de Controles
        this.setupControls();

        // 4. Iniciar Vista
        this.updateView();

        console.log(`🚀 Presentación lista: ${this.state.totalSlides} slides.`);
    },

    initMermaid() {
        if (typeof mermaid !== 'undefined') {
            mermaid.initialize({
                startOnLoad: true,
                theme: 'base',
                themeVariables: {
                    primaryColor: '#583586', // Purple Main
                    primaryTextColor: '#fff',
                    primaryBorderColor: '#76b82a', // Green Main
                    lineColor: '#333',
                    secondaryColor: '#f4f4f4',
                    tertiaryColor: '#fff'
                }
            });
        }
    },

    setupControls() {
        // Teclado
        document.addEventListener('keydown', (e) => {
            if (['ArrowRight', ' ', 'Enter', 'PageDown'].includes(e.key)) {
                e.preventDefault();
                this.next();
            }
            if (['ArrowLeft', 'Backspace', 'PageUp'].includes(e.key)) {
                e.preventDefault();
                this.prev();
            }
            if (e.key === 'Home') this.goTo(1);
            if (e.key === 'End') this.goTo(this.state.totalSlides);
        });

        // Botones en pantalla (si existen)
        const btnNext = document.querySelector('.nav-btn[onclick*="next"]');
        const btnPrev = document.querySelector('.nav-btn[onclick*="prev"]');
        
        // Sobreescribir onclicks inline para usar nuestra lógica
        if(btnNext) btnNext.onclick = (e) => { e.preventDefault(); this.next(); };
        if(btnPrev) btnPrev.onclick = (e) => { e.preventDefault(); this.prev(); };
    },

    /**
     * LÓGICA CORE: AVANZAR
     * Mantiene la atención revelando información poco a poco.
     */
    next() {
        if (this.state.isTransitioning) return;

        const currentSlideEl = document.getElementById(`${this.config.slidePrefix}${this.state.currentSlide}`);
        const steps = currentSlideEl.querySelectorAll(`.${this.config.stepClass}`);

        // A. Si hay pasos ocultos en este slide, muestra el siguiente (Micro-avance)
        if (this.state.currentStep < steps.length) {
            const nextStep = steps[this.state.currentStep];
            
            // Animación de entrada
            requestAnimationFrame(() => {
                nextStep.classList.add(this.config.visibleClass);
                // Si el paso tiene un diagrama mermaid dentro, forzar renderizado si fuera necesario
                if(nextStep.querySelector('.mermaid')) {
                    mermaid.init(undefined, nextStep.querySelector('.mermaid'));
                }
            });
            
            this.state.currentStep++;
        } 
        // B. Si no hay más pasos, cambia de slide (Macro-avance)
        else {
            if (this.state.currentSlide < this.state.totalSlides) {
                this.goTo(this.state.currentSlide + 1);
            } else {
                // Recompensa final: Confeti si llegamos al último paso del último slide
                this.triggerConfetti();
            }
        }
    },

    /**
     * LÓGICA CORE: RETROCEDER
     */
    prev() {
        if (this.state.isTransitioning) return;

        // A. Si estamos en pasos intermedios, ocultamos el último (Deshacer)
        if (this.state.currentStep > 0) {
            const currentSlideEl = document.getElementById(`${this.config.slidePrefix}${this.state.currentSlide}`);
            const steps = currentSlideEl.querySelectorAll(`.${this.config.stepClass}`);
            
            this.state.currentStep--;
            steps[this.state.currentStep].classList.remove(this.config.visibleClass);
        } 
        // B. Si estamos al inicio del slide, volvemos al slide anterior
        else {
            if (this.state.currentSlide > 1) {
                this.goTo(this.state.currentSlide - 1, true); // true = ir al final del slide anterior
            }
        }
    },

    /**
     * CAMBIO DE DIAPOSITIVA
     */
    goTo(index, jumpToEnd = false) {
        this.state.isTransitioning = true;

        // 1. Gestionar clases Active
        document.querySelectorAll('.slide').forEach(s => s.classList.remove(this.config.activeClass));
        const nextSlideEl = document.getElementById(`${this.config.slidePrefix}${index}`);
        
        if (nextSlideEl) {
            nextSlideEl.classList.add(this.config.activeClass);
            this.state.currentSlide = index;

            // 2. Gestionar Pasos Internos (Bullets)
            const steps = nextSlideEl.querySelectorAll(`.${this.config.stepClass}`);
            if (jumpToEnd) {
                steps.forEach(s => s.classList.add(this.config.visibleClass));
                this.state.currentStep = steps.length;
            } else {
                steps.forEach(s => s.classList.remove(this.config.visibleClass));
                this.state.currentStep = 0;
            }

            // 3. Efectos Visuales
            this.updateUI();
        }

        setTimeout(() => this.state.isTransitioning = false, 500);
    },

    updateUI() {
        // A. Barra de Progreso
        const progress = ((this.state.currentSlide - 1) / (this.state.totalSlides - 1)) * 100;
        const bar = document.getElementById(this.config.progressBarId);
        if (bar) bar.style.width = `${progress}%`;

        // B. Logo Dinámico (Centrado en Portada vs Esquina en Contenido)
        const logo = document.querySelector(`.${this.config.logoClass}`);
        if (logo) {
            if (this.state.currentSlide === 1) {
                logo.classList.add(this.config.centeredLogoClass);
            } else {
                logo.classList.remove(this.config.centeredLogoClass);
            }
        }
    },

    /**
     * EFECTO CONFETI (Gamification)
     * Sin librerías externas pesadas.
     */
    triggerConfetti() {
        const colors = ['#583586', '#76b82a', '#9ccb3b', '#ffffff'];
        const confettiCount = 100;
        
        // Crear contenedor temporal
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '9999';
        document.body.appendChild(container);

        for (let i = 0; i < confettiCount; i++) {
            const el = document.createElement('div');
            el.style.position = 'absolute';
            el.style.width = Math.random() * 10 + 5 + 'px';
            el.style.height = Math.random() * 5 + 5 + 'px';
            el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            el.style.left = Math.random() * 100 + 'vw';
            el.style.top = '-10px';
            el.style.opacity = Math.random();
            el.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            // Animación CSS inyectada
            el.style.transition = `top ${Math.random() * 2 + 2}s ease-out, transform ${Math.random() * 2 + 2}s linear`;
            
            container.appendChild(el);

            // Disparar animación
            setTimeout(() => {
                el.style.top = '110vh';
                el.style.transform = `rotate(${Math.random() * 360 + 360}deg)`;
            }, 100);
        }

        // Limpieza
        setTimeout(() => {
            document.body.removeChild(container);
        }, 4000);
    }
};

// Exponer funciones globales para compatibilidad con onclick HTML
window.nextSlide = () => Presentation.next();
window.prevSlide = () => Presentation.prev();
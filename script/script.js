document.addEventListener('DOMContentLoaded', function() {
    const allVideoContainers = document.querySelectorAll('.videoJS');

    allVideoContainers.forEach(function(videoContainer) {
        const video = videoContainer.querySelector('video');
        const playButton = videoContainer.querySelector('.videoButtonJS');

        const closeButton = document.createElement('button');
        closeButton.className = 'info__video-close';
        closeButton.innerHTML = '×';
        closeButton.setAttribute('aria-label', 'Закрыть видео');
        videoContainer.appendChild(closeButton);

        video.removeAttribute('controls');

        function openFullscreen() {
            videoContainer.classList.add('fullscreen');
            video.setAttribute('controls', 'true');
            video.play();
            
            document.body.style.overflow = 'hidden';
        }

        function closeFullscreen() {
            videoContainer.classList.remove('fullscreen');
            video.removeAttribute('controls');
            video.pause();

            document.body.style.overflow = '';
        }

        playButton.addEventListener('click', function(e) {
            e.stopPropagation();
            openFullscreen();
        });

        videoContainer.addEventListener('click', function() {
            if (!videoContainer.classList.contains('fullscreen')) {
                openFullscreen();
            }
        });

        closeButton.addEventListener('click', function(e) {
            e.stopPropagation();
            closeFullscreen();
        });

        videoContainer.addEventListener('click', function(e) {
            if (videoContainer.classList.contains('fullscreen') && e.target === videoContainer) {
                closeFullscreen();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoContainer.classList.contains('fullscreen')) {
                closeFullscreen();
            }
        });
    });




    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        
        question.addEventListener('click', function() {
            const wasActive = item.classList.contains('active');

            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });




    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 'auto',
        spaceBetween: 25,
        freeMode: true,
        loop: true,
        navigation: {
            nextEl: ".swiper__button-next",
            prevEl: ".swiper__button-prev",
        },
        breakpoints: {
            800: {
                spaceBetween: 50,
            }
        }
    });



    $.fn.setCursorPosition = function(pos) {
    const el = $(this).get(0);
    if (el.setSelectionRange) {
        el.setSelectionRange(pos, pos);
    } else if (el.createTextRange) {
        const range = el.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
    return this;
    };

    $('input[type="tel"]')
    .mask('+7 (999) 999 99 99', { autoclear: false })
    .on('click', function(e) {
        const value = $(this).val();

        const clean = value.replace(/[^0-9]/g, '');

        if (clean.length <= 3) {
        e.preventDefault();
        $(this).setCursorPosition(6);
        }
    });



    const selectContainers = document.querySelectorAll('.bid__form-item-block-container');

    selectContainers.forEach((container, index) => {
        const block = container.querySelector('.bid__form-item-block');
        const select = container.querySelector('.bid__form-item-select');
        
        const hiddenInputId = `contact-method-${index}`;
        
        let hiddenInput = container.querySelector('input[type="hidden"]');
        if (!hiddenInput) {
            hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'contact_method';
            hiddenInput.id = hiddenInputId;
            container.appendChild(hiddenInput);
        }
        
        const initialText = block.querySelector('.bid__form-item-text-light');

        block.addEventListener('click', function(e) {
            e.stopPropagation();
            const isActive = select.classList.contains('active');
            
            closeAllSelects();
            
            if (!isActive) {
                select.classList.add('active');
                block.classList.add('active');
            } else {
                select.classList.remove('active');
                block.classList.remove('active');
            }
        });

        const selectItems = select.querySelectorAll('.bid__form-item-text');
        selectItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                const selectedText = this.textContent;
                const selectedValue = this.getAttribute('data-value');
                
                if (initialText && block.contains(initialText)) {
                    initialText.remove();
                }
                
                const existingSelected = block.querySelectorAll('.bid__form-item-text:not(.bid__form-item-text-light)');
                existingSelected.forEach(el => {
                    el.remove();
                });

                const newSelected = document.createElement('p');
                newSelected.className = 'bid__form-item-text';
                newSelected.textContent = selectedText;
                block.appendChild(newSelected);

                hiddenInput.value = selectedValue;
                console.log('Выбрано значение:', selectedValue); 

                select.classList.remove('active');
                block.classList.remove('active');
            });
        });

        document.addEventListener('click', function(e) {
            if (!container.contains(e.target)) {
                select.classList.remove('active');
                block.classList.remove('active');
            }
        });
    });
    

    function closeAllSelects() {
        document.querySelectorAll('.bid__form-item-select').forEach(sel => {
            sel.classList.remove('active');
        });
        document.querySelectorAll('.bid__form-item-block').forEach(bl => {
            bl.classList.remove('active');
        });
    }





    const popupProgram = document.querySelector('.popup__programJS');
    const openButtons = document.querySelectorAll('[data-popup="program"]');
    const closeButton = popupProgram?.querySelector('.popup__close');
    const body = document.querySelector('body')
    const opacite = document.querySelector('.opacite')

    openButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            popupProgram?.classList.add('active');
            body.classList.add('hidden')
            opacite.classList.add('active')
        });
    });

    closeButton?.addEventListener('click', () => {
        popupProgram?.classList.remove('active');
        body.classList.remove('hidden')
        opacite.classList.remove('active')
    });

    document.addEventListener('click', (e) => {
    const isPopupOpen = popupProgram.classList.contains('active');
    const isClickOutside = !popupProgram.contains(e.target) && !e.target.closest('[data-popup="program"]');
    
        if (isPopupOpen && isClickOutside) {
            popupProgram?.classList.remove('active');
            body.classList.remove('hidden');
            opacite.classList.remove('active');
        }
    });



    const popupBid = document.querySelector('.popup__bidJS');
    const openButtonsBid = document.querySelectorAll('[data-popup="bid"]');
    const closeButtonBid = popupBid?.querySelector('.popup__close');

    openButtonsBid.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            popupBid?.classList.add('active');
            body.classList.add('hidden')
            opacite.classList.add('active')
        });
    });

    closeButtonBid?.addEventListener('click', () => {
        popupBid?.classList.remove('active');
        body.classList.remove('hidden')
        opacite.classList.remove('active')
    });

    document.addEventListener('click', (e) => {
    const isPopupOpen = popupBid.classList.contains('active');
    const isClickOutside = !popupBid.contains(e.target) && !e.target.closest('[data-popup="bid"]');
    
        if (isPopupOpen && isClickOutside) {
            popupBid?.classList.remove('active');
            body.classList.remove('hidden');
            opacite.classList.remove('active');
        }
    });





    gsap.registerPlugin(ScrollTrigger)

    gsap.utils.toArray(".anim").forEach(elem => {
        gsap.fromTo(elem, 
            { opacity: 0, y: 20 }, 
            { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: "power2.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    });





    const menuButtons = {
        method: document.querySelector('.btn-method'),
        history: document.querySelector('.btn-history'),
        faq: document.querySelector('.btn-faq'),
        rate: document.querySelector('.btn-rate'),
        map: document.querySelector('.btn-map'),
        bid: document.querySelector('.btn-bid'),
    };

    const sections = {
        method: document.querySelector('.method__second'),
        history: document.querySelector('.history'),
        faq: document.querySelector('.faq'),
        rate: document.querySelector('.rate'),
        map: document.querySelector('.map'),
        bid: document.querySelector('.bid'),
    };

    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0; 

    for (const key in menuButtons) {
        menuButtons[key]?.addEventListener('click', () => {
            if (sections[key]) {
                const sectionTop = sections[key].getBoundingClientRect().top + window.pageYOffset;
                
                const offsetPosition = sectionTop - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }


    let lastScrollY = window.scrollY;
    const scrollThreshold = 100;

    function handleScroll() {
        if (window.innerWidth >= 800) return;
        
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
            header.style.transform = 'translateY(-100%)';
            header.style.transition = 'transform 1s ease';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    }

    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth >= 800) {
            header.style.transform = 'translateY(0)';
            header.style.transition = 'transform 0.3s ease';
        }
    });



});
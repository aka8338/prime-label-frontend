(function ($) {
    "use strict";
    /*=================================
        JS Index Here
    ==================================*/
    /*
    01. On Load Function
    02. Preloader
    03. Mobile Menu
    04. Sticky fix
    05. Scroll To Top
    06. Set Background Image Color & Mask
    07. Global Slider
    08. Ajax Contact Form
    09. Search Box Popup
    10. Popup Sidemenu
    11. Magnific Popup
    12. Section Position
    13. Filter
    14. Counter Up
    15. Shape Mockup
    16. Progress Bar Animation 
    17. Countdown
    18. Image to SVG Code
    00. Woocommerce Toggle
    00. Right Click Disable
    */
    /*=================================
        JS Index End
    ==================================*/
    /*
    
    /*---------- 01. On Load Function ----------*/
    $(window).on("load", function () {
        $(".preloader").fadeOut();
    });

    /*---------- 02. Preloader ----------*/
    $(document).on("click", ".preloaderCls", function (e) {
        e.preventDefault();
        $(".preloader").css("display", "none");
    });

    // $('select').niceSelect(); 
    if ($('.nice-select').length) {
        $('.nice-select').niceSelect();
    }

    /*---------- 03. Mobile Menu ----------*/
    $.fn.thmobilemenu = function (options) {
        var opt = $.extend({
            menuToggleBtn: ".th-menu-toggle",
            bodyToggleClass: "th-body-visible",
            subMenuClass: "th-submenu",
            subMenuParent: "menu-item-has-children",
            thSubMenuParent: "th-item-has-children",
            subMenuParentToggle: "th-active",
            meanExpandClass: "th-mean-expand",
            // appendElement: '<span class="th-mean-expand"></span>', 
            subMenuToggleClass: "th-open",
            toggleSpeed: 400,
        },
            options
        );

        return this.each(function () {
            var menu = $(this); // Select menu

            // Menu Show & Hide
            function menuToggle() {
                menu.toggleClass(opt.bodyToggleClass);

                // collapse submenu on menu hide or show
                var subMenu = "." + opt.subMenuClass;
                $(subMenu).each(function () {
                    if ($(this).hasClass(opt.subMenuToggleClass)) {
                        $(this).removeClass(opt.subMenuToggleClass);
                        $(this).css("display", "none");
                        $(this).parent().removeClass(opt.subMenuParentToggle);
                    }
                });
            }

            // Class Set Up for every submenu
            menu.find("." + opt.subMenuParent).each(function () {
                var submenu = $(this).find("ul");
                submenu.addClass(opt.subMenuClass);
                submenu.css("display", "none");
                $(this).addClass(opt.subMenuParent);
                $(this).addClass(opt.thSubMenuParent); // Add th-item-has-children class
                $(this).children("a").append(opt.appendElement);
            });

            // Toggle Submenu
            function toggleDropDown($element) {
                var submenu = $element.children("ul");
                if (submenu.length > 0) {
                    $element.toggleClass(opt.subMenuParentToggle);
                    submenu.slideToggle(opt.toggleSpeed);
                    submenu.toggleClass(opt.subMenuToggleClass);
                }
            }

            // Submenu toggle Button
            var itemHasChildren = "." + opt.thSubMenuParent + " > a";
            $(itemHasChildren).each(function () {
                $(this).on("click", function (e) {
                    e.preventDefault();
                    toggleDropDown($(this).parent());
                });
            });

            // Menu Show & Hide On Toggle Btn click
            $(opt.menuToggleBtn).each(function () {
                $(this).on("click", function () {
                    menuToggle();
                });
            });

            // Hide Menu On outside click
            menu.on("click", function (e) {
                e.stopPropagation();
                menuToggle();
            });

            // Stop Hide full menu on menu click
            menu.find("div").on("click", function (e) {
                e.stopPropagation();
            });
        });
    };


    $(".th-menu-wrapper").thmobilemenu();

    /*---------- 04. Sticky fix ----------*/
    $(window).scroll(function () {
        var topPos = $(this).scrollTop();
        if (topPos > 500) {
            $('.sticky-wrapper').addClass('sticky');
            $('.category-menu').addClass('close-category');
        } else {
            $('.sticky-wrapper').removeClass('sticky')
            $('.category-menu').removeClass('close-category');
        }
    })

    $(document).on("click", ".menu-expand", function (e) {
        e.preventDefault();
        $('.category-menu').toggleClass('open-category');
    });

    /*----------- One page Scroll Down ----------*/
    function onePageNav(element) {
        if ($(element).length > 0) {
            $(element).each(function () {
                var link = $(this).find('a');
                $(this).find(link).each(function () {
                    $(this).on('click', function () {
                        var target = $(this.getAttribute('href'));
                        if (target.length) {
                            event.preventDefault();
                            $('html, body').stop().animate({
                                scrollTop: target.offset().top - 10
                            }, 1000);
                        };

                    });
                });
            })
        }
    };
    onePageNav('.onepage-nav');
    onePageNav('.scroll-down');
    //one page sticky menu  
    $(window).on('scroll', function () {
        if ($('.onepage-nav').length > 0) { };
    });


    /*---------- 05. Scroll To Top ----------*/
    $(document).ready(function () {
        if ($('.scroll-top').length > 0) {
            var scrollTopbtn = $('.scroll-top')[0];
            var progressPath = $('.scroll-top path')[0];
            var pathLength = progressPath.getTotalLength();

            // Initialize stroke-dasharray and stroke-dashoffset for the progress path
            progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
            progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

            // Update the progress bar
            var updateProgress = function () {
                var scroll = $(window).scrollTop();
                var height = $(document).height() - $(window).height();
                var progress = pathLength - (scroll * pathLength / height);
                progressPath.style.strokeDashoffset = progress;
            };
            updateProgress();

            $(window).on('scroll', updateProgress);

            var offset = 50;
            var duration = 750;

            // Show the scroll-to-top button on scroll
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > offset) {
                    $(scrollTopbtn).addClass('show');
                } else {
                    $(scrollTopbtn).removeClass('show');
                }
            });

            // Click event to scroll to top
            $(scrollTopbtn).on('click', function (event) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: 0
                }, duration);
                return false;
            });
        }
    });


    /*---------- 06. Set Background Image Color & Mask ----------*/
    if ($("[data-bg-src]").length > 0) {
        $("[data-bg-src]").each(function () {
            var src = $(this).attr("data-bg-src");
            $(this).css("background-image", "url(" + src + ")");
            $(this).removeAttr("data-bg-src").addClass("background-image");
        });
    }

    if ($('[data-bg-color]').length > 0) {
        $('[data-bg-color]').each(function () {
            var color = $(this).attr('data-bg-color');
            $(this).css('background-color', color);
            $(this).removeAttr('data-bg-color');
        });
    };

    $('[data-border]').each(function () {
        var borderColor = $(this).data('border');
        $(this).css('--th-border-color', borderColor);
    });

    if ($('[data-mask-src]').length > 0) {
        $('[data-mask-src]').each(function () {
            var mask = $(this).attr('data-mask-src');
            $(this).css({
                'mask-image': 'url(' + mask + ')',
                '-webkit-mask-image': 'url(' + mask + ')'
            });
            $(this).addClass('bg-mask');
            $(this).removeAttr('data-mask-src');
        });
    };

    /*----------- 07. Global Slider ----------*/

    $('.th-slider').each(function () {
        var thSlider = $(this);
        var settings = $(this).data('slider-options');

        // Store references to the navigation Slider
        var prevArrow = thSlider.find('.slider-prev');
        var nextArrow = thSlider.find('.slider-next');
        var paginationElN = thSlider.find('.slider-pagination.pagi-number');
        var paginationExternel = thSlider.siblings('.slider-controller').find('.slider-pagination');

        var paginationEl = paginationExternel.length ? paginationExternel.get(0) : thSlider.find('.slider-pagination').get(0);

        var paginationType = settings['paginationType'] ? settings['paginationType'] : 'bullets';
        var autoplayconditon = settings['autoplay'];

        var sliderDefault = {
            slidesPerView: 1,
            spaceBetween: settings['spaceBetween'] || 24,
            loop: settings['loop'] !== false,
            speed: settings['speed'] || 1000,
            autoplay: autoplayconditon || {
                delay: 6000,
                disableOnInteraction: false
            },
            navigation: {
                nextEl: nextArrow.get(0),
                prevEl: prevArrow.get(0),
            },
            pagination: {
                el: paginationEl,
                type: paginationType,
                clickable: true,
                renderBullet: function (index, className) {
                    var number = index + 1;
                    var formattedNumber = number < 10 ? '0' + number : number;
                    if (paginationElN.length) {
                        return '<span class="' + className + ' number">' + formattedNumber + '</span>';
                    } else {
                        return '<span class="' + className + '" aria-label="Go to Slide ' + formattedNumber + '"></span>';
                    }
                },
                formatFractionCurrent: function (number) {
                    return number < 10 ? '0' + number : number;
                },
                formatFractionTotal: function (number) {
                    return number < 10 ? '0' + number : number;
                }
            },
            on: {
                slideChange: function () {
                    setTimeout(function () {
                        swiper.params.mousewheel.releaseOnEdges = false;
                    }, 500);
                },
                reachEnd: function () {
                    setTimeout(function () {
                        swiper.params.mousewheel.releaseOnEdges = true;
                    }, 750);
                }
            }
        };

        var options = JSON.parse(thSlider.attr('data-slider-options'));
        options = $.extend({}, sliderDefault, options);
        var swiper = new Swiper(thSlider.get(0), options); // Assign the swiper variable

        if ($('.slider-area').length > 0) {
            $('.slider-area').closest(".container").parent().addClass("arrow-wrap");
        }

        // Category slider specific wheel effect
        if (thSlider.hasClass('categorySlider')) {
            const multiplier = {
                translate: 0.1,
                rotate: 0.008
            };

            function calculateWheel() {
                const slides = document.querySelectorAll('.single');
                slides.forEach((slide) => {
                    const rect = slide.getBoundingClientRect();
                    const r = window.innerWidth * 0.5 - (rect.x + rect.width * 0.5);
                    let ty = Math.abs(r) * multiplier.translate - rect.width * multiplier.translate;

                    if (ty < 0) {
                        ty = 0;
                    }
                    const transformOrigin = r < 0 ? 'left top' : 'right top';
                    slide.style.transform = `translate(0, ${ty}px) rotate(${-r * multiplier.rotate}deg)`;
                    slide.style.transformOrigin = transformOrigin;
                });
            }

            function raf() {
                requestAnimationFrame(raf);
                calculateWheel();
            }

            raf();
        }
    });

    // Function to add animation classes
    function animationProperties() {
        $('[data-ani]').each(function () {
            var animationName = $(this).data('ani');
            $(this).addClass(animationName);
        });

        $('[data-ani-delay]').each(function () {
            var delayTime = $(this).data('ani-delay');
            $(this).css('animation-delay', delayTime);
        });
    }
    animationProperties();

    // Add click event handlers for external slider arrows based on data attributes
    $(document).on('click', '[data-slider-prev], [data-slider-next]', function () {
        var sliderSelector = $(this).data('slider-prev') || $(this).data('slider-next');
        var targetSlider = $(sliderSelector);

        if (targetSlider.length) {
            var swiper = targetSlider[0].swiper;

            if (swiper) {
                if ($(this).data('slider-prev')) {
                    swiper.slidePrev();
                } else {
                    swiper.slideNext();
                }
            }
        }
    });


    // Function to add animation classes
    function animationProperties() {
        $('[data-ani]').each(function () {
            var animationName = $(this).data('ani');
            $(this).addClass(animationName);
        });

        $('[data-ani-delay]').each(function () {
            var delayTime = $(this).data('ani-delay');
            $(this).css('animation-delay', delayTime);
        });
    }
    animationProperties();

    var swiper = new Swiper(".heroThumbs", {
        spaceBetween: 10,
        slidesPerView: 1,
        loop: true,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        navigation: {
            nextEl: '.slider-next',
            prevEl: '.slider-prev'
        },
    });

    var swiper = new Swiper('.hero-slider-2', {
        spaceBetween: 10,
        thumbs: {
            swiper: '.heroThumbs',
        },
        effect: "fade",
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        autoplay: {
            delay: 6000,
            disableOnInteraction: false
        },
        loop: true,
        watchSlidesProgress: true
    });

    /* hero-3  start */
    var swiper = new Swiper(".hero3Thumbs", {
        spaceBetween: 10,
        slidesPerView: 1,
        freeMode: true,
        watchSlidesProgress: true,
    });

    var swiper = new Swiper('.hero-slider-3', {
        thumbs: {
            swiper: swiper,
        },
        loop: true,
        effect: "fade",
        autoplay: {
            delay: 6000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
            formatFractionCurrent: function (number) {
                return '0' + number;
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });

    /* hero-3  end */

    /* hero-6  start */
    var swiper = new Swiper(".hero6Thumbs", {
        spaceBetween: 3,
        slidesPerView: 1,
        freeMode: true,
        watchSlidesProgress: true,
    });

    var swiper = new Swiper('.hero-slider-6', {
        thumbs: {
            swiper: swiper,
        },
        loop: true,
        effect: "fade",
        autoplay: {
            delay: 6000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
            formatFractionCurrent: function (number) {
                return '' + number;
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });

    /* hero-6  end */

    /* hero-6  start */
    var swiper = new Swiper(".hero6Thumbs", {
        spaceBetween: 3,
        slidesPerView: 1,
        freeMode: true,
        watchSlidesProgress: true,
    });

    var swiper = new Swiper('.hero-slider-6', {
        thumbs: {
            swiper: swiper,
        },
        loop: true,
        effect: "fade",
        autoplay: {
            delay: 6000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
            formatFractionCurrent: function (number) {
                return '' + number;
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });

    /* hero-6  end */
    /* hero-10  start */
    var swiper = new Swiper(".hero9Thumbs", {
        spaceBetween: 10,
        slidesPerView: 1,
        freeMode: true,
        watchSlidesProgress: true,
    });

    var swiper = new Swiper('.hero-slider-9', {
        thumbs: {
            swiper: swiper,
        },
        loop: true,
        effect: "fade",
        autoplay: {
            delay: 6000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
            formatFractionCurrent: function (number) {
                return '0' + number;
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });

    /* hero-3  end */

    /* hero-10  start */
    var swiper = new Swiper(".hero10Thumbs", {
        spaceBetween: 10,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesProgress: true,
    });

    var swiper = new Swiper('.hero-slider-10', {
        spaceBetween: 10,
        thumbs: {
            swiper: swiper,
        },
        effect: "fade",
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        autoplay: {
            delay: 6000,
            disableOnInteraction: false
        },
        loop: true,
        watchSlidesProgress: true
    });
    /* hero-10  end */

    // var swiperEl = document.querySelector('.swiper-container');

    // swiperEl.addEventListener('mouseenter', function(event) {
    document.addEventListener('mouseenter', event => {
        const el = event.target;
        if (el && el.matches && el.matches('.swiper-container')) {
            // console.log('mouseenter');
            // console.log('autoplay running', swiper.autoplay.running);
            el.swiper.autoplay.stop();
            el.classList.add('swiper-paused');

            const activeNavItem = el.querySelector('.swiper-pagination-bullet-active');
            activeNavItem.style.animationPlayState = "paused";
        }
    }, true);

    document.addEventListener('mouseleave', event => {
        // console.log('mouseleave', swiper.activeIndex, swiper.slides[swiper.activeIndex].progress);
        // console.log('autoplay running', swiper.autoplay.running);
        const el = event.target;
        if (el && el.matches && el.matches('.swiper-container')) {
            el.swiper.autoplay.start();
            el.classList.remove('swiper-paused');

            const activeNavItem = el.querySelector('.swiper-pagination-bullet-active');

            activeNavItem.classList.remove('swiper-pagination-bullet-active');
            // activeNavItem.style.animation = 'none';

            setTimeout(() => {
                activeNavItem.classList.add('swiper-pagination-bullet-active');
                // activeNavItem.style.animation = '';
            }, 10);
        }
    }, true);

    // /* category slider 6 start ---------------------*/
    // $('.categorySlider6').each(function () {
    //     const $this = $(this);
    //     const multiplier = {
    //         translate: 0.1,
    //         rotate: 0.0
    //     };

    //     const swiper = new Swiper(this, {
    //         slidesPerView: 5,
    //         spaceBetween: 30,
    //         centeredSlides: true,
    //         loop: true,
    //         loopedSlides: 5, // Ensures proper loop behavior
    //         grabCursor: true,
    //         pagination: {
    //             el: $this.find(".swiper-pagination")[0],
    //             type: "progressbar",
    //         },
    //         breakpoints: {
    //             300: { slidesPerView: 1, spaceBetween: 30 },
    //             575: { slidesPerView: 2, spaceBetween: 30 },
    //             1024: { slidesPerView: 3, spaceBetween: 30 },
    //             1200: { slidesPerView: 4, spaceBetween: 30 },
    //             1380: { slidesPerView: 5, spaceBetween: 30 }
    //         }
    //     });

    //     function calculateWheel() {
    //         const slides = $this.find('.single2').not('.swiper-slide-duplicate'); // Skip cloned slides
    //         slides.each(function () {
    //             const rect = this.getBoundingClientRect();
    //             const r = window.innerWidth * 0.5 - (rect.x + rect.width * 0.5);
    //             let ty = Math.abs(r) * multiplier.translate - rect.width * multiplier.translate;
    //             if (ty < 0) ty = 0;

    //             const transformOrigin = r < 0 ? 'left top' : 'right top';
    //             this.style.transform = `translate(0, ${ty}px) rotate(${-r * multiplier.rotate}deg)`;
    //             this.style.transformOrigin = transformOrigin;
    //         });
    //     }

    //     function raf() {
    //         requestAnimationFrame(raf);
    //         calculateWheel();
    //     }

    //     raf();
    // });



    /* category slider 2 end ---------------------*/

    $(document).ready(function () {
        /*-------------- 09. Custom service Slider -------------*/

        // Bind click event for .service-list-wrap with event delegation
        $(document).on('click', '.service-list-wrap', function () {
            $(this).addClass('active').siblings().removeClass('active');
        });

        // function showNextservice() {
        //     var $activeservice = $('.service-list-area .service-list-wrap.active');
        //     if ($activeservice.next().length > 0) {
        //         $activeservice.removeClass('active');
        //         $activeservice.next().addClass('active');
        //     } else {
        //         $activeservice.removeClass('active');
        //         $('.service-list-area .service-list-wrap:first').addClass('active');
        //     }
        // }

        // function showPreviousservice() {
        //     var $activeservice = $('.service-list-area .service-list-wrap.active');
        //     if ($activeservice.prev().length > 0) {
        //         $activeservice.removeClass('active');
        //         $activeservice.prev().addClass('active');
        //     } else {
        //         $activeservice.removeClass('active');
        //         $('.service-list-area .service-list-wrap:last').addClass('active');
        //     }
        // }

        // // Bind click event for .service-prev and .service-next using event delegation
        // $(document).on('click', '.service-prev', function () {
        //     showPreviousservice();
        // });

        // $(document).on('click', '.service-next', function () {
        //     showNextservice();
        // });

        // Accordion initial setup
        $('.accordion-item-wrapp li:first-child').addClass('active');
        $('.according-img-tab').hide();
        $('.according-img-tab:first').show();

        // Mouseenter event for .accordion-item-content (using delegation)
        $(document).on('mouseenter', '.accordion-item-wrapp .accordion-item-content', function () {
            $('.accordion-item-wrapp .accordion-item-content').removeClass('active');
            $('.according-img-tab').hide();

            var activeTab = $(this).find('.accordion-tab-item').attr('data-bs-target');
            $(activeTab).fadeIn();
            return false;
        });

        // Mouseover event for .hover-item (using delegation)
        $(document).on('mouseover', '.hover-item', function () {
            $(this).addClass('item-active');
            $('.hover-item').removeClass('item-active');
            $(this).addClass('item-active');
        });
    });


    $(document).ready(function () {
        // Function to add animation classes
        function animationProperties() {
            // Delegate animation class addition
            $(document).find('[data-ani]').each(function () {
                var animationName = $(this).data('ani');
                $(this).addClass(animationName);
            });

            // Delegate adding animation delay style
            $(document).find('[data-ani-delay]').each(function () {
                var delayTime = $(this).data('ani-delay');
                $(this).css('animation-delay', delayTime);
            });
        }
        animationProperties();

        // Add event delegation for slider arrows
        $(document).on('click', '[data-slider-prev], [data-slider-next]', function () {
            var sliderSelector = $(this).data('slider-prev') || $(this).data('slider-next');
            var targetSlider = $(sliderSelector);

            if (targetSlider.length) {
                var swiper = targetSlider[0].swiper;

                if (swiper) {
                    if ($(this).data('slider-prev')) {
                        swiper.slidePrev();
                    } else {
                        swiper.slideNext();
                    }
                }
            }
        });
    });


    /*-------------- 08. Slider Tab -------------*/
    $.fn.activateSliderThumbs = function (options) {
        var opt = $.extend({
            sliderTab: false,
            tabButton: ".tab-btn",
        }, options);

        return this.each(function () {
            var $container = $(this);
            var $thumbs = $container.find(opt.tabButton);
            var $line = $('<span class="indicator"></span>').appendTo($container);

            var sliderSelector = $container.data("slider-tab");
            var $slider = $(sliderSelector);
            var swiper = $slider[0].swiper;

            // Use event delegation for tab buttons
            $(document).on("click", opt.tabButton, function (e) {
                e.preventDefault();
                var clickedThumb = $(this);

                clickedThumb.addClass("active").siblings().removeClass("active");
                linePos(clickedThumb, $container);

                clickedThumb.prevAll(opt.tabButton).addClass('list-active');
                clickedThumb.nextAll(opt.tabButton).removeClass('list-active');

                if (opt.sliderTab) {
                    var slideIndex = clickedThumb.index();
                    swiper.slideTo(slideIndex);
                }
            });

            // Handle swiper slide change event
            if (opt.sliderTab) {
                swiper.on("slideChange", function () {
                    var activeIndex = swiper.realIndex;
                    var $activeThumb = $thumbs.eq(activeIndex);

                    $activeThumb.addClass("active").siblings().removeClass("active");
                    linePos($activeThumb, $container);

                    $activeThumb.prevAll(opt.tabButton).addClass('list-active');
                    $activeThumb.nextAll(opt.tabButton).removeClass('list-active');
                });

                // Set the initial active thumb and line position
                var initialSlideIndex = swiper.activeIndex;
                var $initialThumb = $thumbs.eq(initialSlideIndex);
                $initialThumb.addClass("active").siblings().removeClass("active");
                linePos($initialThumb, $container);

                $initialThumb.prevAll(opt.tabButton).addClass('list-active');
                $initialThumb.nextAll(opt.tabButton).removeClass('list-active');
            }

            // Function to set the position of the line indicator
            function linePos($activeThumb) {
                var thumbOffset = $activeThumb.position();
                var marginTop = parseInt($activeThumb.css('margin-top')) || 0;
                var marginLeft = parseInt($activeThumb.css('margin-left')) || 0;

                $line.css("--height-set", $activeThumb.outerHeight() + "px");
                $line.css("--width-set", $activeThumb.outerWidth() + "px");
                $line.css("--pos-y", thumbOffset.top + marginTop + "px");
                $line.css("--pos-x", thumbOffset.left + marginLeft + "px");
            }
        });
    };


    if ($(".product-thumb").length) {
        $(".product-thumb").activateSliderThumbs({
            sliderTab: true,
            tabButton: ".tab-btn",
        });
    }

    if ($(".team-thumb").length) {
        $(".team-thumb").activateSliderThumbs({
            sliderTab: true,
            tabButton: ".tab-btn",
        });
    }

    if ($(".testi-thumb").length) {
        $(".testi-thumb").activateSliderThumbs({
            sliderTab: true,
            tabButton: ".tab-btn",
        });
    }
    if ($(".testi-thumb2").length) {
        $(".testi-thumb2").activateSliderThumbs({
            sliderTab: true,
            tabButton: ".tab-btn",
        });
    }

    // case-study active
    var grid = $('.grid').isotope({
        itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
            // use outer width of grid-sizer for columnWidth
            columnWidth: '.grid-item'
        }
    })

    $('.case-menu').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        grid.isotope({ filter: filterValue });
    });

    //for portfolio menu active class
    $('.portfolio-menu button').on('click', function (event) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
    });

    $(".filter-active").imagesLoaded(function () {
        var $filter = ".filter-active",
            $filterItem = ".filter-item",
            $filterMenu = ".filter-menu-active";

        if ($($filter).length > 0) {
            var $grid = $($filter).isotope({
                itemSelector: $filterItem,
                filter: "*",
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: 1,
                },
            });

            // filter items on button click
            $($filterMenu).on("click", "button", function () {
                var filterValue = $(this).attr("data-filter");
                $grid.isotope({
                    filter: filterValue,
                });
            });

            // Menu Active Class
            $($filterMenu).on("click", "button", function (event) {
                event.preventDefault();
                $(this).addClass("active");
                $(this).siblings(".active").removeClass("active");
            });
        }
    });

    $(".masonary-active, .woocommerce-Reviews .comment-list").imagesLoaded(function () {
        var $filter = ".masonary-active, .woocommerce-Reviews .comment-list",
            $filterItem = ".filter-item, .woocommerce-Reviews .comment-list li";

        if ($($filter).length > 0) {
            $($filter).isotope({
                itemSelector: $filterItem,
                filter: "*",
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: 1,
                },
            });
        }
        $('[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
            $($filter).isotope({
                filter: "*",
            });
        });
    });

    /*----------- 08. Ajax Contact Form ----------*/
    var form = ".ajax-contact";
    var invalidCls = "is-invalid";
    var $email = '[name="email"]';
    var $validation =
        '[name="name"],[name="email"],[name="subject"],[name="number"],[name="message"]'; // Must be use (,) without any space
    var formMessages = $(".form-messages");

    function sendContact() {
        var formData = $(form).serialize();
        var valid;
        valid = validateContact();
        if (valid) {
            jQuery
                .ajax({
                    url: $(form).attr("action"),
                    data: formData,
                    type: "POST",
                })
                .done(function (response) {
                    // Make sure that the formMessages div has the 'success' class.
                    formMessages.removeClass("error");
                    formMessages.addClass("success");
                    // Set the message text.
                    formMessages.text(response);
                    // Clear the form.
                    $(
                        form +
                        ' input:not([type="submit"]),' +
                        form +
                        " textarea"
                    ).val("");
                })
                .fail(function (data) {
                    // Make sure that the formMessages div has the 'error' class.
                    formMessages.removeClass("success");
                    formMessages.addClass("error");
                    // Set the message text.
                    if (data.responseText !== "") {
                        formMessages.html(data.responseText);
                    } else {
                        formMessages.html(
                            "Oops! An error occured and your message could not be sent."
                        );
                    }
                });
        }
    }

    function validateContact() {
        var valid = true;
        var formInput;

        function unvalid($validation) {
            $validation = $validation.split(",");
            for (var i = 0; i < $validation.length; i++) {
                formInput = form + " " + $validation[i];
                if (!$(formInput).val()) {
                    $(formInput).addClass(invalidCls);
                    valid = false;
                } else {
                    $(formInput).removeClass(invalidCls);
                    valid = true;
                }
            }
        }
        unvalid($validation);

        if (
            !$($email).val() ||
            !$($email)
                .val()
                .match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
        ) {
            $($email).addClass(invalidCls);
            valid = false;
        } else {
            $($email).removeClass(invalidCls);
            valid = true;
        }
        return valid;
    }

    $(form).on("submit", function (element) {
        element.preventDefault();
        sendContact();
    });

    /*---------- 09. Search Box Popup ----------*/
    function popupSarchBox($searchBox, $searchOpen, $searchCls, $toggleCls) {
        // Delegate events for opening the search box
        $(document).on("click", $searchOpen, function (e) {
            e.preventDefault();
            $($searchBox).addClass($toggleCls);
        });

        // Delegate event for closing the search box when clicking outside
        $(document).on("click", function (e) {
            if (!$(e.target).closest($searchBox).length && !$(e.target).closest($searchOpen).length) {
                $($searchBox).removeClass($toggleCls);
            }
        });

        // Prevent the click inside the search box from closing it
        $(document).on("click", $searchBox + " form", function (e) {
            e.stopPropagation();
            $($searchBox).addClass($toggleCls);
        });

        // Delegate event for closing the search box on clicking close button
        $(document).on("click", $searchCls, function (e) {
            e.preventDefault();
            e.stopPropagation();
            $($searchBox).removeClass($toggleCls);
        });
    }

    // Call function
    popupSarchBox(".popup-search-box", ".searchBoxToggler", ".searchClose", "show");


    /*---------- 10. Popup Sidemenu ----------*/
    function popupSideMenu($sideMenu, $sideMenuOpen, $sideMenuCls, $toggleCls) {
        // Delegate event for opening the side menu
        $(document).on('click', $sideMenuOpen, function (e) {
            e.preventDefault();
            $($sideMenu).addClass($toggleCls);
        });

        // Delegate event for closing the side menu when clicking outside
        $(document).on('click', function (e) {
            if (!$(e.target).closest($sideMenu).length && !$(e.target).closest($sideMenuOpen).length) {
                $($sideMenu).removeClass($toggleCls);
            }
        });

        // Prevent closing side menu when clicking on side menu content
        $(document).on('click', $sideMenu + ' > div', function (e) {
            e.stopPropagation();
            $($sideMenu).addClass($toggleCls);
        });

        // Delegate event for closing the side menu
        $(document).on('click', $sideMenuCls, function (e) {
            e.preventDefault();
            e.stopPropagation();
            $($sideMenu).removeClass($toggleCls);
        });
    }

    // Call the function for the sidemenu
    popupSideMenu('.sidemenu-wrapper', '.sideMenuToggler', '.sideMenuCls', 'show');


    /*---------- 10. Popup Sidemenu ----------*/
    function popupSideMenu($sideMenu2, $sideMunuOpen2, $sideMenuCls2, $toggleCls2) {
        // Sidebar Popup
        $($sideMunuOpen2).on('click', function (e) {
            e.preventDefault();
            $($sideMenu2).addClass($toggleCls2);
        });
        $($sideMenu2).on('click', function (e) {
            e.stopPropagation();
            $($sideMenu2).removeClass($toggleCls2)
        });
        var sideMenuChild = $sideMenu2 + ' > div';
        $(sideMenuChild).on('click', function (e) {
            e.stopPropagation();
            $($sideMenu2).addClass($toggleCls2)
        });
        $($sideMenuCls2).on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $($sideMenu2).removeClass($toggleCls2);
        });
    };
    popupSideMenu('.shopping-cart', '.sideMenuToggler2', '.sideMenuCls', 'show');


    /*----------- Pricing-switch & Tab ----------*/
    $(document).ready(function () {
        var e = $("#filt-monthly"),
            d = $("#filt-yearly"),
            t = $("#switcher"),
            m = $("#monthly"),
            y = $("#yearly");

        if ($('.pricing-tabs').length) {
            // Using jQuery to bind click events to the elements
            e.on("click", function () {
                t.prop("checked", false);
                e.addClass("toggler--is-active");
                d.removeClass("toggler--is-active");
                m.removeClass("hide");
                y.addClass("hide");
            });

            d.on("click", function () {
                t.prop("checked", true);
                d.addClass("toggler--is-active");
                e.removeClass("toggler--is-active");
                m.addClass("hide");
                y.removeClass("hide");
            });

            t.on("click", function () {
                d.toggleClass("toggler--is-active");
                e.toggleClass("toggler--is-active");
                m.toggleClass("hide");
                y.toggleClass("hide");
            });
        }
    });


    /*----------- 11. Magnific Popup ----------*/
    /* magnificPopup img view */
    $(".popup-image").magnificPopup({
        type: "image",
        mainClass: 'mfp-zoom-in',
        removalDelay: 260,
        gallery: {
            enabled: true,
        },
    });

    /* magnificPopup video view */
    $(".popup-video").magnificPopup({
        type: "iframe",
    });

    /* magnificPopup video view */
    $(".popup-content").magnificPopup({
        type: "inline",
        midClick: true,
    });

    //Image Reveal Animation
    if ($('.th-anim').length) {
        gsap.registerPlugin(ScrollTrigger);
        let revealContainers = document.querySelectorAll(".th-anim");
        revealContainers.forEach((container) => {
            let image = container.querySelector("img");
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    toggleActions: "play none none none"
                }
            });
            tl.set(container, {
                autoAlpha: 1
            });
            tl.from(container, 1.5, {
                xPercent: -100,
                ease: Power2.out
            });
            tl.from(image, 1.5, {
                xPercent: 100,
                scale: 1.3,
                delay: -1.5,
                ease: Power2.out
            });
        });
    }

    // /*----------- Slider Drag Cursor ----------*/
    const cursor = document.querySelector(".slider-drag-cursor");
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 1;

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");

    window.addEventListener("pointermove", e => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    gsap.ticker.add(() => {
        const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
        pos.x += (mouse.x - pos.x) * dt;
        pos.y += (mouse.y - pos.y) * dt;
        xSet(pos.x);
        ySet(pos.y);
    });

    // Use event delegation and .on() for better performance
    $(document).on("mouseenter", ".slider-drag-wrap", function () {
        $('.slider-drag-cursor').addClass('active');
    }).on("mouseleave", ".slider-drag-wrap", function () {
        $('.slider-drag-cursor').removeClass('active');
    });

    $(document).on("mouseenter", ".slider-drag-wrap a, .slider-drag-wrap .slider-pagination", function () {
        $('.slider-drag-cursor').removeClass('active');
    }).on("mouseleave", ".slider-drag-wrap a, .slider-drag-wrap .slider-pagination", function () {
        $('.slider-drag-cursor').addClass('active');
    });

    /* cursor area end */

    /*---------- 12. Section Position ----------*/
    // Interger Converter
    function convertInteger(str) {
        return parseInt(str, 10);
    }

    $.fn.sectionPosition = function (mainAttr, posAttr) {
        $(this).each(function () {
            var section = $(this);

            function setPosition() {
                var sectionHeight = Math.floor(section.height() / 2), // Main Height of section
                    posData = section.attr(mainAttr), // where to position
                    posFor = section.attr(posAttr), // On Which section is for positioning
                    topMark = "top-half", // Pos top
                    bottomMark = "bottom-half", // Pos Bottom
                    parentPT = convertInteger($(posFor).css("padding-top")), // Default Padding of  parent
                    parentPB = convertInteger($(posFor).css("padding-bottom")); // Default Padding of  parent

                if (posData === topMark) {
                    $(posFor).css(
                        "padding-bottom",
                        parentPB + sectionHeight + "px"
                    );
                    section.css("margin-top", "-" + sectionHeight + "px");
                } else if (posData === bottomMark) {
                    $(posFor).css(
                        "padding-top",
                        parentPT + sectionHeight + "px"
                    );
                    section.css("margin-bottom", "-" + sectionHeight + "px");
                }
            }
            setPosition(); // Set Padding On Load
        });
    };

    var postionHandler = "[data-sec-pos]";
    if ($(postionHandler).length) {
        $(postionHandler).imagesLoaded(function () {
            $(postionHandler).sectionPosition("data-sec-pos", "data-pos-for");
        });
    }

    /*---------- 22. Circle Progress ----------*/
    function animateElements() {
        $('.feature-circle .progressbar').each(function () {
            var pathColor = $(this).attr('data-path-color');
            var elementPos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            var percent = $(this).find('.circle').attr('data-percent');
            var percentage = parseInt(percent, 10) / parseInt(100, 10);
            var animate = $(this).data('animate');
            if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
                $(this).data('animate', true);
                $(this).find('.circle').circleProgress({
                    startAngle: -Math.PI / 2,
                    value: percent / 100,
                    size: 100,
                    thickness: 8,
                    emptyFill: "#E4E4E4",
                    lineCap: 'round',
                    fill: {
                        color: pathColor,
                    }
                }).on('circle-animation-progress', function (event, progress, stepValue) {
                    $(this).find('.circle-num').text((stepValue * 100).toFixed(0) + "%");
                }).stop();
            }
        });

        $('.about-circle .progressbar').each(function () {
            var elementPos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            var percent = $(this).find('.circle').attr('data-percent');
            var percentage = parseInt(percent, 10) / parseInt(100, 10);
            var animate = $(this).data('animate');
            if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
                $(this).data('animate', true);
                $(this).find('.circle').circleProgress({
                    startAngle: -Math.PI / 2,
                    value: percent / 100,
                    size: 160,
                    thickness: 6,
                    emptyFill: "#ffffff33",
                    lineCap: 'round',
                    fill: {
                        gradient: ["#0B59DB", "#0B59DB"]
                    }
                }).on('circle-animation-progress', function (event, progress, stepValue) {
                    $(this).find('.circle-num').text((stepValue * 100).toFixed(0) + "%");
                }).stop();
            }
        });
    }


    // Show animated elements
    animateElements();
    $(window).scroll(animateElements);

    /*----------- 15. Filter ----------*/
    $(document).ready(function () {
        // Using imagesLoaded for proper filtering initialization
        $(".filter-active").imagesLoaded(function () {
            var $filter = $(".filter-active"),
                $filterItem = ".filter-item",
                $filterMenu = ".filter-menu-active";

            if ($filter.length > 0) {
                var $grid = $filter.isotope({
                    itemSelector: $filterItem,
                    filter: "*",
                    masonry: {
                        columnWidth: 1,
                    },
                });

                // Filter items on button click using delegated event
                $($filterMenu).on("click", "button", function () {
                    var filterValue = $(this).attr("data-filter");
                    $grid.isotope({
                        filter: filterValue,
                    });
                });

                // Menu Active Class management with event delegation
                $($filterMenu).on("click", "button", function (event) {
                    event.preventDefault();
                    $(this).addClass("active").siblings(".active").removeClass("active");
                });
            }
        });

        // Initialize masonary grid with imagesLoaded for better performance
        $(".masonary-active").imagesLoaded(function () {
            var $filter = $(".masonary-active"),
                $filterItem = ".filter-item";

            if ($filter.length > 0) {
                $filter.isotope({
                    itemSelector: $filterItem,
                    filter: "*",
                    masonry: {
                        columnWidth: 1,
                    },
                });
            }
        });

        // Handling multiple grids with imagesLoaded for masonry and WooCommerce reviews
        $(".masonary-active, .woocommerce-Reviews .comment-list").imagesLoaded(function () {
            var $filter = $(".masonary-active, .woocommerce-Reviews .comment-list"),
                $filterItem = ".filter-item, .woocommerce-Reviews .comment-list li";

            if ($filter.length > 0) {
                $filter.isotope({
                    itemSelector: $filterItem,
                    filter: "*",
                    masonry: {
                        columnWidth: 1,
                    },
                });
            }

            // Event binding for Bootstrap tab shown event
            $('[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
                $filter.isotope({
                    filter: "*",
                });
            });
        });
    });


    /*----------- 14. Counter Up ----------*/
    $(".counter-number").counterUp({
        delay: 10,
        time: 1000,
    });

    /*----------- 15. Shape Mockup ----------*/
    $.fn.shapeMockup = function () {
        var $shape = $(this);
        $shape.each(function () {
            var $currentShape = $(this),
                shapeTop = $currentShape.data("top"),
                shapeRight = $currentShape.data("right"),
                shapeBottom = $currentShape.data("bottom"),
                shapeLeft = $currentShape.data("left");
            $currentShape
                .css({
                    top: shapeTop,
                    right: shapeRight,
                    bottom: shapeBottom,
                    left: shapeLeft,
                })
                .removeAttr("data-top")
                .removeAttr("data-right")
                .removeAttr("data-bottom")
                .removeAttr("data-left")
                .parent()
                .addClass("shape-mockup-wrap");
        });
    };

    if ($(".shape-mockup")) {
        $(".shape-mockup").shapeMockup();
    }

    /*----------- 16. Progress Bar Animation ----------*/
    $('.progress-bar').waypoint(function () {
        $('.progress-bar').css({
            animation: "animate-positive 1.8s",
            opacity: "1"
        });
    }, {
        offset: '75%'
    });

    /*----------- 17. Countdown ----------*/

    $.fn.countdown = function () {
        $(this).each(function () {
            var $counter = $(this),
                countDownDate = new Date($counter.data("offer-date")).getTime(), // Set the date we're counting down toz
                exprireCls = "expired";

            // Finding Function
            function s$(element) {
                return $counter.find(element);
            }

            // Update the count down every 1 second
            var counter = setInterval(function () {
                // Get today's date and time
                var now = new Date().getTime();

                // Find the distance between now and the count down date
                var distance = countDownDate - now;

                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor(
                    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                var minutes = Math.floor(
                    (distance % (1000 * 60 * 60)) / (1000 * 60)
                );
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Check If value is lower than ten, so add zero before number
                days < 10 ? (days = "0" + days) : null;
                hours < 10 ? (hours = "0" + hours) : null;
                minutes < 10 ? (minutes = "0" + minutes) : null;
                seconds < 10 ? (seconds = "0" + seconds) : null;

                // If the count down is over, write some text
                if (distance < 0) {
                    clearInterval(counter);
                    $counter.addClass(exprireCls);
                    $counter.find(".message").css("display", "block");
                } else {
                    // Output the result in elements
                    s$(".day").html(days);
                    s$(".hour").html(hours);
                    s$(".minute").html(minutes);
                    s$(".seconds").html(seconds);
                }
            }, 1000);
        });
    };

    if ($(".counter-list").length) {
        $(".counter-list").countdown();
    }

    /* ==================================================
#  Load More 
===============================================*/

    $(document).ready(function () {
        // Initially show the first 4 items
        $(".faq-area").slice(0, 4).show();

        // Use event delegation for better event handling on the #loadMore button
        $(document).on("click", "#loadMore", function (e) {
            e.preventDefault();

            // Show the next 3 hidden content elements
            $(".loadcontent:hidden").slice(0, 3).slideDown();

            // If there are no more hidden elements, update the button text
            if ($(".loadcontent:hidden").length === 0) {
                $("#loadMore").text("No Content").addClass("noContent").prop("disabled", true); // Optional: disable button when no content is left
            }
        });
    });


    /*----------- 21. Price Slider ----------*/
    $(".price_slider").slider({
        range: true,
        min: 0,
        max: 100,
        values: [0, 30],
        slide: function (event, ui) {
            $(".from").text("$" + ui.values[0]);
            $(".to").text("$" + ui.values[1]);
        }
    });
    $(".from").text("$" + $(".price_slider").slider("values", 0));
    $(".to").text("$" + $(".price_slider").slider("values", 1));



    /*---------- 18. Image to SVG Code ----------*/
    const cache = {};

    $.fn.inlineSvg = function fnInlineSvg() {
        this.each(imgToSvg);

        return this;
    };

    function imgToSvg() {
        const $img = $(this);
        const src = $img.attr("src");

        // fill cache by src with promise
        if (!cache[src]) {
            const d = $.Deferred();
            $.get(src, (data) => {
                d.resolve($(data).find("svg"));
            });
            cache[src] = d.promise();
        }

        // replace img with svg when cached promise resolves
        cache[src].then((svg) => {
            const $svg = $(svg).clone();

            if ($img.attr("id")) $svg.attr("id", $img.attr("id"));
            if ($img.attr("class")) $svg.attr("class", $img.attr("class"));
            if ($img.attr("style")) $svg.attr("style", $img.attr("style"));

            if ($img.attr("width")) {
                $svg.attr("width", $img.attr("width"));
                if (!$img.attr("height")) $svg.removeAttr("height");
            }
            if ($img.attr("height")) {
                $svg.attr("height", $img.attr("height"));
                if (!$img.attr("width")) $svg.removeAttr("width");
            }

            $svg.insertAfter($img);
            $img.trigger("svgInlined", $svg[0]);
            $img.remove();
        });
    }

    $(".svg-img").inlineSvg();


    //Image Reveal Animation
    if ($('.th-anim').length) {
        gsap.registerPlugin(ScrollTrigger);
        let revealContainers = document.querySelectorAll(".th-anim");
        revealContainers.forEach((container) => {
            let image = container.querySelector("img");
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    toggleActions: "play none none none"
                }
            });
            tl.set(container, {
                autoAlpha: 1
            });
            tl.from(container, 1.5, {
                xPercent: -100,
                ease: Power2.out
            });
            tl.from(image, 1.5, {
                xPercent: 100,
                scale: 1.3,
                delay: -1.5,
                ease: Power2.out
            });
        });
    }

    /************lettering js***********/
    function injector(t, splitter, klass, after) {
        var a = t.text().split(splitter),
            inject = '';
        if (a.length) {
            $(a).each(function (i, item) {
                inject += '<span class="' + klass + (i + 1) + '">' + item + '</span>' + after;
            });
            t.empty().append(inject);
        }
    }

    var methods = {
        init: function () {

            return this.each(function () {
                injector($(this), '', 'char', '');
            });

        },

        words: function () {

            return this.each(function () {
                injector($(this), ' ', 'word', ' ');
            });

        },

        lines: function () {

            return this.each(function () {
                var r = "eefec303079ad17405c889e092e105b0";
                // Because it's hard to split a <br/> tag consistently across browsers,
                // (*ahem* IE *ahem*), we replaces all <br/> instances with an md5 hash 
                // (of the word "split").  If you're trying to use this plugin on that 
                // md5 hash string, it will fail because you're being ridiculous.
                injector($(this).children("br").replaceWith(r).end(), r, 'line', '');
            });

        }
    };

    $.fn.lettering = function (method) {
        // Method calling logic
        if (method && methods[method]) {
            return methods[method].apply(this, [].slice.call(arguments, 1));
        } else if (method === 'letters' || !method) {
            return methods.init.apply(this, [].slice.call(arguments, 0)); // always pass an array
        }
        $.error('Method ' + method + ' does not exist on jQuery.lettering');
        return this;
    };

    $(".discount-anime").lettering();


    /*----------- 00. Woocommerce Toggle ----------*/
    // Ship To Different Address
    $(document).on("change", "#ship-to-different-address-checkbox", function () {
        if ($(this).is(":checked")) {
            $("#ship-to-different-address")
                .next(".shipping_address")
                .slideDown();
        } else {
            $("#ship-to-different-address").next(".shipping_address").slideUp();
        }
    });

    // Login Toggle
    $(document).on("click", ".woocommerce-form-login-toggle a", function (e) {
        e.preventDefault();
        $(".woocommerce-form-login").slideToggle();
    });

    // Coupon Toggle
    $(document).on("click", ".woocommerce-form-coupon-toggle a", function (e) {
        e.preventDefault();
        $(".woocommerce-form-coupon").slideToggle();
    });

    // Woocommerce Shipping Method
    $(document).on("click", ".shipping-calculator-button", function (e) {
        e.preventDefault();
        $(this).next(".shipping-calculator-form").slideToggle();
    });

    // Woocommerce Payment Toggle
    $(document).on("change", '.wc_payment_methods input[type="radio"]', function () {
        $(".payment_box").slideUp();
        $(this).siblings(".payment_box").slideDown();
    });

    // Woocommerce Rating Toggle
    $(document).on("click", ".rating-select .stars a", function (e) {
        e.preventDefault();
        $(this).siblings().removeClass("active");
        $(this).parent().parent().addClass("selected");
        $(this).addClass("active");
    });

    // Quantity Plus Minus ---------------------------
    $(document).on("click", ".quantity-plus", function (e) {
        e.preventDefault();
        var $qty = $(this).siblings(".qty-input");
        var currentVal = parseInt($qty.val(), 10);
        if (!isNaN(currentVal)) {
            $qty.val(currentVal + 1);
        }
    });

    $(document).on("click", ".quantity-minus", function (e) {
        e.preventDefault();
        var $qty = $(this).siblings(".qty-input");
        var currentVal = parseInt($qty.val(), 10);
        if (!isNaN(currentVal) && currentVal > 1) {
            $qty.val(currentVal - 1);
        }
    });


    // /*----------- 00. Right Click Disable ----------*/ 
    //   window.addEventListener('contextmenu', function (e) {
    //     // do something here...
    //     e.preventDefault();  
    //   }, false);  

    // /*----------- 00. Inspect Element Disable ----------*/   
    //   document.onkeydown = function (e) {   
    //     if (event.keyCode == 123) {  
    //       return false;
    //     }
    //     if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
    //       return false;
    //     }
    //     if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
    //       return false;
    //     }
    //     if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
    //       return false;
    //     }
    //     if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {  
    //       return false;
    //     } 
    //   }   

})(jQuery);
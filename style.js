document.addEventListener("DOMContentLoaded", function () {

    const header = document.querySelector(".transparent-header");
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".menu-link");
    const toggler = document.querySelector(".navbar-toggler");
    const navbarMenu = document.querySelector("#navbarMenu");

    // Animate hamburger icon into an X when the mobile menu opens/closes
    if (toggler) {
        toggler.addEventListener("click", function () {
            toggler.classList.toggle("active");
        });
    }

    // Keep the icon in sync if the menu is closed by other means
    // (nav link click, outside click, or Bootstrap's own collapse events)
    if (navbarMenu) {
        $(navbarMenu).on("hidden.bs.collapse shown.bs.collapse", function (e) {
            if (!toggler) return;
            const isOpen = navbarMenu.classList.contains("show");
            toggler.classList.toggle("active", isOpen);
            toggler.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
    }

    // Gentle scroll-reveal for premium section entrances
    const revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealEls.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealEls.forEach((el) => revealObserver.observe(el));
    } else {
        // Fallback: no IntersectionObserver support, just show everything
        revealEls.forEach((el) => el.classList.add("in-view"));
    }

    // Header background change
    function updateHeader() {

        let scrollPosition = window.scrollY + 100;

        sections.forEach(section => {

            let sectionTop = section.offsetTop;
            let sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {

                if (section.id === "home-section") {
                    header.classList.remove("scrolled");
                } 
                else {
                    header.classList.add("scrolled");
                }

            }

        });

    }


    // Active menu highlight
    function activeMenu() {

        let scrollPosition = window.scrollY + 200;

        sections.forEach(section => {

            if (
                scrollPosition >= section.offsetTop &&
                scrollPosition < section.offsetTop + section.offsetHeight
            ) {

                let id = section.getAttribute("id");

                navLinks.forEach(link => {

                    link.classList.remove("active");

                    if (link.getAttribute("href") === "#" + id) {
                        link.classList.add("active");
                    }

                });

            }

        });

    }


    // Mobile menu close after click
    navLinks.forEach(link => {

        link.addEventListener("click", function () {

            let navbar = document.querySelector("#navbarMenu");

            if (navbar.classList.contains("show")) {

                $(".navbar-collapse").collapse("hide");

            }

        });

    });



    // Close mobile menu when clicking outside
    document.addEventListener("click", function(event){

        let navbar = document.querySelector("#navbarMenu");
        let button = document.querySelector(".navbar-toggler");

        if(
            navbar.classList.contains("show") &&
            !navbar.contains(event.target) &&
            !button.contains(event.target)
        ){

            $(".navbar-collapse").collapse("hide");

        }

    });



    window.addEventListener("scroll", function(){

        updateHeader();
        activeMenu();

    });



    updateHeader();
    activeMenu();

});

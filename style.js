document.addEventListener("DOMContentLoaded", function () {

    const header = document.querySelector(".transparent-header");
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".menu-link");

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
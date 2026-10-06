document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            navLinks.classList.toggle("active");

            const isOpen =
                navLinks.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

        });


        /* Close menu when a link is clicked */

        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }



    /* =====================================================
       DARK / LIGHT MODE
    ===================================================== */

    const themeToggle =
        document.getElementById("themeToggle");

    const themeIcon =
        document.getElementById("themeIcon");


    /* Restore saved mode */

    const savedTheme =
        localStorage.getItem("theme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

    } else {

        document.body.classList.remove("dark-mode");

    }


    /* Update button */

    function updateThemeButton() {

        if (!themeToggle) {
            return;
        }


        if (document.body.classList.contains("dark-mode")) {

            if (themeIcon) {
                themeIcon.textContent = "☀";
            }

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to light mode"
            );

        } else {

            if (themeIcon) {
                themeIcon.textContent = "☾";
            }

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to dark mode"
            );

        }

    }


    updateThemeButton();


    /* Toggle theme */

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            function () {

                document.body.classList.toggle(
                    "dark-mode"
                );


                const isDark =
                    document.body.classList.contains(
                        "dark-mode"
                    );


                localStorage.setItem(
                    "theme",
                    isDark ? "dark" : "light"
                );


                updateThemeButton();

            }
        );

    }



    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElement =
        document.getElementById("year");


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }



    /* =====================================================
       ABOUT PAGE
       WHAT I DO / PROFILE CARDS
    ===================================================== */

    const profilePanel =
        document.getElementById("profilePanel");

    const closePanel =
        document.getElementById("closePanel");

    const profileCards =
        document.querySelectorAll(".profile-card");

    const profileInfo =
        document.querySelectorAll(".profile-info");


    /*
       Hide all profile information initially.
       This makes sure no profile appears inside
       the popup before a card is selected.
    */

    profileInfo.forEach(function (info) {

        info.style.display = "none";

    });


    /*
       OPEN PROFILE
    */

    function openProfile(profileName) {

        if (!profilePanel || !profileName) {
            return;
        }


        /* Hide all profiles */

        profileInfo.forEach(function (info) {

            info.style.display = "none";

        });


        /* Find selected profile */

        const selectedProfile =
            document.getElementById(profileName);


        if (!selectedProfile) {
            return;
        }


        /* Show selected profile */

        selectedProfile.style.display = "block";


        /* Open popup */

        profilePanel.classList.add("active");


        /* Prevent background scrolling */

        document.body.style.overflow = "hidden";

    }


    /*
       CLOSE PROFILE
    */

    function closeProfile() {

        if (!profilePanel) {
            return;
        }


        profilePanel.classList.remove("active");


        /* Restore page scrolling */

        document.body.style.overflow = "";

    }


    /*
       CARD CLICK
       Works on desktop AND mobile.
    */

    profileCards.forEach(function (card) {

        card.addEventListener("click", function () {

            const profileName =
                card.getAttribute("data-profile");

            openProfile(profileName);

        });

    });


    /*
       CLOSE BUTTON
    */

    if (closePanel) {

        closePanel.addEventListener(
            "click",
            function () {

                closeProfile();

            }
        );

    }


    /*
       CLICK OUTSIDE PANEL TO CLOSE
    */

    if (profilePanel) {

        profilePanel.addEventListener(
            "click",
            function (event) {

                if (event.target === profilePanel) {

                    closeProfile();

                }

            }
        );

    }


    /*
       ESCAPE KEY
       Useful on computers.
    */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                profilePanel &&
                profilePanel.classList.contains("active")
            ) {

                closeProfile();

            }

        }
    );

});
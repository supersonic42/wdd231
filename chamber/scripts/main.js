fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementsByTagName('header')[0].innerHTML = data;

        document.getElementById("menu-toggle").addEventListener("click", () => {
            document.getElementById("nav").classList.toggle("open");
        });

        const currentPath = window.location.pathname.split('/').pop();
        const menuLinks = document.querySelectorAll('nav li a');

        menuLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            const li = link.closest('li');

            if (linkPath === currentPath || (linkPath === 'index.html' && currentPath === '')) {
                li.classList.add('active');
            }
        });
    });

fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementsByTagName('footer')[0].innerHTML = data;

        const today = new Date();
        const currentyear = document.querySelector("#currentyear");
        const lastModified = document.querySelector("#lastModified");

        currentyear.innerHTML = today.getFullYear();
        lastModified.innerHTML = 'Last Update: ' + document.lastModified;

        showVisitMessageInFooter();
    });

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function showVisitMessageInFooter() {
    const now = Date.now();
    const lastVisit = localStorage.getItem("lastVisit");
    let message = "";

    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const diffMs = now - parseInt(lastVisit, 10);
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            message = "Back so soon! Awesome!";
        } else if (diffDays === 1) {
            message = "You last visited 1 day ago.";
        } else {
            message = `You last visited ${diffDays} days ago.`;
        }
    }

    localStorage.setItem("lastVisit", now.toString());

    const footer = document.querySelector("footer");
    if (footer) {
        const msg = document.createElement("p");
        msg.classList.add('footer-visit-msg')
        msg.textContent = message;
        footer.appendChild(msg);
    }
}

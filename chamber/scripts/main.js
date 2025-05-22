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
    });

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// main.js
import { places } from './places.mjs';

const container = document.getElementById('cards-container');

places.forEach(place => {
    const card = document.createElement('div');
    card.classList.add('place-card');

    const title = document.createElement('h2');
    title.textContent = place.name;

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = place.photo;
    img.alt = place.name;
    figure.appendChild(img);

    const address = document.createElement('address');
    address.textContent = place.address;

    const description = document.createElement('p');
    description.textContent = place.description;

    const button = document.createElement('button');
    button.textContent = 'Learn more';

    const infoWrapper = document.createElement('div');
    infoWrapper.classList.add('info');
    infoWrapper.append(title, address, description, button);
    card.append(figure, infoWrapper);

    container.appendChild(card);
});

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

showVisitMessageInFooter();

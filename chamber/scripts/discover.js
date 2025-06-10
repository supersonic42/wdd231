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

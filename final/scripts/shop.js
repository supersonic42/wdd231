import { products } from './products.js';

const grid = document.querySelector('.shop-grid');

async function renderProducts() {
    try {
        await new Promise(resolve => setTimeout(resolve, 0));

        const sortedProducts = [...products].sort((a, b) => {
            if (b.year !== a.year) {
                return b.year - a.year;
            }
            return a.title.localeCompare(b.title); // if same year, sort alphabetically
        });

        sortedProducts.forEach(product => {
            const item = document.createElement('div');
            item.className = 'shop-item';

            item.innerHTML = `
                <img src="${product.image}" alt="${product.title}" loading="lazy">
                <div class="item-info">
                <h3>${product.title}</h3>
                <p class="year">${product.year}</p>
                <p class="desc">${product.description}</p>
                </div>
            `;

            grid.appendChild(item);
        });
    } catch (error) {
        console.error('Failed to render products:', error);
        grid.innerHTML = '<p>Sorry, failed to load products. Please try again later.</p>';
    }
}

renderProducts();

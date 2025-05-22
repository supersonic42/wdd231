loadMembers();

document.addEventListener('DOMContentLoaded', function () {
  const layoutLinks = document.querySelectorAll('.layout-selector a');
  const cardsSection = document.querySelector('.business-cards');

  layoutLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      layoutLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      const layout = this.classList.contains('grid') ? 'grid' : 'column';
      cardsSection.className = 'business-cards business-cards-' + layout;
    });
  });
});

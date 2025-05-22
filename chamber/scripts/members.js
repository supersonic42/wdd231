async function loadMembers(memberNumber = null, memberships = null, randomize = false) {
  const response = await fetch('./data/members.json');
  let members = await response.json();

  // Filter by membership
  if (Array.isArray(memberships)) {
    members = members.filter(member =>
      memberships.includes(member.membership)
    );
  }

  if (randomize)
  {
    shuffleArray(members);
  }

  const membersToShow = memberNumber !== null
    ? members.slice(0, memberNumber)
    : members;

  membersToShow.forEach(member => createBusinessCard(member));
}

function createBusinessCard(data) {
  const container = document.querySelector('.business-cards');

  const card = document.createElement('div');
  card.className = 'business-card';

  const header = document.createElement('div');
  header.className = 'business-card-header';

  const name = document.createElement('h3');
  name.textContent = data.name;

  const tagline = document.createElement('p');
  tagline.className = 'business-card-tagline';
  tagline.textContent = data.tagline || '';

  header.appendChild(name);
  header.appendChild(tagline);

  const hr = document.createElement('hr');

  const body = document.createElement('div');
  body.className = 'business-card-body';

  const logo = document.createElement('div');
  logo.className = 'business-card-logo';

  const img = document.createElement('img');
  img.src = `images/members/${data.logo}`;
  img.alt = `${data.name} Logo`;

  logo.appendChild(img);

  const contact = document.createElement('div');
  contact.className = 'business-card-contact-info';

  const hostname = new URL(data.website).hostname.replace(/^www\./, '');

  const membershipLevels = {
    1: 'Non-profit',
    2: 'Silver',
    3: 'Gold'
  };

  const membershipLevelName = membershipLevels[data.membership];

  contact.innerHTML = `
    <p><strong>Email:</strong> <a href="mailto:info@${new URL(data.website).hostname}">info@${new URL(data.website).hostname}</a></p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>URL:</strong> <a href="${data.website}" target="_blank">${hostname}</a></p>
    <p><strong>Address:</strong> ${data.address}</p>
    <p><strong>Membership:</strong> <span class="business-card-membership" data-membership="${data.membership}">${membershipLevelName}</p>
  `;

  body.appendChild(logo);
  body.appendChild(contact);

  card.appendChild(header);
  card.appendChild(hr);
  card.appendChild(body);

  container.appendChild(card);
}

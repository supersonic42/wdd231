import { courses } from './courses.js';

renderCourses('ALL');

document.querySelectorAll('.courses-filter-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        const type = this.getAttribute('data-type');
        renderCourses(type);
    });
});

function renderCourses(type) {
    const container = document.querySelector('.courses-content');
    const creditDisplay = document.querySelector('.courses-credits');

    const filtered = type === 'ALL'
        ? courses
        : courses.filter(course => course.subject === type);

    container.innerHTML = '';
    let totalCredits = 0;

    filtered.forEach((course, index) => {
        totalCredits += course.credits;

        const courseDiv = document.createElement('div');

        courseDiv.classList.add('course');

        if (course.completed) {
            courseDiv.classList.add('course-completed');
        }

        courseDiv.textContent = `${course.subject} ${course.number}`;
        container.appendChild(courseDiv);

        requestAnimationFrame(() => {
            setTimeout(() => courseDiv.classList.add('show'), index * 50);
        });
    });

    creditDisplay.innerHTML = `Total credits: <b>${totalCredits}</b>`;
}

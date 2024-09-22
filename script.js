document.addEventListener('DOMContentLoaded', () => {
    const meals = document.querySelectorAll('.meal');
    const modal = document.getElementById('recipeModal');
    const recipeText = document.getElementById('recipeText');
    const mealName = document.getElementById('mealName');
    const closeModal = document.querySelector('.close');

    meals.forEach(meal => {
        meal.addEventListener('click', () => {
            mealName.textContent = meal.textContent; // Set the meal name
            recipeText.textContent = meal.getAttribute('data-recipe');
            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});

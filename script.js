document.addEventListener('DOMContentLoaded', () => {
	const meals = document.querySelectorAll('.meal-title'); // Targeting .meal-title instead of .meal
	const modal = document.getElementById('recipeModal');
	const recipeText = document.getElementById('recipeText');
	const mealName = document.getElementById('mealName');
	const closeModal = document.querySelector('.close');

	// Debugging: Check if 'recipes' is accessible
	console.log('Recipes object:', recipes);

	function getAlternative(meal) {
		return alternatives[meal] || 'Alternative recipes not found';
	}

	// Attach event listener to each meal-title
	meals.forEach((meal) => {
		meal.addEventListener('click', () => {
			const clickedMeal = meal.textContent.trim(); // Trim to remove extra whitespace
			console.log('Clicked meal:', clickedMeal); // Debug log
			mealName.textContent = clickedMeal; // Set the meal name in the modal
			recipeText.textContent = recipes[clickedMeal] || 'Recipe not found'; // Get recipe from the object
			const alternativeMeals = getAlternative(clickedMeal);
			console.log('Alternative recipes:', alternativeMeals);
			modal.style.display = 'block';
		});
	});

	// Function that retrieves the alternative meals for a given meal

	console.log(getAlternative('Ferrero kolač'));

	closeModal.addEventListener('click', () => {
		modal.style.display = 'none';
	});

	window.onclick = (event) => {
		if (event.target === modal) {
			modal.style.display = 'none';
		}
	};
});

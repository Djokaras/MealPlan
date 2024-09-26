document.addEventListener('DOMContentLoaded', () => {
	const meals = document.querySelectorAll('.meal-title'); // Targeting .meal-title instead of .meal
	const modal = document.getElementById('recipeModal');
	const recipeText = document.getElementById('recipeText');
	const mealName = document.getElementById('mealName');
	const closeModal = document.querySelector('.close');


	// Debugging: Check if 'recipes' is accessible
	console.log('Recipes object:', recipes);

	// Function to add reciprocal alternatives
	function addReciprocalAlternatives() {
		for (const meal in alternatives) {
			const altMeals = alternatives[meal];
			altMeals.forEach((altMeal) => {
				if (!alternatives[altMeal]) {
					alternatives[altMeal] = [];
				}
				if (!alternatives[altMeal].includes(meal)) {
					alternatives[altMeal].push(meal);
				}
				altMeals.forEach((otherAltMeal) => {
					if (altMeal !== otherAltMeal && !alternatives[altMeal].includes(otherAltMeal)) {
						alternatives[altMeal].push(otherAltMeal);
					}
				});
			});
		}
	}

	// Call the function to populate reciprocal alternatives
	addReciprocalAlternatives();

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
			modal.style.display = 'flex';
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

// Toggling different alternatives in the modal

const nextButton = document.getElementById('alternative-nextButton');
const prevButton = document.getElementById('alternative-prevButton');

currentIndex = 0;

// Function to display the next alternative meal
function displayNextAlternative() {
    let currentMeal = mealName.textContent;
    const alternativeMeals = alternatives[currentMeal];
    
    if (alternativeMeals && alternativeMeals.length > 0) {
        currentIndex = (currentIndex + 1) % alternativeMeals.length;  // Move to next alternative (loop back if at the end)
        const nextMeal = alternativeMeals[currentIndex];

        // Update the displayed meal name and recipe
        mealName.textContent = nextMeal;
        recipeText.textContent = recipes[nextMeal];
    } else {
        recipeText.textContent = 'No alternatives found for this meal.';
    }
}

// Function to display the previous alternative meal
function displayPreviousAlternative() {
    let currentMeal = mealName.textContent;
    const alternativeMeals = alternatives[currentMeal];
    
    if (alternativeMeals && alternativeMeals.length > 0) {
        currentIndex = (currentIndex - 1 + alternativeMeals.length) % alternativeMeals.length;  // Move to previous alternative (loop back if at the start)
        const prevMeal = alternativeMeals[currentIndex];

        // Update the displayed meal name and recipe
        mealName.textContent = prevMeal;
        recipeText.textContent = recipes[prevMeal];
    } else {
        recipeText.textContent = 'No alternatives found for this meal.';
    }
}

// Add event listeners to the Next and Previous buttons
nextButton.addEventListener('click', displayNextAlternative);
prevButton.addEventListener('click', displayPreviousAlternative);


// Button and toggling different tables of recipies

let currentTable = 0;
const mealPlans = document.querySelectorAll('.meal-plan');

function showTable(index) {
	// Hide all meal plans
	mealPlans.forEach(mealPlan => {
		mealPlan.classList.remove('active');
	});

	// Show the meal plan at the given index
	mealPlans[index].classList.add('active');
}

function nextTable() {
	// Increment the table index and wrap around if necessary
	currentTable = (currentTable + 1) % mealPlans.length;
	showTable(currentTable);
}

function prevTable() {
	// Decrement the table index and wrap around if necessary
	currentTable = (currentTable - 1 + mealPlans.length) % mealPlans.length;
	showTable(currentTable);
}

// Initially show the first table
showTable(currentTable);

# Meal Planner App

The **Meal Planner** app is a simple web-based application that helps users organize meals for each day of the week and view corresponding recipes. When a user clicks on a meal name, a modal will display the recipe for that specific meal.

## Features

- **Responsive Design**: The app layout adjusts based on screen size for mobile and desktop views.
- **Meal Listing**: Displays a table with meals for each day (breakfast, lunch, and dinner).
- **Recipe Modal**: Clicking on a meal opens a modal showing the recipe for the selected meal.
- **Clean UI**: Easy-to-navigate design with hover effects and interactive elements.
- **JavaScript-based Recipes**: Recipes are stored in JavaScript, keeping the HTML minimal.

## Technologies Used

- **HTML**: For basic structure and layout.
- **CSS**: For styling the table, modal, and making the app responsive.
- **JavaScript**: For handling meal clicks and displaying recipes dynamically.
  
## How It Works

1. **Meal Display**: Meals for each day are listed in a table, with each meal having the class `meal`.
2. **Click Event**: When a meal is clicked, the corresponding recipe is retrieved from the JavaScript object and displayed in a modal.
3. **Modal**: The modal shows the name of the meal and the recipe. It can be closed by clicking the close button or clicking outside the modal.

## File Structure

```bash
meal-planner/
│
├── index.html          # Main HTML file
├── styles.css          # Styles for the app
├── script.js           # JavaScript file containing logic for meal display and modal
└── README.md           # This readme file

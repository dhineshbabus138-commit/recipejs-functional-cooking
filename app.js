// ✅ Single recipes array with ingredients + steps
const recipes = [
  {
    id: 1,
    title: "Classic Spaghetti Carbonara",
    time: 25,
    difficulty: "easy",
    description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
    category: "pasta",
    ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Black Pepper"],
    steps: [
      "Boil pasta until al dente",
      {
        step: "Prepare sauce",
        substeps: [
          "Whisk eggs and cheese together",
          "Cook pancetta until crisp"
        ]
      },
      "Combine pasta with sauce and pancetta"
    ]
  },
  {
    id: 2,
    title: "Chicken Tikka Masala",
    time: 45,
    difficulty: "medium",
    description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
    category: "curry",
    ingredients: ["Chicken", "Yogurt", "Tomatoes", "Spices", "Cream"],
    steps: [
      "Marinate chicken in yogurt and spices",
      "Grill chicken until cooked",
      {
        step: "Make sauce",
        substeps: [
          "Cook onions and tomatoes",
          "Add cream and spices",
          "Simmer until thick"
        ]
      },
      "Combine chicken with sauce"
    ]
  }
  // … add other recipes here
];

// ✅ Recursive step rendering
const renderSteps = (steps) => `
  <ul>
    ${steps.map(step =>
      typeof step === "string"
        ? `<li>${step}</li>`
        : `<li>${step.step}${renderSteps(step.substeps)}</li>`
    ).join("")}
  </ul>
`;

// ✅ Recipe card generator
const createRecipeCard = (recipe) => `
  <div class="recipe-card" data-id="${recipe.id}">
    <h3>${recipe.title}</h3>
    <div class="recipe-meta">
      <span>⏱️ ${recipe.time} min</span>
      <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
    </div>
    <p>${recipe.description}</p>
    <button class="toggle-btn" data-action="steps">Show Steps</button>
    <div class="steps hidden">${renderSteps(recipe.steps)}</div>
    <button class="toggle-btn" data-action="ingredients">Show Ingredients</button>
    <div class="ingredients hidden">
      <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
    </div>
  </div>
`;

// ✅ IIFE Module
const RecipeApp = (() => {
  let currentFilter = recipes => recipes;
  let currentSort = recipes => recipes;

  const recipeContainer = document.querySelector('#recipe-container');

  const renderRecipes = (recipesToRender) => {
    recipeContainer.innerHTML = recipesToRender.map(createRecipeCard).join("");
  };

  const updateDisplay = () => {
    const filtered = currentFilter(recipes);
    const sorted = currentSort(filtered);
    renderRecipes(sorted);
  };

  const handleToggle = (e) => {
    if (e.target.classList.contains("toggle-btn")) {
      const action = e.target.dataset.action;
      const section = e.target.nextElementSibling;
      section.classList.toggle("hidden");
      e.target.textContent = section.classList.contains("hidden")
        ? `Show ${action.charAt(0).toUpperCase() + action.slice(1)}`
        : `Hide ${action.charAt(0).toUpperCase() + action.slice(1)}`;
    }
  };

  const init = () => {
    updateDisplay();
    recipeContainer.addEventListener("click", handleToggle);

    // Filters
    document.getElementById("filter-all").onclick = () => { currentFilter = recipes => recipes; updateDisplay(); };
    document.getElementById("filter-easy").onclick = () => { currentFilter = recipes => recipes.filter(r => r.difficulty === "easy"); updateDisplay(); };
    document.getElementById("filter-medium").onclick = () => { currentFilter = recipes => recipes.filter(r => r.difficulty === "medium"); updateDisplay(); };
    document.getElementById("filter-hard").onclick = () => { currentFilter = recipes => recipes.filter(r => r.difficulty === "hard"); updateDisplay(); };
    document.getElementById("filter-quick").onclick = () => { currentFilter = recipes => recipes.filter(r => r.time <= 30); updateDisplay(); };

    // Sorts
    document.getElementById("sort-name").onclick = () => { currentSort = recipes => [...recipes].sort((a, b) => a.title.localeCompare(b.title)); updateDisplay(); };
    document.getElementById("sort-time").onclick = () => { currentSort = recipes => [...recipes].sort((a, b) => a.time - b.time); updateDisplay(); };
  };

  return { init };
})();

// ✅ Initialize
document.addEventListener("DOMContentLoaded", () => {
  RecipeApp.init();
});
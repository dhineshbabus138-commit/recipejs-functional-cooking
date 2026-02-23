// ✅ Keep only this recipes array
const recipes = [
    {
        id: 1,
        title: "Classic Spaghetti Carbonara",
        time: 25,
        difficulty: "easy",
        description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
        category: "pasta"
    },
    {
        id: 2,
        title: "Chicken Tikka Masala",
        time: 45,
        difficulty: "medium",
        description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
        category: "curry"
    },
    {
        id: 3,
        title: "Homemade Croissants",
        time: 180,
        difficulty: "hard",
        description: "Buttery, flaky French pastries that require patience but deliver amazing results.",
        category: "baking"
    },
    {
        id: 4,
        title: "Greek Salad",
        time: 15,
        difficulty: "easy",
        description: "Fresh vegetables, feta cheese, and olives tossed in olive oil and herbs.",
        category: "salad"
    },
    {
        id: 5,
        title: "Beef Wellington",
        time: 120,
        difficulty: "hard",
        description: "Tender beef fillet coated with mushroom duxelles and wrapped in puff pastry.",
        category: "meat"
    },
    {
        id: 6,
        title: "Vegetable Stir Fry",
        time: 20,
        difficulty: "easy",
        description: "Colorful mixed vegetables cooked quickly in a savory sauce.",
        category: "vegetarian"
    },
    {
        id: 7,
        title: "Pad Thai",
        time: 30,
        difficulty: "medium",
        description: "Thai stir-fried rice noodles with shrimp, peanuts, and tangy tamarind sauce.",
        category: "noodles"
    },
    {
        id: 8,
        title: "Miso Soup",
        time: 15,
        difficulty: "easy",
        description: "A light Japanese soup with miso paste, tofu, and seaweed.",
        category: "soup"
    }
];

// ✅ Filters
const filterAll = recipes => recipes;
const filterEasy = recipes => recipes.filter(r => r.difficulty === "easy");
const filterMedium = recipes => recipes.filter(r => r.difficulty === "medium");
const filterHard = recipes => recipes.filter(r => recipes.difficulty === "hard");
const filterQuick = recipes => recipes.filter(r => r.time <= 30);

// ✅ Sorts
const sortByName = recipes => [...recipes].sort((a, b) => a.title.localeCompare(b.title));
const sortByTime = recipes => [...recipes].sort((a, b) => a.time - b.time);

// ✅ State
let currentFilter = filterAll;
let currentSort = sortByName;

// ✅ Update Display
function updateDisplay() {
    const filtered = currentFilter(recipes);
    const sorted = currentSort(filtered);
    renderRecipes(sorted);
}

// ✅ Render Function
function renderRecipes(list) {
    const container = document.getElementById("recipe-container");
    container.innerHTML = list.map(createRecipeCard).join("");
}

// ✅ Recipe Card Generator
const createRecipeCard = (recipe) => `
    <div class="recipe-card" data-id="${recipe.id}">
        <h3>${recipe.title}</h3>
        <div class="recipe-meta">
            <span>⏱️ ${recipe.time} min</span>
            <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
        </div>
        <p>${recipe.description}</p>
    </div>
`;

// ✅ Button Handlers
document.getElementById("filter-all").onclick = () => { currentFilter = filterAll; updateDisplay(); };
document.getElementById("filter-easy").onclick = () => { currentFilter = filterEasy; updateDisplay(); };
document.getElementById("filter-medium").onclick = () => { currentFilter = filterMedium; updateDisplay(); };
document.getElementById("filter-hard").onclick = () => { currentFilter = filterHard; updateDisplay(); };
document.getElementById("filter-quick").onclick = () => { currentFilter = filterQuick; updateDisplay(); };

document.getElementById("sort-name").onclick = () => { currentSort = sortByName; updateDisplay(); };
document.getElementById("sort-time").onclick = () => { currentSort = sortByTime; updateDisplay(); };

// ✅ Initialize
updateDisplay();
const main = document.getElementById('mealsRow');

document.addEventListener('DOMContentLoaded', () => {
    randomMeal();

    theMeals('a');
});
async function getRandomMeal() {
    let meals = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    let jsonVersion = await meals.json();
    return jsonVersion;
}
async function getMeals(letter) {
    let mealByLetter = "https://www.themealdb.com/api/json/v1/1/search.php?f=" + letter;
    let meals = await fetch(mealByLetter);
    let jsonVersion = await meals.json();
    return jsonVersion;
}
async function getCategories() {
    let mealCategs = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let jsonVersion = await mealCategs.json();
    return jsonVersion;
}

function mealDetails(meal) {
    console.log("new info");
}

function randomMeal() {
    getRandomMeal().then(function (meal) {
        console.log(meal.meals[0].strMealThumb);
        let myImg = document.querySelector('.responsive-img');

        myImg.src = meal.meals[0].strMealThumb;
    })
}

function mealCategories() {
    getCategories().then(function (category) {
        console.log(category.categories[0]);
        document.getElementById("pageTitle").innerHTML = "Categories";
        main.innerHTML = " ";
        let output = ``;
        // let ul = document.createElement('ul');
        category.categories.forEach(element => {
            output += `<li> ${element.strCategory}</li>`;
        });
        main.innerHTML = output;

    });
}


function theMeals(letter) {
    getMeals(letter).then(function (meal) {
        console.log(meal.meals);
        let output = '';
        meal.meals.forEach(elt => {
            output += `
            <div class='col s12 m6 l4'>
                <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${elt.strMealThumb}">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">${elt.strMeal}<i class="material-icons right">favorite_border</i></span>
                    </div>
                    
                </div>
            </div>
                    `;
        });

        main.innerHTML = output;
    }).catch(function (e) {
        console.log(e);
    });

}

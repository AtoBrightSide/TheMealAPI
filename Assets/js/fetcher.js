const main = document.getElementById('mealsRow');

document.addEventListener('DOMContentLoaded', () => {
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
                        <div class="col s10 m4 center-align">
                        <div class="card center-align" style="height: 500px;">
                            <div class="card-image center-align">
                            <img src="${elt.strMealThumb}">
                            <span class="card-title"></span>
                            <a class="btn-floating halfway-fab waves-effect waves-light blue"><i class="material-icons">add</i></a>
                            </div>
                            <div class="card-content">
                            <h5>${elt.strMeal}</h5>
                            <h6>Youtube Link</h6>
                            <a href="${elt.strYoutube}">${elt.strYoutube}.</a>
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

const main = document.querySelector('.container');

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
        main.innerHTML = " ";
        console.log(meal.meals);
        let eltCount = 0, rowCount=0;
        for (let i=0; i<meal.meals.length;i++) {
            rowCount++;
            let newRow = document.createElement('div');
            newRow.className = "row";
            let output = ``;
            for(let j=0; j<3; j++){
                output +=   `<div class="col s12 m6 l4">
                                <div class="card">
                                    <div class="card-image waves-effect waves-block waves-light">
                                        <img class="activator" src="${meal.meals[eltCount].strMealThumb}">
                                        <span class="card-title activator white-text text-darken-4">${meal.meals[eltCount].strMeal}</span>
                                    </div>
                                    <div class="card-reveal">
                                        <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
                                        <p>Common in areas like ${meal.meals[eltCount].strArea} <br> Category : ${meal.meals[eltCount].strTags}</p>
                                        <a class="waves-effect waves-light btn" onClick="mealDetails(${meal.meals[eltCount]})">Details</a>
                                    </div>
                                </div>
                            </div>`;
                eltCount++;
            }
            newRow.innerHTML = output;
            main.appendChild(newRow);
        }
        
        main.innerHTML = output;
    }).catch(function (e) {
        console.log(e);
    });

}

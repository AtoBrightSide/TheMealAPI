const searchBar = document.getElementById('search');
const mealsRow = document.getElementById('mealsRow');
const todaysMeal = document.getElementById('todaysMeal');

searchBar.addEventListener('keyup', () => {
    console.log(searchBar.value);
    getMeals(searchBar.value);

    todaysMeal.innerHTML = '';

    async function getMeals(letter) {
        let mealByLetter = "https://www.themealdb.com/api/json/v1/1/search.php?f=" + letter;
        let meals = await fetch(mealByLetter);
        let jsonVersion = await meals.json();
        return jsonVersion;
    }

    function theMeals(letter) {
        getMeals(letter).then(function (meal) {
            console.log(meal.meals);
            let output = '';
            meal.meals.forEach(elt => {
                output += `
                        <div class="col s10 m4 center-align">
                        <div class="card center-align">
                            <div class="card-image center-align">
                            <img src="${elt.strMealThumb}">
                            <span class="card-title"></span>
                            <a class="btn-floating halfway-fab waves-effect waves-light blue"><i class="material-icons" id='change' onclick='change()'>favorite_border</i></a>
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

    if (searchBar.value != '') {
        theMeals(searchBar.value);
    }
    else {
        return;
    }
});
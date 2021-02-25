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
                output +=   `<div class='col s12 m6 l4'>
                                <div class="card">
                                    <div class="card-image waves-effect waves-block waves-light">
                                        <img class="activator" src="${elt.strMealThumb}">
                                    </div>
                                    <div class="card-content" >
                                        <span class="card-title activator grey-text text-darken-4">${elt.strMeal}<i class="material-icons right">more_vert</i></span>
                                        <a href="javascript:void(0)" onclick="M.toast({html: 'Added to favorites'})" class="btn waves-effect purple darken-3"><i onclick='addFav("${elt.strMeal}")' id='fav' class="material-icons">favorite_border</i></a>
                                    </div>
                                    <div class="card-reveal" style="background-color: rgba(55,55,55,0.9) !important;">
                                        <span class="card-title white-text text-lighten-2">Meal Details<i class="material-icons right">close</i></span>
                                        <p class='white-text text-lighten-2'>Category: ${elt.strTags}</p>
                                        <p class='white-text text-lighten-2'>Area: ${elt.strArea}</p>
                                        <p class='white-text text-lighten-2'>Recipe: ${elt.strInstructions}</p>
                                        <p class='white-text text-lighten-2'>Youtube Link: <a href='${elt.strYoutube}'>${elt.strYoutube}</a></p>
                                    </div>
                                </div>
                            </div>`;
            });

            main.innerHTML = output;
        }).catch(function (e) {
            console.log(e);
        });

    }

    if (searchBar.value != '')      theMeals(searchBar.value);
    else                            return;
});
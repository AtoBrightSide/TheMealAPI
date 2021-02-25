const main = document.getElementById('mealsRow');
const ddF = document.getElementById('dropdownF');

let idCount = 0;
let favs = [];
let increment =0;

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

function filterMeals(filter) {
    document.getElementById('todaysMeal').innerHTML = " ";
    document.getElementById('pageTitle').innerHTML = "Filtered Meals ";
    document.querySelector('.pagination').innerHTML = " ";
    main.innerHTML = " ";
    let output = ``;
    for (let i=97;i<123;i++){
        if(i==120||i==122||i==117||i==113)    continue;
        
        getMeals(String.fromCharCode(i)).then(function (meal) {
            
            // console.log(meal.meals[0].strMeal);
            meal.meals.forEach(elt => {
                let cat = elt.strCategory;   
                if (filter==elt.strArea || cat.indexOf(filter)) {
                    output += `<div class='col s12 m6 l4'>
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
                    main.innerHTML += output;
                }
            })
        })
    } 
    // main.innerHTML = output;  
}


function remove() {
    alert(ddF.innerHTML);
}

function addFav(meal) {
    if (!(favs.includes(meal))) {
        favs.push(meal);
        ddF.innerHTML += `<li style="display: inline;"><a href="#">${meal}</a></li>`;
    }

    sessionStorage.setItem(`obj${increment}`, JSON.stringify(meal));
    increment++;
    console.log(favs);
}

function theMeals(letter) {
    getMeals(letter).then(function (meal) {
        console.log(meal.meals);
        let output = '';
        meal.meals.forEach(elt => {
            output += `<div class='col s12 m6 l4'>
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
                    idCount++;
        });

        main.innerHTML = output;
    }).catch(function (e) {
        console.log(e);
    });

}

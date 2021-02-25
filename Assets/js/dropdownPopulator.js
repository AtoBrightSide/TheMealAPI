const ddA = document.getElementById('dropdownA');
const ddC = document.getElementById('dropdownC');
const ddI = document.getElementById('dropdownI');
let i = 0;

document.addEventListener('DOMContentLoaded', () => {
    populatorA();
    populatorI()
    populatorC();
});
//fetch requests for each dropdown
//------------------------------------------------------------------------------------------------------------------------------------------
async function getMealsArea() {
    let meals = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');

    let jsonVersion = await meals.json();

    return jsonVersion;
}

async function getMealsCategory() {
    let meals = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');

    let jsonVersion2 = await meals.json();

    return jsonVersion2;
}

async function getMealsMainIng() {
    let meals = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');

    let jsonVersion3 = await meals.json();

    return jsonVersion3;
}
//functions that populate the dropdowns
//-----------------------------------------------------------------------------------------------------------------------------------------
function populatorA() {
    getMealsArea().then(function (area) {
        console.log(area.meals);

        let output = ''

        area.meals.forEach(elt => {
            output += `<li><a href="#" onclick="filterMeals('${elt.strArea}',1)">${elt.strArea}</a></li>`
        });
        ddA.innerHTML = output;
    })
}

function populatorC() {
    getMealsCategory().then(function (cat) {
        console.log(cat.meals);

        let output = ''

        cat.meals.forEach(elt => {
            output += `<li><a href="#" onclick="filterMeals('${elt.strCategory}',2)">${elt.strCategory}</a></li>`
        });

        ddC.innerHTML = output;
    })

}

function populatorI() {
    getMealsMainIng().then(function (lst) {
        console.log(lst.meals);

        let output = ''

        lst.meals.forEach(elt => {
            output += `<li><a href="#" onclick="filterMeals('${elt.strIngredient}',3)">${elt.strIngredient}</a></li>`
        });

        ddI.innerHTML = output;
    })

}
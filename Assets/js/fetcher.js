const main = document.getElementById('main');
const li = document.createElement('div');
main.appendChild(li);

document.addEventListener('DOMContentLoaded', () => {
    theMeals();
});

async function getMeals() {
    let meals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=s');

    let jsonVersion = await meals.json();

    return jsonVersion;
}

function theMeals() {
    getMeals().then(function (meal) {
        console.log(meal);
        let output = '';

        meal.meals.forEach(elts => {
            output += `<img src="${elts.strMealThumb}" style="width: 300px; height: auto;">
                        <br>
                        ${elts.strMeal}<br>
                        `;

        });
        main.innerHTML = output;
    }).catch(function (e) {
        console.log(e);
    });

}

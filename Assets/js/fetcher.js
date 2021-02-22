const main = document.querySelector('.container');

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
        console.log(meal.meals);
        let eltCount = 0;
        for (let i=0; i<meal.meals.length;i++) {
            let newRow = document.createElement('div');
            newRow.className = "row";
            let output = ``;
            for(let j=0; j<3; j++){
                output +=   `<div class="col s4">
                                <img src="${meal.meals[eltCount].strMealThumb}" width="350px" height="350px"/>
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

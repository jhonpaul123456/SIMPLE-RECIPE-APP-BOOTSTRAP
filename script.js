const form = document.querySelector('form');
const results = document.querySelector('.row')
const showMSG = document.querySelector('.simple')
let resHolder = '';

//config
const APP_ID = 'd7aa540a';
const APP_KEY = '6cd79e47869a7c4f58b3beca7c9eda3d';
const baseUrl = 'https://api.edamam.com/search?q=pizza&app_id=${APP_ID}&app_key=${APP_KEY}'


form.addEventListener('submit', (e) => {
    e.preventDefault();
    resHolder = e.target.querySelector('input').value;
    console.log(resHolder);
    showMSG.classList.add('show-results');
    fetchResults();
})


async function fetchResults() {
    const baseUrl = `https://api.edamam.com/search?q=${resHolder}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`;
    const response = await fetch(baseUrl);
    const data = await response.json();
    renderResults(data.hits)
    console.log(data);
}


function renderResults(res) {
    let renderJsx = '';
    res.map(result => {
        renderJsx += 
        `
        <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${result.recipe.label}</h5>
            <img src="${result.recipe.image}" alt="">
            <p class="card-text"> CALORIES: ${result.recipe.calories.toFixed(2)}</p>
            <p class="card-text"> DIET LABELS: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels: 'No Data Found' }</p>
            <p class="card-text"> HEALTH LABELS: ${result.recipe.healthLabels}</p>
            <a href="${result.recipe.url}" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
        `
        
    })
    results.insertAdjacentHTML('beforeend', renderJsx);
}
const form = document.getElementById('form');
const cardList = document.querySelector(".card-list");
const searchInput = document.getElementById("search-input");
const allBtn = document.querySelector("all-btn");
const alcoholicBtn = document.querySelector('.alcoholic');
const nonAlcoholicBtn = document.querySelector('.non-alcoholic');
const allDrinksURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a`;

// FETCH ****************************************
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

// RENDER FUNCTION *******************************
function renderData(datas) {

    datas.forEach(data => {
        const {
            strDrinkThumb,
            strDrink
        } = data;

        const card = document.createElement('li');
        card.classList.add('card');

        const cardImg = document.createElement('img');
        cardImg.classList.add('card-img');
        cardImg.src = strDrinkThumb;
        cardImg.alt = strDrink;

        const cardTitle = document.createElement('p');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = strDrink;


        card.appendChild(cardImg);
        card.appendChild(cardTitle)

        cardList.appendChild(card)

    });

}

// DEFAULt RENDER ALL KOKTEL *********************
fetchData(allDrinksURL).then((data) => renderData(data.drinks));

// SEARCH by NAME *******************************
form.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    cardList.innerHTML = '';

    const searchInputValue = searchInput.value.trim().toLowerCase();
    const searchDrinksURL = `https://www.thecocktaildb.com/api/json/v2/1/search.php?s=${searchInputValue}`;
    const errorList = document.querySelector('.error-message-list')

    const datas = await fetchData(searchDrinksURL);
    if (datas.drinks == null) {
        errorList.innerHTML = `<h3 class="error-message">Oh sorry this cocktail not found!</h3>`
    } else {

        renderData(datas.drinks);
        console.log(datas.drinks);
        errorList.innerHTML = ''
    }

    form.reset();
})

// ALCOHOLIC BUTTON ********************************
alcoholicBtn.addEventListener("click", async () => {
    const alcoholicDrinksURL = `https://www.thecocktaildb.com/api/json/v2/1/filter.php?a=Alcoholic`;
    const alcoholicData = await fetchData(alcoholicDrinksURL);
    cardList.innerHTML = '';
    renderData(alcoholicData.drinks);
});

// NON-ALCOHOLIC BUTTON ****************************
nonAlcoholicBtn.addEventListener("click", async () => {
    const nonAlcoholicDrinksURL = `https://www.thecocktaildb.com/api/json/v2/1/filter.php?a=Non_Alcoholic`;
    const nonAlcoholicData = await fetchData(nonAlcoholicDrinksURL);
    cardList.innerHTML = '';
    renderData(nonAlcoholicData.drinks);
});
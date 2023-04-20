/*  
MI APPARE QUESTO ERRORE IN CONSOLE RELATIVA ALLA PAGINA INDEX

caught SyntaxError: Identifier 'endpoint' has already been declared (at common.js:1:1)
*/

//endpoint da contattare e token da utilizzare per la fetch
const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJkN2E4OGIxNGE1MTAwMTQ2NjNmZDIiLCJpYXQiOjE2ODA5NTQ0MTUsImV4cCI6MTY4MjE2NDAxNX0.5AYG87RqXP07k6tMZIADlU6sb-XYReOdfWm3fVdoPHs";

//funzione che recupera i prodotti dall'endpoint
const getProducts = async () => {

    let products;
    try {

        showLoader();
        await fetch(endpoint, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json"
            }
        }).then(response => response.json()).then(data => products = data);
        hideLoader();
        return products;

    } catch (error) {
        console.log(error);
    }

};

//funzione che mostra il loader
const showLoader = () => {

    let loader = document.querySelector('div.loader');
    loader.classList.remove('d-none');

};

//funzione che nasconde il loader
const hideLoader = () => {

    let loader = document.querySelector('div.loader');
    loader.classList.add('d-none');
    
};
//endpoint da contattare e token da utilizzare per la fetch
const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJkN2E4OGIxNGE1MTAwMTQ2NjNmZDIiLCJpYXQiOjE2ODA5NTQ0MTUsImV4cCI6MTY4MjE2NDAxNX0.5AYG87RqXP07k6tMZIADlU6sb-XYReOdfWm3fVdoPHs";
const container = document.querySelector('.container'); 

//al caricamento della pagina. Se non ci fosse, non esisterebbeo elementi prima del caricamento
document.addEventListener("DOMContentLoaded", async  () => {

    const params = new URLSearchParams(window.location.search);
    //console.log(params)
    const param = params.get('id');
    //console.log(param)
    let product = await getProductData(param);
    createCard(product, container);

});

//funzione che recupera le informazioni del prodotto
const getProductData = async (id) => {

    let product;

    try {

        await fetch(endpoint + id, {

            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json"
            }
            
        }).then(response => response.json())
            .then(data => product = data);
        //console.log(product);
        return product;
        
    } catch (error) {

        console.log(error);

    }

};

//creazione card singola personalizzata
const createCard = (product, container) => {

    const productCard = document.createElement('div');
    productCard.style.border = '1px solid #ccc';
    productCard.style.borderRadius = '5px';
    productCard.style.padding = '10px';
    productCard.style.margin = '10px';
    productCard.style.width = '200px';
    productCard.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";

    const productName = document.createElement('p');
    productName.innerText = "Nome: " + product.name;
    productName.style.fontWeight = 'bold';
    
    const productBrand = document.createElement('p');
    productBrand.innerText = "Brand: " + product.brand;

    const productDescr = document.createElement('p');
    productDescr.innerText = "Descrizione: " + product.description;
    productDescr.style.marginTop = '10px';

    const productPrice = document.createElement('p');
    productPrice.innerText = "Prezzo: € " + product.price;
    productPrice.style.marginTop = '15px';
    productPrice.style.fontWeight = 'bold';

    const productImg = document.createElement('img');
    productImg.src = product.imageUrl;
    productImg.style.width = '200px';

    productCard.append(productName, productBrand, productDescr, productPrice, productImg);
    container.appendChild(productCard);

};



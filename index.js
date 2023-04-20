/*  
MI APPARE QUESTO ERRORE IN CONSOLE RELATIVA ALLA PAGINA INDEX

caught SyntaxError: Identifier 'endpoint' has already been declared (at common.js:1:1)
*/

//endpoint da contattare e token da utilizzare per la fetch
const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJkN2E4OGIxNGE1MTAwMTQ2NjNmZDIiLCJpYXQiOjE2ODA5NTQ0MTUsImV4cCI6MTY4MjE2NDAxNX0.5AYG87RqXP07k6tMZIADlU6sb-XYReOdfWm3fVdoPHs";

//al caricamento della pagina. Se non ci fosse, non esisterebbeo elementi prima del caricamento
document.addEventListener("DOMContentLoaded", async () => {

  //recupero i dati dall'API
  let products = await getProducts();
  createGrid(products);

});


//funzione che recupera i prodotti dall'url
const getProducts = async () => {

  let products;

  try {

    showLoader();//mostro caricamento quando serve

    await fetch(endpoint, {

      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-type": "application/json"
      }

    }).then(response => response.json())
      .then(data => products = data);

    hideLoader();//nascondo caricamento quando finisce
    return products;

  } catch (error) {

    console.log(error);

  }

};

//funzione che crea e restituisce una card
const createCard = () => {

  let bodyCard =
  '<ul class="list-group list-group-flush">' + // Aggiungi border-radius qui
    '<li data-type="name" class="list-group-item"></li>' +
    '<li data-type="description" class="list-group-item"></li>' +
    '<li data-type="brand" class="list-group-item"></li>' +
    '<li data-type="price" class="list-group-item"></li>' +
    '<li data-type="image" class="list-group-item"></li>' +
    '<li data-type="details" class="list-group-item"></li>' +
  '</ul>';

  let card = document.createElement("div");
  card.classList.add("card");
  card.style.width = "18rem";

  // aggiungo il CSS in-line alle card
  card.style.boxShadow = "10px 10px 10px rgba(0, 0, 0, 0.1)";
  card.style.borderRadius = "30px"; // 
  card.style.margin = "16px";
  card.style.overflow = "hidden"; // evita angoli trasparenti

  card.innerHTML = bodyCard;
  return card;
  
};

// funzione che imposta i valori del prodotto nella card
// se uso lo switch, il codice dovrebbe essere più maintainable  
const setCard = (card, product) => {

  let listItems = card.getElementsByTagName("li");

  for (let item of listItems) {

    item.style.borderBottom = "1px solid #e9ecef";

    switch (item.getAttribute("data-type")) {

      case "name":

        item.innerHTML = `<strong>Nome: </strong>${product.name}`;

      break;

      case "description":

        item.innerHTML = `<strong>Descrizione: </strong>${product.description}`;

      break;

      case "brand":

        item.innerHTML = `<strong>Brand: </strong>${product.brand}`;

      break;

      case "price":

        item.innerHTML = `<strong>Prezzo: </strong> € ${product.price}`;

      break;

      case "image":

        item.innerHTML = `<img src="${product.imageUrl}" alt="${product.name}" width="100">`;
      
      break;

      case "details":

        item.innerHTML = `<a href="product.html?id=${product._id}" target="_blank">Maggiori dettagli</a>`;
        //con product.html?id= creo la query
      break;

      default:
      break;
    }

  }

  listItems[listItems.length - 1].style.borderBottom = "none";
  return card;

};

//funzione che crea la griglia a partire dalla lista dei prodotti (parametro)
const createGrid = (products) => {

  let row = document.querySelector('div.container > div.row');

  products.forEach(item => {

    let card = createCard();
    card = setCard(card, item);

    let col = document.createElement('div');
    col.classList.add('col', 'mb-3', 'mb-lg-4', 'col-6', 'col-sm-4', 'col-md-3');

    col.append(card);
    row.append(col);

  });
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

//funzione che mostra la griglia
const showGrid = () => {

  let container = document.querySelector('div.container');
  container.classList.remove('d-none');

};

//funzione che nasconde la griglia
const hideGrid = () => {

  let container = document.querySelector('div.container');
  container.classList.add('d-none');

};



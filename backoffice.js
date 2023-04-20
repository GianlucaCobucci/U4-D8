//al caricamento della pagina. Se non ci fosse, non esisterebbeo elementi prima del caricamento
document.addEventListener("DOMContentLoaded", async () => {

    let addButton = document.getElementById('add');

    //imposto un listener associato al pulsante di aggiunta del prodotto
    addButton.addEventListener('click', async () => {

        //prendo info prodotto inserite dall'utente
        let name = document.getElementById('name').value;
        let description = document.getElementById('description').value;
        let brand = document.getElementById('brand').value;
        let imgUrl = document.getElementById('imgUrl').value;
        let price = document.getElementById('price').value;

        //verifico se sono tutte presenti (controllo by Andrea)
        if (name !== '' && description !== '' && brand !== '' && imgUrl !== '' && price !== '') {
            
            //aggiungo il nuovo prodotto
            const data = await addNewProduct(name, description, brand, imgUrl, parseFloat(price));
            resetFields();//reset dei campi una volta finita la funzione

            showAlert("Prodotto inserito con successo", 1000);//banner di conferma

        } else {

            //alert che appare in caso di dati mancanti
            alert('Dati mancanti');

        }

    });
    const products = await getProducts();
    const tbody = document.getElementsByTagName('tbody')[0];
    createTable(products, tbody);

});

//funzione che aggiunge un nuovo prodotto
const addNewProduct = async (name, desc, brand, imgUrl, price) => {

    let data;
    const myProduct = {

        name: name,
        description: desc,
        brand: brand,
        imageUrl: imgUrl,
        price: price

    };

    try {

        await fetch(endpoint, {

            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(myProduct),

        }).then(response => response.json()).then(result => data = result);

        return data;

    } catch (error) {

        console.log("Azz! C'è un errore: " + error);

    }
};

const resetFields = () => {

    document.getElementById('name').value = '';
    document.getElementById('description').value = '';
    document.getElementById('brand').value = '';
    document.getElementById('imgUrl').value = '';
    document.getElementById('price').value = '';

};

const createTable = (products, tbody) => {

    products.forEach(item => {

        const tr = document.createElement('tr');

        const colId = document.createElement('td');
        colId.innerText = item._id;

        const colName = document.createElement('td');
        colName.innerText = item.name;

        const colBrand = document.createElement('td');
        colBrand.innerText = item.brand;

        const colPrice = document.createElement('td');
        colPrice.innerText = "€ " + item.price;

        const colImage = document.createElement('td');
        const image = document.createElement('img');
        image.src = item.imageUrl;
        image.width = 50;
        colImage.appendChild(image);

        const colDelete = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Elimina';
        deleteButton.classList.add('btn', 'btn-danger'); 

        /* VORREI CHE LA PAGINA REFRESHASSE IN AUTOMATICO DOPO IL DELETE */
        deleteButton.addEventListener('click', async () => {

            await deleteProduct(item._id);
            window.location.reload();

            console.log("Operazione annullata");

        });

        colDelete.append(deleteButton);
        tr.append(colId, colName, colBrand, colPrice, colImage, colDelete);
        tbody.append(tr);

    });

};

const deleteProduct = async (id) => {

    try {

        await fetch(endpoint + id, {

            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json"
            },
            method: 'DELETE',

        }).then(response => response.json())
        .then(result => console.log(result));
    
    } catch (error) {

        console.log("Azz! C'è un errore: " + error)

    }

};

//alert conferma invio prodotto
const showAlert = async (message, duration) => {

    const alertDiv = document.createElement('div');
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '50%';
    alertDiv.style.left = '50%';
    alertDiv.style.transform = 'translate(-50%, -50%)';
    alertDiv.style.backgroundColor = 'white';
    alertDiv.style.padding = '20px';
    alertDiv.style.border = '1px solid black';
    alertDiv.innerHTML = message;

    document.body.appendChild(alertDiv);

    setTimeout(() => {

        alertDiv.remove();

    }, duration);

}


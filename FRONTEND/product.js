// id en queryparams
// On cherche à afficher le détail d'un produit
// Récupérer l'id en queryparams
// Récup les données api grâce à l'id
// Afficher le détail avec le résultat de l'appel api

function displayProductDetail() {
  const productId = getIdFromQueryParams()
  getDataWithId(productId).then((result) => {
    document.getElementById(
      'product_detail'
    ).innerHTML = `<section class="product" id="product_bear">
 
      <div class="container">
        <div class="column" id="article">
          <h5 id="bear_name" class="ad-title m-auto">${result.name}</h5>
          <img  class="img-fluid" id="image_article" src="${
            result.imageUrl
          }" alt="un ours"></img>
        </div>
        <div class="details col-md-6">
          <h3>Description du produit:</h3>
          <p id="description">${result.description}</p>
          <form name="color" action="">
            <p>
              <label class="lens-label" for="objectif">Sélectionnez une couleur :</label><br>
              <select class="custom-select" name="color" id="color">
              ${result.colors.map((item) => `<option value=${item}>${item}</option>`)}
              </select>
            </p>
          </form>
          <p>Prix : <span id="price">${result.price}€</span></p>
          <button id="add_basket" class="ad-btn" >Ajouter au panier</button>
        </div>
      </div>
      </section>`

    document.getElementById('add_basket').addEventListener('click', () => {
      // selection de la select liste
      var select = document.getElementById('color');
      var value = select.options[select.selectedIndex].value;

      let array = JSON.parse(localStorage.getItem('basket') || '[]')
      result.colors = value
      array.push(result)
      localStorage.setItem('basket', JSON.stringify(array))
    })
  })
}

// retourne la valeur du paramètre id
function getIdFromQueryParams() {
  let params = new URLSearchParams(document.location.search.substring(1))
  let id = params.get('id')
  return id
}

function getDataWithId(id) {
  return fetch(`http://localhost:3000/api/teddies/${id}`).then((result) =>
    result.json()
  )
}

// function test(id) {
//   console.log(id)
// }

displayProductDetail()

// il faut écouter l'évenement "click"
// et ajouter le produit sélectionné dans le localstorage

function ajoutStorage(response) {
  function clic() {
    console.log('Clic !')

    let line = localStorage.getItem('product')
    let line2 = localStorage.getItem('id')
  }
}


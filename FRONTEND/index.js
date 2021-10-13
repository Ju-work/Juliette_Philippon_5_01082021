//fetch de l'URL
const url = "http://localhost:3000/api/teddies"

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    addCards(data)
  })
  .catch((erreur) => console.log('erreur : ' + erreur))

  function convertPrice(price) {
  return price
}

// fonction pour la création des cards de la page d'accueil
function addCards(data) {
  //boucle pour chaque iteration d'un produit

  for (produit of data) {
    console.log(produit)
    //recupère l'élément liste dans le HTML
    const card = document.getElementById('liste')
    //convertit le prix
    const price = convertPrice(produit.price)
    // affiche chaque ours
    card.innerHTML += `
      <div class="col-md-4 mb-5">
                      <div class="card">
                          <div class="card-image">
                              <span class="card-notify-year">${price}€</span>
                              <img class="img-fluid" src="${produit.imageUrl}" alt="un ours" />
                          </div>
                          <div class="card-image-overlay m-auto">
                              <span class="card-detail-badge">${produit.description}</span>

                          </div>
                          <div class="card-body text-center">
                              <div class="ad-title m-auto">
                                  <h5>${produit.name}</h5>
                              </div>
                              <a class="ad-btn" href="./product.html?id=${produit._id}">Détails </a>
                          </div>
                      </div>
                  </div>
    `
  }
}

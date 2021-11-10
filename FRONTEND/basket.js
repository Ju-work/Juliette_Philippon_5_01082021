showBasket()
totalPrice()

// On affiche le panier dans le localstorage

function showBasket() {
  
  let arrayCommande = JSON.parse(localStorage.getItem('basket'))
 
  arrayCommande.forEach((element, index) => {

    document.getElementById('basket-tablebody').innerHTML +=`
      <td>${element.name}</td>
      <td>${element.colors}</td>
      <td>${element.price} €</td>
      <td><button data-productId="${index}" class=" delete-button fas fa-trash-alt"></button></td>`
      
  })

  // On supprime une ligne du tableau
  
  document.querySelectorAll('.delete-button').forEach((element) => {
    
    element.addEventListener('click', () => {
      deleteProductToBasket(element.dataset.productid)
      document.location.reload()
    })
  })
}

// Faire la somme en € des produits du panier

function totalPrice() {
  let price = 0
  let arrayCommande = JSON.parse(localStorage.getItem('basket'))

  arrayCommande.forEach((element) => {
    price = price + element.price
  })
  document.getElementById('total').innerHTML = price + '€'
}

// Supprimer les produits dans le localstorage

function deleteProductToBasket(id) {
  let removeProductInBasket = false

  productsInBasket = JSON.parse(localStorage.getItem('basket'))

  const newProductList = productsInBasket.filter((item, index) => {
    return index !== Number(id)
  })
  localStorage.setItem('basket', JSON.stringify(newProductList))
}



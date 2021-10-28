showBasket()
totalPrice()

// On affiche le panier dans le localstorage

function showBasket() {
  let arrayCommande = JSON.parse(localStorage.getItem('basket'))
  var corpsHtml = '<tr>'
  arrayCommande.forEach((element, index) => {
    console.log(element)
    corpsHtml =
      corpsHtml +
      '<tr>' +
      '<td>' +
      element.name +
      '</td>' +
      '<td>' +
      element.colors +
      '</td>' +
      '<td>' +
      element.price +
      '€' +
      '</td>' +
      '<td>' +
      //'<button class="basket-trash" class="fas fa-trash-alt"></button>' +
      `<button data-productId="${index}" class=" delete-button fas fa-trash-alt"></button>` +
      '</td>' +
      '</tr>'
  })
  corpsHtml = corpsHtml + '</tr>'
  document.getElementById('basket-tablebody').innerHTML = corpsHtml
  document.querySelectorAll('.delete-button').forEach((element) => {
    element.addEventListener('click', () => {
      console.log(element.dataset)
      deleteProductToBasket(element.dataset.productid)
      document.location.reload()
    })
  })
}

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
  console.log(id)

  const newProductList = productsInBasket.filter((item, index) => {
    return index !== Number(id)
  })
  console.log(newProductList)
  localStorage.setItem('basket', JSON.stringify(newProductList))
}

////////////////////////// troisième méthode


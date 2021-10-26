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

/*const myForm = document.getElementById('form');

myForm.addEventListener('submit', (evt)=>{
  evt.preventDefault();

  // On valide le nom
  const firstName =myForm.firstName.value;
  const rxFirstName = /^([a-zA-Z]){2,}$/;

  if (!rxFirstName.test(firstName)){
    alert ("Merci de renseigner un prénom valide");
    return;
  }

  // On valide le prénom
  const lastName =myForm.lastName.value;
  const rxLastName = [a-zA-Z]{2,20};

  if (!rxLastName.test(lastName)){
    alert ("Merci de renseigner un nom valide");
    return;
  }

  // On valide l'adress
  const address = myForm.address.value;
  const rxAddress = [a-zA-Z0-9\s]+;

  if (!rxAddress.test(address)){
    alert ("Merci de renseigner le numéro et libellé de la voie");
    return;
  }

  // On valide la ville
  const city =myForm.city.value;
  const rxCity = [A-Za-z]{2,50};

  if (!rxCity.test(city)){
    alert ("Merci de renseigner le nom de la ville");
    return;
  }

  // On valide le format de l'adresse mail
  const email= myForm.email.value;
  const rxEmail = [a-zA-Z0-9._\-]+@[a-zA-Z0-9._\-]+\.[a-zA-Z]{2,10};

  if(!rxEmail.text(email)){
    alert ("Merci d'entrer une adresse mail valide");
    return
  }

  // J'envoie mes valeurs au backend

  const customer = {
    firstName,
    lastName,
    address,
    city,
    email,
  };

  const listProductsFromStorage =[
    { _id:""}
  ];

  const products = listProductsFromStorage.map((item)=> item._id);
  console.log(products);

  const postData ={
    customer,
    products,
  };

  fetch("http://localhost:3000/api/teddies/basket"{
    method: "POST",
    body: JSON.stringify(postData)
  })
  .then((Response)=> Response.json())
  .then((data)=> localStorage.setItem("order-confirm", JSON.stringify(data)));
});

console.log(myForm.firstName.value);*/

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
  document.querySelectorAll('.delete-button').forEach((element)=>{
    element.addEventListener('click',()=>{
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
  
  
  const newProductList = productsInBasket.filter((item, index) =>{
    
    return index !== Number(id)
  })
  console.log(newProductList)
  localStorage.setItem('basket', JSON.stringify(newProductList))
  

}

// suprimer une ligne du tableau
// document.getElementsByClass('basket-trash').addEventListener('click', (e) => {
//  console.log('clic !')
//})

// Validation du formulaire avant l'envoi au serveur

/* En fait construire un objet c'est un peu de la merde y'a mieux
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

class Form {
  constructor(firstName, lastName, address, city, email) {
    // On valide le nom et le prénom de l'utilisateur

    if (!firstName || !lastName) {
      throw new Error('Vous devez renseigner votre nom et votre prénom')
    }
    if (typeof firstName != 'string' || typeof lastName != 'string') {
      throw new Error('Nom et/ou prénom invalide(s)')
    }
    if (firstName.length < 2 || lastName.length < 2) {
      throw new Error('Nom et/ou prénom incorrecte(s)')
    }
    this.firstName = firstName
    this.lastName = lastName

    // On valide l'adresse et la ville de l'utilisateur

    if (!address || !city) {
      throw new Error('Vous devez renseigner votre adresse complète')
    }
    if (typeof address != 'string' || typeof city != 'string') {
      throw new Error('le format adresse est incorrecte')
    }

    this.adrress = address
    this.city = city

    // On valide l'adresse mail grâce à une fonction

    if (!validateEmail(email)) {
      throw new Error('email invalide!')
    }
    this.email = email
  }
}*/

let form = document.getElementById('form');

// Écoute de la modification des champs de texte
form.firstName.addEventListener("change", function() {
    textValid(this);
});
form.lastName.addEventListener("change", function() {
    textValid(this);
});
form.address.addEventListener("change", function() {
    adressValid(this);
});
form.city.addEventListener("change", function() {
    textValid(this);
});
form.email.addEventListener("change", function() {
    textValid(this);
});

// Validation de l'input text
let textValid = function(textInput) {

    // RegExp text
    let textRegExp = new RegExp('.{2,}', 'g');
    
    // Récupération de la balise <small>
    let errorMessage = textInput.nextElementSibling;

    // Test de la RegExp
    if(!textRegExp.test(textInput.value)) {
        errorMessage.innerHTML = 'Ce champ texte doit comporter au moins 2 caractères';
        errorMessage.classList.add('text-danger');
        return false
    } else {
        errorMessage.innerHTML = '';
        errorMessage.classList.remove('text-danger');
        return true;
    }
};

// Validation de l'input email
const emailValid = function(emailInput) {

    // RegExp email
    let emailRegExp = new RegExp('^[a-z0-9.-_]+([@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,10})$', 'g');

    // Récupération de la balise <small>
    let errorMessage = emailInput.nextElementSibling;

    // Test de la RegExp
    if(!emailRegExp.test(emailInput.value)) {
        errorMessage.innerHTML = 'L\'adresse mail doit être au format exemple@mail.fr';
        errorMessage.classList.add('text-danger');
        return false
    } else {
        errorMessage.innerHTML = '';
        errorMessage.classList.remove('text-danger');
        return true;
    }
};

// Validation de l'input address
const addressValid = function(addressInput) {

    // RegExp address
    let addressRegExp = new RegExp('.{5,}', 'g');

    

    // Test de la RegExp
    if(!addressRegExp.test(addressInput.value)) {
        errorMessage.innerHTML = 'L\'adresse postale doit comporter au moins 5 caractères';
        errorMessage.classList.add('text-danger');
        return false
    } else {
        errorMessage.innerHTML = '';
        errorMessage.classList.remove('text-danger');
        return true;
    }
};

// Écoute de la soumission du formulaire
form.addEventListener('submit', (e) => { 
    e.preventDefault(); // Empêche le bouton submit d'envoyer les données
    if(textValid(form.lastName) && textValid(form.firstName) && emailValid(form.email) && addressValid(form.address) && textValid(form.city) ) {

        let contact = {
            
            firstName : form.firstName.value,
            lastName : form.lastName.value,
            address : form.address.value,
            city : form.city.value
            email : form.email.value,
        }


        fetch("http://localhost:3000/api/teddies/basket", {
            method: 'POST',
            headers: {
                'content-type' : "application/json"
            },
            body: JSON.stringify(body),
        })
        .then(response => response.json())
        .then(function (response) {
            if (response.orderId) {
                localStorage.setItem('orderId', response.orderId);
                window.location.href = "order.html";    
            } else {
                throw 'Pas de numéro de commande'
            }
        }) .catch(function (error) {
            console.error(error);
        })
    }
});

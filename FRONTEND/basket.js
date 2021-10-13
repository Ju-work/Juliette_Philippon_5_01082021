showBasket()
totalPrice()

// On affiche le panier dans le localstorage

function showBasket(){
  let arrayCommande = JSON.parse(localStorage.getItem("basket"))
  var corpsHtml = "<tr>"
  arrayCommande.forEach(element => {
    console.log(element)
    corpsHtml = corpsHtml 
      + "<tr>"
      + "<td>" + element.name + "</td>"
      + "<td>" + element.colors + "</td>" 
      + "<td>" + element.price/100 + "€" + "</td>"
      + "</tr>" 
  });
  corpsHtml = corpsHtml + "</tr>"
  document.getElementById('basket-tablebody').innerHTML =corpsHtml
}

function totalPrice(){
  let price = 0
  let arrayCommande = JSON.parse(localStorage.getItem("basket"))

  arrayCommande.forEach(element => { 
    price = price + element.price
  });
  price = price / 100
  document.getElementById('total').innerHTML =price + "€"
}




// Validation du formulaire avant l'envoi au serveur

function validateEmail(email){
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
 
}

class Form {
  constructor(firstName, lastName, address, city, email,) {
   
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

    if(!address || !city){
      throw new Error('Vous devez renseigner votre adresse complète')
    }
    if (typeof address != 'string' || typeof city != 'string'){
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
}

const myForm = document.getElementById('form')

myForm.addEventListener('click', (e) => {
  e.preventDefault()
  console.log(e.explicitOriginalTarget.form[2].value)

  // On valide le nom
  const firstName = e.explicitOriginalTarget.form[0].value
  const rxFirstName = /^([a-zA-Z]){2,}$/

  if (!rxFirstName.test(firstName)) {
    alert('Merci de renseigner un prénom valide')
    return
  }

  // On valide le prénom
  const lastName = e.explicitOriginalTarget.form[1].value
  const rxLastName = /^([a-zA-Z]){2,}$/

  if (!rxLastName.test(lastName)) {
    alert('Merci de renseigner un nom valide')
    return
  }

  // On valide l'adress
  const address = e.explicitOriginalTarget.form[2].value
  //const rxAddress = [a-zA-Z0-9\s]+;
  const rxAddress = ''

  if (!rxAddress.test(address)) {
    alert('Merci de renseigner le numéro et libellé de la voie')
    return
  }

  // On valide la ville
  const city = e.explicitOriginalTarget.form[3].value
  //const rxCity = [A-Za-z]{2,50};
  const rxCity = ''

  if (!rxCity.test(city)) {
    alert('Merci de renseigner le nom de la ville')
    return
  }

  // On valide le format de l'adresse mail
  const email = e.explicitOriginalTarget.form[4].value
  //const rxEmail = [a-zA-Z0-9._\-]+@[a-zA-Z0-9._\-]+\.[a-zA-Z]{2,10};
  const rxEmail = ''

  if (!rxEmail.text(email)) {
    alert("Merci d'entrer une adresse mail valide")
    return
  }

  // J'envoie mes valeurs au backend
  const customer = {
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    email: email,
  }

  const listProductsFromStorage = [{ _id: '' }]

  const products = listProductsFromStorage.map((item) => item._id)
  console.log(products)

  const postData = {
    customer,
    products,
  }
  console.log(postData)

  fetch('http://localhost:3000/api/teddies/basket', {
    method: 'POST',
    body: JSON.stringify(postData),
  })
    .then((Response) => Response.json())
    .then((data) => localStorage.setItem('order-confirm', JSON.stringify(data)))
})

console.log(myForm.firstName.value)

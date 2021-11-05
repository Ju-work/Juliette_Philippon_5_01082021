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
  const rxAddress = /^[a-zA-Z0-9\s]+$/

  if (!rxAddress.test(address)) {
    alert('Merci de renseigner le numéro et libellé de la voie')
    return
  }

  // On valide la ville
  const city = e.explicitOriginalTarget.form[3].value
  const rxCity = /^([A-Za-z]){2,50}$/

  if (!rxCity.test(city)) {
    alert('Merci de renseigner le nom de la ville')
    return
  }

  // On valide le format de l'adresse mail
  const email = e.explicitOriginalTarget.form[4].value
  const rxEmail = /^[a-zA-Z0-9._\-]+@[a-zA-Z0-9._\-]+\.[a-zA-Z]{2,10}$/
  //const rxEmail = ''

  if (!rxEmail.test(email)) {
    alert("Merci d'entrer une adresse mail valide")
    return
  }

  // J'envoie mes valeurs au backend
  const contact = {
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    email: email,
  }

  const listProductsFromStorage = JSON.parse(localStorage.getItem('basket'))

  const products = listProductsFromStorage.map((item) => item._id)
  const postData = {
    contact,
    products,
  }
  fetch('http://localhost:3000/api/teddies/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
    .then((Response) => Response.json())
    .then((data) => {
      //console.log('test')
      console.log(data)
      localStorage.setItem('orderID', data.orderId)
      document.location.href = 'order.html'
      return data
    })
    .catch((err) => {
      alert("L'erreur suivante est apparue : " + err)
      return false
    })
})

console.log(myForm.firstName.value)
console.log(myForm.city.value)

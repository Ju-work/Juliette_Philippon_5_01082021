const myForm = document.getElementById('form')

myForm.addEventListener('submit', (event) => {
  event.preventDefault()
  let errors = []
  
  // On valide le nom
  const firstName = document.getElementById('firstName').value
  const rxFirstName = /^([a-zA-Z]){2,}$/

  if (!rxFirstName.test(firstName)) {
    errors.push('entrez un prénom valide')
  }

  // On valide le prénom
  const lastName = document.getElementById('lastName').value
  const rxLastName = /^([a-zA-Z]){2,}$/

  if (!rxLastName.test(lastName)) {
    errors.push('entrez un nom valide')
  }

  // On valide l'adress
  const address = document.getElementById('address').value
  const rxAddress = /^[a-zA-Z0-9\s]+$/

  if (!rxAddress.test(address)) {
    errors.push('entrez une adresse valide')
  }

  // On valide la ville
  const city = document.getElementById('city').value
  const rxCity = /^([A-Za-z]){2,50}$/

  if (!rxCity.test(city)) {
    errors.push('entrez une ville valide')
  }

  // On valide le format de l'adresse mail
  const email = document.getElementById('email').value
  const rxEmail = /^[a-zA-Z0-9._\-]+@[a-zA-Z0-9._\-]+\.[a-zA-Z]{2,10}$/

  if (!rxEmail.test(email)) {
    errors.push('entrez un mail valide')
  }

  if (errors.length > 0) {
    alert(errors.join('\n'))
  } else {
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
        localStorage.setItem('orderID', data.orderId)
        localStorage.setItem('firstName', data.firstName)
        document.location.href = 'order.html'
        return data
      })
      .catch((err) => {
        alert("L'erreur suivante est apparue : " + err)
        return false
      })
  }
})

console.log(myForm.firstName.value)
console.log(myForm.city.value)

console.log('bla bla bla')
console.log(localStorage.getItem('orderID'))

const confirmation = document.getElementById('order-confirm')

confirmation.innerHTML += `<p> Merci ${localStorage.getItem(
  'firstName'
)}</p><p>Votre numéro de commande :
 <span class="num-order"> ${localStorage.getItem('orderID')}</span></p>
 <p>Orinoco vous remercie pour votre achat !</p>
 <p>À bientôt !</p>`

function clearStorage() {
  localStorage.clear
}

 console.log('testdsqdsqdsq')
 console.log(localStorage.getItem('orderID'))



 //const contactName = JSON.parse(localStorage.getItem('contact'))
 const confirmation = document.getElementById('order-confirm')

 confirmation.innerHTML +=`<p> Merci ${document.getElementById('firstName')}</p><p>Votre numéro de commande :
 <span class="num-order"> ${localStorage.getItem('orderID')}</span></p>
 <p>Orinoco vous remercie pour votre achat !</p>
 <p>À bientôt !</p>`

function clearStorage(){
    localStorage.clear
}



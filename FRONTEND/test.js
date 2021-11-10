function showBasket() {
    let arrayCommande = JSON.parse(localStorage.getItem('basket'))
    
    arrayCommande.forEach((element, index) => {
      document.getElementById('basket-tablebody').innerHTML +=`<tr>${element.name}</tr>
      <tr>${element.colors}</tr>
      <tr>${element.price} €</tr>
      <button data-productId="${index}" class=" delete-button fas fa-trash-alt"></button>`
      
    })
   
    
    
    
    document.querySelectorAll('.delete-button').forEach((element) => {
      element.addEventListener('click', () => {
        console.log(element.dataset)
        deleteProductToBasket(element.dataset.productid)
        document.location.reload()
      })
    })
  }
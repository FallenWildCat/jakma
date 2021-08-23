function checkElement(){
		var createdElement = document.getElementById("cartishere")
    	if(typeof(createdElement) != 'undefined' && createdElement != null){
			
			arrCart();

		}else{
			
	        insertionQ('#cartishere').every(function(element){
				
   		        arrCart()
				
			})				
	    
		
		}
}

function arrAddToCart(){	

var name = document.getElementById("productname").getElementsByTagName('h1')[0].innerText // changes with builder

var sku = document.querySelector(".sku").innerText

var imagesrc = document.getElementById("imagesrc").getElementsByTagName('img')[0].src

var imagesrcset = document.getElementById("imagesrc").getElementsByTagName('img')[0].srcset

var qty = document.getElementById("addtocart").querySelector(".input-text").value // changes with builder

var price = document.getElementById("productprice").getElementsByTagName('ins')[0].getElementsByTagName('bdi')[0].innerText.substring(1) //changes with builder

var subttl = qty*price

var itemspecs = {
	name: name,
	sku: sku,
    imgsrc: imagesrc,
	imgsrcset: imagesrcset,
	linkhref: window.location.href,
	quantity: qty,
	price: document.getElementById("productprice").getElementsByTagName('ins')[0].getElementsByTagName('bdi')[0].innerText,
	subtotal: subttl
	};


if (localStorage.getItem("ProductDetails") === null) {
	
	var productDetails = []     
	productDetails.push(itemspecs)   
	localStorage.setItem("ProductDetails", JSON.stringify(productDetails));
	Swal.fire(
	  name+ ' added to Cart',
	  'Check the cart to update',
      'success'
    )
}
else{	

	var productDetails = JSON.parse(localStorage.getItem("ProductDetails"))
		
	if(productDetails.findIndex(p => p.sku == sku) == -1){
		
		productDetails.push(itemspecs)
	    localStorage.setItem("ProductDetails", JSON.stringify(productDetails))		
	    Swal.fire(
	      name+ ' added to Cart',
	      'Check the cart to update',
          'success'
        )
	}else{
		Swal.fire({
		icon: 'info',
		title: name+ ' is already in Cart'		
		})
	}
	}	
	
}

//----------------------------------------------------//
//----------------------------------------------------//

function arrRemoveItem() {

	var buttonClicked = event.target
	var sku = buttonClicked.parentElement.parentElement.querySelector('#ProductId').textContent
	var productDetails = JSON.parse(localStorage.getItem("ProductDetails"))
	var index = productDetails.findIndex(p => p.sku == sku) 
	
	productDetails.splice(index,1)
	localStorage.setItem("ProductDetails", JSON.stringify(productDetails));
	
	buttonClicked.parentElement.parentElement.remove();
	
	if(productDetails.length == null || productDetails.length == 0){
		Swal.fire({
		icon: 'info',
		title: 'Your cart is empty!'		
		})
    }
	

}



//----------------------------------------------------//
//----------------------------------------------------//


function arrCart(){

document.getElementById("tablebodyhere").innerHTML = ""

var productDetails = JSON.parse(localStorage.getItem("ProductDetails"))

if(productDetails.length == null || productDetails.length == 0){
		Swal.fire({
		icon: 'info',
		title: 'Your cart is empty!'		
		})
}

else{

for (i = 0; i <= productDetails.length-1; i++) {

	var cartItems = document.getElementById("tablebodyhere")
	var cartRow = document.createElement('tr')
    cartRow.classList.add('woocommerce-cart-form__cart-item', 'cart_item');
	var specs = productDetails[i]


	var productname = specs.name
	var sku = specs.sku
	var imagesrc = specs.imgsrc
	var imagesrcset = specs.imgsrcset
	var linkhref = specs.linkhref
	var quantity = specs.quantity;	
	var price = specs.price.substring(1)
	var subtotal = specs.subtotal
	var cartRowContents = `<td class="product-remove">
							<a href="javascript:;" class="remove" aria-label="Remove this item" onclick="arrRemoveItem()">×</a></td>
							
  					       <td class="product-thumbnail">
						   <a href=${linkhref}><img width="300" height="300" src=${imagesrc} class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" loading="lazy" srcset=${imagesrcset} sizes="(max-width: 300px) 100vw, 300px"></a>						   
						   </td>

						   <td class="product-name" data-title="Product"><a href=${linkhref}>${productname}</a></td>
						   
						   <td class="product-name" id="ProductId" data-title="ProductId"><a href=${linkhref}>${sku}</a></td>
						   


						   <td class="product-price" data-title="Price">
							<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">₹</span>${price}</bdi></span>	</td>

						   <td class="product-quantity" data-title="Quantity">
							<div class="quantity">
				            <label class="screen-reader-text" for="quantity_5f5a25eda9411">Tshirt 2 quantity</label>
		                   <input type="number" id="quantity_5f5a25eda9411" class="input-text qty text" step="1" min="1" max="" value=${quantity} title="Qty" size="4" placeholder="" inputmode="numeric" onchange="arrUpdateQuantity()">
			                </div>
						   </td>

						   <td class="product-subtotal" data-title="Subtotal">
							<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">₹</span>${subtotal}</bdi></span></td>`

    cartRow.innerHTML = cartRowContents
	cartItems.append(cartRow)

}
}
}

//----------------------------------------------------// 


function arrUpdateQuantity(){
	
    var existing = JSON.parse(localStorage.getItem("ProductDetails"))	
	
    var sku = event.target.parentElement.parentElement.parentElement.querySelector('#ProductId').textContent
	
	var qty = event.target.value

    if(qty == 0){		
	
	event.target.value = 1
	qty = 1
	
	}	
	
	var index = existing.findIndex(p => p.sku == sku)	
	
	var price = existing[index].price.substring(1)	
	
	var subtotal = price*qty	
	
	existing[index].quantity = qty	
	
	existing[index].subtotal = subtotal	
	
	localStorage.setItem("ProductDetails", JSON.stringify(existing))
	
	event.target.parentElement.parentElement.parentElement.getElementsByClassName("product-subtotal")[0].getElementsByClassName("woocommerce-Price-amount")[0].getElementsByTagName('bdi')[0].innerHTML = `<span class="woocommerce-Price-currencySymbol">₹</span>${subtotal}`
//
//	
//	
}
//
////----------------------------------------------------//

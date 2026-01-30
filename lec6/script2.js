
const cart=["shirt,trouser","shoes","shades"];

const promise = createOrder(cart) ;//this is an async fn

// consume

promise.then(function(orderId){
    
   console.log(orderId);// this runs only when  promise is resolved 
}).catch(function(e){
    console.log(e.message)
    alert("error",e.message)

})

//Creation of promise / backend side / producer side

function createOrder(cart){
    const pr = new Promise(function(resolve,reject){
        //createOrder
        //validate the cart 
        //return orderId

//fail first approach
if(!validateCart(cart)){
    const err = new Error("Cart is Invalid");
    reject(err)

}
//logic for createOrder
const orderId = '1101'

if(orderId){
    setTimeout(function(){
resolve(orderId);
    },2000);
    
}
    })
    return pr
}
function validateCart(){
    return false
}

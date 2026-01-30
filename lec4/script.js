console.log("Asynchronous Programming");


// Synchronous code 
console.log("Before")
 function fun (){
    console.log("I am Fun");

 }
 console.log("After");

//  ---------Asynchronous Code-------------

console.log("Before")
 function fun (){
    console.log("I am Fun");

 }

 setTimeout(fun,0 ) // this task is delegated to browser through web API's
 console.log("After");


// /------quiz 1--------------
console.log("Before"); //1
const fun2 = () => {
  console.log("Set timeout 1");//3 -> 1sec
  let timeInFuture = Date.now() + 7000;

  while (Date.now() < timeInFuture) {}
  console.log("after while"); //4 ->8th second
};
const fun1 = () => console.log("hello");  //5 - 8th second

setTimeout(fun1, 2000);
setTimeout(fun2, 1000);

console.log("After"); //2


//Set Interval 
let i =0;
let id = setTimeout(() => {
    console.log("i am inside the interval ",++i)
    if(i==5){
        clearInterval(id);
    }
}, 1000);
const input = document.getElementById("input");
const button = document.getElementById("search-button");
let nam = document.getElementById("cont2")
button.addEventListener("click",function(){
  const location = input.value.trim();
  
  //calling api 
    async function fn() {
        console.log("Inside function");
        const response = await fetch(
          "http://api.weatherapi.com/v1/current.json?key=eb14b1d04463469cbf542806262301&q=location&aqi=no",
 
        );
        console.log(response);
        const jsonData = await response.json();
        console.log("Bottom of fn")

      }


      fn();

    input.value= null
})
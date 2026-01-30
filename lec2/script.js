// function quantity (c){
//     var sum =0;
//     const p1=500;
//     const p2=450;
//  if(c>=10){
// sum = p2*c;
//  }else{
//     sum= p1*c
//  }
//  sum += sum*18/100
//  return sum;
// }
// console.log(quantity(3));


// var s = function quantity (c){
//     var sum =0;
//     const p1=500;
//     const p2=450;
//  if(c>=10){
// sum = p2*c;
//  }else{
//     sum= p1*c
//  }
//  sum += sum*18/100
//  return sum;
// }   
//  console.log(s(3));




// var s = (c)=>{
//     var sum =0;
//     const p1=500;
//     const p2=450;
//  if(c>=10){
// sum = p2*c;
//  }else{
//     sum= p1*c
//  }
//  sum += sum*18/100
//  return sum;
// }   
//  console.log(s(3));


let x = 10;
function outer (){
      let x =20;
      function inner (){
        console.log(x);
      }
      inner()
}
outer()
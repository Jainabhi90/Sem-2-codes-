
let arr = [1,2,3,4,5,6,7,8]

// let arr2 = new Array(10,20,30)
//console.log(arr2)

// TO Get the Part of  an Array

let subArr  = arr.slice(2,6)
console.log("SubArray "+subArr)
console.log("original Array "+arr)

// Splice 
// Remove elements
arr.splice(2,3);// (StartIndex , no.of ELemnts to be removed )
console.log("Spliced array ",arr)

// Remove and add elements splice (Startindex , no. oF elements ,elem1,elm2....)
arr.splice(2,0,10,20,30,40)//1,2,10.20,30,40,5,6,7,8
console.log(arr)
//splice cna be used to  add elements in between the  arr

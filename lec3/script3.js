//substring

let str = "hello world "
console.log(str.charAt(4))
console.log(str.charCodeAt(4))
console.log(str.substring(7))
console.log(str.substring(4,9))
console.log(str.substring(-10))
console.log(str.substring(11,9))// the values here have been swaped 


//Slice Function
let str1 = str.slice(7)
console.log(str1)

let str2 = str.slice(4,9)
console.log(str2)

let str3 = str.slice(11,9)// slice function does not have  the error handling so it will give empty string 
console.log(str3)

let str4 = str.slice(-1)// cuts from the end of the string 
console.log(str4)

console.log(str.includes("dog"))
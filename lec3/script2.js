let searchQuery = " Learn JavaScript Functions Arrow IIFE "

//Trimmed String
console.log(searchQuery.trim())
//Uppercased String
console.log(searchQuery.toUpperCase())
//LowerCased String
console.log(searchQuery.toLowerCase())
// Extraction of JavaScript
// Using substring :- 
console.log(searchQuery.substring(7,17))
//Using Slice :- 
console.log(searchQuery.slice(7,17))
// check wheather query contains functions arrow and iife
console.log(searchQuery.includes("Functions"))
console.log(searchQuery.includes("Arrow"))
console.log(searchQuery.includes("IIFE"))
//print charAt 6
console.log(searchQuery.charAt(6))
console.log(searchQuery.charCodeAt(0))
//case insensitive 
let str1 = searchQuery.toLowerCase()
console.log(str1.includes("javascript"))


document.querySelector(".grandparent").addEventListener("click",() =>{
    let a=document.getElementById("list")
    let li=document.createElement('li');
    li.innerText="grand-capturing"
    a.append(li)
})
document.querySelector(".grandparent").addEventListener("click",() =>{
    let a=document.getElementById("list")
    let li=document.createElement('li');
    li.innerText="grand-bubbling"
    a.append(li)
    })
document.querySelector(".parent").addEventListener("click",() =>{
    let a=document.getElementById("list")
    let li=document.createElement('li');
    li.innerText="grand-capturing"
    a.append(li)
    })
document.querySelector(".parent").addEventListener("click",() =>{
    let a=document.getElementById("list")
    let li=document.createElement('li');
    li.innerText="parent-capturing"
    a.append(li)
    })
document.querySelector(".parent").addEventListener("click",() =>{
    let a=document.getElementById("list")
    let li=document.createElement('li');
    li.innerText="parent-bubbling"
    a.append(li)
    })
document.querySelector(".parent").addEventListener("click",(e) =>{
    let a=document.getElementById("list")
    let li=document.createElement('li');
    li.innerText="grand-bubbling"
    a.append(li)
    e.stopPropagation();
    })
    document.querySelector(".clear").addEventListener("click",() =>{
        let a=document.getElementById("list")
        a.innerHTML=""
    })

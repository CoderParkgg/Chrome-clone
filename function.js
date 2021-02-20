const btn = document.querySelector(".iconDoor");
const btn1 = btn.querySelector("i");
const box = document.querySelector("#iconBox");
const img = document.querySelector("img");

function handleBtn(event){
    box.classList.add("listAppear");
}

function handleWindow(event){
    box.classList.remove("listAppear");
}

function init(){
    btn.addEventListener("mouseover", handleBtn);
    btn1.addEventListener("mousemove", handleBtn)
    btn.addEventListener("mouseout", handleWindow);
    box.addEventListener("mouseenter", handleBtn);
    box.addEventListener("mousemove", handleBtn)
    box.addEventListener("mouseout", handleWindow);
}init();
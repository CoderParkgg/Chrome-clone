const form = document.querySelector(".js-form"),
input = form.querySelector("input"), 
greeting = document.querySelector(".js-greetings");
//querySelector은 나오는 첫번째 것을 가리킴.
//querySelectorAll은 같은 요소 모두를 가리킴. 

const USER_LS = "currentUser",
SHOWING_CN = "showing";

function saveName(name){
    localStorage.setItem(USER_LS, name);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}!`;
}

function handleSubmit(event){
    event.preventDefault(); 
    //form의 기본적인 submit(엔터를 누르거나 버튼 클릭)은 안의 내용물을 저장된 다른 곳으로 보낸다.
    //submit의 기본적인 default값은 어지로 보낼지, 보내고 어떻게 할지가 정해지지 않았기 때문에 정보가 날아가고 리프레쉬된다.
    //submit의 기본값을 없애는 것이 event.preventDefault
    const currentValue = input.value;
    //console.log(currentValue);
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit)
}

function roadName(){
    const currentUser = localStorage.getItem(USER_LS);
    //localStorage값이 들어있지 않으면 null반환.
    //localStorage는 웹이 사용자의 정보를 저장하는 것
    if(currentUser === null){
        askForName();

    }else{
        paintGreeting(currentUser);
    }
}

function init(){
    roadName();
}


init();
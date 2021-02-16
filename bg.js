const body = document.querySelector("body");

const IMG_NUMBER = 4;

function showBg(event){
    const image = document.querySelector("img");
    image.classList.remove("form");
    image.classList.add("bgImage_animation");
    
}

function paintImage(imgNumber){
    const image = new Image();
    image.src = `Photos/${imgNumber + 1}.jpg`
    //body.appendChild(image); //배경에 이미지 넣기
    body.prepend(image); //appendChild와 비슷하다. 자식 태그 중 가장 먼저 위치하도록 한다.(appendChild는 그 반대)
    image.classList.add("bgImage", "form");
    image.addEventListener("load", showBg);
}

function getRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER); //무작위로 수를 뽑는다.
    return number;
}

function init(){
    const randomNumber = getRandom();
    paintImage(randomNumber);
}

init();
//math라는  Object가 존재. 많은 메소드가 존재하지만 그중 random()을 사용해 랜덤으로 수를 불러올것
//random으로 불러온 수는 0.~~으로 나옴. n개 중에서 뽑고싶다면 *n을 해준다.
//하지만 소수점이 같이 나오기 때문에 floor() 혹은 ceil()을 사용해 내림, 혹은 올림을 해준다.
const clockContainer = document.querySelector(".js-clock"),
    clockTitle = document.querySelector("h1");

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hour = date.getHours();
    const second = date.getSeconds();
    clockTitle.innerHTML = `${hour < 10 ? `0${hour}` : `${hour}`}
    :${minutes < 10 ? `0${minutes}` : `${minutes}`}
    :${second < 10 ? `0${second}` : `${second}`}`
}
setInterval(getTime, 0);



function init(){};


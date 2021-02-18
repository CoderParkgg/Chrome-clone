const API_KEY = "1c6e054fde44d1a76b50f577cd497acb";
const weather = document.querySelector('.js-weather');
const COORDS = "coords";

function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json(); //가져온 데이터를 처리 (준비) 이부분은 다음 강좌에서
    }).then(function(json){
        console.log(json);
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerHTML = `${temperature} @ ${place}`
    })
}
//api 사이트에서 이처럼 정보를 주는 사이트 주소를 준다. 이것을 fetch함수에 넣어서 사용한다. 
//javaScript는 정보를 한번 받고 끝내는 것이 아닌 실시간으로 정보를 주고 빋는다. 이를 fetch가 해주는듯?
//주소를 그대로 복붙하지말고 https:// 를 붙여줘야 하며 변수를 사용할 수 있도록 하여서 변수부분에 $을 넣어서 살려야 한다. api key도 넣어야 함.
//위는 OpenWeather이라는 사이트에서 가져왔으며 단위를 변경하고 싶으면 Formet에 가서 맞는 단위를 찾아 사용할 수 있다. 
//웹사이트 주소는 여러 정보들이 들어있는데 이러한 정보들은 &로 나누어져 있다. 즉 만약 단위를 바꾸려고 한다면 &를 붙이고 정보를 입력해주면 된다.


function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj)); //항상 Object를 저장할 때는 JSON을 이용해 STRING으로 바꿔 사용하자.
}

function handleGeoSuccess(position){
    //console.log(position) : 콘솔창에 사용자의 위치정보가 나타난다. 
    const latitude = position.coords.latitude; //위도의 정보를 저장한다.
    const longitude = position.coords.longitude; //경도 정보를 저장한다.
    const coordsObj = {
        latitude, //latitude : latitude, 와 같은 코드이다.
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Cant access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
    //navigator처음으로 나옴. 
    //geolocation.getCurrentposition은 사용자의 위치를 가져온다. 가져오기 전에 사용자에게 위치정보 이용 동의를 구하는데 동의했을 때, 안했을 때 함수를 실행할 수 있다.
    //argument로 2개의 함수 이름을 받으며 성공하면 첫번 째, 실패하면 2번째 함수를 실행한다.
}

function loadCoords(){
    const loadCoords = localStorage.getItem(COORDS);
    if(loadCoords === null){
        askForCoords();
    }
    else{
        const parseCoords = JSON.parse(loadCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();
//network 패널에서 확인 가능하다. api가 잘 작동한다면 파일로 나와야 함. 파일에 들어가면 api가 준 정보들이 있다.
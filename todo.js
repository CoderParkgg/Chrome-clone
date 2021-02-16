const toDoForm = document.querySelector('.js-toDoForm'); //다른 js파일에서 중복되는 이름으로 const를 재정의 할 수 없다.
const toDoInput = toDoForm.querySelector("input"); //미리 doc을 만들어논 상태라면 그 안에 자식 태그를 이처럼 정의 가능하다. (태그 이름으로 해도 됨)
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode; //부모 태그를 가져온다. 
    toDoList.removeChild(li); //부모 태그 안에 있는 파라미터로 받은 자손 태그를 지운다.
    const cleanToDos = toDos.filter(function(toDos){ //filter은 배열의 모든 아이텀을 통해 함수를 실행하고 true인 아이템들만 가지고 새로운 배열을 만든다.
        return toDos.id !== parseInt(li.id); //정수형으로 형변환
    }); 
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    //localStorage.setItem(TODOS_LS, toDos);
    //storage에는 문자열만이 저장될 수 있다. 즉 위의 코드는 배열이라는 코드를 저장하려는 것이므로 제대로 작동되지 않느다.
    //이를 해결하기 위해 JSON을 이용한다.
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement('li'); //html의 태그를 생성한다.
    const delBtn = document.createElement('button');
    const span = document.createElement('span');
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span); //li가 부모태그가 되고 그 안에 argument로 받은 값을 넣는다.
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id: newId //배열의 길이를 알 수 있다.
    };
    toDos.push(toDoObj); //배열에 요소를 넣어줄 수 있다. 
    //위의 코드는 배열에 객체를 넣는데 객체의 id에 순서대로 1, 2, ..해주는 것을 배열의 길이 + 1로 설정
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currnetValue = toDoInput.value;
    paintToDo(currnetValue);
    toDoInput.value = ""; 
}

function loadToDos(){
    const loadedToDo = localStorage.getItem(TODOS_LS);
    if(loadedToDo !== null){
        const parsedToDos = JSON.parse(loadedToDo);//string을 object로 바꿔주는 코드
        //JSON은 JavaScript Object N~~~이다. Object의 내용을 string으로, string을 object로 바꿔줄 수 있다.
        parsedToDos.forEach(function(toDo){ //하나씩 실행해주는 코드(?) 파라미터로 함수의 이름을 받고 이것처럼 한번에 함수를 정의할 수 있다.
            paintToDo(toDo.text);
        });
    }
}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);//(주의)input이 아닌 form에 만들어야 한다!
}

init();
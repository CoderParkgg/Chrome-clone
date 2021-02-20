const refreshBtn = document.querySelector(".redo");

function handleRedo(event){
    localStorage.removeItem("toDos");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("coords");
    location.reload();
}

function init(){
    refreshBtn.addEventListener("click", handleRedo);
    console.log("load");
}init();
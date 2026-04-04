function toggleDropdown(){
    document.getElementById("dropdown").classList.toggle("show");
}

window.onclick = function(e){
    if(!e.target.matches('.dropdown-btn')){
        document.getElementById("dropdown").classList.remove("show");
    }
}

function copyIP(){
    navigator.clipboard.writeText("duzat");

    const notification = document.getElementById("notification");
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 2000);
}

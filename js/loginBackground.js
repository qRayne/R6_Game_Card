// code de : https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown_right
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// mon code :
function Background_nokk() {
    document.querySelector(".background").style.backgroundImage = "url('nokk.jpg')";
    //document.body.style.backgroundImage = "url('lion.jpg')";
}

function Background_lion() {
    document.querySelector(".background").style.backgroundImage = "url('lion.jpg')";
}

function Background_buck() {
    document.querySelector(".background").style.backgroundImage = "url('buck.jpg')";
}

function Background_maverick() {
    document.querySelector(".background").style.backgroundImage = "url('maverick.jpg')";
}
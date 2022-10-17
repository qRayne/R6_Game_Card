// code de : https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown_right
function dropdownMenu() {
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

// mon code
document.querySelectorAll('a').forEach(lien => {
    lien.addEventListener('click', (e) => {});
});

document.addEventListener('click', (e) => {
    // recupère le nom de l'agent
    let elementId = e.target.id;

    if (elementId != '') {
        let stringUrl = "url('images/" + elementId + ".jpg')";
        document.querySelector(".background").style.backgroundImage = stringUrl;
    }
});
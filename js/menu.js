var open_Menu = false
var upload = false

function openMenu(){
    var elementos = document.getElementsByClassName('opcaoMenu')
    console.log(elementos);
    if(!open_Menu){
        open_Menu = true
        Array.from(elementos).forEach(elemento => {
            elemento.style.display = 'block'
        });
    }else{
        open_Menu = false
        Array.from(elementos).forEach(elemento => {
            elemento.style.display = 'none'
        });
    }
}
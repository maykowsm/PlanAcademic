var canva = SVG('#canva').size(window.innerWidth,window.innerHeight)

var rectPreLoad = []


function preLoad(){
    console.log('load');
    var recuoSuperior = 20
    var recuoLateral = 90
    var num_colunas = 9
    var altura = 50
    var espacamento_x = 10
    var espacamento_y = 5
    var raio = 5

    if(rectPreLoad.length > 0){
        for(let i = 0; i< rectPreLoad.length; i++){
            rectPreLoad[i].remove()
        }
    }

    var largura = (window.innerWidth - ((num_colunas + 1) * espacamento_x)- recuoLateral)/num_colunas

    for(let i = 0; i<= num_colunas; i++){
        let num_materias =  Math.round(Math.random() * 5 )

        for(let j = 0; j<= num_materias; j++){
            rect = canva.rect(largura, altura).move((i+1)*espacamento_x + i*largura + recuoLateral, recuoSuperior + (j+1)*espacamento_y + j*altura).fill(new SVG.Color('rgb(100,100,100)')).opacity(0.2).radius(raio)
            rectPreLoad.push(rect)
        }
    }    
}

async function main(){
    preLoad()
    var functionPreload = window.setInterval(preLoad,3141)    
}

main()
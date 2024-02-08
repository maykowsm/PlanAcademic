var canva = SVG('#canva').size(window.innerWidth,window.innerHeight)
var functionPreload //função para animação inicial em loop
var rectPreLoad = [] //lista de retangulos para animação inicial
var cards = [] //lista de cards de materias
var listDependencias = [] //lista de materias interdependentes
var listParCardDependente = [] // lista os pares dard, dependencia
var listLinhasPontos = [] //linhas e pontos de conecção entre os cards
var seed = 1996

// estilos dos cards
// Normal
var corCard = new SVG.Color('rgb(100,100,100)')
var corBorda = new SVG.Color('rgb(100,100,100)')
var opacidade = 1

//com foco
var corCardHover = new SVG.Color('rgb(55, 158, 184)')
var corBordaHover = new SVG.Color('rgb(255,255,255)')
var opacidadeHover = 1

//fora de foco
var corCardDesfoco = new SVG.Color('rgb(100,100,100)')
var corBordaDesfoco = new SVG.Color('rgb(100,100,100)')
var opacidadeDesfoco = 0.5

//dependentes
var corCardDependente = new SVG.Color('rgb(55, 158, 184)')
var corBordaDependente = new SVG.Color('rgb(55, 158, 184)')
var opacidadeDependente = 0.5


//estilos das linhas e pontos
var corLinhas = new SVG.Color('rgb(255, 255, 255)')
var espessuraLinha = 3
var diametroPontos = 5


//Cria a animação principal randomizando o numero de retangulos em cada coluna a cada interação
function preLoad(){
    var recuoSuperior = 20
    var recuoLateral = 50
    var num_colunas = 9
    var altura = 50
    var espacamento_x = 10
    var espacamento_y = 10
    var raio = 5

    clearPreLoad()

    var largura = (window.innerWidth - ((num_colunas + 1) * espacamento_x)- recuoLateral)/num_colunas

    for(let i = 0; i<= num_colunas; i++){
        let num_materias =  Math.round(Math.random() * 5 )

        for(let j = 0; j<= num_materias; j++){
            rect = canva.rect(largura, altura).move((i+1)*espacamento_x + i*largura + recuoLateral, recuoSuperior + (j+1)*espacamento_y + j*altura).fill(corCard).opacity(0.2).radius(raio)
            rectPreLoad.push(rect)
        }
    }    
}

// Limpa os retangulos da animação inicial
function clearPreLoad(){
    if(rectPreLoad.length > 0){
        for(let i = 0; i< rectPreLoad.length; i++){
            rectPreLoad[i].remove()
        }
    }
}

// limpa o desenho dos cards
function clearCards(){
    if(cards.length > 0){
        for(let i = 0; i< cards.length; i++){
            cards[i].remove()
        }
    }
}

// Busca materias correspeondentes a chave e valor no json
function getmaterias(key, value){
    var materias = []
    Object.entries(jsonData['materias']).forEach(element=>{
        if(element[1][key]){
            if(element[1][key] == value ){
                materias.push(element[1])
            }
        }     
    })

    return materias
}

// busca cards correspondentes a chave valor
function getCards(key, value){
    var lista = []
    cards.forEach(card=>{        
        if(card.data(key) == value ){
            lista.push(card)
        }
    })

    return lista
}

// identifica os cards que são dependentes
function getDependentes(card){
    
    var lista = []
    cards.forEach(elemento=>{
        elemento.data('dependencias').toString().split('-').forEach(dependencia=>{
            if(dependencia == card.data('id')){
                listDependencias = listDependencias.concat([elemento])
                getDependentes(elemento)
            }
        })
    })
    
}

// identifica as dependencias do card
function getDependencias(card){
    
    card.data('dependencias').toString().split('-').forEach(dependencia=>{
        if(dependencia != ''){
            lista = getCards('id', dependencia)
            listDependencias = listDependencias.concat(lista)
            getDependencias(lista[0])
        }
    })
    
}

// lista par [card, dependente]
function cardDependente(){
    listParCardDependente = []
    listDependencias.forEach(card=>{
        card.data('dependencias').toString().split('-').forEach(dependencia=>{
            listDependencias.forEach(cardDependencia=>{
                if(cardDependencia.data('id') == dependencia){
                    listParCardDependente = listParCardDependente.concat([[card, cardDependencia]])
                }
            })
        })
    })
}

// pega os pontos de entrada e saida para referencia das linhas bisel
function getPoints(card){
    return([[card.x(), card.y() + (card.height()/2)], [card.x() + card.width(), card.y() + (card.height()/2)]])
}

//Gerador de numeros pseudos aleatórios
function pseudoAleatorios(semente){
    var state = semente

    return function(){
        var x = Math.sin(state++) * 10000;
        return Math.abs(x - Math.floor(x))
    }
}

// Cria a interface baseado no jsonData
function load(){
    var recuoSuperior = 20
    var recuoLateral = 50
    var altura = 50
    var espacamento_x = 10
    var espacamento_y = 10
    var raio = 5
    var random = pseudoAleatorios(seed)
    clearCards()
    let materias = Object.entries(jsonData['materias'])
    var num_colunas = 0
    materias.forEach(materia => {
        if(parseInt(materia[1]['semestre']) > num_colunas){num_colunas = parseInt(materia[1]['semestre'])}
    })
    console.log(num_colunas);
    var largura = (window.innerWidth - ((num_colunas + 1) * espacamento_x)- recuoLateral)/num_colunas

    for(let i = 0; i<= num_colunas; i++){
        let materias  = getmaterias('semestre', i+1)
        materias.sort(function(){ return random()-0.5})
        
        for(let j = 0; j< materias.length; j++){
            card = canva.rect(largura, altura)
            card.move((i+1)*espacamento_x + i*largura + recuoLateral, recuoSuperior + (j+1)*espacamento_y + j*altura)
            card.fill(corCard)
            card.radius(raio)
            card.data({semestre: materias[j]['semestre'],
                        id: materias[j]['id'],
                        ch: materias[j]['ch'],
                        nome: materias[j]['nome'],
                        dependencias: materias[j]['dependencias'],
                        cursada: materias[j]['cursada'],
                        cursando: materias[j]['cursando'],
                        notaFinal: materias[j]['notaFinal'],
                        professor: materias[j]['professor'],
                        anotacoes: materias[j]['anotacoes']
                    })
            
            cards.push(card)
        }
    } 

}
// altera a visualização dos card dependentes
function showDependentes(focoCard){
    // console.log(listDependencias);
    listDependencias.forEach(card=>{
        if(focoCard.data('id') != card.data('id')){
            card.attr({fill: corCardDependente, stroke: corBordaDependente, opacity: opacidadeDependente})
        }        
    })
}

function showLines(){
    if(listDependencias.length > 1){
        listParCardDependente.forEach(par=>{
            // ponto inicial e final
            p1 = getPoints(par[0])[0]
            p2 = getPoints(par[1])[1]
            // pontos para configuração da curva correspondentes respectivamente ao ponto 1 e 2
            d = Math.abs(p1[0]-p2[0]) //distancia horozontal entre os pontos
            p3 = [p1[0] - (2/3) * d, p1[1]]
            p4 = [p2[0] + (2/3) * d, p2[1]]
            caminho = new SVG.PathArray([
                ['M', p1[0], p1[1]],
                ['C', p3[0],p3[1], p4[0], p4[1], p2[0], p2[1]]
            ])
            curva = canva.path(caminho).attr({fill: 'none' })
            curva.stroke({ color: corLinhas, width: espessuraLinha})
            

            circulo_1 = canva.circle(diametroPontos).move(p1[0]-(diametroPontos/2), p1[1]-(diametroPontos/2)).fill(corLinhas)
            circulo_2 = canva.circle(diametroPontos).move(p2[0]-(diametroPontos/2), p2[1]-(diametroPontos/2)).fill(corLinhas)
            listLinhasPontos.push(circulo_1)
            listLinhasPontos.push(circulo_2)
            listLinhasPontos.push(curva)
            
        })
    }
}


//Verifica se o mouse inside sobre o card e altera sua visualização
function insideCard(X, Y){
    cards.forEach(card=>{
        card.attr({fill: corCardDesfoco, stroke: corBordaDesfoco, opacity: opacidadeDesfoco})
    })
    for(let i = 0; i< listLinhasPontos.length; i++){
        listLinhasPontos[i].remove()
    }
    
    cards.forEach(card=> {
        if(card.inside(X, Y)){
            
            listDependencias = []
            listDependencias.push(card)
            getDependentes(card)
            getDependencias(card)
            cardDependente()            
            showLines()
            
            
            showDependentes(card) //altera a visualização dos cards dependente
            // console.log(listDependencias);

            card.attr({fill: corCardHover, stroke: corBordaHover, opacity: opacidadeHover})
            card.stroke({width: 2})           
        }
    })
}

// identifica o movimento do mouse e altera a visualização dos card sem foco
function mouseMove(event){
    console.log('mouseMove');
    insideCard(event.clientX, event.clientY)

    // console.log(event.clientY );

    if(event.clientY > 8 * 50){
        cards.forEach(card=>{
            card.attr({fill: corCard, stroke: corBorda, opacity: opacidade})

        })
    }

}


// Função principal das animações 
async function main(){
    preLoad()
    functionPreload = window.setInterval(preLoad,2000)    
}

main()
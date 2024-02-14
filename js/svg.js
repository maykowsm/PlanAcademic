var canva = SVG('#canva').size(window.innerWidth,window.innerHeight)
var functionPreload //função para animação inicial em loop
var rectPreLoad = [] //lista de retangulos para animação inicial
var cards = [] //lista de cards de materias
var listDependencias = [] //lista de materias interdependentes
var listParCardDependente = [] // lista os pares dard, dependencia
var listLinhasPontos = [] //linhas e pontos de conecção entre os cards
var listaNomes = [] //lista dos textox com os nomes das matérias
var cardSelecionado //armazena o card celecionado para manipulação na janela de materias
var canvaNomeAluno //armazena o svg com o nome do aluno
var seed = 1996
var num_colunas = 0
var listSemestres = []
var ch_realizada = 0 // quarda a carga horária ja realizada pelo aluno
var ch_total = 0 // guarda a carga horária total do curso




//configuração do layout dos cards
var altura = 60 
var recuoSuperior = 80 
var recuoLateral = 50    
var espacamento_x = 10
var espacamento_y = 10
var raio = 5
var largura

//parametros da janela de configuração
var style = 'dark' //estilo do layout
var nomeCurso = ''
var nomeAluno = ''
var mostrarMatriasCursadas = true
var mostrarMediaGeral = false
var mostrarProgressao = true
var corFundo = '#242424'




// estilos dos cards ------------------------------------------
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

//cursadas
var corCradCursado = new SVG.Color( '#927c00')
var corBordaCursado = new SVG.Color( '#927c00')
var opacidadeCursado = 1



//estilos das linhas e pontos ------------------------------------
var corLinhas = new SVG.Color('rgb(255, 255, 255)')
var espessuraLinha = 3
var diametroPontos = 5

//estilo do texto dos cards -------------------------------------
var corTexto = new SVG.Color('rgb(255, 255, 255)')
var tamanhoTexto = 10


//Cria a animação principal randomizando o numero de retangulos em cada coluna a cada interação
function preLoad(){
    var recuoSuperior = 80
    var recuoLateral = 50
    var num_colunas = 9
    var altura = 50
    var espacamento_x = 10
    var espacamento_y = 10
    var raio = 5

    clearPreLoad()

    var largura = (window.innerWidth - ((num_colunas + 1) * espacamento_x)- recuoLateral)/num_colunas

    rectPreLoad.push(canva.rect(400,30).move((canva.width()/2) - 200,20).fill(corCard).opacity(0.2))
    rectPreLoad.push(canva.rect(150,20).move(60,20).fill(corCard).opacity(0.2))

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

function clearText(){
    listaNomes.forEach(texto=>{
        texto.remove()
    })
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

function getText(id){
    
    for(let i=0; i< listaNomes.length; i++){
        if(listaNomes[i].data('id') == id){
            return listaNomes[i]
        }
    }
    
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

function getString(str){
    let lista = str.split(' ')
    var frase = ''
    var text = canva.text()
    text.build(true)
    cont = 0
    for(let i = 0; i < lista.length; i++){

        if((cont+lista[i].length) < (largura/14)){
            cont += lista[i].length
            
            
        }else{
            if(frase != '' && frase != ' '){
                cont = 0
                text.tspan(frase).newLine()
                frase = ''
            }            
        }
        frase = frase + ' ' + lista[i]
    }
    text.tspan(frase).newLine()
    text.build(false)
    return text
}

function showNames(){
    cards.forEach(card=>{
        let text = getString(card.data('nome'))
        text.move(card.x()+(card.width()/2), card.y()-1).fill(corTexto).opacity(1)
        text.font({
            family: 'Arial',
            size: tamanhoTexto,
            anchor: 'middle'
        })
        text.data({id: card.data('id')})

        //adiciona um evento de click ao texto para abrir a janela de visualização de materia
        text.click(function(){
            cardSelecionado = getCards('id', this.data('id'))[0]
            loadMateria()
        })
        listaNomes.push(text)
        
    })
}

function clearHead(){
    canvaNomeAluno = ''
    nomeCurso = ''
    listSemestres.forEach(texto=>{ texto.remove()})
}

//carrega cabeçalho com nome do aluno curso e semestres
function loadHead(){
    //escreve o nome do aluno
    if(document.getElementById('input_nome_aluno').value == '' || document.getElementById('input_nome_aluno').value == ' '){
        nomeAluno = jsonData['aluno']['nome'].toString()    
    }else{
        nomeAluno = document.getElementById('input_nome_aluno').value
    }
    
    if(nomeAluno){
        canvaNomeAluno = canva.text('Aluno: '+nomeAluno).fill(corTexto).move(recuoLateral+10, 25)
        canvaNomeAluno.font({
            family: 'Arial',
            size: 18,
            // anchor: 'middle'
        })
    }
    

    //escreve o nome do curso
    nomeCurso = canva.text(jsonData['curso']['nome'].toString()).move(canva.width()/2, 20).fill(corTexto)
    nomeCurso.font({
            family: 'Arial',
            size: 30,
            anchor: 'middle'
        })
    
    for(let i = 0; i< num_colunas; i++){
        //escreve o númeral corespondente a cada semestre
        texto = canva.text((i+1).toString()+'ª').move(recuoLateral +(i+1)*espacamento_x + (i+1)*(largura)-(largura/2), recuoSuperior-15).fill(corTexto)
        texto.font({
            family: 'Arial',
            size: 15,
            anchor: 'middle'

        })
        listSemestres.push(texto)
    }
}

// carrega as configurações do json
function loadOptions(){
    
    if(Object.entries(jsonData['config']).length > 0){
        console.log('entrou');
        console.log(Object.entries(jsonData['config']).length);
        mostrarMatriasCursadas = jsonData['config']['mostrarMatriasCursadas']
        mostrarMediaGeral = jsonData['config']['mostrarMediaGeral']
        mostrarProgressao = jsonData['config']['mostrarProgressao']
        style = jsonData['config']['style'].toString()
        console.log(style);
        

        corFundo = jsonData['config']['corFundo']
        document.getElementById('body').style.backgroundColor = corFundo
        
        corCard = new SVG.Color(jsonData['config']['corCard'])
        corBorda = new SVG.Color(jsonData['config']['corCard'])

        corCardHover = new SVG.Color(jsonData['config']['corCardHover'])
        corBordaHover = new SVG.Color(jsonData['config']['corLinhas'])

        corCardDesfoco = new SVG.Color(jsonData['config']['corCard'])
        corBordaDesfoco = new SVG.Color(jsonData['config']['corCard'])

        corCardDependente = new SVG.Color(jsonData['config']['corCardHover'])
        corBordaDependente = new SVG.Color(jsonData['config']['corLinhas'])

        corCradCursado = new SVG.Color(jsonData['config']['corCradCursado'])
        corBordaCursado = new SVG.Color(jsonData['config']['corCradCursado'])

        corLinhas = new SVG.Color(jsonData['config']['corLinhas'])
        corTexto = new SVG.Color(jsonData['config']['corTexto'])
        
        alterModeColor()
        clearHead()
        loadHead()

    }else{
        loadHead()
    }

    loadConfig()
    
}

// Cria a interface baseado no jsonData
function load(){

    
    loadOptions()
    
    
    var random = pseudoAleatorios(seed)
    clearCards()
    try{
        var materias = Object.entries(jsonData['materias'])
    }catch{
        if (window.confirm('Não foi possivel carregar o arquivo! Clique em OK para saber como obter um arquivo válido.')){
            window.location.href='https://www.google.com/chrome/browser/index.html';
        };
    }
    
    materias.forEach(materia => {
        if(parseInt(materia[1]['semestre']) > num_colunas){num_colunas = parseInt(materia[1]['semestre'])}
    })
    console.log(num_colunas);
    largura = (window.innerWidth - ((num_colunas + 1) * espacamento_x)- recuoLateral)/num_colunas

    for(let i = 0; i< num_colunas; i++){
               
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
            
            card.click(function(){
                cardSelecionado = this
                loadMateria()
            })
            
            cards.push(card)
        }
    }
    // loadHead()
    showNames()

}
// altera a visualização dos card dependentes
function showDependentes(focoCard){
    // console.log(listDependencias);
    listDependencias.forEach(card=>{
        if(focoCard.data('id') != card.data('id')){
            card.attr({fill: corCardDependente, stroke: corBordaDependente, opacity: opacidadeDependente})
            let textCard = getText(card.data('id'))
            textCard.opacity(1).fill(corTexto)
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
        let textCard = getText(card.data('id'))
        textCard.opacity(0.2).fill(corTexto)
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

            card.attr({fill: corCardHover, stroke: corBordaHover, opacity: opacidadeHover})
            card.stroke({width: 2}) 
            let textCard = getText(card.data('id'))
            textCard.opacity(1).fill(corTexto)          
        }
    })
}

// identifica o movimento do mouse e altera a visualização dos card sem foco
function mouseMove(event){
    console.log('mouseMove');
    insideCard(event.clientX, event.clientY)

    if(event.clientY > 8 * altura + recuoSuperior || event.clientY < recuoSuperior){
        cards.forEach(card=>{            
            card.attr({fill: corCard, stroke: corBorda, opacity: opacidade})            
            textCard = getText(card.data('id'))
            textCard.opacity(1).fill(corTexto) 
        })
    }

}

// Função principal das animações 
async function main(){
    preLoad()
    functionPreload = window.setInterval(preLoad,2000)    
}

main()
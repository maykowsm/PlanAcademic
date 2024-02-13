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

// altera o modo de cor (dark-ligth)
function alterModeColor(){
    if(style == 'dark'){
        style = 'light'
        document.getElementById('img-style').src = 'img/style-light.svg'
        document.getElementById('folha-estilo').href = 'styles/css_light.css'
        document.getElementById('btn-voltar-config').src = 'img/arrow_back_black.svg'
        document.getElementById('img_close_boas_vindas').src = 'img/close_black.svg'
        document.getElementById('img_menu').src = 'img/menu_black.svg'
        document.getElementById('img_upload').src = 'img/upload_black.svg'
        document.getElementById('img_save').src = 'img/save_black.svg'
        document.getElementById('img_settings').src = 'img/settings_black.svg'
        document.getElementById('img_question').src = 'img/question_black.svg'
        document.getElementById('img_question').src = 'img/question_black.svg'
        document.getElementById('btn-voltar-materia').src = 'img/close_black.svg'
    }else{
        style = 'dark'
        document.getElementById('img-style').src = 'img/style-dark.svg'
        document.getElementById('folha-estilo').href = 'styles/css_dark.css'
        document.getElementById('btn-voltar-config').src = 'img/arrow_back_white.svg'
        document.getElementById('img_close_boas_vindas').src = 'img/close_white.svg'
        document.getElementById('img_menu').src = 'img/menu_white.svg'
        document.getElementById('img_upload').src = 'img/upload_white.svg'
        document.getElementById('img_save').src = 'img/save_white.svg'
        document.getElementById('img_settings').src = 'img/settings_white.svg'
        document.getElementById('img_question').src = 'img/question_white.svg'
        document.getElementById('btn-voltar-materia').src = 'img/close_white.svg'
    }

    loadConfig()
}

// carrega os parametros na janela de configuração
function loadConfig(){
    if(nomeAluno != ''){document.getElementById('input_nome_aluno').value = nomeAluno }
    if(style == 'dark'){
        if(mostrarMatriasCursadas){
            document.getElementById('select_mostrara_materias_cursadas').src = 'img/on-dark.svg'
        }else{
            document.getElementById('select_mostrara_materias_cursadas').src = 'img/off-dark.svg'
        }

        if(mostrarMediaGeral){
            document.getElementById('select_mostrar_media_geral').src = 'img/on-dark.svg'
        }else{
            document.getElementById('select_mostrar_media_geral').src = 'img/off-dark.svg'
        }

        if(mostrarProgressao){
            document.getElementById('select_mostrar_grafico_progressao').src = 'img/on-dark.svg'
        }else{
            document.getElementById('select_mostrar_grafico_progressao').src = 'img/off-dark.svg'
        }
        
    }else{

        if(mostrarMatriasCursadas){
            document.getElementById('select_mostrara_materias_cursadas').src = 'img/on-light.svg'
        }else{
            document.getElementById('select_mostrara_materias_cursadas').src = 'img/off-light.svg'
        }

        if(mostrarMediaGeral){
            document.getElementById('select_mostrar_media_geral').src = 'img/on-light.svg'
        }else{
            document.getElementById('select_mostrar_media_geral').src = 'img/off-light.svg'
        }

        if(mostrarProgressao){
            document.getElementById('select_mostrar_grafico_progressao').src = 'img/on-light.svg'
        }else{
            document.getElementById('select_mostrar_grafico_progressao').src = 'img/off-light.svg'
        }

    }

    
    document.getElementById('circulo_color_fundo').style.backgroundColor = corFundo
    document.getElementById('color_fundo').value = corFundo

    document.getElementById('circulo_color_cards').style.backgroundColor = corCard.toHex()
    document.getElementById('color_cards').value = corCard.toHex()

    document.getElementById('circulo_card_selecionado').style.backgroundColor = corCardHover.toHex()
    document.getElementById('card_selecionado').value = corCardHover.toHex()

    document.getElementById('circulo_card_cursado').style.backgroundColor = corCradCursado.toHex()
    document.getElementById('card_cursado').value = corCradCursado.toHex()

    document.getElementById('circulo_color_linha').style.backgroundColor = corLinhas.toHex()
    document.getElementById('color_linha').value = corLinhas.toHex()

    document.getElementById('circulo_color_texto').style.backgroundColor = corTexto.toHex()
    document.getElementById('color_texto').value = corTexto.toHex()

    
}

//função chamada para alterar a cor do input na janela de configuração
function alteraCor(id_input, id_div){    
    div = document.getElementById(id_div)
    div.style.backgroundColor = document.getElementById(id_input).value

    if(id_input == 'color_fundo'){
        corFundo = document.getElementById(id_input).value
        document.getElementById('body').style.backgroundColor = document.getElementById(id_input).value

    }else if(id_input == 'color_cards'){
        corCard = new SVG.Color(document.getElementById(id_input).value)
        corBorda = new SVG.Color(document.getElementById(id_input).value)
        corCardDesfoco = new SVG.Color(document.getElementById(id_input).value)
        corBordaDesfoco = new SVG.Color(document.getElementById(id_input).value)

    }else if(id_input == 'card_selecionado'){
        corCardHover = new SVG.Color(document.getElementById(id_input).value)
        corCardDependente = new SVG.Color(document.getElementById(id_input).value)
        corBordaDependente = new SVG.Color(document.getElementById(id_input).value)

    }else if(id_input == 'card_cursado'){
        corCradCursado = new SVG.Color(document.getElementById(id_input).value)
        bordaCursado = new SVG.Color(document.getElementById(id_input).value)

    }else if(id_input == 'color_linha'){
        corLinhas = new SVG.Color(document.getElementById(id_input).value)
        corBordaHover = new SVG.Color(document.getElementById(id_input).value)

    }else if(id_input == 'color_texto'){
        nomeCurso = ''
        listSemestres.forEach(texto=>{ texto.remove()})
        corTexto = new SVG.Color(document.getElementById(id_input).value)
        loadHead()
        
    }
}

//altera chaves de celeção dos botoes da janela de configuração
function alterKey(chave){
    if(chave == 'select_mostrara_materias_cursadas'){
        if(mostrarMatriasCursadas){
            mostrarMatriasCursadas = false
        }else{
            mostrarMatriasCursadas = true
        }
    }else if(chave == 'select_mostrar_media_geral'){
        if(mostrarMediaGeral){
            mostrarMediaGeral = false
        }else{
            mostrarMediaGeral = true
        }
    }else if(chave =='select_mostrar_grafico_progressao'){
        if(mostrarProgressao){
            mostrarProgressao = false
        }else{
            mostrarProgressao= true
        }
    }
    loadConfig()
}

//altera a chave de celeção dos botoes da janela de visualização de matérias 
function alterkeyMateria(chave){
    console.log(chave);
    if(chave == 'img_materia_cursada'){
        if(cardSelecionado.data('cursada')){
            cardSelecionado.data({cursada:  false})
        }else{
            cardSelecionado.data({cursada:  true})
        }         
    }else if(chave == 'img_cursando_materia'){
        if(cardSelecionado.data('cursando')){
            cardSelecionado.data({cursando:  false})
        }else{
            cardSelecionado.data({cursando:  true})
        }         
    }

    loadMateria()
}

//carrega os dados na janela de visualização da matéria
function loadMateria(){
    console.log(cardSelecionado);
    let card = cardSelecionado
    document.getElementById('title_materia').innerText = card.data('nome')
    document.getElementById('semestre_data').innerText = card.data('semestre') + 'ª'
    document.getElementById('carga_horaria_data').innerText = card.data('ch') + ' h'
    document.getElementById('name_professor').value = card.data('professor')
    document.getElementById('nota_materia').value = card.data('notaFinal')
    document.getElementById('anotacoes_materia').value = card.data('anotacoes')

    if(style == 'dark'){
        if(card.data('cursada')){
            document.getElementById('img_materia_cursada').src = 'img/on-dark.svg'
        }else{
            document.getElementById('img_materia_cursada').src = 'img/off-dark.svg'
        }

        if(card.data('cursando')){
            document.getElementById('img_cursando_materia').src = 'img/on-dark.svg'
        }else{
            document.getElementById('img_cursando_materia').src = 'img/off-dark.svg'
        }        
    }else{
        if(card.data('cursada')){
            document.getElementById('img_materia_cursada').src = 'img/on-light.svg'
        }else{
            document.getElementById('img_materia_cursada').src = 'img/off-light.svg'
        }

        if(card.data('cursando')){
            document.getElementById('img_cursando_materia').src = 'img/on-light.svg'
        }else{
            document.getElementById('img_cursando_materia').src = 'img/off-light.svg'
        }

    }
    
    document.getElementById('view_materia').style.display = 'block'

}

function closeMateria(){
    let card = cardSelecionado
    console.log(document.getElementById('name_professor').value);
    card.data({professor: document.getElementById('name_professor').value})
    card.data({notaFinal: document.getElementById('nota_materia').value})
    card.data({anotacoes: document.getElementById('anotacoes_materia').value})
    
    cardSelecionado = ''
    document.getElementById('view_materia').style.display = 'none'
}

//abre a janela de configuração
function openConfig(){
    document.getElementById('configuracao').classList.add('slideIn_config')
    document.getElementById('configuracao').style.display = 'block'
    document.getElementById('configuracao').style.transform = 'translateX(0px)'
    setTimeout(function(){document.getElementById('configuracao').classList.remove('slideIn_config')}, 1000)
}

//fecha a janela de configuração
function closeConfig(){
    document.getElementById('configuracao').classList.add('slideOut_config')
    document.getElementById('configuracao').style.transform = 'translateX(-1000px)'
    setTimeout(function(){document.getElementById('configuracao').classList.remove('slideOut_config'); document.getElementById('configuracao').style.display = 'none'}, 1000)
    
}

// centraliza a janela de boas vindas
function boasVindas(){
    janela = document.getElementById('boas-vindas')
    janela.style.left = (window.innerWidth/2) - (window.innerWidth*0.4/2)
}

//centraliza a janela de matérias
function viewMateria(){
    janela = document.getElementById('view_materia').style.left = (window.innerWidth/2) - (window.innerWidth*0.4/2)
}

viewMateria()
boasVindas()
loadConfig()
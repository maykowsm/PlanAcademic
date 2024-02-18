var jsonData; // Objeto json com os dados do aluno e do curso

var json = {
    config: {},
    aluno:{
        nome: '',
        ch_realizada: 0,            
    },
    curso:{
        nome: '',
        ch_total:0
    },
    materias:{}
}


//faz a leitura do aruivo json
function leArquivo(file){
    closeBoasVindas()
    return new Promise((resolve, reject)=>{
        var reader = new FileReader
        
        reader.onload = function(event){
            try{
                jsonData = JSON.parse(event.target.result)
                resolve(jsonData)
            }catch(error){
                reject(error)
            }            
            
        }
        reader.readAsText(file)
    })
}

//carrega arquivo json
async function carregarArquivo(){
    var arquivo = document.getElementById('inputArquivo').files[0]
    jsonData = await leArquivo(arquivo)
    clearInterval(functionPreload)
    clearPreLoad()
    setTimeout(load, 1000)
}

//fecha a janela de boas vindas
function closeBoasVindas(){
    janela = document.getElementById('boas-vindas')
    janela.style.display = 'none'
}

//identifica o arraste de um arquivo em uma área na janela de boas vindas
document.getElementById('area-arquivo').addEventListener('dragover', function(e){
    e.preventDefault();
    console.log('arrastando arquivos!');        
})

//adiciona o evento de soltar um arquivo em uma área na janela de boas vindas
document.getElementById('area-arquivo').addEventListener('drop', async function(e){
    e.preventDefault();
    console.log('arquivo carregado com sucesso!');    
    var arquivo = e.dataTransfer.files[0]
    jsonData = await leArquivo(arquivo).catch(function(error){
        alert('Não foi possivel carregar o arquivo! recareque a pagina para uma nova tentativa.')
    })
    clearInterval(functionPreload)
    clearPreLoad()
    closeBoasVindas()
    setTimeout(load, 1000)
})

function save(){
    //injetando dados no json
    json['aluno']['nome'] = nomeAluno
    json['aluno']['ch_realizada'] = ch_realizada
    json['curso']['nome'] = jsonData['curso']['nome']
    json['curso']['ch_total'] = ch_total

    json['config']['mostrarMatriasCursadas'] = mostrarMatriasCursadas
    json['config']['mostrarMediaGeral'] = mostrarMediaGeral
    json['config']['mostrarProgressao'] = mostrarProgressao
    json['config']['style'] = style

    json['config']['corFundo'] = corFundo
    json['config']['corCard'] = corCard.toHex()
    json['config']['corCardHover'] = corCardHover.toHex()
    json['config']['corCradCursado'] = corCradCursado.toHex()
    json['config']['corLinhas'] = corLinhas.toHex()
    json['config']['corTexto'] = corTexto.toHex()
    

    
    cards.forEach(card=>{
        materia = {}
        materia['ch'] =  card.data('ch')
        materia['id'] =  card.data('id')
        materia['semestre'] =  card.data('semestre')
        materia['nome'] =  card.data('nome')
        materia['dependencias'] =  card.data('dependencias')
        materia['cursada'] =  card.data('cursada')
        materia['cursando'] =  card.data('cursando')
        materia['notaFinal'] =  card.data('notaFinal')
        materia['professor'] =  card.data('professor')
        materia['anotacoes'] =  card.data('anotacoes')
        json['materias'][card.data('id')] = materia
    })

    var jsonBlob = new Blob([JSON.stringify(json, null, 2)], {type : 'json/application;charset=utf-8'} )
    var jsonURL =  URL.createObjectURL(jsonBlob)

    var link = document.createElement('a')
    link.style.display = 'none'
    link.target = '_blank'
    link.download = nomeAluno + '_' +json['curso']['nome']+'.json' || 'data.json'
    link.href = jsonURL
    link.click()
    document.getElementById('ico_download').innerText = 'check'

}




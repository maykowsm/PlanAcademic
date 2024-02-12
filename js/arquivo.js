var jsonData; // Objeto json com os dados do aluno e do curso


function leArquivo(file){
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

async function carregarArquivo(){
    var arquivo = document.getElementById('inputArquivo').files[0]
    jsonData = await leArquivo(arquivo)
    clearInterval(functionPreload)
    clearPreLoad()
    setTimeout(load, 1000)
}

function closeBoasVindas(){
    janela = document.getElementById('boas-vindas')
    janela.style.display = 'none'
}


document.getElementById('area-arquivo').addEventListener('dragover', function(e){
    e.preventDefault();
    console.log('arrastando arquivos!');        
})


document.getElementById('area-arquivo').addEventListener('drop', async function(e){
    e.preventDefault();
    console.log('arquivo carregado com sucesso!');    
    var arquivo = e.dataTransfer.files[0]
    jsonData = await leArquivo(arquivo)
    clearInterval(functionPreload)
    clearPreLoad()
    closeBoasVindas()
    setTimeout(load, 1000)
})




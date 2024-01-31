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
}
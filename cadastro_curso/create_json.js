
var curso = {
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





function gerarJson(){
    const files = document.getElementById('arquivo').files

    var reader = new FileReader()
    reader.readAsText(files[0])
    reader.onload = function(event){
        var csv = event.target.result
        var data = $.csv.toObjects(csv)

        data.forEach(materia => {
            materia['cursada'] = false
            materia['cursando'] = false
            materia['notaFinal'] = -1
            materia['professor'] = ''
            materia['anotacoes'] = ''
            curso['materias'][materia['id']] = materia
        });

        console.log(curso);
    }
    document.getElementById('ico_upload').innerText = 'check'
}

function dowloadFile(){
    var nome_curso = document.getElementById('curco').value
    var carga_horaria = document.getElementById('horas').value

    if(nome_curso == '' || carga_horaria == ''|| Object.entries(curso['materias']).length == 0){
        alert('Preencha todos os campos para e faça o upload do arquivo CSV para continuar!')
    }else{
        curso['curso']['nome'] = nome_curso
        curso['curso']['ch_total'] = parseInt(carga_horaria)

        var cursoBlob = new Blob([JSON.stringify(curso, null, 2)], {type : 'json/application;charset=utf-8'} )
        var jsonURL =  URL.createObjectURL(cursoBlob)

        var link = document.createElement('a')
        link.style.display = 'none'
        link.target = '_blank'
        link.download = nome_curso+'.json' || 'data.json'
        link.href = jsonURL
        link.click()
        document.getElementById('ico_download').innerText = 'check'
    }
    
}
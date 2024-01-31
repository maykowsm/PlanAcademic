var canva = SVG('#canva').size(window.innerWidth,window.innerHeight)

        // variáveis para a animação
        var matriz = []
        var matriz2 = []
        var matriz3 = []
        var distX = 25  
        var distY = 25
        var diametro_min = 5
        var diametro_max = 25
        var cor1Circulos = new SVG.Color('rgb(100,100,100)')
        var cor2Circulos = new SVG.Color('rgb(55, 158, 184)')
        var opacity1Circulos = 0.5
        var opacity2Circulos = 1
        var mouseX = 0
        var mouseY = 0
        var raioMouse = 90
        var anel = 20 //espessura do anel do efeito de click
        var linhaEspessura = 30 //espessura da linha do efeito inicial
        var velocidadeLinha = 60
        var velocidadeAnel = 60
        

        // variaveis para interpolação linear
        var b = diametro_max
        var a = (diametro_min - b)/raioMouse

        // ajusta a posição da janela de configuração ao centro
        function posFrame(){
            frame = document.getElementById('frame')
            frame.style.left = (window.innerWidth - (window.innerWidth*0.4)) /2
        }


        // grade para o efeito de movimento do mouse
        function gerarGrade(){
            
            for(var i = 0; i < Math.round(window.innerWidth/distX)+1; i++){
                for(var j = 0; j < Math.round(window.innerHeight/distY)+1; j++){
                    var circulo = canva.circle(diametro_min).fill(cor1Circulos).move(i*distX, j*distY).opacity(opacity1Circulos)
                    circulo.on('mouseIn', function(e){
                        
                        if(e.detail.dist <= raioMouse ){
                            s = a*e.detail.dist + b
                            this.radius(s/2).fill(cor2Circulos).opacity(opacity2Circulos)                                                                              
                        }else{
                            this.radius(diametro_min/2).fill(cor1Circulos).opacity(opacity1Circulos)
                        }                        
                    })
                    matriz.push(circulo)
                }
            }
            
            
        }

        // grade para o efeito de clique
        function gerarGrade2(){
            
            for(var i = 0; i < Math.round(window.innerWidth/distX)+1; i++){
                for(var j = 0; j < Math.round(window.innerHeight/distY)+1; j++){
                    var circulo = canva.circle(diametro_min).fill(cor1Circulos).move(i*distX, j*distY).opacity(0)
                    circulo.on('mouseClick', function(e){

                        if(Math.abs(e.detail.raio - e.detail.dist) <= anel){
                            this.radius(diametro_max/3).fill(cor2Circulos).opacity(1)  
                        }else{
                            this.radius(diametro_min/2).fill(cor1Circulos).opacity(0)
                        }                        
                    })                    
                    matriz2.push(circulo)
                }
            }            
        }

        // grade para o efeito inicial
        function gerarGrade3(){
            console.log('teste-1');
            for(var i = 0; i < Math.round(window.innerWidth/distX)+1; i++){
                for(var j = 0; j < Math.round(window.innerHeight/distY)+1; j++){
                    var circulo = canva.circle(diametro_min).fill(cor1Circulos).move(i*distX, j*distY).opacity(0)

                    circulo.on('moveLinha', function(e){
                        if(Math.abs(this.y()- e.detail.linha) <= linhaEspessura){
                            this.fill(cor2Circulos).radius(diametro_max/3).opacity(opacity2Circulos)
                        }else if (this.y() < (e.detail.linha-linhaEspessura/2)) {
                            this.fill(cor1Circulos).radius(diametro_min/2).opacity(opacity1Circulos)
                        } else {
                            this.opacity(0)
                        }
                    })                                       
                    matriz3.push(circulo)
                }
            }            
        }

        async function efeitoInicial(){
            console.log('teste-2', window.innerHeight);
            var linha = 0
            var loop = await setInterval(async()=>{
                if(linha >= window.innerHeight+50){
                    
                    matriz3.forEach(circulo=>{
                        circulo.opacity(0)
                    })

                    gerarGrade()
                    gerarGrade2()
                    clearInterval(loop)

                    
                }else{
                    matriz3.forEach(circulo=>{
                        circulo.fire('moveLinha', {linha: linha})
                    })                      
                }

                linha+= velocidadeLinha
            }, 1)
            console.log('final do loop');
        }

        function scaleCircles(){            
            matriz.forEach(circulo => {                
                distancia = (((mouseX - circulo.x())**2) + ((mouseY - circulo.y())**2))**(0.5)                
                circulo.fire('mouseIn', {dist: distancia})
            });
        }

        function mouseMove(evento){            
            mouseX = evento.clientX
            mouseY = evento.clientY
            scaleCircles()                       
        }        

        async function mouseClick(){            
            var maior_dimencao = 0
            if(window.innerWidth > window.innerHeight){
                maior_dimencao = window.innerWidth
            }else{
                maior_dimencao = window.innerHeight
            }
            var x= mouseX
            var y = mouseY
            let i = 0
            var loop = setInterval(async()=>{
                if(i >= maior_dimencao){
                    clearInterval(loop)
                }else{
                    matriz2.forEach(circulo =>{
                        distancia = (((x - circulo.x())**2) + ((y - circulo.y())**2))**(0.5)
                        circulo.fire('mouseClick', {dist: distancia, raio: i})
                    })
                    i+= velocidadeAnel
                }                
            }, 1)         
            
        }
        
        async function main(){
            // window.MouseEvent
            posFrame()            
            window.onload = function(){
                gerarGrade3()                               
                efeitoInicial()                
            }
        }

        main()
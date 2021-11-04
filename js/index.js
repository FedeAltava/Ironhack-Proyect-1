


window.onload = () => {
    //Variables ******************
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    const CANVAS_WIDTH = canvas.width
    const CANVAS_HEIGHT = canvas.height
    let animationFrameId
    let currentVowel = 'A'
    let vowelsArray = ['A', 'E', 'I', 'O', 'U']
    let arrayOfGameFigures = []
    let score = 0
    //Audio
    const backGroundSound = new Audio('sounds/backgroundSound.mp3')
    backGroundSound.volume = 0.05
    backGroundSound.loop = true;

    const soundSamePlace = new Audio('sounds/coin.mp3')
    soundSamePlace.volume = 0.05
    const WrongLetter = new Audio('sounds/fail.mp3')
    //Images
    let imageBackground = new Image()
    imageBackground.src = './images/scenary/scenary.png'

    let characterImage = new Image()
    characterImage.src = './images/character/player.png'

    let YouWon = new Image()
    YouWon.src = './images/scenary/Has_ganado.jpg'

    const paintYouWon = () => {
        ctx.drawImage(YouWon, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    }



    //Todas las imagenes que tengo

    const imageLinks = [
        { link: "./images/a_images/abeja.png", name: 'abeja', letter: 'A' },
        { link: "./images/a_images/aguila.png", name: 'aguila', letter: 'A' },
        { link: "./images/a_images/araña.png", name: 'araña', letter: 'A' },
        { link: "./images/a_images/arbol.png", name: 'arbol', letter: 'A' },
        { link: "./images/a_images/avion.png", name: 'avion', letter: 'A' },
        { link: "./images/e_images/erizo.png", name: 'erizo', letter: 'E' },
        { link: "./images/e_images/elefante.png", name: 'elefante', letter: 'E' },
        { link: "./images/e_images/escalera.png", name: 'escalera', letter: 'E' },
        { link: "./images/e_images/espada.png", name: 'espada', letter: 'E' },
        { link: "./images/e_images/estatua.png", name: 'estatua', letter: 'E' },
        { link: "./images/i_images/iman.png", name: 'iman', letter: 'I' },
        { link: "./images/i_images/isla.png", name: 'isla', letter: 'I' },
        { link: "./images/i_images/iglu.png", name: 'iglu', letter: 'I' },
        { link: "./images/i_images/indio.png", name: 'indio', letter: 'I' },
        { link: "./images/o_images/obeja.png", name: 'obeja', letter: 'O' },
        { link: "./images/o_images/ojo.png", name: 'ojo', letter: 'O' },
        { link: "./images/o_images/ola.png", name: 'ola', letter: 'O' },
        { link: "./images/o_images/oreja.png", name: 'oreja', letter: 'O' },
        { link: "./images/o_images/oso.png", name: 'oso', letter: 'O' },
        { link: "./images/u_images/unicornio.png", name: 'unicornio', letter: 'U' },
        { link: "./images/u_images/uva.png", name: 'uva', letter: 'U' },
        { link: "./images/u_images/uno.png", name: 'uno', letter: 'U' },
        { link: "./images/u_images/unya.png", name: 'unya', letter: 'U' },
        { link: "./images/random/calabaza.png", name: 'calabaza', letter: 'C' },
        { link: "./images/random/casa.png", name: 'casa', letter: 'C' },
        { link: "./images/random/cocodrilo.png", name: 'cocodrilo', letter: 'C' },
        { link: "./images/random/hormiga.png", name: 'hormiga', letter: 'H' },
    ]


   

    //Funciones ************************
    const currentVowelDraw = ()=>{
        ctx.font = "60px Verdana";
        ctx.fillText(currentVowel , 10, 60) 

    }
    function drawScore() {
        ctx.font = "30px Verdana";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: "+score, 850, 60);
    }


    const createImageEverySecond = () => {

        setInterval(() => {

            //Generar un numero random, que vaya desde el 0 hasta el maximo del array de imagenes
            const aleatorio = Math.floor(Math.random() * imageLinks.length)

            //luego acceder a ese array con ese numero que es la posicion dentro de ese array
            //al ser un objeto que tiene la key link, podemos pasar ese link
            const imageLink = imageLinks[aleatorio].link

            const letter = imageLinks[aleatorio].letter

            

            //Creas una imagen con ese link que será el src de la nueva imagen
            const image = new Image()
            image.src = imageLink

            //Creas un nuevo objeto GameFigure y le pasamos la imagen que acabamos de crear
            const newGameFigure = new GameFigure(image, letter)

            //Metemos el nuevo objeto en nuestro array de gameFigures
            arrayOfGameFigures.push(newGameFigure)

        }, 2000)
    }
    
//Da un index aleatorio con vocal
    const giveVowel = () => {
        
        setInterval(() => {
            let randomIndex = Math.floor(Math.random()*vowelsArray.length)
            
            currentVowel = vowelsArray[randomIndex]
            
        }, 9000)
    }
    
// comprueba las colisiones
    const checkCollision = (myCharacter, gameFigure) => {


        if (myCharacter.x < gameFigure.x + gameFigure.width &&  //check lado izquierdo
            myCharacter.x + myCharacter.width > gameFigure.x &&  //check lado derecho
            myCharacter.y < gameFigure.y + gameFigure.height &&  //check lado de arriba
            myCharacter.height + myCharacter.y > gameFigure.y) {
            if (currentVowel === gameFigure.letter) {
                score++
                soundSamePlace.play()
               gameFigure.picked = true; 
            }else{
                WrongLetter.play()
            }

            
            
            


            if (score === 5) {

                setTimeout(() => {
                    cancelAnimationFrame(animationFrameId)
                })

                paintYouWon()

            }
        }

    }
    const deleteGameFigures = () => {
        arrayOfGameFigures = arrayOfGameFigures.filter((figure) => {
            return !figure.picked
        })
    }

    // load and draw images
    const startGame = () => {
        giveVowel()
        createImageEverySecond()
        updateCanvas()
        backGroundSound.play()
    }

    const clearCanvas = () => {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    }

    const paintBackground = () => {
        ctx.drawImage(imageBackground, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    }


    //Clases ***********************
    class Character {
        constructor(image) {
            this.x = 500;
            this.y = 600;
            this.speedX = 0;
            // this.speedY = 0;
            this.width = 90;
            this.height = 100;
            this.image = image
        }

        moveLeft() {

            this.speedX = -5

        }

        moveRight() {

            this.speedX = 5
        }

        checkLimits() {
            if (this.x < 0) {
                this.x = 0
            }
            if (this.x > CANVAS_WIDTH - this.width) {
                this.x = CANVAS_WIDTH - this.width     //comprobando los limites del canvas para que nuestro personaje nunca se salga
            }

        }

        stop() {
            this.speedX = 0
        }

        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        }

        update() {
            this.x += this.speedX

        }
    }
    const character = new Character(characterImage);



    class GameFigure {
        constructor(image, letter) {
            this.width = 90;
            this.height = 90;
            this.x = Math.floor(Math.random() * (CANVAS_WIDTH - this.width))
            this.y = 10;
            this.speedY = 2;
            this.image = image;
            this.letter = letter;
            this.picked = false
        }
        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
        update() {
            this.y += this.speedY
            if (this.y + this.height > CANVAS_HEIGHT) {
                this.picked = true
            }
        }
    }



    //Este es mi loop de animación <----------------
    const updateCanvas = () => {

        clearCanvas()
        paintBackground()
        currentVowelDraw()
        drawScore() 
        character.update()
        character.checkLimits()
        character.draw()
        //Pintamos gameFigures
        arrayOfGameFigures.forEach((figure) => {
            figure.update()
            figure.draw()
        })

        arrayOfGameFigures.forEach((figure) => {
            checkCollision(character, figure)
        })
        deleteGameFigures()

        animationFrameId = requestAnimationFrame(updateCanvas)

    }



    //EVENT LISTENERS
    document.getElementById('start-button').addEventListener('click', startGame)

    // Character Move and Check bounds
    document.addEventListener('keydown', (event) => {
        if (event.key === "ArrowRight") {
            character.moveRight();
        } else if (event.key === "ArrowLeft") {
            character.moveLeft();

        }
    })

    document.addEventListener('keyup', (event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            character.stop();
        }
    })

}

//Cosas que hacer




//Cuando apretes flecha izquierda que el personaje se gire a la izquierda






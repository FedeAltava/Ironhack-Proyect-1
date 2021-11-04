


window.onload = () => {
    //Variables ******************
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    const CANVAS_WIDTH = canvas.width
    const CANVAS_HEIGHT = canvas.height

    let score = 0
    let  animationFrameId
    //Audio
    const backGroundSound = new Audio('sounds/backgroundSound.mp3')
    backGroundSound.volume = 0.05

    const soundSamePlace = new Audio('sounds/coin.mp3')
    soundSamePlace.volume = 0.05
    //loop music background --------- Preguntar
    // const backGroundRepeat = ()=>{
    //if (typeof backGroundSound == 'boolean'){
    //     backGroundSound = true;
    // }
    // else
    // {
    //     backGroundSound.addEventListener('ended', function() {
    //         
    //         backGroundSound.play();
    //     }, false);
    // }
    //}

    //Images
    let imageBackground = new Image()
    imageBackground.src = 'images/scenary/scenary.png'

    let characterImage = new Image()
    characterImage.src = 'images/character/player.png'

    // let characterImageLeft = new Image()
    // characterImageLeft = 'images/character/character_left.png'
    // // const paintLeftImage = () => {
    // //     ctx.drawImage(characterImageLeft, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    // // }

    let YouWon = new Image()
    YouWon.src = 'images/scenary/Has_ganado.jpg'

    const paintYouWon = () => {
        ctx.drawImage(YouWon, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    }



    //Todas las imagenes que tengo

    const imageLinks = [
        { link: "images/a_images/abeja.png", name: 'abeja', letter: 'A' },
        { link: "images/a_images/aguila.png", name: 'aguila', letter: 'A' },
        { link: "images/e_images/erizo.png", name: 'erizo', letter: 'A' },
        { link: "images/e_images/elefante.png", name: 'elefante', letter: 'A' },
        { link: "images/i_images/iglu.png", name: 'iglu', letter: 'I' },
        { link: "images/i_images/indio.png", name: 'indio', letter: 'I' },
        { link: "images/o_images/obeja.png", name: 'obeja', letter: 'O' },
        { link: "images/o_images/oso.png", name: 'oso', letter: 'O' },
        { link: "images/u_images/unicornio.png", name: 'unicornio', letter: 'U' },
        { link: "images/u_images/uva.png", name: 'uva', letter: 'U' },
        { link: "images/random/calabaza.png", name: 'calabaza', letter: 'C' },
        { link: "images/random/casa.png", name: 'casa', letter: 'C' },
        { link: "images/random/cocodrilo.png", name: 'cocodrilo', letter: 'C' },
        { link: "images/random/hormiga.png", name: 'hormiga', letter: 'H' },
    ]


    let arrayOfGameFigures = []

    //Funciones ************************

    const createImageEverySecond = () => {

        setInterval(() => {

            //Generar un numero random, que vaya desde el 0 hasta el maximo del array de imagenes
            const aleatorio = Math.floor(Math.random() * imageLinks.length)

            //luego acceder a ese array con ese numero que es la posicion dentro de ese array
            //al ser un objeto que tiene la key link, podemos pasar ese link
            const imageLink = imageLinks[aleatorio].link
            
            const letter = imageLinks[aleatorio].letter

            console.log(letter)
            
            //Creas una imagen con ese link que será el src de la nueva imagen
            const image = new Image()
            image.src = imageLink
            
            //Creas un nuevo objeto GameFigure y le pasamos la imagen que acabamos de crear
            const newGameFigure = new GameFigure(image,letter)

            //Metemos el nuevo objeto en nuestro array de gameFigures
            arrayOfGameFigures.push(newGameFigure)

        }, 3000)
    }

    let vowelsArray=['A','E','I','O','U']
  
        
   
   
    const checkCollision = (myCharacter, gameFigure) => {


        if (myCharacter.x < gameFigure.x + gameFigure.width &&  //check lado izquierdo
            myCharacter.x + myCharacter.width > gameFigure.x &&  //check lado derecho
            myCharacter.y < gameFigure.y + gameFigure.height &&  //check lado de arriba
            myCharacter.height + myCharacter.y > gameFigure.y) {
                if(vowelsArray.includes(gameFigure.letter)){
                 score++   
                }
            
            gameFigure.picked = true;
            soundSamePlace.play()
            document.getElementById('score').innerText = score


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
        constructor(image,letter) {
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






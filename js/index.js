
//Variables ******************
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width
const CANVAS_HEIGHT = canvas.height

let counterForLoadedImages = 0; //Contador de imagenes cargadas


let imageBackground = new Image()
imageBackground.src = 'images/scenary/scenary.png'

let characterImage = new Image()
characterImage.src = 'images/character/player.png'


//Todas las imagenes que tengo

const imageLinks = [
    { link: "images/a_images/abeja.png", name: 'abeja' },
    { link: "images/a_images/aguila.png", name: 'aguila' },
    { link: "images/e_images/erizo.png", name: 'erizo' },
    { link: "images/e_images/elefante.png", name: 'elefante' },
    { link: "images/i_images/iglu.png", name: 'iglu' },
    { link: "images/i_images/indio.png", name: 'indio' },
    { link: "images/o_images/obeja.png", name: 'obeja' },
    { link: "images/o_images/oso.png", name: 'oso' },
    { link: "images/u_images/unicornio.png", name: 'unicornio' },
    { link: "images/u_images/uva.png", name: 'uva' },
    { link: "images/random/calabaza.png", name: 'calabaza' },
    { link: "images/random/casa.png", name: 'casa' },
    { link: "images/random/cocodrilo.png", name: 'cocodrilo' },
    { link: "images/random/hormiga.png", name: 'hormiga' },
]


const arrayOfGameFigures = [];

const createImageEverySecond = () => {

    setInterval(() => {

        //Generar un numero random, que vaya desde el 0 hasta el maximo del array de imagenes
        const aleatorio = Math.floor(Math.random() * imageLinks.length)

        //luego acceder a ese array con ese numero que es la posicion dentro de ese array
        //al ser un objeto que tiene la key link, podemos pasar ese link
        const imageLink = imageLinks[aleatorio].link

        //Creas una imagen con ese link que será el src de la nueva imagen
        const image = new Image()
        image.src = imageLink;

        //Creas un nuevo objeto GameFigure y le pasamos la imagen que acabamos de crear
        const newGameFigure = new GameFigure(image)

        //Metemos el nuevo objeto en nuestro array de gameFigures
        arrayOfGameFigures.push(newGameFigure)

    }, 3000)
}


//Funciones ************************
// comprobar si estan en el mismo lugar
const checkSamePlace = () => {
    const bothInX = (characterImage.x - 50) < newGameFigure.x && characterImage.x > newGameFigure.x
    const bothInY =(characterImage.x - 50) < newGameFigure.y && characterImage.y > newGameFigure.y

    if (bothInX && bothInY) {
        console.log('coinciden')



    }

}


// const backgroundMusic = new sound("images/sounds/backgroundSound.mp3")









// load and draw images
const startGame = () => {
    createImageEverySecond()
    updateCanvas()

}

const clearCanvas = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}

const paintBackground = () => {
    ctx.drawImage(imageBackground, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}


//Este es mi loop de animación <----------------
const updateCanvas = () => {
    //1 - limpiar canvas entero
    clearCanvas()
    //2 Pintar background
    paintBackground()


    //1 - Pintar Personaje
    character.draw()

    //2- Actualizar posicion personaje
    character.update()
    // checkSamePlace()
    //Pintamos gameFigures
    arrayOfGameFigures.forEach((figure) => {
        figure.draw()
        figure.update()
    })

    requestAnimationFrame(updateCanvas)

}


//Clases ***********************
class Character {
    constructor(image) {
        this.x = 500;
        this.y = 600;
        this.speedX = 0;
        this.speedY = 0;
        this.width = 90;
        this.height = 100;
        this.image = image
    }

    moveLeft() {
        //condicion de x de pj no sea menor que borde izquierdo de pantalla
        this.speedX = -5

        if (this.x < 1) {

            this.x = 1
        }

    }

    moveRight() {
        //condicion de x + anchura de pj no sea mayor que borde derecho de pantalla
        this.speedX = 5

        if (this.x > 910) {

            this.x = 910
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




class GameFigure {
    constructor(image) {

        this.width = 90;
        this.height = 90;
        this.x = Math.floor(Math.random() * CANVAS_WIDTH - this.width) + this.width
        this.y = 10;
        this.speedY = 3;
        this.image = image;
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
    update() {
        this.y += this.speedY

    }
}



//Aquí se ejecutan los eventListeners *********************
window.onload = () => {

    

    character = new Character(characterImage)

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




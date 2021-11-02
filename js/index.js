
//Variables ******************
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width
const CANVAS_HEIGHT = canvas.height

let counterForLoadedImages = 0; //Contador de imagenes cargadas


// let imageBackground = new Image()
// imageBackground.src = '../images/scenary/scenary.png'
// let characterImage = new Image()
// characterImage.src = '../images/character/player.png'
// let testImage = new Image()
// testImage.src = '../images/a_images/ant.png'



const imageLinks = [
    { link: "../images/scenary/scenary.png", name: 'scenary' },
    { link: "../images/character/player.png", name: 'player' },
    { link: "../images/a_images/aligator.png", name: 'aligator' },
    { link: "../images/a_images/ant.png", name: 'ant' }
]
const loadedImages = {}
imageLinks.forEach((imagen) => {
    const img = new Image()
    img.src = imagen.link
    img.onload = () => {
        counterForLoadedImages++
        loadedImages[imagen.name] = img
        console.log(loadedImages)
        if (imageLinks.length === counterForLoadedImages) {
        }
    }
})







const arrayOfImages = [];

const createImageEverySecond = () => {
    setInterval(()=>{
       Object.entries(loadedImages)
        //Crear logica para que elija de forma random una imagen u otra de "loadedImages"
        const ownImage = new Images(loadedImages.aligator)
        //const ownImage = new Images(testImage)
        arrayOfImages.push(ownImage)
        
    }, 3000)
}




//Funciones ************************

// load and draw images
const startGame = () => {

    // generateImages()
    createImageEverySecond()
    updateCanvas()


}
const clearCanvas = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}

const paintBackground = () => {
    ctx.drawImage(loadedImages.scenary, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}

const drawOwnImages = ()=>{
    arrayOfImages.forEach((image)=>{
        image.draw()
    })
}

//Este es mi loop de animación <----------------
const updateCanvas = () => {
    //1 - borrar
    clearCanvas()
    //2 actualizar
    character.update()
  

    paintBackground()
    character.draw()

    drawOwnImages()

    requestAnimationFrame(updateCanvas)

}


//Clases ***********************
class Character {
    constructor() {
        this.x = 500;
        this.y = 600;
        this.speedX = 0;
        this.speedY = 0;
        this.width = 90;
        this.height = 100;
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

        if (this.x > 900) {

            this.x = 900
        }
    }

    stop() {
        this.speedX = 0
    }

    draw() {
        ctx.drawImage(loadedImages.player, this.x, this.y, this.width, this.height)
    }

    update() {
        this.x += this.speedX



    }


}

class Images {
    constructor(imageToShow) {
        this.x = Math.floor(Math.random() * 1000) + 1;
        this.y = 10;
        this.speedY = 0;
        this.width = 120;
        this.height = 100;
        this.imageToShow = imageToShow;
    }
    draw() {
        ctx.drawImage(this.imageToShow, this.x, this.y, this.width, this.height)
    }
    update() {
        this.y += this.speedY


    }
}



//Aquí se ejecutan los eventListeners *********************
window.onload = () => {


    character = new Character()

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


    // crear objeto de letra, pensar que funiones quiero que tenga(pintar y actualizar, crear array de letras)



}




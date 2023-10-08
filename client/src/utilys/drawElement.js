

export default function  drawElement ({roughCanvas,element}){

    switch(element.toolType){

        case "RECTANGLE":
            console.log("element",element)
            return roughCanvas.draw(element.roughElement);
        case "CIRCLE":
            return roughCanvas.draw(element.roughElement);
        case "LINE":
            return roughCanvas.draw(element.roughElement);    
        default:
            throw new Error("error on the drawElement", Error);    
    }
}

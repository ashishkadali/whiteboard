import React from 'react'
import rough from "roughjs/bundled/rough.esm";


const generator = rough.generator();

const getRoughRectangle = ({ x1, y1, x2, y2 }) => {
  return generator.rectangle(x1, y1, x2 - x1, y2 - y1);
};

const getRoughCircle = ({x1,y1,x2,y2}) =>{
    
            const radius = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
            const diameter = isNaN(radius)? 0 : 2 *radius;
     
    return {circle : generator.circle(x1,y1,diameter) , diameter}
}

const getRoughLine = ({x1, y1, x2, y2})=>{
    return generator.line(x1, y1, x2, y2)
}

export const  createElement = ({x1,y1,x2,y2,toolType,id}) => {
  
    let roughElement;

    switch (toolType){

        case "RECTANGLE":
            roughElement = getRoughRectangle({x1,y1,x2,y2});

            return{
                id:id,
                roughElement,
                toolType,
                x1,
                x2,
                y1,
                y2
            }

        case "CIRCLE":
            
            roughElement = getRoughCircle({x1,y1,x2,y2});
            console.log("Ashish",x1,y1,x2,y2 ,roughElement.diameter, window.innerWidth,window.innerHeight   )
            return{
                id:id,
                roughElement : roughElement.circle,
                toolType,
                x1,
                x2,
                y2,
                y1,
                diameter : roughElement.diameter
            }
        case "LINE":
            
            roughElement = getRoughLine({x1,x2,y1,y2});
            return{
                id:id,
                roughElement,
                toolType,
                x1,
                x2,
                y1,
                y2
            }


        default:
            throw new Error('error on the create element');
    }
}


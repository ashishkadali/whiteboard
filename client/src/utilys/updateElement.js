import React from 'react'
import { createElement } from './createElement';
import { setupdateElement } from '../Store/resusableStore';
import storeToolKit from '../Store/store';


export default function updateElement({index, x1,y1,x2,y2,toolType,id},Elements) {

    let updatedRoughElement

    switch(toolType){
        case "RECTANGLE":
            let ElementsCopy = [...Elements];
            updatedRoughElement = createElement({x1,y1,x2,y2,toolType,id});
            ElementsCopy[index] = updatedRoughElement;

            return updatedRoughElement
        case "CIRCLE":
            updatedRoughElement = createElement({x1,y1,x2,y2,toolType,id});
            return updatedRoughElement
        case "LINE":
            updatedRoughElement = createElement({x1,y1,x2,y2,toolType,id});
            return updatedRoughElement   
        default:
            throw new Error('error on updateElement')
    }
}

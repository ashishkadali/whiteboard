import React from "react";
import rectangle from "../resoursce/rectangle.svg";
import Line from"../resoursce/Line.svg";
import ellipse from "../resoursce/ellipse.svg";
import { useDispatch, useSelector } from "react-redux";
import { setToolType } from "../Store/resusableStore";

const IconButton = ({src, toolTypes}) => {
    const dispatch = useDispatch();
    const selected = useSelector(state => state.reusingState.toolTypes);

    const handleToolChange =()=>{
            dispatch(setToolType(toolTypes));
    
        }

    return (
        <button
          onClick={handleToolChange}
          className={
            selected === toolTypes ? "menu_button_active" : "menu_button"
          }
        >
          <img width="80%" height="80%" src={src}  />
        </button>
      );
    };

export default function Menu() {
    
  return (
    <div>
      <div className="menu_container">
        <IconButton src={rectangle} toolTypes="RECTANGLE" />
        <IconButton src={ellipse} toolTypes="CIRCLE" />
        <IconButton src={Line} toolTypes="LINE" />

      </div>
    </div>
  );
}

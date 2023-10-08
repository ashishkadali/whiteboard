import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import rough from "roughjs/bundled/rough.esm";
import { createElement } from "../utilys/createElement";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { setElements, setupdateElement ,setSocketElements} from "../Store/resusableStore";
import updateElement from "../utilys/updateElement";
import drawElement from "../utilys/drawElement";
import adjustElement  from "../utilys/adjustionElements";
import Menu from "./Menu";

let selectedElement;

const setSelectedElement = (element) => {
  selectedElement = element;
};

export default function MainWhiteboard({socket}) {
  const canvaRef = useRef();
  const selectedTool = useSelector((state) => state.reusingState.toolType);
  const Elements = useSelector((state) => state.reusingState.element);
  const socketElements = useSelector((state)=> state.reusingState.socketElements);
  const [action, setAction] = useState("");
  const dispatch = useDispatch();
  const [roomID,setRoomID] = useState('');
  const [showMenu,setShowMenu] = useState("");
  const [sharing, setSharingElements] = useState([]);

  useLayoutEffect(() => {
    const canvas = canvaRef.current;

    const cxt = canvas.getContext('2d');
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    const roughCanvas = rough.canvas(canvas);


    Elements.map((element) => {
      drawElement({ roughCanvas, element })

    });
  }, [Elements]);

  useLayoutEffect(() => {
    console.log("socketElements",socketElements);
    const canvas = canvaRef.current;

    const cxt = canvas.getContext('2d');
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    const roughCanvas = rough.canvas(canvas);


    socketElements.map((element) => {
      drawElement({ roughCanvas, element })

    });
  }, [socketElements]);

  const handelMoveDown = (event) => {
    if (selectedTool) {
      const { clientX, clientY } = event;
      setAction("DRAWING");
      const element = createElement({
        x1: clientX,
        y1: clientY,
        x2: clientX,
        y2: clientY,
        toolType: selectedTool,
        id: uuid(),
      });
      console.log("ashish", element)
      setSelectedElement(element);
      dispatch(setElements(element));
    }
  };

  const handelMoveUP = () => {
    const index = Elements.findIndex((el) => el.id == selectedElement.id);
    if(index != -1){
      if(action){
        const data = adjustElement({
          toolType: Elements[index].toolType,
            x1: Elements[index].x1,
            y1: Elements[index].y1,
            x2: Elements[index].x2,
            y2: Elements[index].y2
        })
        if(data){
          const data2 = updateElement({
            index,
            id: Elements[index].id,
            toolType: Elements[index].toolType,
            x1:data.x1,
            y1:data.y1 ,
            x2: data.x2,
            y2: data.y2
          }, Elements)
          dispatch(setupdateElement(data2));

        }
        socket.emit("room: Elements", {elements : Elements , room :roomID})      }
    }
    
    setAction(null);
    setSelectedElement(null);

  }

  const handelMouseMove = (event) => {
    const { clientX, clientY } = event;

    if (selectedTool) {
      if (action == "DRAWING") {

        const index = Elements.findIndex((el) => el.id == selectedElement.id);

        if (index != -1) {

          const data = updateElement({
            index,
            id: Elements[index].id,
            toolType: Elements[index].toolType,
            x1: Elements[index].x1,
            y1: Elements[index].y1,
            x2: clientX,
            y2: clientY
          }, Elements)

          dispatch(setupdateElement(data));
        }
      }
    }

  }


  const handleNewUser = (data) => {
    console.log("ashish",data);
    const checkings = data.filter((ele)=> ele.created === true);
    console.log("New",checkings[0].socketid);
    setShowMenu(checkings[0].socketid);
    setRoomID(checkings[0].room);
  };

  console.log("socket",showMenu,socket.id);
  const handleElementsData = (data) =>{
    // setSharingElements([...data])
    console.log("room: Elements",data)
    dispatch(setSocketElements(data));
    // dispatch(setElements(data));

  }


  useEffect(()=>{
    socket.on("room: userjoined", handleNewUser);
    socket.on("room: ElementsData", handleElementsData)
    return () => {
      socket.off("room: newUser", handleNewUser);
    };
  },[socket,Elements]);


  return (
    <div>
      { showMenu ==socket.id ? <Menu/> : "" } 
     
      {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', border: "1px solid pink" }}> */}
        <canvas
          ref={canvaRef}
          width={window.innerWidth}
          height= {window.innerHeight}
          onMouseDown={handelMoveDown}
          onMouseUp={handelMoveUP}
          onMouseMove={handelMouseMove}
        />
      {/* </div> */}

    </div>

  );

}

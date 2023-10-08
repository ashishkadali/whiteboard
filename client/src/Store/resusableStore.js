import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toolType: null,
  element : [],
  tools:["RECTANGLE"],
  socketElements : []
};

const reusingState = createSlice({
  name: "reuse",
  initialState,
  reducers: {
    setToolType: (state, action) => {
      state.toolType = action.payload;
    },
    setElements : (state , action ) =>{
        state.element.push(action.payload)
    },
    setupdateElement : (state, action) =>{
        let {id} = action.payload
       

        let index = state.element.findIndex((el)=> el.id == id)
          if(index == -1){
              
              state.element.push( action.payload);

          }else{
              state.element[index] = action.payload
          }
    },
    setSocketElements : (state, action) => {
      state.socketElements = []
      state.socketElements= action.payload
    }
  },
});

export const { setToolType,setElements, setupdateElement,setSocketElements} = reusingState.actions;
export const reusingStateReduceer =  reusingState.reducer;

import Login from "./Rooms.js/Login";
import storeToolKit from "./Store/store";
import MainWhiteboard from "./Whiteboard/MainWhiteboard";
import Menu from "./Whiteboard/Menu";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App({socket}) {
  return (
    <div className="App">
      <Provider store={storeToolKit}>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login socket={socket}/>} />
          <Route path="/whiteboard/:id" element={<MainWhiteboard socket={socket} />} />
        </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

import {Routes, Route } from "react-router-dom";
import Screen from "./components/Screen";

const AppRoutes = () => {
    return ( 
      <Routes> 
      <Route path="/" element={<Screen></Screen>}></Route>
      
      </Routes>
    );
  };
  
  export default AppRoutes;
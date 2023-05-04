
import {BrowserRouter} from "react-router-dom";
import AppRoutes from './AppRoutes';
import './App.css'


function App() {
  return (
    <div> 
       <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    </div>
   
  );
}

export default App;
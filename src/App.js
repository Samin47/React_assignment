import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import ProductViewer from './Components/ProductViewer/productViewer';

function App() {
  return (
    <div className="App">
      <div className="main">
        
        <Routes>
       
          <Route path="/product/view/:id/" element={<ProductViewer/>} />
      
        </Routes>
      </div>
    </div>
  );
}

export default App;

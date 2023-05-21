import './App.css';
import {
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import { ProductList } from './components/product-list/ProductList';
function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/*" element={<Navigate replace to="/product-list" />} />
        <Route path="/product-list" element={<ProductList />} />
       
   
      </Routes>

    </div>

  );
}

export default App;

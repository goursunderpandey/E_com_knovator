import "./App.css";
import { AppProvider } from "../src/Context/Appcontext";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import Header from "./Component/Header";
import Productlist from "./pages/Productlist";
import Cart from "./pages/Cart";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
           <main>
          <Routes>
            <Route path="/" element={<Productlist />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

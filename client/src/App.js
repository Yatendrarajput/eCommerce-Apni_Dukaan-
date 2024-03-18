import { Routes,Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Policy from "./Pages/Policy";
import PagenotFound from "./Pages/PagenotFound";
import {Routes,Route} from "react-router-dom"
import login from "./Pages/auth/login";
import register from "./Pages/auth/register";
function App() {
  return (

    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/register" element={<register/>} />
      <Route path="/login" element={<login/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/policy" element={<Policy/>} />
      <Route path="*" element={<PagenotFound/>} />
    </Routes>
      
    </>
  );
}

export default App;

import { Routes,Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Policy from "./Pages/Policy";
import PagenotFound from "./Pages/PagenotFound";

function App() {
  return (

    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/About" element={<About/>} />
      <Route path="/Contact" element={<Contact/>} />
      <Route path="/Policy" element={<Policy/>} />
      <Route path="*" element={<PagenotFound/>} />
    </Routes>
      
    </>
  );
}

export default App;

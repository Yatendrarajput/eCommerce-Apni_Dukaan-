import { Routes,Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Policy from "./Pages/Policy";
import PagenotFound from "./Pages/PagenotFound";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import ForgotPassword from "./Pages/auth/ForgotPassword";
import Dashboard from "./Pages/user/Dashboard";
import PrivateRoute from "./Components/Layout/Routes/Private";
function App() {
  return (

    <>
    <Routes>
    
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
        </Route>
      <Route path="/Register" element={<Register/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/policy" element={<Policy/>} />
      <Route path="*" element={<PagenotFound/>} />
    </Routes>
      
    </>
  );
}

export default App;

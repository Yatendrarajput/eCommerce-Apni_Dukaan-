import React from 'react'
import { NavLink,Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
const Header = () => {
  const [auth,setAuth] = useAuth();
  const handleLogout =() =>{
    //on logging out, local storage ko clear krna h and jo bhi user token show kr rh h usse bhi empt krna h
    setAuth({
      //spreading auth
      ...auth,
      //emptying the user
      user:null,
      token:''
    })
    localStorage.removeItem('auth');
    toast.success("Logout Successfully");
  };
  return (
    <>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler"
     type="button" 
     data-bs-toggle="collapse" 
     data-bs-target="#navbarTogglerDemo01" 
     aria-controls="navbarTogglerDemo01" 
     aria-expanded="false" 
     aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to='/' className="navbar-brand" >
     
      </Link>

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink to='/' className="nav-link "  >
          Home
          </NavLink>
        </li>

       {
        //if user doesnt exist toh login register dikhao
        //if user exists then logout ka option do
        //first condition for true next one for false
        !auth.user ? (<>
         <li className="nav-item">
          <NavLink to='/Register' className="nav-link" >
          Register
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to='/Login' className="nav-link" >
          Login
          </NavLink>
        </li>
        </>): (<>
          <li className="nav-item">
          <NavLink onClick={handleLogout} to='/Login' className="nav-link" >
          Logout
          </NavLink>
        </li>
        </>)
       }
       
        
        <li className="nav-item">
          <NavLink to='/Category' className="nav-link" >
          Category
          </NavLink>
        </li>
        
        <li className="nav-item">
          <NavLink to='/Cart' className="nav-link" >
          Cart[0]
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </>
  )
}

export default Header
 import axios from "axios";
 import toast from "react-hot-toast";
 import {useNavigate} from 'react-router-dom';

 const Register=() =>{

    const navigate = useNavigate()
 }
 
 // form function
 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };


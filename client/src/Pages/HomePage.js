<<<<<<< HEAD
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Layout from '../Components/Layout/layout'
import { useAuth } from '../context/auth'
import axios  from 'axios'
import toast from "react-hot-toast";
import {Checkbox,Radio} from 'antd'
import { Prices } from '../Components/Prices'

const HomePage = () => {

  const[auth,setAuth]=useAuth()
  const[products,setProducts]=useState([])
  const[categories,setCategories]=useState([])
  const[checked,setChecked]=useState([]);
  const[radio,setRadio]=useState([]);

  //get all categories
  const getAllProducts = async()=>{
    try {
     const {data} = await axios.get("/api/v1/product/get-product");
     setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

useEffect(()=>{
getAllProducts();
},[]);

 //get all category
 const getAllCategory = async () => {
  try {
    const { data } = await axios.get("/api/v1/category/get-category");
    if (data?.success) {
      setCategories(data?.category);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something wwent wrong in getting catgeory");
  }
};

useEffect(() => {
  getAllCategory();
}, []);

//Filters by cat
const handleFilter=(value,id)=>{
 let all=[...checked]
  if(value){
all.push(id)
}
else{
  all=all.filter(c=>c!==id)
}
setChecked(all);
}

useEffect(() => {
  if (!checked.length || !radio.length) getAllProducts();
}, [checked.length, radio.length]);

useEffect(() => {
  if (checked.length || radio.length) filterProduct();
}, [checked, radio]);

 //get filterd product
 const filterProduct = async () => {
  try {
    const { data } = await axios.post("/api/v1/product/product-filters", {
      checked,
      radio,
    });
    setProducts(data?.products);
  } catch (error) {
    console.log(error);
  }
};


  return (
    <Layout title = {"All products-Best offers "}>
    <div className='row mt-3'>
      <div className='col-md-2'>
        <h4 className='text-center'>Filters by Category </h4>
        <div className='d-flex flex-column'>
        {categories?.map((c) => (
          <Checkbox key= {c._id} onChange ={(e)=> handleFilter(e.target.checked,c._id ) }>
          {c.name}
          </Checkbox>
        ))}
      </div>
        <h4 className='text-center'>Filters by Prices </h4>
        <div className='d-flex flex-column'>
        <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
         {Prices?.map(p=>(
          <div>
          <Radio value={p.array}>{p.name} </Radio>
          </div>
        ))}
        </Radio.Group>
        </div>
        <div className='d-flex flex-column'>
         <button className='btn btn-danger' onClick={()=> window.location.reload()}>Reset Filters</button>
        </div>
      </div>
      <div className='col-md-9'>
      
        <h1 className='text-center'>All Product</h1>
        <div className='d-flex flex-wrap'>
        {products?.map((p) => (
             
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,30)}</p>
                    <p className="card-text"> $ {p.price}</p>
                    <button className='btn btn-primary ms-1'>More Details</button>
                    <button className='btn btn-secondary ms-1'>Add to Cart</button>
                  </div>
                </div>
             
            ))}
        </div>
      </div>
    </div>
    
    </Layout>
  )
}
=======
import React, { useState, useEffect } from "react";
import Layout from '../Components/Layout/layout'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import{Checkbox,Radio} from "antd";
import {Prices} from "./../Components/Prices"
const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1); //initially ek page hoga
  const [loading, setLoading] = useState(false);
>>>>>>> aa783d76f93c0526a8b04847191b353e482e4d5f


  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count"); //api ke through netwrok request bhejenge
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      //array of products, then spread data praducts
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"ALl Products - Best offers "}>
      <div className="container-fluid row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9 offset-1">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button className="btn btn-secondary ms-1">
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3"> 
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};


export default HomePage;
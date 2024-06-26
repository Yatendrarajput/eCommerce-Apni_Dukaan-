import React from 'react'
import { useState, useEffect } from 'react'
import Layout from '../Components/Layout/layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
const CategoryProduct = () => {
    const [products, setProducts]=useState([]);
    const [category, setCategory]=useState([]);
    const params= useParams()
    const navigate=useNavigate();
    useEffect(()=>{
        if(params?.slug)getProductByCat()
    },[params?.slug])
    const getProductByCat = async ()=>{
        try {
        const {data} = await axios.get(`/api/v1/product/product-category/${params.slug}`) 
        setProducts(data?.products)
        setCategory(data?.category)           
        } catch (error) {
            console.log(error);
        }
    }
    return (
    <Layout>
        <div className='container'>
        
        <h3 className='text-center'>{category?.name}</h3>
        <h6 className='text-center'>{products?.length} RESULT FOUND</h6>
        <div className='row'>
        <div className="col-md-9 offset-1">
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
        </div>
        </div>
        </div>
    </Layout>
  )
}

export default CategoryProduct
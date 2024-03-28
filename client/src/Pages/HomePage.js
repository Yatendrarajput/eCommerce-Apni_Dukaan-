import React from 'react'
import Layout from '../Components/Layout/layout'
import { useAuth } from '../context/auth'
const HomePage = () => {
  const[auth,setAuth]=useAuth()
  return (
    <Layout title = {"Best offers - Shop Now"}>
    <h1>
    HomePage
    </h1>
    <pre>{JSON.stringify(auth,null,4)}</pre>
    </Layout>
  )
}

export default HomePage
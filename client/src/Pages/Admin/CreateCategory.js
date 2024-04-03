import React from 'react'
import AdminMenu from '../../Components/Layout/AdminMenu'
import Layout from '../../Components/Layout/layout'
const CreateCategory = () => {
  return (
    <Layout title={'Dashboard-CreateCategory'}>
      <div className='conntainer-fluid  m-3 p-3'>
    <div className='row'>
           <div className='col-md-3'>
            <AdminMenu/>
           </div>
           <div className='col-md-9'>
           <h1>CreateCategory</h1>
           </div>
        </div>
        </div>
</Layout>
  )
}

export default CreateCategory
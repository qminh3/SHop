import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({category,subCategory}) => {

    const {products} =useContext(ShopContext)
    const [related,setRelated] =useState([]   )

    useEffect(()=>{
        if (products.length > 0) {
            let productCopy = products.slice(0,products.length);
            productCopy = productCopy.filter(product => product.category === category && product.subCategory === subCategory)
            setRelated(productCopy.slice(0,5))
        }
    },[products])
 
  return (
    <div className='my-24'>
      <div className=' text-3xl py-2 mb-10'>
        <p className='text-black'>Sản phẩm cùng loại</p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                related.map((item,index)=>{
                    return (
                        <ProductItem
                        key={index}
                        id={item._id}
                        name={item.name}
                        price={item.price}
                        image={item.image}
                      />
                    )
                })
            }
      </div>
    </div>
  )
}

export default RelatedProducts

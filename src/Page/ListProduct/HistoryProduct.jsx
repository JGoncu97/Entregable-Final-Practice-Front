import React, { useContext } from 'react'
import { ListProduct } from '../../Component/ListProduct/ListProduct'
import { ProductContext } from '../../Context/ListProvider';
import { Footer } from '../../Layout/Footer/Footer';
import { Header } from '../../Layout/Header/Header';


export const HistoryProduct = () => {

    const { listProduct} = useContext(ProductContext); 

  return (
    <div className='bg-gray-700 flex flex-col items-center justify-start min-h-screen w-screen p-0 sm:p-0 space-y-8 h-auto '>
        <Header />
        <section className=" flex flex-col items-center justify-center bg-gray-200  rounded-lg shadow-md p-4  space-y-14 w-full  ">
            <h2 className="text-xl font-semibold text-gray-800">Lista de productos</h2>
            <ListProduct products={listProduct} />
        </section>
        <Footer />
    </div>
    
  )
}

import React from 'react'
import { Header } from '../../Layout/Header/Header'
import { Footer } from '../../Layout/Footer/Footer'
import { GraphicsInv } from '../../Component/Graphics/GraphicsInv'
import { useNavigate } from 'react-router'


export const Comparative = () => {

    const navigate = useNavigate()

   

  return (
    <div className='flex flex-col w-full h-screen bg-gray-700'>
      <Header />
        <div className='flex flex-col items-center space-y-4'>
            <h1 className='font-bold text-3xl text-white mt-7'>Bienvenido a mi Gestor de Productos de Mercado</h1>
              <GraphicsInv />

            
        </div>
        <Footer />
    </div>
  )
}

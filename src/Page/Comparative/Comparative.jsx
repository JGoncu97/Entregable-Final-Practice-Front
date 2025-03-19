import React from 'react'
import { Header } from '../../Layout/Header/Header'
import { Footer } from '../../Layout/Footer/Footer'
import { GraphicsInv } from '../../Component/Graphics/GraphicsInv'
import { useNavigate } from 'react-router'
useNavigate


export const Comparative = () => {
  const navigate = useNavigate();

  const handleResume = () =>{
    navigate('/Resume')
  }

  return (
    <div className='flex flex-col w-full h-screen bg-gray-700'>
      <Header />
        <div className='flex flex-col items-center space-y-4'>
              <GraphicsInv />
        </div>
        <button onClick={handleResume} >Resumen de Gasto</button>
        <Footer />
    </div>
  )
}

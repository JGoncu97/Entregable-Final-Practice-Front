import React from 'react'
import { Header } from '../../Layout/Header/Header'
import { Footer } from '../../Layout/Footer/Footer'
import { GraphicsInv } from '../../Component/Graphics/GraphicsInv'



export const Comparative = () => {

  

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-700">
    <Header />

    <div className="flex flex-col items-center md:items-start space-y-4 p-4 sm:p-6 md:p-8">
        <GraphicsInv />
    </div>

    <Footer />
</div>

  )
}

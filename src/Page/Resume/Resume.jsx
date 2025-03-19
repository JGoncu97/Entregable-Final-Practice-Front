import React from 'react'
import { Header } from '../../Layout/Header/Header'
import { Footer } from '../../Layout/Footer/Footer'
import { ExpenseTable } from '../../Component/TableComparative/ExpenseTable'


export const Resume = () => {
  return (
    <div className='flex flex-col w-full h-screen bg-gray-700 '>
        <Header />
            <div className='flex flex-col items-center gap-7 w-full'>
                <ExpenseTable  />
            </div>    
        <Footer />    
    </div>

  )
}

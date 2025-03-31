import React from 'react'
import { Header } from '../../Layout/Header/Header'
import { Footer } from '../../Layout/Footer/Footer'
import { ExpenseTable } from '../../Component/TableComparative/ExpenseTable'


export const Resume = () => {
  return (
    <div className='flex flex-col w-full min-h-screen h-full bg-gray-700'>
      <Header />
        <div className='flex flex-col items-center mb-22 mt-20 gap-7  px-4 sm:px-6 md:px-8'>
            <ExpenseTable />
        </div>
      <Footer />
    </div>

  )
}

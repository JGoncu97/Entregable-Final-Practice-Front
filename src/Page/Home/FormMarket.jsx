import React from 'react';
import {AddForm} from '../../Component/AddForm/AddForm'
import { Footer } from '../../Layout/Footer/Footer';
import { Header } from '../../Layout/Header/Header';



export const FormMarket = () => {
    return (
        <div className="bg-gray-700 flex flex-col items-center justify-start min-h-screen w-screen p-0 sm:p-0 space-y-8 h-auto">
            <Header />
            <AddForm />
            <Footer />
        </div>
    );
};

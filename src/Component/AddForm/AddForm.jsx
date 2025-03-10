import React, { useContext, useEffect, useState } from 'react'
import { Select } from '../Select/Select'
import { ProductContext } from '../../Context/ListProvider';
import { db } from '../../assets/firebase-config';
import { addDoc, collection } from 'firebase/firestore';




export const AddForm = () => {

    const { addProduct,categories,category,shop,shops,setCategory,setShop,dateProduct} = useContext(ProductContext); 
        const [nameProduct, setNameProduct] = useState('');
        const [priceProduct, setPriceProduct] = useState('');
        const [mark, setMark] = useState('');
        const [stock, setStock] = useState('');
        const [unit, setUnit] = useState('g');

        const handleStockChange = (e) => {
            let value = e.target.value;
            setStock(value);
        };
        
        

    const handleAddProduct = (e) => {
        e.preventDefault();

        if (!nameProduct || priceProduct == null || !category || !shop || !mark || !stock) {
            return;
        }

        let convertedStock = stock;
        if (unit === 'kg') {
            convertedStock = stock * 1000; 
        } else if (unit === 'l') {
            convertedStock = stock * 1000; 
        } 

        const newProduct = { 
            name: nameProduct, 
            price: Number(priceProduct), 
            category: category,  
            quantity: convertedStock, 
            unit: unit, 
            store: shop,
            tradeMark: mark,
            date:dateProduct
        };
        

        addProduct(newProduct);
        
        setNameProduct('');
        setPriceProduct('');
        setCategory('');
        setMark('');
        setStock('');
        setShop('');
    };

  return (
    <form onSubmit={handleAddProduct} className="flex flex-col items-center justify-start bg-gray-200 p-6 rounded-lg shadow-md space-y-4 w-screen xl:h-auto max-w-md">
                    <h2 className="text-xl font-bold text-gray-800">Agregar Productos</h2>
                    <label className='text-xl font-semibold text-gray-800' >Nombre del producto</label>
                    <input
                        className="w-full sm:w-72 p-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={nameProduct}
                        onChange={(e) => setNameProduct(e.target.value)}
                        type="text"
                        placeholder="Nombre del producto"
                    />
                    <label className='text-xl font-semibold text-gray-800'>Marca del producto</label>
                    <input
                        className="w-full sm:w-72 p-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={mark}
                        onChange={(e) => setMark(e.target.value)}
                        type="text"
                        placeholder="Marca del producto"
                    />
                    <label className='text-xl font-semibold text-gray-800'>Precio del producto</label>
                    <input
                        className="w-full sm:w-72 p-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={priceProduct}
                        onChange={(e) => setPriceProduct(Number(e.target.value))}
                        type="number"
                        placeholder="Precio del Producto"
                    />
                    <label className='text-xl font-semibold text-gray-800'>Peso del producto</label>
                    <select
                        className="w-full sm:w-72 p-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                    >
                        <option value="g">Gramos (g)</option>
                        <option value="kg">Kilogramos (kg)</option>
                        <option value="ml">Mililitro (ml)</option>
                        <option value="l">Litro (l)</option>
                    </select>
                    <input
                        className="w-full sm:w-72 p-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={stock}
                        onChange={handleStockChange}
                        type="number"
                        placeholder="Ingrese el peso"
                    
                    />                
                    <label className='text-xl font-semibold text-gray-800' > Categoria de producto</label>
                        <Select onChange={(e) => setCategory(e.target.value)}  option={category} value={categories} name={"Seleccionar Categoria"} />
                    <label className='text-xl font-semibold text-gray-800' > Tienda</label>
                        <Select onChange={(e) => setShop(e.target.value)} option={shop} value={shops} name={"Seleccionar Tienda"} />
                    <button className="w-full sm:w-72 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        Agregar a la lista
                    </button>
                </form>
  )
}

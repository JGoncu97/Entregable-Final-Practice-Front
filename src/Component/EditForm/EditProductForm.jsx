import React, { useState, useContext } from 'react';
import { ProductContext } from '../../Context/ListProvider';



export const EditProductForm = ({ product, onClose }) => {
    const { updateProductBD } = useContext(ProductContext);
    const [editedProduct, setEditedProduct] = useState({ ...product });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prev) => ({
            ...prev,
            [name]: name === "price" ? parseFloat(value) || 0 : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProductBD(editedProduct);
        onClose();
    };
    

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Editar Producto</h2>
                <form onSubmit={handleSubmit}>
                    <label >Producto</label>
                        <input type="text" name="name" value={editedProduct.name} onChange={handleChange} className="block w-full p-2 border mb-2" />
                    <label ></label>
                    <input type="text" name="tradeMark" value={editedProduct.tradeMark} onChange={handleChange} className="block w-full p-2 border mb-2" />
                    <input type="number" name="price" value={editedProduct.price} onChange={handleChange} className="block w-full p-2 border mb-2" />
                    <input type="text" name="quantity" value={editedProduct.quantity} onChange={handleChange} className="block w-full p-2 border mb-2" />
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Guardar</button>
                    <button type="button" onClick={onClose} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">Cancelar</button>
                </form>
            </div>
        </div>
    );
};

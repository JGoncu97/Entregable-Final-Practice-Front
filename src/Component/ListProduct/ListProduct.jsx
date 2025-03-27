import React, { useContext, useState } from "react";
import { EditProductForm } from "../EditForm/EditProductForm";
import { ProductContext } from "../../Context/ListProvider";
import { FilterList } from "../Filter/FilterList";

export const ListProduct = ({ products }) => {
    const [editingProduct, setEditingProduct] = useState(null);
    const { updateProductBD } = useContext(ProductContext);
    const [searchName, setSearchName] = useState("");
    const [searchTradeMark, setSearchTradeMark] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [category, setCategory] = useState("");

    const formatQuantity = (quantity, unit) => {
        if (unit === "kg" || unit === "g") {
            return quantity >= 1000 ? `${quantity / 1000} kg` : `${quantity} g`;
        } else if (unit === "l" || unit === "ml") {
            return quantity >= 1000 ? `${quantity / 1000} l` : `${quantity} ml`;
        }
        return `${quantity} ${unit}`;
    };

    const filteredProducts = products.filter((product) => {
        return (
            product.state !== false &&
            product.name.toLowerCase().includes(searchName.toLowerCase()) &&
            product.tradeMark.toLowerCase().includes(searchTradeMark.toLowerCase()) &&
            (maxPrice === "" || product.price <= parseFloat(maxPrice)) &&
            (category === "" || product.category.toLowerCase() === category.toLowerCase())
        );
    });

    const handleDeleteProduct = (product) => {
        // Crear un nuevo producto con el estado cambiado a false
        const updatedProduct = {
            ...product,
            state: false  // Cambiar el estado a false
        };

        // Llamar a la función de actualización del contexto
        updateProductBD(updatedProduct);
    };

    return (
        <div className="w-full max-w-4xl mx-auto sm:p-4">
            <FilterList 
                searchName={searchName} setSearchName={setSearchName}
                searchTradeMark={searchTradeMark} setSearchTradeMark={setSearchTradeMark}
                maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                category={category} setCategory={setCategory}
            />
            <div className="flex">
                {editingProduct && (
                    <EditProductForm 
                        product={editingProduct} 
                        onClose={() => setEditingProduct(null)} 
                        onSave={(updatedProduct) => {
                            updateProductBD(updatedProduct);
                            setEditingProduct(null);
                        }} 
                    />
                )}
                <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Producto</th>
                            <th className="py-2 px-4 border-b text-left">Marca</th>
                            <th className="py-2 px-4 border-b text-left">Precio</th>
                            <th className="py-2 px-4 border-b text-left">Peso</th>
                            <th className="py-2 px-4 border-b text-left">Categoría</th>
                            <th className="py-2 px-4 border-b text-left">Fecha</th>
                            <th className="py-2 px-4 border-b text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{product.name}</td>
                                <td className="py-2 px-4 border-b">{product.tradeMark}</td>
                                <td className="py-2 px-4 border-b font-bold text-green-600">
                                    ${product.price.toFixed(2)}
                                </td>
                                <td className="py-2 px-4 border-b">{formatQuantity(product.quantity, product.unit)}</td>
                                <td className="py-2 px-4 border-b">{product.category}</td>
                                <td className="py-2 px-4 border-b">{product.date}</td>
                                <td className="py-2 px-4 border-b">
                                    <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-4" onClick={() => setEditingProduct(product)}>
                                        Editar
                                    </button>
                                    <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDeleteProduct(product)} >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

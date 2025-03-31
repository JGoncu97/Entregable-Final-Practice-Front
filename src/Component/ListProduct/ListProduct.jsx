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
        <div className="w-full max-w-6xl mx-auto p-2 sm:p-4 lg:p-6">
        <FilterList 
            searchName={searchName} setSearchName={setSearchName}
            searchTradeMark={searchTradeMark} setSearchTradeMark={setSearchTradeMark}
            maxPrice={maxPrice} setMaxPrice={setMaxPrice}
            category={category} setCategory={setCategory}
        />
        
        <div className="flex flex-col lg:flex-row">
            {editingProduct && (
                <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
                    <EditProductForm 
                        product={editingProduct} 
                        onClose={() => setEditingProduct(null)} 
                        onSave={(updatedProduct) => {
                            updateProductBD(updatedProduct);
                            setEditingProduct(null);
                        }} 
                    />
                </div>
            )}
            
            <div className="w-full overflow-x-auto">
                <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md text-sm sm:text-base">
                    <thead className="bg-gray-200 text-left">
                        <tr>
                            <th className="py-2 px-4 border-b">Producto</th>
                            <th className="py-2 px-4 border-b">Marca</th>
                            <th className="py-2 px-4 border-b">Precio</th>
                            <th className="py-2 px-4 border-b">Peso</th>
                            <th className="py-2 px-4 border-b hidden sm:table-cell">Categoría</th>
                            <th className="py-2 px-4 border-b hidden md:table-cell">Fecha</th>
                            <th className="py-2 px-4 border-b text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-100 text-left">
                                <td className="py-2 px-4 border-b">{product.name}</td>
                                <td className="py-2 px-4 border-b">{product.tradeMark}</td>
                                <td className="py-2 px-4 border-b font-bold text-green-600">
                                    ${product.price.toFixed(2)}
                                </td>
                                <td className="py-2 px-4 border-b">{formatQuantity(product.quantity, product.unit)}</td>
                                <td className="py-2 px-4 border-b hidden sm:table-cell">{product.category}</td>
                                <td className="py-2 px-4 border-b hidden md:table-cell">{product.date}</td>
                                <td className="py-2 px-4 border-b text-center h-full">
    <div className="grid gap-2 sm:flex sm:justify-center">
        <button className="bg-yellow-500 text-white px-3 py-1 rounded text-xs sm:text-sm" 
            onClick={() => setEditingProduct(product)}>
            Editar
        </button>
        <button className="bg-red-500 text-white px-3 py-1 rounded text-xs sm:text-sm" 
            onClick={() => handleDeleteProduct(product)}>
            Eliminar
        </button>
    </div>
</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
};

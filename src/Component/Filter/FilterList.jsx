import React from "react";

export const FilterList = ({ searchName, setSearchName, searchTradeMark, setSearchTradeMark, maxPrice, setMaxPrice, category, setCategory }) => {
    return (
        <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <input
                type="text"
                placeholder="Buscar por nombre..."
                className="p-2 border rounded"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Buscar por marca..."
                className="p-2 border rounded"
                value={searchTradeMark}
                onChange={(e) => setSearchTradeMark(e.target.value)}
            />
            <input
                type="number"
                placeholder="Precio máximo..."
                className="p-2 border rounded"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
            />
            <input
                type="text"
                placeholder="Categoría..."
                className="p-2 border rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
        </div>
    );
};

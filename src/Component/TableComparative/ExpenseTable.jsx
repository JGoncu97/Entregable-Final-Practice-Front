import React, { useContext } from "react";
import { ProductContext } from "../../Context/ListProvider";

export const ExpenseTable = () => {
    const { listProduct } = useContext(ProductContext);

    if (!listProduct || listProduct.length === 0) {
        return <p className="text-center">No hay compras registradas.</p>;
    }

    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    // Agrupar gastos por mes y año
    const expensesByMonth = {};

    listProduct.forEach((product) => {
        if (!product.date || !product.price) return;

        const [day, month, year] = product.date.split("/").map(Number);
        if (!day || !month || !year) return;

        const monthYearKey = `${monthNames[month - 1]} ${year}`;

        if (!expensesByMonth[monthYearKey]) {
            expensesByMonth[monthYearKey] = 0;
        }

        expensesByMonth[monthYearKey] += product.price;
    });

    // Ordenar los datos cronológicamente
    const sortedMonths = Object.keys(expensesByMonth).sort((a, b) => {
        const [monthA, yearA] = a.split(" ");
        const [monthB, yearB] = b.split(" ");
        return new Date(yearA, monthNames.indexOf(monthA)) - new Date(yearB, monthNames.indexOf(monthB));
    });

    return (
        <div className="w-[60rem] bg-white p-4 shadow-lg rounded-lg m-4">
            <h2 className="text-center text-lg font-semibold mb-2">Resumen de Gastos por Mes</h2>

            <table className="table w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Mes</th>
                        <th className="border border-gray-300 px-4 py-2">Gasto Total</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedMonths.map((month) => (
                        <tr key={month} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{month}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                ${expensesByMonth[month].toLocaleString("es-ES")}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

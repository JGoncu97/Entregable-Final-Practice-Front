import React, { useContext } from "react";
import Chart from "react-apexcharts";
import { ProductContext } from "../../Context/ListProvider";

export const GraphicsInv = () => {
    const { listProduct } = useContext(ProductContext);

    if (!listProduct || listProduct.length === 0) {
        return <p className="text-center">No hay productos para mostrar.</p>;
    }

    const monthOrder = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    // Agrupar productos por año y por mes
    const groupedData = {};

    listProduct.forEach((product) => {
        if (!product.date) return;

        const [day, month, year] = product.date.split("/").map(Number);
        if (!day || !month || !year) return;

        const monthName = new Date(year, month - 1).toLocaleString("default", { month: "long" }).toLowerCase();

        if (!groupedData[year]) {
            groupedData[year] = monthOrder.reduce((acc, m) => {
                acc[m] = [];
                return acc;
            }, {});
        }

        groupedData[year][monthName].push({
            name: product.name,
            price: product.price,
            date: product.date,
            storeName: product.store
        });
    });

    return (
        <div className="w-full bg-white p-4 shadow-lg rounded-lg">
            <h2 className="text-center text-lg font-semibold mb-2">Comparación de Precios por Año</h2>
            <p className="text-center text-gray-600">Productos comprados organizados por mes</p>

            {Object.entries(groupedData).map(([year, data]) => {
                const series = [...new Set(listProduct.map(p => p.name))].map(productName => ({
                    name: productName,
                    data: monthOrder.map(month => {
                        const product = data[month].find(p => p.name === productName);
                        return product ? product.price : 0;
                    })
                }));

                return (
                    <div key={year} className="mb-8">
                        <h3 className="text-center text-xl font-semibold mb-4">{year}</h3>
                        <Chart 
                            options={{
                                chart: { type: "bar", height: 380 },
                                plotOptions: { bar: { columnWidth: "80%" } },
                                xaxis: { categories: monthOrder.map(m => m.charAt(0).toUpperCase() + m.slice(1)) },
                                tooltip: {
                                    y: {
                                        formatter: (val, { seriesIndex, dataPointIndex }) => {
                                            if (val === 0) return "";
                                            const month = monthOrder[dataPointIndex];
                                            const product = series[seriesIndex].name;
                                            const productData = data[month].find(p => p.name === product);
                                            return `
                                                
                                                <strong>Precio:</strong> $${val.toLocaleString("es-ES", { minimumFractionDigits: 2 })} <br>
                                                <strong>Fecha:</strong> ${productData?.date || "Sin fecha"} <br>
                                                <strong>Tienda:</strong> ${productData?.storeName || "Desconocida"}
                                            `;
                                        }
                                    }
                                },
                                dataLabels: { enabled: false }
                                
                            }}
                            series={series}
                            type="bar"
                            height={350}
                        />
                    </div>
                );
            })}
        </div>
    );
};

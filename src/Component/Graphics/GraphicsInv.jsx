import React, { useContext, useMemo } from "react";
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

    // Procesamiento de productos usando ID como identificador único
    const processedProducts = useMemo(() => {
        const groupedByYear = {};

        listProduct.forEach((product) => {
            if (!product.date) return;

            const [day, month, year] = product.date.split("/").map(Number);
            if (!day || !month || !year) return;

            const monthName = new Date(year, month - 1).toLocaleString("default", { month: "long" }).toLowerCase();

            if (!groupedByYear[year]) {
                groupedByYear[year] = monthOrder.reduce((acc, m) => {
                    acc[m] = [];
                    return acc;
                }, {});
            }

            // Usar el ID como identificador único
            groupedByYear[year][monthName].push({
                ...product,
                uniqueId: product.id  // Usar ID como identificador
            });
        });

        return groupedByYear;
    }, [listProduct]);

    return (
        <div className="w-full bg-white p-4 shadow-lg rounded-lg">
            <h2 className="text-center text-lg font-semibold mb-2">Comparación de Precios Detallados</h2>
            <p className="text-center text-gray-600">Productos individuales por fecha</p>

            {Object.entries(processedProducts).map(([year, data]) => {
                // Generar series usando el ID como identificador
                const series = monthOrder.flatMap(month => 
                    data[month].map(product => ({
                        name: `${product.name} (${product.date}) `,
                        data: monthOrder.map((m, index) => 
                            m === month ? product.price : 0
                        ),
                        id: product.id,
                        store: product.store  // Añadir store a la serie
                    }))
                );

                return (
                    <div key={year} className="mb-8">
                        <h3 className="text-center text-xl font-semibold mb-4">{year}</h3>
                        <Chart 
                            options={{
                                chart: { 
                                    type: "bar", 
                                    height: 500,
                                    stacked: false
                                },
                                plotOptions: { 
                                    bar: { 
                                        columnWidth: "95%",
                                        distributed: false
                                    } 
                                },
                                xaxis: { 
                                    categories: monthOrder.map(m => m.charAt(0).toUpperCase() + m.slice(1)) 
                                },
                                tooltip: {
                                    y: {
                                        formatter: (val, { seriesIndex }) => {
                                            const productInfo = series[seriesIndex];
                                           productInfo.name.match(/\(([^)]+)\)/);
                                            
                                            return `
                                                <strong>Producto:</strong> ${productInfo.name.split(' (')[0]} <br>
                                                <strong>Precio:</strong> $${val.toLocaleString("es-ES", { minimumFractionDigits: 2 })} <br>
                                                <strong>Tienda:</strong> ${productInfo.store || "Desconocida"} <br>
                                            `;
                                        }
                                    }
                                },
                                dataLabels: { enabled: false },
                                legend: { 
                                    show: false  // Ocultar completamente la leyenda
                                }
                            }}
                            series={series}
                            type="bar"
                            height={600}
                        />
                    </div>
                );
            })}
        </div>
    );
};
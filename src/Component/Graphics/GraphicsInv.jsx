import React, { useContext } from "react";
import Chart from "react-apexcharts";
import { ProductContext } from "../../Context/ListProvider";


export const GraphicsInv = () => {
    const {  listProduct } = useContext(ProductContext); 

    const groupedData = listProduct.reduce((acc, product) => {
      const [day, month, year] = product.date.split("/").map(Number); // Extrae día, mes y año
      const monthName = new Date(year, month - 1).toLocaleString("default", { month: "long" }); 
      
      acc[monthName] = (acc[monthName] || 0) + product.price; 
      return acc;
  }, {});

  
    const categories = Object.keys(groupedData);
    const seriesData = Object.values(groupedData);

    const chartOptions = {
        chart: {
            type: "bar",
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "55%"
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: categories
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto">
            <Chart options={chartOptions} series={[{ name: "Precio Total", data: seriesData }]} type="bar" height={350} />
        </div>
    );
};

import React, { createContext, useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../assets/firebase-config";
import Swal from "sweetalert2";

export const ProductContext = createContext();

export const ListProvider = ({ children }) => {
    const [listProduct, setListProduct] = useState([]); 
    const [totalPrice, setTotalPrice] = useState(0); 
    const [dateProduct, setDateProduct] = useState('');
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(''); 
    const [shop, setShop] = useState('');
    const [shops, setShops] = useState([]);

    // Función para obtener productos de Firebase
    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "productos"));
            const productList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setListProduct(productList);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo obtener los productos. Intenta de nuevo.",
                confirmButtonColor: "#d33",
            });
        }
    };

    useEffect(() => {
        fetchProducts(); // Cargar productos al iniciar
    }, []);

    const addProduct = async (newProduct) => {
        try {
            const docRef = await addDoc(collection(db, "productos"), newProduct);
            setListProduct((prevList) => [...prevList, { id: docRef.id, ...newProduct }]);

            Swal.fire({
                icon: "success",
                title: "Producto agregado",
                text: `El producto "${newProduct.name}" fue agregado con éxito.`,
                confirmButtonColor: "#3085d6",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo agregar el producto. Intenta de nuevo.",
                confirmButtonColor: "#d33",
            });
        }
    };

    const updateProductBD = async (updatedProduct) => {
        if (!updatedProduct.id) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "El producto no tiene un ID válido.",
                confirmButtonColor: "#d33",
            });
            return;
        }

        try {
            const productRef = doc(db, "productos", updatedProduct.id);

            await updateDoc(productRef, {
                name: updatedProduct.name,
                price: updatedProduct.price,
                tradeMark: updatedProduct.tradeMark,
                quantity: updatedProduct.quantity,
                unit: updatedProduct.unit,
                category: updatedProduct.category,
                date: updatedProduct.date,
            });

            await fetchProducts(); 

            Swal.fire({
                icon: "success",
                title: "Producto actualizado",
                text: `El producto "${updatedProduct.name}" fue actualizado con éxito.`,
                confirmButtonColor: "#3085d6",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo actualizar el producto. Intenta de nuevo.",
                confirmButtonColor: "#d33",
            });
            console.error("Error al actualizar el producto:", error);
        }
    };

    useEffect(() => {
        const date = new Date();
        setDateProduct(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);

        const total = listProduct.reduce((total, product) => total + product.price, 0);
        setTotalPrice(total);
    }, [listProduct]);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Store"));
                const storeList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name, 
                }));
                setShops(storeList);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo obtener las tiendas. Intenta de nuevo.",
                    confirmButtonColor: "#d33",
                });
            }
        };

        fetchStores();
    }, []);

    

    return (
        <ProductContext.Provider value={{ 
            listProduct, addProduct, updateProductBD, 
            totalPrice, dateProduct, categories, 
            category, setCategory, shop, setShop, shops 
        }}>
            {children}
        </ProductContext.Provider>
    );
};

import React, { createContext, useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
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

   
    useEffect(() => {
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

        fetchProducts();
    }, []); 

    
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

 
    useEffect(() => {
        const fetchCategories = async () => { 
            try {
                const querySnapshot = await getDocs(collection(db, "Categories"));
                const categoriesList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name, 
                }));
                setCategories(categoriesList);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo obtener las categorias. Intenta de nuevo.",
                    confirmButtonColor: "#d33",
                });
            }
        };

        fetchCategories();
    }, []);

  
    const updateProduct = (updatedProduct) => {
        setListProduct((prevList) =>
            prevList.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            )
        );
    };


    useEffect(() => {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        setDateProduct(`${day}/${month}/${year}`);

 
        const total = listProduct.reduce((total, product) => total + product.price, 0);
        setTotalPrice(total);
    }, [listProduct]);

    return (
        <ProductContext.Provider value={{ 
            listProduct, updateProduct, addProduct, 
            totalPrice, dateProduct, categories, 
            category, setCategory, shop, setShop, shops 
        }}>
            {children}
        </ProductContext.Provider>
    );
};

import React, { useState } from 'react';
import ImgLogo from '../../assets/Inventario.jpg';
import { useNavigate } from 'react-router';
import { auth } from '../../assets/firebase-config';
import { signOut } from 'firebase/auth';
import Swal from 'sweetalert2';

export const NavBar = () => {

  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  const handleListProduct = () => {
    navigate('/History')
  }

  const handleFormMarket = () => {
    navigate('/Home')
  }

  const handleGraphics = () =>{
    navigate('/Comparative')
  }

  const handleResume = () =>{
    navigate('/Resume')
  }

  
  const handleLogout = async () => {
    try {
      await signOut(auth); 
      Swal.fire({
        title: "Sesión cerrada",
        text: "Has cerrado sesión exitosamente.",
        icon: "success",
        confirmButtonText: "Aceptar"
      });
      navigate('/'); 
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo cerrar sesión.",
        icon: "error",
        confirmButtonText: "Intentar de nuevo"
      });
    }
  };

 
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white w-screen relative">
   
    <div className="flex items-center space-x-4">
        <img 
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg" 
            src={ImgLogo} 
            alt="Logo" 
        />
        <h1 className="text-xl sm:text-2xl font-semibold">Gestor de Lista de Mercado</h1>
    </div>

    {/* Menú para pantallas grandes */}
    <div className="hidden sm:flex items-center space-x-6">
        <ul className="flex space-x-6">
            <li onClick={handleFormMarket} className="text-lg hover:text-gray-400 transition-colors cursor-pointer">Agregar Productos</li>
            <li onClick={handleListProduct} className="text-lg hover:text-gray-400 transition-colors cursor-pointer">Lista de Productos</li>
            <li onClick={handleGraphics} className="text-lg hover:text-gray-400 transition-colors cursor-pointer">Gráficas</li>
            <li onClick={handleResume} className="text-lg hover:text-gray-400 transition-colors cursor-pointer">Resumen</li>
        </ul>
        <button onClick={handleLogout} className="bg-red-700 px-4 py-2 rounded-lg font-semibold hover:bg-red-500">
            Cerrar Sesión
        </button>
    </div>

    {/* Botón de menú para móviles */}
    <div className="sm:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white text-2xl flex flex-col space-y-1">
            <span className="block w-6 h-1 bg-white"></span>
            <span className="block w-6 h-1 bg-white"></span>
            <span className="block w-6 h-1 bg-white"></span>
        </button>
    </div>

    {/* Menú móvil */}
    <div className={`sm:hidden absolute top-16 left-0 w-full bg-gray-800 text-white transition-all duration-300 
        ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"}`}>
        
        <ul className="flex flex-col items-center py-6 space-y-4">
            <li onClick={handleFormMarket} className="text-lg hover:text-gray-400 transition-colors cursor-pointer">Agregar Productos</li>
            <li onClick={handleListProduct} className="text-lg hover:text-gray-400 transition-colors cursor-pointer">Lista de Productos</li>
            <li onClick={handleGraphics} className="text-lg hover:text-gray-400 transition-colors cursor-pointer">Gráficas</li>
            <li onClick={handleResume} className="text-lg hover:text-gray-400 transition-colors cursor-pointer">Resumen</li>
        </ul>
        <button onClick={handleLogout} className="bg-red-700 w-full py-3 text-center font-semibold hover:bg-red-500">
            Cerrar Sesión
        </button>
    </div>
</nav>

  );
};

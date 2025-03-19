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
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white  w-screen">
   
      <div className="flex items-center space-x-4">
        <img 
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg" 
          src={ImgLogo} 
          alt="Logo" 
        />
        <h1 className="text-xl sm:text-2xl font-semibold">Gestor de Lista de Mercado</h1>
      </div>

      <div className="hidden sm:flex items-center space-x-6 mr-6">
        <ul className="flex space-x-6">
          <li onClick={handleFormMarket} className="text-lg hover:text-gray-400 transition-colors cursor-pointer">Agregar Productos</li>
          <li onClick={handleListProduct} className="text-lg hover:text-gray-400 transition-colors cursor-pointer">Lista de Productos</li>
          <li onClick={handleGraphics} className="text-lg hover:text-gray-400 transition-colors cursor-pointer">Graficas</li>
          <li onClick={handleResume} className="text-lg hover:text-gray-400 transition-colors cursor-pointer">Resume</li>
        </ul>
        <button onClick={handleLogout} className='bg-red-700 w-[8rem] h-8 rounded-[1rem] font-semibold hover:bg-red-500 '>Cerrar Sesion</button>
      </div>

    
      <div className="sm:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white text-2xl">
        
          <span className="block w-6 h-1 bg-white mb-2"></span>
          <span className="block w-6 h-1 bg-white mb-2"></span>
          <span className="block w-6 h-1 bg-white mb-2"></span>
        </button>
      </div>


      <div className={`sm:hidden absolute top-20 left-0 w-full bg-gray-800 text-white ${isOpen ? "block" : "hidden"} transition-all duration-300`}>
        <ul className="flex flex-col items-center py-4 space-y-4">
          <li onClick={handleFormMarket} className="text-lg hover:text-gray-400 transition-colors cursor-pointer">Agregar Productos</li>
          <li onClick={handleListProduct} className="text-lg hover:text-gray-400 transition-colors cursor-pointer">Lista de Productos</li>
        </ul>
        <button onClick={handleLogout} className="bg-red-700 w-full py-2 mt-4 text-center font-semibold hover:bg-red-500">Cerrar Sesion</button>
      </div>
      
    </nav>
  );
};

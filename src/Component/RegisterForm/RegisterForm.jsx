import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth"; 
import { auth, db } from '../../assets/firebase-config'; 
import Swal from 'sweetalert2';
import BackButton from '../../assets/BackButton.png';
import { doc, setDoc } from 'firebase/firestore';


export const RegisterForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit,watch, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;

            
            await setDoc(doc(db, "users", user.uid), {
                username: data.username,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName
            });

            Swal.fire({
                title: "¡Registro Exitoso!",
                text: `Bienvenido, ${data.username}!`,
                icon: "success",
                confirmButtonText: "Aceptar"
            });

            navigate('/');

        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "No se pudo registrar el usuario",
                icon: "error",
                confirmButtonText: "Intentar de nuevo"
            });
        }
    };

    const password = watch("password");
    return (
        
        <form className='flex flex-col gap-4 w-full max-w-xs sm:max-w-md md:w-[30rem] p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl md:rounded-2xl bg-white text-black shadow-xl' 
        onSubmit={handleSubmit(onSubmit)}>
        
        <div className='flex flex-col sm:flex-row items-center gap-2'>
          <button type="button" onClick={() => navigate('/')} className="self-start sm:self-auto">
            <img src={BackButton} alt="Back" className="w-6 h-6" />
          </button>
          <h2 className='font-bold text-center text-xl sm:text-2xl md:text-3xl w-full sm:ml-4'>Registro de Usuario</h2>
        </div>
    
        <div className='flex flex-col sm:flex-row gap-4'>
          <div className="w-full">
            <label className='font-bold'>Nombre</label>
            <input className='border p-2 rounded-lg w-full' type="text" placeholder='Nombre' 
              {...register('firstName', { required: "El nombre es obligatorio" })} />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>
          <div className="w-full">
            <label className='font-bold'>Apellido</label>
            <input className='border p-2 rounded-lg w-full' type="text" placeholder='Apellido' 
              {...register('lastName', { required: "El apellido es obligatorio" })} />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>
        </div>
    
        <label className='font-bold'>Username</label>
        <input className='border p-2 rounded-lg' type="text" placeholder='Username' 
          {...register('username', { required: "El username es obligatorio" })} />
        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
    
        <label className='font-bold'>Email</label>
        <input className='border p-2 rounded-lg' type="email" placeholder='Email' 
          {...register('email', { required: "El email es obligatorio", 
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Formato de email inválido" }
          })} />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
    
        <label className='font-bold'>Contraseña</label>
        <input 
          className='border p-2 rounded-lg' 
          type="password" 
          placeholder='Contraseña' 
            {...register('password', { 
              required: "Contraseña obligatoria", 
              pattern:{
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                message: "Debe tener mínimo 6 caracteres, una mayúscula, una minúscula, un número y un símbolo."
              }
            })} />
        {errors.password && <p className="text-red-500 text-xs sm:text-sm">{errors.password.message}</p>}
    
        <label className='font-bold'>Confirmar Contraseña</label>
        <input 
          className='border p-2 rounded-lg' 
          placeholder='Confirmar Contraseña' 
          type="password" 
          {...register('confirmPassword', { 
            required: "Debes confirmar la contraseña", 
            validate: value => value === password || "Las contraseñas no coinciden" 
          })} 
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
    
        <div className='flex justify-center items-center mt-2'>
          <button type='submit' className='bg-orange-400 h-10 w-full sm:w-32 rounded-lg font-bold text-white hover:bg-orange-700'>Registrarse</button>
        </div>
      </form>
        
    );
};

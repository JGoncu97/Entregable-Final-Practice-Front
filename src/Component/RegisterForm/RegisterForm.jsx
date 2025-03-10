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
        
            <form className='flex flex-col gap-4  w-[30rem] p-8 rounded-2 bg-white text-black h-full rounded-[0.5rem] padding[2rem] shadow-3xl shadow-black' 
                onSubmit={handleSubmit(onSubmit)}>
                
                <div className='flex items-center'>
                    <button type="button" onClick={() => navigate('/')}><img src={BackButton} alt="Back" /></button>
                    <h2 className='font-bold text-center text-3xl ml-10'>Registro de Usuario</h2>
                </div>

                <div className='flex gap-4'>
                    <div>
                        <label className='font-bold'>Nombre</label>
                        <input className='border p-2 rounded-lg w-full' type="text" placeholder='Nombre' 
                            {...register('firstName', { required: "El nombre es obligatorio" })} />
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                    </div>
                    <div>
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
                  {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                <label className='font-bold'>Confirmar Contraseña</label>
                <input 
                    className='border p-2 rounded-[1rem]' 
                    placeholder='Confirmar Contraseña' 
                    type="password" 
                    {...register('confirmPassword', { 
                      required: "Debes confirmar la contraseña", 
                      validate: value => value === password || "Las contraseñas no coinciden" 
                    })} 
                  />
                  {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}


                <div className='flex justify-center items-center '>
                    <button type='submit' className='bg-orange-400 h-10 w-32 rounded-lg font-bold text-white hover:bg-orange-700'>Registrarse</button>
                </div>
            </form>
        
    );
};

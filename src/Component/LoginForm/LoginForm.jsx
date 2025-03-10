import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider,  } from "firebase/auth";
import { auth, db } from '../../assets/firebase-config';
import Google from '../../assets/google.png';
import Facebook from '../../assets/facebook.png';
import GitHub from '../../assets/githubLogo.png'
import { collection, query, where, getDocs } from "firebase/firestore";

export const LoginForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
         
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("username", "==", data.username));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                Swal.fire({
                    title: "Error",
                    text: "Usuario no encontrado",
                    icon: "error",
                    confirmButtonText: "Intentar de nuevo"
                });
                return;
            }

         
            const userData = querySnapshot.docs[0].data();
           
            Swal.fire({
                title: "¡Bienvenido!",
                text: `Inicio de sesión exitoso como ${userData.username}`,
                icon: "success",
                confirmButtonText: "Aceptar"
            });

            navigate('/Home'); 

        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Usuario o contraseña incorrectos",
                icon: "error",
                confirmButtonText: "Intentar de nuevo"
            });
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            Swal.fire("¡Bienvenido!", `Inicio de sesión exitoso como ${result.user.displayName}`, "success");
            navigate('/Home');
        } catch (error) {
            Swal.fire("Error", "No se pudo iniciar sesión con Google", "error");
        }
    };

    const handleFacebookLogin = async () => {
        const provider = new FacebookAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            Swal.fire("¡Bienvenido!", `Inicio de sesión exitoso como ${result.user.displayName}`, "success");
            navigate('/Home');
        } catch (error) {
            Swal.fire("Error", "No se pudo iniciar sesión con Facebook", "error");
        }
    };

    const handleGithubLogin = async () => {
        const provider = new GithubAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            Swal.fire("¡Bienvenido!", `Inicio de sesión exitoso como ${result.user.displayName}`, "success");
            navigate('/Home');
        } catch (error) {
            Swal.fire("Error", "No se pudo iniciar sesión con GitHub", "error");
        }
    };

    return (
        
            <form className='flex flex-col gap-4 w-96 p-8 rounded-2xl bg-white text-black shadow-xl'
                onSubmit={handleSubmit(onSubmit)}>
                <h2 className='font-bold text-center text-3xl'>Inicio de sesión</h2>
                
                <label className='font-bold'>Username</label>
                <input className='border p-2 rounded-lg' type="text" placeholder="Username" {...register("username", { required: true })} />
                
                <label className='font-bold'>Password</label>
                <input className='border p-2 rounded-lg' type="password" placeholder="Password" {...register("password", { required: true })} />

                <div className='flex justify-around items-center'>
                    <button type="submit" className='bg-blue-700 hover:bg-blue-500 h-10 w-32 rounded-lg font-bold text-white'>Iniciar Sesión</button>
                    <button type="button" onClick={() => navigate('/register')} className='h-10 w-32 rounded-lg font-bold border hover:bg-yellow-300'>Registro</button>
                </div>

                <div className='flex justify-center items-center gap-4 w-full mt-4'>
                    <span className='border w-full'></span>
                    <p>o</p>
                    <span className='border w-full'></span>
                </div>

                <button onClick={handleGoogleLogin} className='font-bold flex justify-center gap-4 items-center w-full border rounded-lg bg-red-600 hover:bg-red-500 h-10'>
                    <img src={Google} alt="google" className='w-6 h-6' /> Ingrese con Google
                </button>
                <button onClick={handleFacebookLogin} className='font-bold flex justify-center gap-4 items-center w-full border rounded-lg bg-blue-700 hover:bg-blue-600 h-10 pl-4'>
                    <img src={Facebook} alt="facebook" className='w-6 h-6' />Ingrese con Facebook
                </button>
                <button onClick={handleGithubLogin} className='font-bold flex justify-center gap-4 items-center w-full border rounded-lg bg-white hover:bg-gray-300 h-10'>
                    <img src={GitHub} alt="apple" className='w-6 h-6' /> Ingrese con GitHub
                </button>
            </form>
        
    );
};

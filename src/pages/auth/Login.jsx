import NavBar from "../../components/NavBar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Title } from "react-head";
import { db } from "../../firebase/firebase";
import { getDocs, collection } from "firebase/firestore";
import Swal from "sweetalert2";

export default function Login({ user }) {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const { login } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null)
        setIsLoading(true);
        const userSnapShot = await getDocs(collection(db, "User"));
        const data = userSnapShot.docs.map(data => { data.data() })

        console.log(data)

        try {
            login(auth, email, password)
            Swal.fire({
                icon: 'success',
                title: 'Signed in',
                text: 'Successfully Signed in',
                timer: 1000,
                showConfirmButton: false
            })
        }
        catch (error) {
            console.log(error.code)
            if (error.code === 'auth/invalid-credential') {
                setError("invalid credential")
            }
        }

        setIsLoading(false);
    }

    if (user) {
        return <Navigate to={'/dashboard'} />;
    }

    return (
        <>
            <Title>Login</Title>

            <div className="min-h-screen font-sans">
                <NavBar />
                <div className="flex w-full h-full justify-center items-center mt-10">
                    <form onSubmit={handleSubmit}>
                        <div className="p-10 w-[30rem]  border border-gray-400 rounded-lg">
                            <div className="space-y-2 flex flex-col justify-center items-center">
                                <span className="text-3xl font-bold ">Welcome back</span>
                                <div>
                                    <span className="text-gray-600"> Enter your credentials to access your account</span>
                                </div>
                            </div>
                            {/* email */}
                            <div className="flex flex-col mt-10 mb-5">
                                <label htmlFor="email" className="font-bold mb-3">Email</label>
                                <input type="email" name="email" id="email" className="py-2 border border-gray-500 rounded-md px-3 focus:ring-gray-600 focus:ring-1 focus:outline-none" placeholder="email@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <span className={`mt-1 ml-1 ${error ? 'block text-red-500' : 'hidden'}`}>{error}</span>
                            </div>

                            {/* password */}
                            <div className="flex flex-col mt-3">
                                <label htmlFor="password" className="font-bold mb-3">Password</label>
                                <input type="password" name="password" id="password" className="py-2 border border-gray-500 rounded-md px-3 focus:ring-gray-600 focus:ring-1 focus:outline-none" placeholder="******"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span className={`mt-1 ml-1 ${error ? 'block text-red-500' : 'hidden'}`}>{error}</span>
                            </div>

                            <button className={`w-full py-2 rounded-md text-white text-md mt-4 ${isLoading ? 'bg-blue-300' : 'bg-blue-600'}`} disabled={isLoading}>{isLoading ? 'Logging in..' : 'Login'}</button>

                            <div className="text-center mt-8">
                                <span>Don't have an account? <Link to={'/register'} className="text-blue-500 hover:text-blue-700">Register</Link></span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
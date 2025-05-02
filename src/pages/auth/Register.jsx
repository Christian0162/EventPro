import NavBar from "../../components/NavBar";
import { useState } from "react";
import { Calendar, Package } from "lucide-react";
import PrimaryButton from "../../components/PrimaryButton";
import { auth, db } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import { Title } from "react-head";

export default function Register({ user }) {

    const [visible, setVisible] = useState(false);
    const [error, setError] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [errorPassword, setErrorPassword] = useState(null);
    const [errorEmail, setErrorEmail] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            setError(null);
            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    role: role,
                })
            }
        }
        catch (err) {

            if (err.code === "auth/weak-password") {
                setErrorPassword("Weak password the length must be up to 6");             
            }

            if(err.code === "auth/email-already-in-use") {
                setErrorEmail("The email is already exist.");
            }
        }
    }

    const item = ['Event Planner', 'Supplier'];

    if (user) {
        return <Navigate to="/dashboard" />
    }

    return (
        <>
        <Title>Register</Title>
            <div className="min-h-screen ">
                <NavBar />
                <div className="flex flex-col justify-center items-center">
                    <div className={`mt-10 flex-col justify-center items-center flex ${visible ? 'hidden' : 'block'}`}>
                        <span className="font-bold text-3xl text-center block">Create an Account</span>
                        <span className="block text-gray-600 text-center mt-3">Join our platform and start mananging event
                            providing supplies
                        </span>

                        {/* cards */}
                        <div className="flex-col flex mt-5">
                            {item.map((item, index) => (
                                <button className={`w-[30rem] mt-5 p-3 border hover:border-blue-500 ${role == item ? 'border-blue-600' : error ? 'border-red-600' : 'border-gray-600'}  rounded-md`}
                                    key={index}
                                    onClick={() => {
                                        setRole(item);
                                        setError(false)
                                        console.log(error)
                                    }}
                                >
                                    <div className="flex px-3 space-x-3">
                                        {
                                            item === 'Event Planner'
                                                ?
                                                <Calendar className="rounded-full bg-gray-100 p-2" size={40} color="#2b7fff" />
                                                :
                                                <Package className="rounded-full bg-gray-100 p-2" size={40} color="#2b7fff" />
                                        }
                                        <div className="flex flex-col space-y-1">
                                            <span className="text-left flex mt-1 font-bold">{item}</span>
                                            <span className="break-normal block text-left">
                                                {item === 'Event Planner' ? 'Create and manage events, find suppliers, and coordinate details'
                                                    : 'Provide services or products for events, connect with event planners'}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                            <span className={`mt-3 ${error ? 'block text-red-600' : 'hidden'}`}>You must to choose one to proceed</span>
                        </div>
                        <PrimaryButton context={'Continue'} handleClick={error === null ? () => { setVisible(false); setError(true); } : () => setVisible(!visible)} />
                    </div>

                    <div className={`mt-10 flex-col justify-center items-center flex ${visible ? 'block' : 'hidden'}`}>
                        <span className="font-bold text-3xl text-center block">Create an Account</span>
                        <span className="block text-gray-600 text-center mt-3">Join our platform and start mananging event or
                            providing supplies
                        </span>
                        <form onSubmit={handleSubmit}>
                            <div className="border w-[30rem] mt-5 rounded-lg border-gray-600 p-5">

                                <div className="flex justify-between">
                                    {/* first name */}
                                    <div className="flex flex-col">
                                        <label htmlFor="firstName" className="font-bold mb-3">Full Name</label>
                                        <input type="text" name="firstName" id="firstName" className="py-2 border border-gray-500 rounded-md px-3 focus:ring-gray-600 focus:ring-1 focus:outline-none" placeholder="John"
                                            required
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)} />
                                    </div>

                                    {/* last name */}
                                    <div className="flex flex-col">
                                        <label htmlFor="lastName" className="font-bold mb-3">Full Name</label>
                                        <input type="text" name="lastName" id="lastName" className="py-2 border border-gray-500 rounded-md px-3 focus:ring-gray-600 focus:ring-1 focus:outline-none" placeholder="Doe"
                                            required
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                </div>

                                {/* email */}
                                <div className="flex flex-col mt-5 mb-5">
                                    <label htmlFor="email" className="font-bold mb-3">Email</label>
                                    <input type="email" name="email" id="email" className="py-2 border border-gray-500 rounded-md px-3 focus:ring-gray-600 focus:ring-1 focus:outline-none" placeholder="email@example.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <span className={`${errorEmail ? 'block text-red-500' : 'hidden'} mt-2`}>{errorEmail}</span>
                                </div>

                                {/* password */}
                                <div className="flex flex-col mt-5 mb-5">
                                    <label htmlFor="password" className="font-bold mb-3">Password</label>
                                    <input type="password" name="password" id="password" className="py-2 border border-gray-500 rounded-md px-3 focus:ring-gray-600 focus:ring-1 focus:outline-none" placeholder="******"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span className={`${errorPassword ? 'block text-red-500' : 'hidden'} mt-2`}>{errorPassword}</span>
                                </div>

                                <div className="space-x-1">
                                    <span className="text-gray-600">Account type: </span>
                                    <span>{role}</span>
                                    <button className="text-blue-600" onClick={() => setVisible(!visible)}>Change</button>
                                </div>
                                <PrimaryButton context={'Create an account'} />
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    );
}
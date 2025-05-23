import { ToastContainer } from "react-toastify";
import HomePage from "./pages/homepage";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase/firebase";
import Dashboard from "./pages/Dashboard";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase/firebase";
import Loading from "./components/Loading";
import { HeadProvider } from "react-head";
import Event from "./pages/events/Event";
import Supplier from "./pages/suppliers/Supplier";
import Favorites from "./pages/favorites/Favorites";
import Notification from "./pages/notifications/Notification";
import CreateEvent from "./pages/events/CreateEvent";
import Error404 from "./components/Error404";
import EditEvent from "./pages/events/EditEvent";
import SupplierVerification from "./pages/suppliers/SupplierVerification";
import Review from "./pages/admin/Review";
import SupplierShop from "./pages/suppliers/SupplierShop";
import ChatWindow from "./pages/chat/ChatWindow";

function App() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user)
                const userDocRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(userDocRef);
                setUserData(docSnap.data());
                setIsLoading(false);
                return;
            }
            else {
                setUser(null);
                setUserData(null)

            }
            setIsLoading(false);
        })

        return () => { unsubscribe(); }
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <HeadProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage user={user} />}></Route>
                        <Route path="/register" element={<Register user={user} />}></Route>
                        <Route path="/login" element={<Login user={user} />}></Route>
                        <Route path="/dashboard" element={user ? <Dashboard user={user} userData={userData} /> : <Navigate to={'/login'} />}></Route>
                        <Route path="/review/:id" element={user ? <Review user={user} userData={userData} /> : <Navigate to={'/login'} />}></Route>
                        <Route path="/verify" element={user ? <SupplierVerification user={user} userData={userData} /> : <Navigate to={'/login'} />}></Route>
                        <Route path="/events" element={user ? <Event user={user} userData={userData} /> : <Navigate to={'/login'} />}></Route>
                        <Route path="/events/create" element={user ? <CreateEvent user={user} /> : <Navigate to={'/login'} />}></Route>
                        <Route path="/events/edit/:id" element={user ? <EditEvent user={user} /> : <Navigate to={'/login'} />}></Route>
                        <Route path="/suppliers" element={user ? <Supplier user={user} userData={userData} /> : <Navigate to={'/login'} />}></Route>
                        <Route path="/shop" element={user ? <SupplierShop user={user} userData={userData} /> : <Navigate to={'/login'} />}></Route>
                        <Route path="/favorites" element={user ? <Favorites user={user} userData={userData} /> : <Navigate to={'/login'} />}></Route>
                        <Route path="/chat" element={user ? <ChatWindow user={user} userData={userData} /> : <Navigate to={'/login'} />}></Route>
                        <Route path="/notification" element={user ? <Notification user={user} userData={userData} /> : <Navigate to={'/login'} />}></Route>
                        <Route path="*" element={<Error404 user={user} userData={userData}/>}></Route>
                    </Routes>
                    <ToastContainer />
                </BrowserRouter>
            </HeadProvider>

        </>
    )
}

export default App;

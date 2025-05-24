import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState, lazy, Suspense } from "react";
import { auth } from "./firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase/firebase";
import Loading from "./components/Loading";
import { HeadProvider } from "react-head";

const HomePage = lazy(() => import("./pages/Homepage"));
const Register = lazy(() => import("./pages/auth/Register"));
const Login = lazy(() => import("./pages/auth/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const Review = lazy(() => import("./pages/admin/Review"));
const SupplierVerification = lazy(() => import("./pages/suppliers/SupplierVerification"));
const Event = lazy(() => import("./pages/events/Event"));
const CreateEvent = lazy(() => import("./pages/events/CreateEvent"));
const EditEvent = lazy(() => import("./pages/events/EditEvent"));
const Supplier = lazy(() => import("./pages/suppliers/Supplier"));
const SupplierShop = lazy(() => import("./pages/suppliers/SupplierShop"));
const Favorites = lazy(() => import("./pages/favorites/Favorites"));
const ChatWindow = lazy(() => import("./pages/chat/ChatWindow"));
const Notification = lazy(() => import("./pages/notifications/Notification"));
const Error404 = lazy(() => import("./components/Error404"));


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
                    <Suspense fallback={<Loading />}>
                        <Routes>
                            <Route path="/" element={<HomePage user={user} />}></Route>
                            <Route path="/register" element={<Register user={user} />}></Route>
                            <Route path="/login" element={<Login user={user} />}></Route>
                            <Route path="/dashboard" element={user ? <Dashboard user={user} userData={userData} /> : <Navigate to={'/login'} />}></Route>
                            <Route path="/admin/dashboard" element={user ? <AdminDashboard user={user} userData={userData} /> : <Navigate to={'/login'} />}></Route>
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
                            <Route path="*" element={<Error404 user={user} userData={userData} />}></Route>
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </HeadProvider>

        </>
    )
}

export default App;

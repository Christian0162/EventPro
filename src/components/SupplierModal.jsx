import { Button, Dialog, DialogPanel, } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { MapPin, DollarSign, Clock, Phone, Mail, X, MessageCircleMore, Heart } from 'lucide-react'
import { db, auth } from '../firebase/firebase'
import { doc, addDoc, where, serverTimestamp, onSnapshot, collection, deleteDoc, query, getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

export default function SupplierModal({ supplierData }) {

    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false)
    const [isLiked, setIsLiked] = useState(false)

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    useEffect(() => {

        const unsubscribe = onSnapshot(collection(db, "Favorites"),
            (snapshot) => {
                const userFavorites = snapshot.docs
                    .filter(doc => doc.data().user_id === auth.currentUser.uid && doc.data().supplier_id === supplierData.id)
                    .map(doc => ({ id: doc.id, ...doc.data() }));

                setIsLiked(userFavorites[0]?.isActive || false);
            });

        return () => unsubscribe();

    }, [supplierData]);

    if (!supplierData) {
        return null;
    }

    const handleFavorites = async (e) => {
        e.preventDefault()

        if (isLiked) {
            const q = query(collection(db, "Favorites"),
                where("user_id", "==", auth.currentUser.uid),
                where("supplier_id", "==", supplierData.id)
            )
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(async (docSnapshot) => {
                await deleteDoc(doc(db, "Favorites", docSnapshot.id))
            })
            setIsLiked(false)
        }
        else {
            await addDoc(collection(db, "Favorites"), {
                user_id: auth.currentUser.uid,
                supplier_id: supplierData.id,
                isActive: true,
                createdAt: serverTimestamp(),
            })
            setIsLiked(true)
        }
    }

    const handleChat = async (e) => {
        e.preventDefault()

        const q = query(collection(db, "Contacts"),
            where("user_id", "==", auth.currentUser.uid),
            where("contact_id", "==", supplierData.id)
        )

        const querySnapShot = await getDocs(q)

        if (querySnapShot.empty) {
            await addDoc(collection(db, "Contacts"), {
                user_id: auth.currentUser.uid,
                contact_id: supplierData.id,
                name: supplierData.supplier_name,
                avatar: supplierData.supplier_name.slice(0, 1).toUpperCase(),
                last_message: "",
                isActive: false,
                createdAt: serverTimestamp()
                
            })
            navigate(`/chats/${supplierData.id}`)

        }
    }

    return (
        <>
            <Button
                onClick={open}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                View Details
            </Button>

            <Dialog open={isOpen} as="div" className="relative z-50 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            {/* Header with close button */}
                            <div className="relative">
                                <button
                                    onClick={close}
                                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
                                >
                                    <X size={20} className="text-gray-600" />
                                </button>

                                {/* Hero Image */}
                                <div className="relative h-48 overflow-hidden rounded-t-2xl">
                                    <img
                                        src={supplierData.supplier_background_image}
                                        alt={supplierData.supplier_name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <div className="absolute bottom-4 left-6 text-white">
                                        <h1 className="text-2xl font-bold">{supplierData.supplier_name}</h1>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {/* Location and Basic Info */}
                                <div className="flex items-center justify-between space-x-4 mb-4">
                                    <div className='flex gap-3'>
                                        <div className="flex items-center space-x-2">
                                            <MapPin className="text-gray-400" size={16} />
                                            <span className="text-gray-600">{supplierData.supplier_location}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Clock className="text-gray-400" size={16} />
                                            <span className="text-gray-600">{supplierData.supplier_availability}</span>
                                        </div>
                                    </div>

                                    <div className='flex gap-5'>
                                        <div className="relative space-x-2">
                                            <form onSubmit={handleFavorites}>
                                                <button className='group transparent'>
                                                    <Heart className={`transition-all duration-200 ${isLiked ? 'fill-red-600 opacity-100 text-red-600' : 'opacity-50 text-gray-800 group-hover:text-red-600 group-hover:opacity-60 group-hover:scale-115'}`} size={21} />
                                                </button>
                                            </form>
                                        </div>

                                        <div className="relative space-x-2">
                                            <button onClick={handleChat} className='group'>
                                                <MessageCircleMore className="trasition-all duration-200 text-gray-400 group-hover:text-blue-600" size={21} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="flex items-center space-x-2 mb-4">
                                    <DollarSign className="text-green-600" size={20} />
                                    <span className="text-2xl font-bold text-gray-900">₱{supplierData.supplier_price}</span>
                                    <span className="text-gray-500">/day</span>
                                </div>

                                {/* Expertise Tags */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Expertise</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {supplierData.supplier_expertise?.map((expertise, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100"
                                            >
                                                {expertise}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Description */}
                                {supplierData.supplier_description && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {supplierData.supplier_description}
                                        </p>
                                    </div>
                                )}

                                {/* Contact Information */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                                    <div className="space-y-2">
                                        {supplierData.supplier_phone && (
                                            <div className="flex items-center space-x-2">
                                                <Phone className="text-gray-400" size={16} />
                                                <span className="text-gray-600">{supplierData.supplier_phone}</span>
                                            </div>
                                        )}
                                        {supplierData.supplier_email && (
                                            <div className="flex items-center space-x-2">
                                                <Mail className="text-gray-400" size={16} />
                                                <span className="text-gray-600">{supplierData.supplier_email}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                {supplierData.id !== auth.currentUser.uid && (
                                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                                        <Button
                                            onClick={close}
                                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                        >
                                            Close
                                        </Button>
                                        <Button
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            Book Now
                                        </Button>
                                    </div>
                                )}

                                {supplierData.id === auth.currentUser.uid && (
                                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                                        <Button
                                            onClick={close}
                                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                        >
                                            Close
                                        </Button>
                                        <Button
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
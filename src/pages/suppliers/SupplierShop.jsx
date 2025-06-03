import { MapPin, CircleCheckBig, Star, Mail, Phone, Clock7, CircleCheck, DollarSign, Edit3, X } from "lucide-react"
import ShopCards from "../../components/ShopCards"
import SupplierRegistration from "../../components/SupplierRegistration"
import { updateDoc, doc, getDocs, collection } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import { auth } from "../../firebase/firebase"
import { useEffect, useState } from "react"
import Loading from "../../components/Loading"
import { Link } from "react-router-dom"
import UploadWidget from "../../components/UploadWidgen"
import { ShopBackgroundModal } from "../../components/ShopBackgroundModal"

export default function SupplierShop() {

    const [shop, setShop] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [reviews, setReviews] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [background, setBackground] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const snapShotShop = await getDocs(collection(db, "Shops"));
                const shop = snapShotShop.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                const isRegistered = shop.find(shop => shop.id === auth.currentUser.uid)

                const snapShotReview = await getDocs(collection(db, "Shops", auth.currentUser.uid, "Reviews"));
                const review = snapShotReview.docs.map(doc => ({ id: doc.id, ...doc.data() }))

                setShop(isRegistered);
                setReviews(review)
                setIsLoading(false)
            }
            catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        await updateDoc(doc(db, "Shops", auth.currentUser.uid), {
            supplier_background_image: background
        })
        setIsLoading(false)
        window.location.reload();
    }

    if (!shop) {
        return <SupplierRegistration />
    }

    const validRatings = reviews
        .map(review => Number(review.rating))
        .filter(rating => !isNaN(rating));

    const averageRating = validRatings.length > 0
        ? (validRatings.reduce((sum, r) => sum + r, 0) / validRatings.length).toFixed(1)
        : "N/A";


    console.log(background)
    return (
        <>
            {isLoading && (
                <Loading />
            )}

            {!isLoading && (
                <div className="px-4">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Your Shop</h1>
                        <p className="text-gray-600 mt-2">Manage your business profile and showcase your services</p>
                    </div>

                    {/* Main Content Container */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        {/* Hero Image */}
                        <div className="relative h-64 md:h-80 overflow-hidden">
                            <div className="absolute top-4 right-4 z-50">
                                {!isOpen && (
                                    <button
                                        className="transition-all duration-200 text-white text-sm flex items-center gap-2 bg-blue-600 hover:bg-blue-700 rounded-md py-2 px-3"
                                        onClick={() => setIsOpen(true)}
                                    >
                                        <Edit3 size={16} />

                                        Edit
                                    </button>
                                )}
                            </div>
                            <ShopBackgroundModal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 rounded-t-2xl border-b border-gray-100">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            Upload Files
                                        </h2>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="p-2 hover:bg-white/70 rounded-xl transition-all duration-200 text-gray-400 hover:text-gray-600 hover:scale-105 active:scale-95 shadow-sm"
                                            aria-label="Close modal"
                                        >
                                            <X size={22} strokeWidth={2} />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <form className="relative justify-between" onSubmit={handleSubmit}>
                                        <UploadWidget className={'py-2'} setPicture={setBackground} />
                                        <button disabled={!background} className={`transition-all duration-75 px-4 h-10 absolute bottom-0 right-0 rounded-md text-white ${background ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300'}`}>Submit</button>
                                    </form>
                                </div>
                            </ShopBackgroundModal>
                            <img src={shop?.supplier_background_image} className="absolute inset-0" alt="background image" />
                        </div>

                        <div className="p-8 md:p-10">
                            {/* Business Header */}
                            <div className="mb-8">
                                <div className="flex flex-wrap items-center gap-4 mb-4">
                                    <h2 className="text-3xl font-bold text-gray-900">{shop.supplier_name}</h2>
                                    <div className="flex items-center gap-3">
                                        <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                                            {shop?.supplier_type?.label}
                                        </span>
                                        <Link to={'/verify'} className={`${shop.isApproved === "unverified" ? 'block' : 'hidden'} transtion-all duration-75 flex group items-center gap-2 bg-blue-50 border border-blue-200 hover:bg-blue-400 rounded-full px-4 py-2`}>
                                            <span className={`text-blue-700 group-hover:text-white font-medium text-sm`}>Verify</span>
                                        </Link>

                                        {shop.isApproved === "pending" && (
                                            <span className="flex group items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-full px-4 py-2">
                                                <span className={`text-yellow-700 font-medium text-sm`}>Pending</span>
                                            </span>
                                        )}

                                        {shop.isApproved === "verified" && (
                                            <span className="flex group items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2">
                                                <span className={`text-green-700 font-medium text-sm`}>Verified</span>
                                                <CircleCheckBig size={16} className="text-green-600" />
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-6 text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={20} className="text-blue-500" />
                                        <span className="font-medium">{shop.supplier_location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Star size={20} className="text-yellow-500 fill-yellow-500" />
                                        <span className="font-medium">{averageRating}</span>
                                        <span className="text-gray-500">{reviews.length}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Tabs */}
                            <div className="border-b border-gray-200 mb-8">
                                <div className="flex gap-1">
                                    <button className="px-6 py-3 bg-blue-500 text-white rounded-t-lg font-medium shadow-sm">
                                        About
                                    </button>
                                    <button className="px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-t-lg font-medium transition-colors">
                                        Services
                                    </button>
                                    <button className="px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-t-lg font-medium transition-colors">
                                        Reviews
                                    </button>
                                </div>
                            </div>

                            {/* Content Grid */}
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Description Card */}
                                <ShopCards className="md:col-span-2">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">About Our Business</h3>
                                            <p className="text-gray-600">{shop.supplier_description}</p>
                                        </div>
                                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                                            <Edit3 size={16} />
                                            Edit
                                        </button>
                                    </div>

                                    <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                                        Create stunning floral arrangements for weddings and events that leave lasting impressions.
                                    </p>

                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-3">Our Expertise</h4>
                                        <div className="flex flex-wrap gap-3">
                                            {shop?.supplier_expertise?.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${index === 0
                                                        ? 'bg-blue-500 text-white shadow-sm'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </ShopCards>

                                {/* Contact Information */}
                                <ShopCards>
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Contact Information</h3>
                                            <p className="text-gray-600">How customers can reach you</p>
                                        </div>
                                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                                            <Edit3 size={16} />
                                            Edit
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <Mail size={24} className="text-blue-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 mb-1">Email Address</h4>
                                                <p className="text-gray-600">{shop.supplier_email}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="p-2 bg-green-100 rounded-lg">
                                                <Phone size={24} className="text-green-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 mb-1">Phone Number</h4>
                                                <p className="text-gray-600">{shop.supplier_number}</p>
                                            </div>
                                        </div>
                                    </div>
                                </ShopCards>

                                {/* Booking Information */}
                                <ShopCards>
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Details</h3>
                                            <p className="text-gray-600">Pricing and availability information</p>
                                        </div>
                                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                                            <Edit3 size={16} />
                                            Edit
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-green-100 rounded-lg">
                                                <DollarSign size={24} className="text-green-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 mb-1">Starting Price</h4>
                                                <p className="text-xl font-bold text-green-600">₱{shop.supplier_price}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-purple-100 rounded-lg">
                                                <Clock7 size={24} className="text-purple-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 mb-1">Availability</h4>
                                                <p className="text-gray-600">{shop.supplier_availability}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <CircleCheck size={24} className="text-blue-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 mb-1">{shop.supplier_response_time?.label}</h4>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-600">Within 24 Hours</span>
                                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                                        Fast Response
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ShopCards>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}
import NavBar from "../../components/NavBar"
import { MapPin, CircleCheckBig, Star, Mail, Phone, Clock7, CircleCheck, DollarSign } from "lucide-react"
import ShopCards from "../../components/ShopCards"

export default function SupplierShop({ user, userData }) {
    return (
        <>
            <div className="min-h-screen">
                <NavBar user={user} userData={userData} />

                <div className="p-10 px-[5rem]">
                    <span className="text-3xl font-semibold">Your Shop</span>

                    <div className="rounded-md flex border flex-col mt-3">
                        <img src="img1.jpg" alt="" className="object-cover object-top rounded-t-md w-full h-100" />
                        <div className="p-7">

                            {/* header */}
                            <div className="flex flex-col">
                                <div className="flex gap-2">
                                    <span className="block text-md font-semibold">Floral Design Inc.</span>
                                    <span className="bg-blue-600 rounded-lg text-white px-8">Floral</span>
                                    <div className="flex border rounded-lg px-5 gap-2 items-center justify-center">
                                        <span className="block">Verified</span>
                                        <CircleCheckBig size={18} color="blue" />
                                    </div>
                                </div>

                                <div className="flex relative right-1 items-center gap-2 mt-3">
                                    <MapPin size={27} strokeWidth={1} />
                                    <span className="block text-gray-600">Maribago, Lapu-Lapu City</span>
                                    <Star size={27} strokeWidth={1} className="text-yellow-600" />
                                    <span className="block text-gray-600">4.8 (134 reviews)</span>
                                </div>

                                {/* line */}
                                <hr className="border-t w-full mt-4 border-gray-500" />

                                <div className="flex mt-4 gap-3">
                                    <span className="px-4 py-1 bg-blue-600 rounded-lg text-white">About</span>
                                    <span className="px-4 py-1 border rounded-lg">Service</span>
                                    <span className="px-4 py-1 border rounded-lg">Reviews</span>
                                </div>
                            </div>

                            {/* shop tabs description */}
                            <ShopCards>
                                <div className="flex justify-between">
                                    <span className="block text-lg font-bold">Description</span>
                                    <button className="px-7 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 duration-75 transition-all text-white">Edit</button>
                                </div>
                                <span className="block mt-2 text-gray-600">Create stunning floral arrangements for wedding and events.</span>
                                <div className="mt-5 flex flex-col">
                                    <span className="block text-md font-bold">Expertise</span>
                                    <div className="flex gap-2 mt-2 text-sm">
                                        <span className="block px-6 py-1 border rounded-lg">Floral</span>
                                        <span className="block px-6 border py-1 rounded-lg">Wedding</span>
                                        <span className="block px-6 border py-1 rounded-lg">Events</span>
                                        <button className="block px-6 bg-blue-600 py-1 text-white rounded-lg">Floral</button>
                                    </div>
                                </div>
                            </ShopCards>

                            {/* contact information */}
                            <ShopCards>
                                <div className="flex justify-between">
                                    <span className="block text-lg font-bold">Contact Information</span>
                                    <button className="px-7 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 duration-75 transition-all text-white">Edit</button>
                                </div>
                                <div className="mt-5 flex flex-col">
                                    <div className="flex gap-3">
                                        <Mail size={27} strokeWidth={1} />
                                        <div className="flex flex-col">
                                            <span className="block font-bold">Email</span>
                                            <span className="text-md text-gray-600">test@gmail.com</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-3">
                                        <Phone size={27} strokeWidth={1} />
                                        <div className="flex flex-col">
                                            <span className="block font-bold">Phone</span>
                                            <span className="text-md text-gray-600">09603253142</span>
                                        </div>
                                    </div>
                                </div>
                            </ShopCards>

                            {/* booking information */}
                            <ShopCards>
                                <div className="flex justify-between">
                                    <span className="block text-lg font-bold">Booking Information</span>
                                    <button className="px-7 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 duration-75 transition-all text-white">Edit</button>
                                </div>
                                <div className="mt-5 flex flex-col">
                                    <div className="flex gap-3 items-center">
                                        <DollarSign size={27} strokeWidth={1} />
                                        <div className="flex flex-col">
                                            <span className="block font-bold">Pricing</span>
                                            <span className="text-md text-gray-600">4900</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-3 items-center">
                                        <Clock7 size={27} strokeWidth={1} />
                                        <div className="flex flex-col">
                                            <span className="block font-bold">Availability</span>
                                            <span className="text-md text-gray-600">Monday to Saturday</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-3 items-center">
                                        <CircleCheck size={27} strokeWidth={1} />
                                        <div className="flex flex-col">
                                            <span className="block font-bold">Typical Response Time</span>
                                            <span className="text-md text-gray-600">Within 24 Hours</span>
                                        </div>
                                    </div>
                                </div>
                            </ShopCards>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
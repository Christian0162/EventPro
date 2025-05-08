import NavBar from "../../components/NavBar";
import { Title } from "react-head";
import Cards from "../../components/Cards";
import { MapPin, DollarSignIcon, Clock } from "lucide-react";
import PrimaryButton from "../../components/PrimaryButton";


export default function Favorites({ user }) {

    const categories = [
        { value: "testing", label: "testing" }
    ]

    console.log(categories)
    return (
        <>
            <Title>Favorites</Title>
            <div className="min-h-screen">
                <NavBar user={user} />
                <div className="p-10 px-[5rem]">
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold">Favorites</span>
                        <span className="mt-2 text-gray-600">Look at your favorite suppliers</span>
                    </div>

                    <div className="grid grid-cols-4">
                        <Cards>
                            <img src="img1.jpg" className="object-cover w-full" alt="image" />
                            <div className="px-5 space-y-4 mt-3">
                                <span className="block text-2xl font-bold">Floral Design Inc.</span>
                                <div className="flex space-x-2 items-center">
                                    <MapPin width={21} height={21} strokeWidth={1} />
                                    <span className="block text-gray-600">Basak</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    <span className="block px-5 border-gray-500 text-sm border-1 text-center bg-gray-200 rounded-lg">Floral</span>
                                    <span className="block px-5 border-gray-500 text-sm border-1 text-center bg-gray-200 rounded-lg">Floral</span>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex gap-2 items-center">
                                        <DollarSignIcon strokeWidth={1} color="black" />
                                        <span className="block text-lg font-bold">232</span>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <Clock strokeWidth={1} />
                                        <span className="text-gray-600">
                                            Mon-Sat
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <PrimaryButton>View Profile</PrimaryButton>
                                    
                                    {/* remove button */}
                                    <button className="py-2 w-full bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-200">Remove</button>
                                </div>
                            </div>
                        </Cards>
                    </div>
                </div>
            </div>
        </>
    )
}
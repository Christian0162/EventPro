import { Title } from "react-head";
import NavBar from "../../components/NavBar";
import { Search } from "lucide-react";
import { useState } from "react";
import Select from "react-select";
import Cards from "../../components/Cards";
import { MapPin, DollarSignIcon, Clock } from "lucide-react";
import PrimaryButton from "../../components/PrimaryButton";

export default function Supplier({ user }) {

    const [selected, setSelected] = useState(null);

    console.log(selected)

    const categories = [
        { value: 'wedding', label: 'Wedding' },
        { value: 'test', label: 'test' },
    ];
    return (
        <>
            <Title>Event</Title>
            <div className="min-h-screen">
                <NavBar user={user} />

                <div className="p-10 px-[5rem]">
                    <div className="flex justify-between items-center flex-col lg:flex-row md:flex-row">
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold">Suppliers</span>
                            <span className="mt-2 text-gray-600">Look suppliers for your events</span>
                        </div>
                    </div>

                    <div className="flex mt-3 gap-4">
                        <div className="flex items-center w-1/4">
                            <Search width={21} height={21} className="absolute ml-3 flex items" />
                            <input type="search" className="w-full pl-10 px-5 py-[5px] ring-1 ring-gray-400 focus:ring-blue-600 focus:ring-2 outline-none rounded-sm" placeholder="Search suppliers" />
                        </div>

                        <div className="w-64">
                            <Select
                                value={selected}
                                onChange={setSelected}
                                options={categories}
                                placeholder="Select a Category"
                                isClearable
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-4">
                        <Cards>
                            <img src="img1.jpg" className="object-cover w-full h-[40%" alt="" />
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
                                        <DollarSignIcon strokeWidth={1} color="black"/>
                                        <span className="block text-lg font-bold">232</span>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <Clock strokeWidth={1}/>
                                        <span className="text-gray-600">
                                            Mon-Sat
                                        </span>
                                    </div>
                                </div>
                                <PrimaryButton>View Profile</PrimaryButton>
                            </div>
                        </Cards>
                    </div>
                </div>
            </div>
        </>
    )
}
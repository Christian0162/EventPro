import { Navigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { Title } from "react-head";
import { CalendarDays, MapPin, CircleDollarSign, Trash } from "lucide-react";

export default function Event({ user }) {

    return (
        <>
            <Title>Event</Title>
            <div className="min-h-screen">
                <NavBar user={user} />

                <div className="p-10 px-[5rem]">
                    <div className="flex justify-between items-center flex-col lg:flex-row md:flex-row">
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold">Events</span>
                            <span className="mt-2 text-gray-600">Create and manage your events in one place</span>
                        </div>
                        <button className="bg-blue-600 text-white rounded-md px-5 lg:px-10 md:px-8 sm:px-7 py-2 lg:py-3 font-bold mt-3">Create New Event</button>
                    </div>
                    <div className="flex">

                        {/* event cards */}
                        <div className="h-full w-1/3 border-1 border-black p-6 rounded-lg mt-5">
                            <div className="flex justify-end">
                                <button><Trash /></button>
                            </div>
                            <div className="flex justify-between items-center mb-5 mt-3">
                                <span className="block text-4xl">Annual Tech..</span>
                                <span className="bg-purple-600 rounded-xl py-1 px-5 text-white">Upcoming</span>
                            </div>
                            <div className="flex flex-col space-y-5">
                                <div className="flex space-x-2">
                                    <span className="block"><CalendarDays /></span>
                                    <span>Wednesday, November 15, 2025 <br></br> 09:00 AM - 5:30 PM</span>
                                </div>
                                <div className="flex space-x-2">
                                    <span className="block"><MapPin /></span>
                                    <span>Ibo, Lapu-Lapu City</span>
                                </div>
                                <div className="flex space-x-2">
                                    <span className="block"><CircleDollarSign /></span>
                                    <span>$25,000</span>
                                </div>
                                <div>
                                    <span>Looking for supplier:</span>
                                    <div className="grid grid-cols-3 gap-3 mt-2">
                                        <span className="py-1 px-5 border-1 border-black rounded-xl">Catering</span>
                                        <span className="py-1 px-5 border-1 border-black rounded-xl">Catering</span>
                                        <span className="py-1 px-5 border-1 border-black rounded-xl">Catering</span>
                                        <span className="py-1 px-5 border-1 border-black rounded-xl">Catering</span>
                                    </div>
                                    <span className="block mt-3">Our annual technology conference featuring keynote speakers...</span>
                                    <button className="mt-5 py-3 w-full bg-blue-600 text-white font-bold rounded-lg">Manage Event</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
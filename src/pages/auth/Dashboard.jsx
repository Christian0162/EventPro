import { signOut } from "firebase/auth";
import NavBar from "../../components/NavBar";
import { auth } from "../../firebase/firebase";
import { Users, Star, CalendarDays, DollarSignIcon } from "lucide-react";
import { Title } from "react-head";

export default function Dashboard({ user, userData }) {

    const handleClick = async () => {
        await signOut(auth);
    }

    console.log(userData)

    return (
        <>
            <Title>Dashboard</Title>

            <div className="min-h-screen">
                <NavBar user={user} />
                <div className="p-10 px-[5rem]">
                    <div className="flex justify-between items-center flex-col lg:flex-row md:flex-row">
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold">Dashboard</span>
                            <span className="mt-2 text-gray-600">Welcome back, {userData?.first_name} </span>
                        </div>
                        <button className="bg-blue-600 text-white rounded-md px-5 lg:px-10 md:px-8 sm:px-7 py-2 lg:py-3 font-bold mt-3">Create New Event</button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-5">

                        {/* total suppliers */}
                        <div className="w-full h-full border-1 border-b-black rounded-md flex items-center justify-between p-10 px-[6rem]">
                            <div className="flex flex-col space-y-1">
                                <span className="block text-lg">Total Suppliers</span>
                                <span className="block text-2xl font-bold">24</span>
                                <span className="block text-blue-600">from last month</span>
                            </div>
                            <span><Users width={50} height={50} /></span>
                        </div>

                        {/* upcoming events */}
                        <div className="w-full h-full border-1 border-b-black rounded-md flex items-center justify-between p-10 px-[6rem]">
                            <div className="flex flex-col space-y-1">
                                <span className="block text-lg">Upcoming Events</span>
                                <span className="block text-2xl font-bold">24</span>
                                <span className="block text-blue-600">from last month</span>
                            </div>
                            <span><CalendarDays width={50} height={50} /></span>
                        </div>

                        {/* rated suppliers */}
                        <div className="w-full h-full border-1 border-b-black rounded-md flex items-center justify-between p-10 px-[6rem]">
                            <div className="flex flex-col space-y-1">
                                <span className="block text-lg">Rated Suppliers</span>
                                <span className="block text-2xl font-bold">24</span>
                                <span className="block text-blue-600">from last month</span>
                            </div>
                            <span><Star width={50} height={50} /></span>
                        </div>

                        {/* budget spent */}
                        <div className="w-full h-full border-1 border-b-black rounded-md flex items-center justify-between p-10 px-[6rem]">
                            <div className="flex flex-col space-y-1">
                                <span className="block text-lg">Budget Spent</span>
                                <span className="block text-2xl font-bold">24</span>
                                <span className="block text-blue-600">from last month</span>
                            </div>
                            <span><DollarSignIcon width={50} height={50} /></span>
                        </div>

                    </div>
                </div>
                <button onClick={handleClick}>Sign out</button>
            </div>
        </>
    )
}
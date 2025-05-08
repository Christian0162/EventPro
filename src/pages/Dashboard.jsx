import { signOut } from "firebase/auth";
import NavBar from "../components/NavBar";
import { auth } from "../firebase/firebase";
import { Users, Star, CalendarDays, DollarSignIcon } from "lucide-react";
import { Title } from "react-head";
import DashboardCard from "../components/DashboardCards";
import { Link } from "react-router-dom";

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
                        <Link to={'/events/create'} className="bg-blue-600 text-white rounded-md px-5 lg:px-10 md:px-8 sm:px-7 py-2 lg:py-3 font-bold mt-3">Create New Event</Link>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-5">

                        {/* total suppliers */}
                        <DashboardCard title={'Total Suppliers'} numbers={'24'} days={'from last month'} icon={<Users width={50} height={50} />} />

                        {/* upcoming events */}
                        <DashboardCard title={'Upcoming Events'} numbers={'24'} days={'from last month'} icon={<CalendarDays width={50} height={50} />} />


                        {/* rated suppliers */}
                        <DashboardCard title={'Rated Suppliers'} numbers={'24'} days={'from last month'} icon={<Star width={50} height={50} />} />


                        {/* budget spent */}
                        <DashboardCard title={'Budget Spent'} numbers={'24'} days={'from last month'} icon={<DollarSignIcon width={50} height={50} />} />

                    </div>
                </div>
                <button onClick={handleClick}>Sign out</button>
            </div>
        </>
    )
}
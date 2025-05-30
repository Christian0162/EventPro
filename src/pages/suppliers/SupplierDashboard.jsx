import NavBar from "../../components/NavBar"
import { Link } from "react-router-dom"
import DashboardCard from "../../components/DashboardCards"
import { Eye, DollarSignIcon, CalendarPlus, Calendar, CircleCheck } from "lucide-react"
import { Title } from "react-head"

export default function SupplierDashboard({ user, userData }) {
    return (
        <>
        <Title>Dashboard</Title>
            <div className="min-h-screen">
                <NavBar user={user} userData={userData} />
                <div className="p-10 px-[5rem]">
                    <div className="flex justify-between items-center flex-col lg:flex-row md:flex-row">
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold">Dashboard</span>
                            <span className={`${userData.role == 'admin' ? 'hidden' : 'block'} mt-2 text-gray-600`}>Welcome back, {userData?.first_name}</span>
                        </div>
                        <Link to={'/verify'} className={`flex ${userData.isApproved ? 'pointer-events-none text-gray-400 cursor-not-allowed' : ""} space-x-3 items-center border-1 border-black rounded-md px-5 lg:px-8 md:px-6 sm:px-4 py-2 lg:py-1 font-bold mt-3`}>
                            <CircleCheck size={21} color={userData.isApproved ? 'blue' : 'gray'} />
                            <span>
                                {userData.isApproved ? "Verified Account" : "Verify Account"}
                            </span>
                        </Link>
                    </div>

                    {/* supplier*/}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-5">


                        {/* profile views*/}
                        <DashboardCard>
                            <div className="flex flex-col space-y-1">
                                <span className="block text-lg">Profile Views</span>
                                <span className="block text-2xl font-bold">24</span>
                                <span className="block text-blue-600">from last month</span>
                            </div>
                            <span>{<Eye width={50} height={50} />}</span>
                        </DashboardCard>

                        {/* upcoming events */}
                        <DashboardCard>
                            <div className="flex flex-col space-y-1">
                                <span className="block text-lg">Revenue</span>
                                <span className="block text-2xl font-bold">24</span>
                                <span className="block text-blue-600">from last month</span>
                            </div>
                            <span>{<DollarSignIcon width={50} height={50} />}</span>
                        </DashboardCard>

                        {/* rated suppliers */}
                        <DashboardCard>
                            <div className="flex flex-col space-y-1">
                                <span className="block text-lg">Bookings</span>
                                <span className="block text-2xl font-bold">24</span>
                                <span className="block text-blue-600">from last month</span>
                            </div>
                            <span>{<CalendarPlus width={50} height={50} />}</span>
                        </DashboardCard>
                    </div>

                    {/* supplier tabs */}
                    <div className="flex mt-7 space-x-3">
                        <Link to={'/bookings'} className="px-5 py-1 border-1 rounded-lg border-gray-700">Upcoming Booking</Link>
                        <Link to={'/views'} className="px-5 py-1 border-1 rounded-lg border-gray-700">Recent Reviews</Link>
                    </div>

                    <div className="w-full border-1 mt-7 font-semibold border-black rounded-lg p-5">
                        <span className="block text-2xl">Upcoming Bookings</span>
                        <div className="flex flex-col mt-5 px-5 space-y-5">

                            {/* upcoming book tab */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-5">
                                    <Calendar size={24} />
                                    <div className="flex flex-col">
                                        <span>Corporate Anniversary</span>
                                        <span className="text-gray-500">May 10, 2025</span>
                                    </div>
                                </div>
                                <button className="px-6 py-1 bg-blue-600 rounded-lg text-white">Confirmed</button>
                            </div>
                            {/* underline */}
                            <hr class="border-t border-gray-800" />
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-5">
                                    <Calendar size={24} />
                                    <div className="flex flex-col">
                                        <span>Corporate Anniversary</span>
                                        <span className="text-gray-500">May 10, 2025</span>
                                    </div>
                                </div>
                                <button className="px-6 py-1 bg-blue-600 rounded-lg text-white">Confirmed</button>
                            </div>

                            {/* underline */}
                            <hr className="border-t border-gray-800" />
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-5">
                                    <Calendar size={24} />
                                    <div className="flex flex-col">
                                        <span>Corporate Anniversary</span>
                                        <span className="text-gray-500">May 10, 2025</span>
                                    </div>
                                </div>
                                <button className="px-6 py-1 bg-blue-600 rounded-lg text-white">Confirmed</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
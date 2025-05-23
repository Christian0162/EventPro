import NavBar from "../components/NavBar";
import { Users, Star, CalendarDays, DollarSignIcon, Calendar, CircleCheck, IdCard } from "lucide-react";
import { Title } from "react-head";
import DashboardCard from "../components/DashboardCards";
import { Link } from "react-router-dom";
import { CalendarPlus } from "lucide-react";
import { Eye } from "lucide-react";
import Loading from "../components/Loading";
import { db } from "../firebase/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";


export default function Dashboard({ user, userData }) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchingData = async () => {

            setIsLoading(true)
            const snapAllUsers = await getDocs(collection(db, "Users"))
            const allUsers = snapAllUsers.docs.map(data => ({ id: data.id, ...data.data() }))
            const snapData = await getDocs(collection(db, "UserVerificiations"))
            const verification_data = snapData.docs.map(data => {

                const matchedUser = allUsers.find(user => user.id === data.id)

                if (matchedUser?.isApproved !== true) {
                    return {
                        id: data.id,
                        user: matchedUser,
                        ...data.data(),
                    }
                }
            }).filter(Boolean)
            setData(verification_data)
            setIsLoading(false)



        }
        fetchingData()
    }, [])


    const firstLetter = (name) => {
        if (name.length > 3) {
            return name.slice(0, 1).toUpperCase()
        }
    }

    if (!userData || !userData.role) {
        return <Loading />
    }

    console.log(data)
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
                        {
                            userData?.role == "Supplier" ?
                                <Link to={'/verify'} className={`flex ${userData.isApproved ? 'pointer-events-none text-gray-400 cursor-not-allowed' : ""} space-x-3 items-center border-1 border-black rounded-md px-5 lg:px-8 md:px-6 sm:px-4 py-2 lg:py-1 font-bold mt-3`}>
                                    <CircleCheck size={21} color={userData.isApproved ? 'blue' : 'gray'} />
                                    <span>
                                        {userData.isApproved ? "Verified Account" : "Verify Account"}
                                    </span>
                                </Link>
                                :
                                <Link to={'/events/create'} className={`${userData.role == 'admin' ? 'hidden' : 'block'} bg-blue-600 text-white rounded-md px-5 lg:px-10 md:px-8 sm:px-7 py-2 lg:py-3 font-bold mt-3`}>Create New Event</Link>

                        }
                    </div>

                    {/* supplier and event planner */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-5">
                        {userData.role == 'Event Planner'
                            ?
                            (
                                <>
                                    {/* total suppliers */}
                                    <DashboardCard>
                                        <div className="flex flex-col space-y-1">
                                            <span className="block text-lg">Total Supplier</span>
                                            <span className="block text-2xl font-bold">24</span>
                                            <span className="block text-blue-600">from last month</span>
                                        </div>
                                        <span>{<Users width={50} height={50} />}</span>
                                    </DashboardCard>

                                    {/* upcoming events */}
                                    <DashboardCard>
                                        <div className="flex flex-col space-y-1">
                                            <span className="block text-lg">Upcoming Events</span>
                                            <span className="block text-2xl font-bold">24</span>
                                            <span className="block text-blue-600">from last month</span>
                                        </div>
                                        <span>{<CalendarDays width={50} height={50} />}</span>
                                    </DashboardCard>

                                    {/* rated suppliers */}
                                    <DashboardCard>
                                        <div className="flex flex-col space-y-1">
                                            <span className="block text-lg">Rated Suppliers</span>
                                            <span className="block text-2xl font-bold">24</span>
                                            <span className="block text-blue-600">from last month</span>
                                        </div>
                                        <span>{<Star width={50} height={50} />}</span>
                                    </DashboardCard>

                                    {/* budget spent */}
                                    <DashboardCard>
                                        <div className="flex flex-col space-y-1">
                                            <span className="block text-lg">Budget Spent</span>
                                            <span className="block text-2xl font-bold">24</span>
                                            <span className="block text-blue-600">from last month</span>
                                        </div>
                                        <span>{<DollarSignIcon width={50} height={50} />}</span>
                                    </DashboardCard>
                                </>
                            )
                            :
                            userData.role == 'Supplier'
                                ?
                                (
                                    <>
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
                                    </>
                                )
                                :
                                (
                                    <>
                                        {/* Total Supplier*/}
                                        <DashboardCard>
                                            <div className="flex flex-col space-y-1">
                                                <span className="block text-lg">Total Suppliers</span>
                                                <span className="block text-2xl font-bold">50</span>
                                                <span className="block text-blue-600">from last month</span>
                                            </div>
                                            <span>{<Users width={50} height={50} />}</span>
                                        </DashboardCard>

                                        {/* Verify Supplier */}
                                        <DashboardCard>
                                            <div className="flex flex-col space-y-1">
                                                <span className="block text-lg">Revenue</span>
                                                <span className="block text-2xl font-bold">5</span>
                                                <span className="block text-blue-600">this week</span>
                                            </div>
                                            <span>{<IdCard width={50} height={50} />}</span>
                                        </DashboardCard>

                                        {/* Active Events*/}
                                        <DashboardCard>
                                            <div className="flex flex-col space-y-1">
                                                <span className="block text-lg">Active Events</span>
                                                <span className="block text-2xl font-bold">3</span>
                                                <span className="block text-blue-600">this week</span>
                                            </div>
                                            <span>{<CalendarPlus width={50} height={50} />}</span>
                                        </DashboardCard>
                                    </>
                                )}
                    </div>

                    {/* supplier tabs */}
                    {userData.role == 'Supplier' && (
                        <>
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
                        </>
                    )}

                    {/* admin tabs */}
                    {userData.role == 'admin' && (
                        <>
                            <div className="w-full border-1 mt-7 font-semibold border-black rounded-lg p-5">
                                <span className="block text-2xl">Verify Supplier Accounts</span>
                                <div className="flex flex-col mt-5 px-5 space-y-3">
                                    {!isLoading && data.map((datas, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex items-center justify-center rounded-full bg-gray-300 h-10 w-10">
                                                        <span className="text-xl">{firstLetter(datas?.business_name)}</span>
                                                    </div>
                                                    <span className="block">{datas?.business_name}</span>
                                                </div>
                                                <Link to={`/review/${datas.id}`} className="px-6 py-1 bg-blue-600 rounded-lg text-white">Review</Link>
                                            </div>
                                            {index !== data.length - 1 && (
                                                <hr className="border-t mt-3 border-gray-800" />
                                            )}
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <span className="text-center">Loading..</span>
                                    )}
                                    {data.length === 0 && (
                                        <span className="block text-center text-gray-500">No Pending Request..</span>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div >
        </>
    )
}
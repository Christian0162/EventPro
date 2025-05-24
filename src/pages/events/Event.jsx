import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Title } from "react-head";
import { CalendarDays, MapPin, CircleDollarSign, Trash} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { db } from "../../firebase/firebase";
import { auth } from "../../firebase/firebase";
import { lazy, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import useEvents from "../../hooks/useEvents";

const NavBar = lazy(() => import("../../components/NavBar"))


export default function Event({ user, userData }) {

    const [userEvents, setUserEvents] = useState([]);
    const [loading, setLoading] = useState(true)
    const { deleteEvent } = useEvents()


    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const querySnapShot = await getDocs(collection(db, "Events"));
                const data = querySnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                if (userData.role == "Supplier") {
                    setUserEvents(data)
                }
                else {
                    const filteredData = data.filter(event => event.uid === auth.currentUser.uid)
                    setUserEvents(filteredData)
                }

            }
            catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }

        };
        fetchEvents()
    }, [userData])

    const handleDelete = async (id) => {
        deleteEvent(id, setUserEvents)
    }

    return (
        <>
            <Title>Event</Title>
            <div className="min-h-screen">
                <NavBar user={user} userData={userData} />

                <div className="p-10 px-[5rem]">
                    <div className="flex justify-between md:items-center lg:items-center flex-col lg:flex-row md:flex-row">
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold">Events</span>
                            <span className="mt-2 text-gray-600">Create and manage your events in one place</span>
                        </div>
                        <Link to={'/events/create'}>
                            <button className="bg-blue-600 text-white rounded-md px-5 lg:px-10 md:px-8 sm:px-7 py-2 lg:py-3 font-bold mt-3">Create New Event</button>
                        </Link>
                    </div>
                    {loading
                        ?
                        (
                            <div className="absolute top-95 lg:top-85 left-0 right-0 flex items-center justify-center">
                                <ClipLoader size={55} color="#1d5cc7" />
                            </div>
                        )
                        :
                        userEvents.length > 0
                            ?
                            (
                                <div>
                                    <Swiper
                                        modules={[Navigation]}
                                        slidesPerView={1}
                                        navigation
                                        spaceBetween={30}
                                        breakpoints={{
                                            640: { slidesPerView: 1 },
                                            950: { slidesPerView: 2 },
                                            1250: { slidesPerView: 3 },
                                        }}
                                    >
                                        {userEvents.map((events, index) => (
                                            <SwiperSlide
                                                key={index}
                                            >
                                                {/* event cards */}
                                                <div className="h-full w-full border-1 border-black p-6 rounded-lg mt-6 ">
                                                    <div className="flex justify-end">
                                                        <button onClick={() => handleDelete(events.id)} className="self-end"><Trash width={24} height={24} strokeWidth={2} /></button>
                                                    </div>

                                                    <div className="flex justify-between items-center mb-5 mt-3">
                                                        <span className="block text-4xl">{events.event_name.length > 10 ? events.event_name.slice(0, 10) + ".." : events.event_name}</span>
                                                        <span className={`${events.event_status.value === "upcoming" ? "bg-purple-600" : events.event_status.value === "planning" ? "bg-sky-500" : "bg-green-500"} rounded-xl py-1 px-5 text-white`}>{events.event_status.value}</span>
                                                    </div>
                                                    <div className="flex flex-col space-y-5">
                                                        <div className="flex space-x-2">
                                                            <span className="block"><CalendarDays /></span>
                                                            <span>{events.event_date}<br></br> {events.event_time}</span>
                                                        </div>
                                                        <div className="flex space-x-2">
                                                            <span className="block"><MapPin /></span>
                                                            <span>{events.event_location}</span>
                                                        </div>
                                                        <div className="flex space-x-2">
                                                            <span className="block"><CircleDollarSign /></span>
                                                            <span>{events.event_budget}</span>
                                                        </div>
                                                        <div>
                                                            <span>Looking for supplier:</span>
                                                            <div className="grid grid-cols-4 gap-3 mt-2">
                                                                {events.event_categories.map((categories, index) => (
                                                                    <span key={index} className="py-1 px-5 border-1 border-black rounded-xl text-center">{categories}</span>
                                                                ))}
                                                            </div>
                                                            <p className="block mt-3 break-words">{events.event_description}</p>
                                                            <Link to={`/events/edit/${events.id}`} className="block text-center mt-5 py-3 w-full bg-blue-600 text-white font-bold rounded-lg">Manage Event</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            )
                            :
                            (
                                <div className="absolute top-90 lg:top-85 left-0 right-0 flex items-center justify-center">
                                    <span className="block text-gray-500 text-2xl">No events.</span>
                                </div>
                            )
                    }
                </div>
            </div>
        </>
    );
};
import NavBar from "../../components/NavBar";
import Select from "react-select";
import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import { Link, Navigate } from "react-router-dom";
import { X } from "lucide-react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { auth } from "../../firebase/firebase";
import Loading from "../../components/Loading";
import AddressAutoComplete from "../../components/AddressAutoComplete";
import Swal from "sweetalert2";

export default function CreateEvent({ user }) {

    const [loading, setLoading] = useState(false)
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState('');
    const [event_status, setEvent_status] = useState('');
    const [type, setType] = useState('');
    const [event_name, setEvent_name] = useState('');
    const [event_location, setEvent_location] = useState('');
    const [event_date, setEvent_date] = useState([]);
    const [event_budget, setEvent_budget] = useState('');
    const [event_description, setEvent_description] = useState('');
    const [month, setMonth] = useState('')
    const [day, setDay] = useState('')
    const [year, setYear] = useState('')
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const categoriesOptions = [
        { label: '123', value: '123' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
    ]

    const statusOptions = [
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Planning', value: 'planning' },
        { label: 'Complete', value: 'complete' },
    ]

    const typeOptions = [
        { label: 'test', value: 'test' },
        { label: 'test', value: 'test' },
    ]


    const handleDate = (e) => {
        const dateString = e.target.value
        const date = new Date(dateString)
        setEvent_date(dateString)

        const years = date.getFullYear();
        const months = date.toLocaleDateString([], { month: "long" })
        const days = date.toLocaleDateString([], { weekday: "long" })

        setMonth(months)
        setDay(days)
        setYear(years)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = auth.currentUser;
        if (user) {
            setLoading(true)

            await addDoc(collection(db, "Events"), {
                uid: user.uid,
                event_name: event_name,
                event_location: event_location,
                event_date: [day, month, year].join(", "),
                event_time: [
                    new Date(`1970-01-01T${startTime}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }),
                    new Date(`1970-01-01T${endTime}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
                ].join(" - "),
                event_status: event_status,
                event_type: type,
                event_budget: event_budget,
                event_description: event_description,
                event_categories: tags,
            })
            Swal.fire({
                icon: 'success',
                title: 'Added',
                text: `${event_name}'s data has been added`,
                showConfirmButton: false,
                timer: 1000,
            })
            setSubmitted(true)

        }
        setLoading(false)
    }


    if (submitted) {
        return <Navigate to={'/events'} replace />
    }

    const removeTag = (index) => {
        setTags(tags.filter((tag, i) => i !== index));
    }

    const addTag = () => {
        if (categories.value.trim() && !tags.includes(categories.value.trim())) {
            setTags([...tags, categories.value])
            setCategories(null)
        }
    }


    if (loading) {
        return <Loading />
    }

    return (
        <>
            <div className="min-h-screen">
                <NavBar user={user} />
                <div className="p-10 px-[5rem]">
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold">Create New Event</span>
                        <span className="mt-2 text-gray-600">Add the details for your new event</span>
                    </div>
                    <form onSubmit={handleSubmit} className="w-full h-full mt-5 space-y-5">

                        {/* event name and location */}
                        <div className="justify-between gap-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2">
                            {/* event name */}
                            <div className="flex flex-col w-full">
                                <label htmlFor="event_name">Event Name</label>
                                <input type="text" name="event_name" className="mt-2 focus:ring-2 focus:outline-none px-2 focus:ring-blue-500 ring-1 rounded-sm w-full h-8 ring-black"
                                    required
                                    placeholder="Event name"
                                    onChange={(e) => setEvent_name(e.target.value)}
                                    value={event_name} />
                            </div>

                            {/* location */}
                            <div className="flex flex-col w-full">
                                <label htmlFor="location">Location</label>
                                <AddressAutoComplete setEvent_location={setEvent_location} />
                            </div>
                        </div>

                        {/* date, time and status */}
                        <div className="gap-3 items-center grid grid-cols-1 sm:grid-cols-3">

                            {/* date */}
                            <div className="flex flex-col w-full">
                                <label htmlFor="date">Date</label>
                                <input type="date" name="event_date" className="mt-2 focus:ring-2 focus:outline-none px-2 focus:ring-blue-500 ring-1 rounded-sm w-full h-8 ring-black"
                                    required
                                    onChange={handleDate}
                                    value={event_date}
                                />
                            </div>

                            {/* time */}
                            <div className="flex flex-col w-full">
                                <div className="gap-2 grid grid-cols-1 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="time">Time Start</label>
                                        <input type="time" name="event_time" className="mt-2 focus:ring-2 focus:outline-none px-2 focus:ring-blue-500 ring-1 rounded-sm w-full h-8 ring-black"
                                            required
                                            onChange={(e) => setStartTime(e.target.value)}
                                            value={startTime}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="time">Time End</label>
                                        <input type="time" name="event_time" className="mt-2 focus:ring-2 focus:outline-none px-2 focus:ring-blue-500 ring-1 rounded-sm w-full h-8 ring-black"
                                            required
                                            onChange={(e) => setEndTime(e.target.value)}
                                            value={endTime}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* status */}
                            <div className="flex flex-col w-full">
                                <label htmlFor="time">Status</label>
                                <Select
                                    name="event_status"
                                    value={event_status}
                                    onChange={setEvent_status}
                                    options={statusOptions}
                                    placeholder="Upcoming"
                                    isClearable
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        {/* type */}
                        <div className="flex flex-col w-full">
                            <label htmlFor="type" className="mb-2">Type</label>
                            <Select
                                name="event_type"
                                options={typeOptions}
                                value={type}
                                onChange={setType}
                                placeholder="Corporate"
                                isClearable
                            />
                        </div>

                        {/* Budget */}
                        <div className="flex flex-col w-full">
                            <label htmlFor="type">Budget</label>
                            <input placeholder="25,500" type="text" name="event_budget" className="mt-2 focus:ring-2 focus:outline-none px-5 focus:ring-blue-500 ring-1 rounded-sm w-full h-8 ring-black"
                                required
                                onChange={(e) => setEvent_budget(e.target.value)}
                                value={event_budget}
                            />
                        </div>

                        {/* description */}
                        <div className="flex flex-col w-full">
                            <label htmlFor="description">Description</label>
                            <textarea name="event_description" id="desctipion" className="mt-2 focus:ring-2 focus:outline-none px-2 focus:ring-blue-500 ring-1 rounded-sm w-full h-38 py-2 ring-black"
                                required
                                onChange={(e) => setEvent_description(e.target.value)}
                                value={event_description}
                            ></textarea>
                        </div>

                        {/* sepcify supplier */}
                        <div className="flex flex-col">
                            <span className="block mb-2" > Specify the supplier you are looking for: </span>

                            <div className="grid grid-cols-1 md:flex w-full gap-3">
                                <div className={`gap-2 w-full grid grid-cols-2  ${tags.length > 0 ? "md:flex" : "hidden"}`}>
                                    {tags.map((tag, index) => (
                                        <span key={index} className="py-1 w-full lg:w-1/2 px-3 border-1 rounded-lg flex items-center justify-between border-black">
                                            {tag}
                                            <button type="button" onClick={() => removeTag(index)}><X width={16} strokeWidth={2} /></button>
                                        </span>
                                    ))}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 md:w-[35rem] lg:w-[40rem] gap-2">
                                    <Select
                                        options={categoriesOptions}
                                        value={categories}
                                        onChange={setCategories}
                                        placeholder="Categories"
                                        isClearable
                                    />
                                    <button type="button" className="py-1 px-2 border-1 border-blue-500 rounded-sm" onClick={addTag}>Add more</button>
                                </div>

                            </div>
                        </div>

                        <div className="w-full sm:w-full md:w-full lg:w-[40rem] grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <PrimaryButton>Create Event</PrimaryButton>
                            <Link to={'/events'} className="flex items-center py-2 w-full text-center justify-center border-1 hover:boder-1 hover:border-blue-500 rounded-sm">
                                <span className="block">Cancel</span>
                            </Link>
                        </div>
                    </form>

                </div>
            </div >
        </>
    )
}
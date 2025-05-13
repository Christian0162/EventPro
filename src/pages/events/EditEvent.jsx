import NavBar from "../../components/NavBar"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import AddressAutoComplete from "../../components/AddressAutoComplete";
import Select from "react-select"
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditEvent({ user }) {

    const navigate = useNavigate()
    const { id } = useParams();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [event_name, setEvent_name] = useState('')
    const [event_location, setEvent_location] = useState('')
    const [event_date, setEvent_date] = useState('')
    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')
    const [days, setDays] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [event_status, setEvent_status] = useState('')
    const [event_type, setEvent_type] = useState('')
    const [event_description, setEvent_description] = useState('')
    const [categories, setCategories] = useState('')
    const [event_budget, setEvent_budget] = useState('')
    const [tags, setTags] = useState([])

    // console.log(new Date(`1970-01-01T${startTime}`).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit' ,hour12: true}))

    console.log(event_status)

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

    const addTag = () => {
        if (categories.value.trim() && !tags.includes(categories.value.trim())) {
            setTags([...tags, categories.value])
            setCategories(null)
        }
    }

    const removeTag = (index) => {
        setTags(tags.filter((tag, i) => i !== index))
    }
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const docRef = await getDoc(doc(db, "Events", id));

                const data = docRef.data()

                if (docRef.exists()) {
                    setSelectedEvent({ id: docRef.id, ...docRef.data() });
                    setEvent_name(data.event_name)
                    setEvent_location(data.event_location)
                    // setEvent_date(data.event_date)
                    setEvent_status(data.event_status)
                    setEvent_type(data.event_type)
                    setEvent_budget(data.event_budget)
                    setEvent_description(data.event_description)
                    setTags(data.event_categories)

                }

            } catch (err) {
                console.error("Error fetching document:", err);
            } finally {
                // setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);


    const handleDate = (e) => {
        const value = e.target.value;
        const date = new Date(value)

        setEvent_date(value)

        const year = date.getFullYear();
        const month = date.toLocaleDateString([], { month: 'long' })
        const days = date.toLocaleDateString([], { days: 'long' })

        setYear(year)
        setMonth(month)
        setDays(days)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            updateDoc(doc(db, 'Events', id), {
                event_name: event_name,
                event_location: event_location,
                event_date: [year, month, days].join(", "),
                event_time: [
                    new Date(`1970-01-01T${startTime}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }),
                    new Date(`1970-01-01T${endTime}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })

                ].join(" - "),
                event_status: event_status,
                event_type: event_type,
                event_budget: event_budget,
                event_description: event_description,
                event_categories: tags,
            })
            Swal.fire({
                icon: 'success',
                title: 'Update',
                text: `${event_name} has been updated successfully.`,
                showConfirmButton: false,
                timer: 1000
            })
            navigate("/events")
        }
        catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update',
                confirmButtonText: 'Continue',
                timer: 1000
            })
        }
    }

    console.log(selectedEvent)
    return (
        <>
            <div className="min-h-screen">
                <NavBar user={user} />
                {/* <div>{id}</div> */}
                <div className="p-10 px-[5rem]">
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
                                <AddressAutoComplete setEvent_location={setEvent_location} defaultLocation={event_location}/>
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
                                <label htmlFor="status">Status</label>
                                <Select
                                    name="event_status"
                                    value={event_status}
                                    onChange={setEvent_status}
                                    options={statusOptions}
                                    placeholder={event_status.length > 0 ? event_status : "Upcoming"}
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
                                value={event_type}
                                onChange={setEvent_type}
                                placeholder={event_type.length > 0 ? event_type : "test"}
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
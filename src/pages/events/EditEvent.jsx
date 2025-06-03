import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import AddressAutoComplete from "../../components/AddressAutoComplete";
import Select from "react-select"
import { X } from "lucide-react";
import PrimaryButton from "../../components/PrimaryButton";
import { Link } from "react-router-dom";
import useEvents from "../../hooks/useEvents";
import Loading from "../../components/Loading";

export default function EditEvent() {

    const { id } = useParams();
    const [event_name, setEvent_name] = useState('')
    const [event_location, setEvent_location] = useState('')
    const [event_date, setEvent_date] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [event_status, setEvent_status] = useState(null)
    const [event_type, setEvent_type] = useState(null)
    const [event_description, setEvent_description] = useState('')
    const [categories, setCategories] = useState(null)
    const [event_budget, setEvent_budget] = useState('')
    const [tags, setTags] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const { updateEvent, getEvent } = useEvents()

    console.log(startTime)

    const categoriesOptions = [
        { label: 'Catering', value: 'catering' },
        { label: 'Photography', value: 'photography' },
        { label: 'Entertainment', value: 'entertainment' },
        { label: 'Decoration', value: 'decoration' },
        { label: 'Security', value: 'security' },
        { label: 'Transportation', value: 'transportation' },
        { label: 'Audio/Visual', value: 'audiovisual' },
        { label: 'Venue', value: 'venue' },
    ];

    const statusOptions = [
        { label: 'Planning', value: 'planning' },
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Complete', value: 'complete' },
    ];

    const typeOptions = [
        { label: 'Corporate', value: 'corporate' },
        { label: 'Wedding', value: 'wedding' },
        { label: 'Birthday Party', value: 'birthday' },
        { label: 'Conference', value: 'conference' },
        { label: 'Workshop', value: 'workshop' },
        { label: 'Social Event', value: 'social' },
        { label: 'Other', value: 'other' },
    ];

    const addTag = () => {
        if (categories?.value.trim() && !tags.includes(categories?.value.trim())) {
            setTags([...tags, categories.value])
            setCategories(null)
        }
    }

    const removeTag = (index) => {
        setTags(tags.filter((tag, i) => i !== index))
    }

    useEffect(() => {
        const loadEvent = async () => {
            try {
                setIsLoading(true)
                const data = await getEvent(id);

                if (data) {
                    setEvent_name(data.event_name)
                    setEvent_location(data.event_location)
                    setEvent_date(data.event_date)
                    setEvent_status(data.event_status)
                    setEvent_type(data.event_type)
                    setEvent_budget(data.event_budget)
                    setEvent_description(data.event_description)
                    setTags(data.event_categories)                    
                    setStartTime(data.event_time.valueStartAndEnd[0])
                    setEndTime(data.event_time.valueStartAndEnd[1])
                }
            } catch (e) {
                console.log(e)
            } finally {
                setIsLoading(false)
            }
        }

        if (id) {
            loadEvent()
        }
    }, [id])



    const handleDate = (e) => {
        const dateString = e.target.value;
        const date = new Date(dateString)

        const years = date.getFullYear();
        const months = date.toLocaleDateString([], { month: 'long' })
        const days = date.toLocaleDateString([], { weekday: 'long' })

        const previewDate = [years, months, days]

        setEvent_date({
            date_value: dateString,
            date_preview: previewDate
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const previewStartAndEnd = [
                new Date(`1970-01-01T${startTime}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }),
                new Date(`1970-01-01T${endTime}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
            ].join(' - ')

            const valueStartAndEnd = [startTime, endTime]

            const newTime = ({ previewStartAndEnd, valueStartAndEnd })

            await updateEvent(id,
                event_name,
                event_location,
                event_date,
                newTime,
                event_status,
                event_type,
                event_budget,
                event_description,
                tags)
        }
        catch (e) {
            console.log(e)
        }
    }

    if (isLoading) {
        return <Loading />
    }


    return (
        <>
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
                        <AddressAutoComplete setLocation={setEvent_location} default_location={event_location} className={'mt-2 py-1 rounded-sm'} />
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
                            value={event_date.date_value}
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
                            placeholder="Upcoming"
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
                        placeholder="Event Type"
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
                <div className="flex flex-col space-y-4">
                    <span className="block font-medium">Specify the supplier you are looking for:</span>

                    {/* Tags Display */}
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center gap-2 py-2 px-3 bg-blue-50 border border-blue-200 rounded-lg text-sm"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(index)}
                                        className="hover:bg-blue-100 rounded-full p-1 transition-colors"
                                    >
                                        <X width={14} height={14} strokeWidth={2} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Add Supplier Controls */}
                    <div className="flex md:grid md:grid-cols-3 gap-3 items-end">
                        <div className="md:col-span-2">
                            <Select
                                options={categoriesOptions}
                                value={categories}
                                onChange={setCategories}
                                placeholder="Select supplier category"
                                isClearable
                                className="w-full"
                            />
                        </div>
                        <button
                            type="button"
                            className="py-2 px-4 bg-blue-500 text-white rounded-sm hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                            onClick={addTag}
                            disabled={!categories || !categories.value.trim()}
                        >
                            Add Supplier
                        </button>
                    </div>
                </div>

                <div className="w-full sm:w-full md:w-full lg:w-[40rem] grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <PrimaryButton>Update Event</PrimaryButton>
                    <Link to={'/events'} className="flex items-center py-2 w-full text-center justify-center border-1 hover:boder-1 hover:border-blue-500 rounded-sm">
                        <span className="block">Cancel</span>
                    </Link>
                </div>
            </form>
        </>
    )
}
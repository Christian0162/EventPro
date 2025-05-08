import NavBar from "../../components/NavBar";
import Select from "react-select";
import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import { Link } from "react-router-dom";
import { X } from "lucide-react";


export default function CreateEvent(user) {

    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState('');
    const [status, setStatus] = useState('');
    const [type, setType] = useState('')

    const categoriesOptions = [
        { label: '123', value: '123' },
        { label: '1234', value: '1234' },
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const removeTag = (index) => {
        setTags(tags.filter((tag, i) => i !== index));
    }

    const addTag = () => {
        if (categories.value.trim() && !tags.includes(categories.value.trim())) {
            setTags([...tags, categories.value])
        }
    }

    const statusOptions = [
        { label: 'test', value: 'test' },
        { label: 'test', value: 'test' },
    ]
    const typeOptions = [
        { label: 'test', value: 'test' },
        { label: 'test', value: 'test' },
    ]


    console.log(tags)

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
                        <div className="flex justify-between gap-5">
                            {/* event name */}
                            <div className="flex flex-col w-full">
                                <label htmlFor="event_name">Event Name</label>
                                <input type="text" className="mt-2 focus:ring-2 focus:outline-none px-2 focus:ring-blue-500 ring-1 rounded-sm w-full h-8 ring-black" />
                            </div>

                            {/* location */}
                            <div className="flex flex-col w-full">
                                <label htmlFor="location">Location</label>
                                <input type="text" className="mt-2 focus:ring-2 focus:outline-none px-2 focus:ring-blue-500 ring-1 rounded-sm w-full h-8 ring-black" />
                            </div>
                        </div>

                        {/* date, time and status */}
                        <div className="flex justify-between gap-3 items-center">

                            {/* date */}
                            <div className="flex flex-col w-full">
                                <label htmlFor="date">Date</label>
                                <input type="date" className="mt-2 focus:ring-2 focus:outline-none px-2 focus:ring-blue-500 ring-1 rounded-sm w-full h-8 ring-black" />
                            </div>

                            {/* time */}
                            <div className="flex flex-col w-full">
                                <label htmlFor="time">Time</label>
                                <input type="time" className="mt-2 focus:ring-2 focus:outline-none px-2 focus:ring-blue-500 ring-1 rounded-sm w-full h-8 ring-black" />
                            </div>

                            {/* status */}
                            <div className="flex flex-col w-full">
                                <label htmlFor="time">Status</label>
                                <Select
                                    value={status}
                                    onChange={setStatus}
                                    options={statusOptions}
                                    placeholder="Upcoming"
                                    isClearable
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        {/* type */}
                        <div className="flex flex-col w-full">
                            <label htmlFor="type">Type</label>
                            <Select
                                options={typeOptions}
                                value={type}
                                onChange={setType}
                                placeholder="Corporate"
                                isClearable
                            />
                        </div>

                        {/* Budget */}
                        <div className="flex flex-col w-full">
                            <label htmlFor="type">Type</label>
                            <input placeholder="25,500" type="text" className="mt-2 focus:ring-2 focus:outline-none px-2 focus:ring-blue-500 ring-1 rounded-sm w-full h-8 ring-black" />
                        </div>

                        {/* description */}
                        <div className="flex flex-col w-full">
                            <label htmlFor="description">Description</label>
                            <textarea name="description" id="desctipion" className="mt-2 focus:ring-2 focus:outline-none px-2 focus:ring-blue-500 ring-1 rounded-sm w-full h-38 py-2 ring-black" ></textarea>
                        </div>

                        <div className="flex flex-col">
                            <span className="block mb-2" > Specify the supplier you are looking for: </span>

                            <div className="flex items-center justify-between w-1/2 gap-3">
                                {tags.map((tag, index) => (
                                    <span key={index} className="py-1 w-30 px-3  border-1 rounded-lg flex items-center justify-between border-black">
                                        {tag}
                                        <button type="button" onClick={() => removeTag(index)}><X width={16} strokeWidth={2} /></button>
                                    </span>
                                ))}
                                <div className="flex w-full gap-2">
                                    <Select
                                        options={categoriesOptions}
                                        value={categories}
                                        onChange={setCategories}
                                        placeholder="Categories"
                                        isClearable
                                    />
                                    <button type="button" className="py-1 px-5 border-1 border-blue-500 rounded-sm" onClick={addTag}>Add more</button>
                                </div>

                            </div>
                        </div>

                        <div className="flex w-1/2 space-between gap-5">
                            <PrimaryButton>Create Event</PrimaryButton>
                            <Link to={'/events'} className="flex items-center w-full text-center justify-center border-1 hover:boder-1 hover:border-blue-500 rounded-sm">
                                <span className="block">Cancel</span>
                            </Link>
                        </div>
                    </form>

                </div>
            </div >
        </>
    )
}
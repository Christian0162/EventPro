import Swal from "sweetalert2"
import { addDoc, collection, updateDoc, doc, getDoc, deleteDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"
import { useNavigate } from "react-router-dom"

export default function useEvents() {

    const navigate = useNavigate()

    const createEvent = (user, event_name, event_location, day, month, year, startTime, endTime, event_status, type, event_budget, event_description, tags) => {
        addDoc(collection(db, "Events"), {
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
    }

    const updateEvent = (id, event_name, event_location, year, month, days, startTime, endTime, event_status, event_type, event_budget, event_description, tags) => {
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

    const getEvent = (id, setSelectedEvent, setEvent_name, setEvent_location, setEvent_status, setEvent_type, setEvent_budget, setEvent_description, setTags) => {
        const fetchEvent = async () => {
            try {
                const docRef = await getDoc(doc(db, "Events", id));

                const data = docRef.data()

                if (docRef.exists()) {
                    setSelectedEvent({ id: docRef.id, ...docRef.data() });
                    setEvent_name(data.event_name)
                    setEvent_location(data.event_location)
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

        fetchEvent()
    }

    const deleteEvent = (id, setUserEvents) => {
        Swal.fire({
            icon: 'warning',
            title: 'are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete it',
            cancelButtonText: 'No, Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteDoc(doc(db, "Events", id))
                setUserEvents(prev => prev.filter(event => event.id !== id));
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `Event has been deleted.`,
                    showConfirmButton: false,
                    timer: 1000,
                })
            }
        })
    }

    return {
        createEvent,
        updateEvent,
        getEvent,
        deleteEvent
    }
}
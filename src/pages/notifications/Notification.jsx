import { Title } from "react-head";
import NavBar from "../../components/NavBar";

export default function Notification({ user }) {
    return (
        <>
            <div className="min-h-screen">
                <NavBar user={user} />

                <div className="p-10 px-[5rem]">
                    <span className="text-3xl font-bold">Notifications</span>

                    <div className="h-full w-full border-1 rounded-lg pl-10 py-8 flex flex-col mt-5">

                        {/* message */}
                        <div className="flex gap-4 items-center">
                            <span className="flex rounded-full bg-gray-300 text-2xl h-10 w-10 items-center justify-center">T</span>
                            <div className="flex flex-col">
                                <span className="block">Tani's Flower Shop</span>
                                <span className="block text-gray-500">Applied to your event</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
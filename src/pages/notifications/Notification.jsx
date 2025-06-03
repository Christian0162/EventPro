import { Title } from "react-head";
import NavBar from "../../components/NavBar";

export default function Notification() {
    return (
        <>
            <Title>Notifications</Title>

            <h1 className="mb-5 text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Notifications</h1>
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

        </>
    )
}
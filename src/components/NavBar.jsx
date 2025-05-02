import { Link } from "react-router-dom";
import { AlignJustify, Heart, MessageCircleMore, BellDot, User } from "lucide-react";

export default function NavBar({ user }) {
    return (
        <>
            <nav className="font-sans font-bold">
                <div className="flex justify-between px-[3rem] items-center py-4  border-b-1 border-b-gray-500">
                    <div className="flex items-center justify-center space-x-5">
                        <div className="text-3xl">
                            <Link to={user ? '/dashboard' : '/'} className="text-3xl font-bold">
                                <span>Event</span>
                                <span className="text-blue-700">Pro</span>
                            </Link>
                        </div>
                        <div className={`hidden ${user ? ' md:block' : 'hidden'}`}>
                            <div className="flex space-x-3 text-md">
                                <Link to={'/dashboard'} className="text-gray-700 hover:text-black">Dashboard</Link>
                                <Link to={'/suppliers'} className="text-gray-700 hover:text-black">Suppliers</Link>
                                <Link to={'/events'} className="text-gray-700 hover:text-black">Events</Link>
                            </div>
                        </div>
                    </div>
                    {user
                        ?
                        <div className="hidden sm:block">
                            <div className="flex space-x-7 items-center">
                                <Link to={'/'}><Heart /></Link>
                                <Link to={'/'}><MessageCircleMore /></Link>
                                <Link to={'/'}><BellDot /></Link>
                                <div className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center"><User /></div>
                            </div>
                        </div>
                        :
                        <div className="space-x-8 text-md hidden sm:block">
                            <Link to={'/'}>HOME</Link>
                            <Link to={'/'}>ABOUT US</Link>
                            <Link to={'/'}>CONTACT</Link>
                        </div>
                    }

                    <AlignJustify className="block sm:hidden" />
                </div>
            </nav>
        </>
    );
}
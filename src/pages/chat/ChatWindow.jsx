import { useState } from "react";
import { Search, ArrowLeft, Send } from 'lucide-react';
import NavBar from "../../components/NavBar";

export default function ChatWindow({ user, userData }) {
    const [selectedContact, setSelectedContact] = useState('Christian');
    const [message, setMessage] = useState('');

    const contacts = [
        {
            id: 'christian',
            name: 'Christian',
            avatar: 'C',
            lastMessage: 'Christian: Hey...',
            isActive: true
        },
        {
            id: 'tani',
            name: "Tani's Photo...",
            avatar: 'T',
            lastMessage: 'Tani: Hi',
            isActive: false
        }
    ];

    const messages = [
        {
            id: 1,
            sender: 'other',
            text: 'Hello Good morning',
            time: '10:30'
        },
        {
            id: 2,
            sender: 'me',
            text: 'Hi, when will we meet so that we can discuss more about the event?',
            time: '10:32'
        }
    ];

    return (
        <>
            <div className="min-h-screen">
                <NavBar user={user} userData={userData} />

                <div className="py-10 px-[5rem]">
                    <span className="block text-3xl font-bold mb-5 text-gray-600">Chats</span>
                    <div className="flex h-screen shadow-lg bg-gray-100 border border-gray-300 rounded-lg">

                        {/* Sidebar */}
                        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">

                            {/* Header */}
                            <div className="p-4 border-b border-gray-200">

                                {/* Search */}
                                <div className="relative">
                                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search Names"
                                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Contacts List */}
                            <div className="flex-1 overflow-y-auto">
                                {contacts.map((contact) => (
                                    <div
                                        key={contact.id}
                                        onClick={() => setSelectedContact(contact.name)}
                                        className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 ${selectedContact === contact.name ? 'bg-blue-50' : ''
                                            }`}
                                    >
                                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold">
                                            {contact.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-gray-900 truncate">
                                                {contact.name}
                                            </div>
                                            <div className="text-sm text-gray-500 truncate">
                                                {contact.lastMessage}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 flex flex-col">
                            {/* Chat Header */}
                            <div className="p-4 bg-white border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                        C
                                    </div>
                                    <h2 className="font-semibold text-gray-900">{selectedContact}</h2>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                                <div className="space-y-4">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.sender === 'me'
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-white text-gray-900 shadow-sm border border-gray-200'
                                                    }`}
                                            >
                                                <p className="text-sm">{msg.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Message Input */}
                            <div className="p-4 bg-white border-t border-gray-200">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Send message"
                                        className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
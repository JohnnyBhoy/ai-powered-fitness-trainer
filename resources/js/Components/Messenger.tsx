import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";


type MessengerProps = {
    name: string,
    conversations: string,
}

export default function Messenger({ name, conversations }: MessengerProps) {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hey there! 👋", sender: "trainer" },
        { id: 2, text: "Hi! How are you?", sender: "trainee" },
    ]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef: any = useRef(null);

    const handleSend = () => {
        if (!newMessage.trim()) return;
        setMessages((prev) => [
            ...prev,
            { id: Date.now(), text: newMessage, sender: "trainee" },
        ]);
        setNewMessage("");
    };

    const handleKeyPress = (e: any) => {
        if (e.key === "Enter") handleSend();
    };

    // Auto scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <div className="flex items-center px-4 py-3 bg-white border-b shadow">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
                    {name?.charAt(0)}
                </div>
                <div className="ml-3">
                    <h2 className="font-semibold text-lg">{name} </h2>
                    <p className="text-sm text-gray-500">Online</p>
                </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 p-4 space-y-2 h-[10rem]">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === "trainee" ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div className="flex gap-2 place-items-center">
                            {msg.sender === "trainee" ? (
                                ''
                            ) : (
                                <img
                                    src="/logos/mobile-header-logo.png"
                                    alt="gpf_logo"
                                    className="h-4 rounded-full" />
                            )}

                            <div
                                className={`px-4 py-2 rounded-2xl max-w-xs break-words ${msg.sender === "trainee"
                                    ? "bg-blue-500 text-white rounded-br-none"
                                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>

                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="flex items-center p-3 bg-white border-t">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <button
                    className="ml-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                    onClick={handleSend}
                >
                    <Send className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

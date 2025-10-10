import { useEffect, useRef, useState } from "react";


type MessengerProps = {
    name: string,
    conversations: string,
}

export default function Messenger({ name, conversations }: MessengerProps) {

    const message: any = conversations.split(/(?=\s*GPF:|\s*Johnny:)/)
        .map((line, index) => {
            const [sender, text] = line.split(":").map(s => s.trim());

            //text.replace('', '|');

            return {
                id: index + 1,
               text,
                sender: sender === "GPF" ? "trainer" : "trainee"
            };
        })?.filter(m => m.text != undefined);

    const [messages, setMessages] = useState(message);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef: any = useRef(null);

    // Add new type message to messages lists
    const handleSend = () => {
        if (!newMessage.trim()) return;
        setMessages((prev: any) => [
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
        <div className="flex flex-col h-[30rem] bg-gray-100 dark:bg-white/[0.03] dark:text-gray-100">
            {/* Header */}
            <div className="flex items-center sticky px-4 py-3 bg-white dark:bg-white/[0.03] border-b shadow">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
                    {name?.charAt(0)}
                </div>
                <div className="ml-3">
                    <h2 className="font-semibold text-lg">{name} </h2>
                    <p className="text-sm text-gray-500">Online</p>
                </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 p-4 space-y-2 h-[40rem] overflow-y-scroll">
                {messages.map((msg: any) => (
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
                                    ? "bg-torq text-white rounded-br-none"
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
        </div>
    );
}

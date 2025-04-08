'use client';
import { chatUrl, wsDomain } from '@/api/url';
import { Message, Role } from '@/model/model';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';


export default function ChatComponent() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const ws = useRef<WebSocket | null>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        if (open) {
            scrollToBottom();
        }
    }, [messages, open]);
    useEffect(() => {
        const familyId = sessionStorage.getItem('familyId')
        const getMessage = async () => {
            fetch(chatUrl + "/" + familyId).then(res => res.json()).then(data => {
                setMessages(data)
            })
        }
        getMessage()
    }, [])

    useEffect(() => {
        const familyId = sessionStorage.getItem('familyId')
        ws.current = new WebSocket(wsDomain + '?familyId=' + familyId);

        ws.current.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            setMessages((prev) => [...prev, msg]);
        };

        return () => {
            ws.current?.close();
        };
    }, []);

    const sendMessage = () => {
        if (!input.trim()) return;

        const familyId = sessionStorage.getItem('familyId')
        const userid = sessionStorage.getItem('userid')
        const role = sessionStorage.getItem('role') as Role

        const msg: Message = {
            familyId: familyId,
            senderId: userid,
            role,
            message: input,
            timestamp: new Date().toISOString(),
        };

        ws.current?.send(JSON.stringify(msg));
        setMessages((prev) => [...prev, msg]); // echo locally
        setInput('');
    };

    return (
        <>
            {/* Floating Chat Button */}
            <button
                className="fixed bottom-6 right-6 bg-pink-500 text-white p-4 rounded-full shadow-lg hover:bg-pink-600"
                onClick={() => setOpen(!open)}
            >
                💬
            </button>

            {/* Chat Box */}
            {open && (
                <div className="fixed bottom-20 right-6 w-80 h-96 bg-white border rounded-xl shadow-xl flex flex-col">
                    <div className="p-3 border-b font-semibold text-lg">Family Chat</div>

                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                        {messages.map((msg, i) => (
                            <div key={i} className="text-sm">
                                <div className="font-medium">{msg.role} <span className="text-gray-400 text-xs">at {moment(msg.timestamp).format("YYYY-MM-DD HH:mm:ss")}</span></div>
                                <div className="ml-2">{msg.message}</div>
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>

                    <div className="border-t p-2 flex items-center gap-2">
                        <input
                            className="flex-1 border rounded px-3 py-1 text-sm"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Type your message..."
                        />
                        <button onClick={sendMessage} className="text-blue-600 font-semibold">Send</button>
                    </div>
                </div>
            )}
        </>
    );
}

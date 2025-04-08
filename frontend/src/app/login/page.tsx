'use client';
import { familyUrl } from '@/api/url';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
    const router = useRouter();
    const [role, setRole] = useState('Child');
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');

    const handleLogin = async () => {
        setError('');
        try {
            const res = await fetch(familyUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: username, role }),
            });
            if (!res.ok) {
                const { error } = await res.json();
                throw new Error(error || 'Login failed');
            }
            const data = await res.json();
            sessionStorage.setItem('name', username);
            sessionStorage.setItem('role', role);
            sessionStorage.setItem('familyId', data.familyId);
            sessionStorage.setItem('childId', data.childId);
            sessionStorage.setItem('userid', data.userid);

            router.push("/dashboard")
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred.');
            }
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url('/assets/login_bg.jpg')" }}
        >
            <div className="bg-white/50 backdrop-blur-md shadow-lg p-8 rounded-2xl w-130 h-160 justify-center items-center py-20 px-20 flex-col ">
                <h1 className="text-3xl font-bold mb-10 text-center">Sign in to <span className='text-emerald-700'>MVP Invest</span></h1>
                <div className="text-gray-500 mb-20  text-center">Welcome to MVP Invest, please enter your login details below to using the app.</div>
                <div>
                    <Select
                        className="border rounded mb-10 w-full"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <MenuItem value={"Parent"}>Parent</MenuItem>
                        <MenuItem value={"Co-Parent"}>Co-Parent</MenuItem>
                        <MenuItem value={"Child"}>Child</MenuItem>
                    </Select>
                </div>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        placeholder="Enter your name"
                        className="border rounded px-2 w-full"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='mt-10'>
                    <Button
                        variant='contained'
                        onClick={handleLogin}
                        size="large"
                        fullWidth={true}
                    >
                        Login
                    </Button>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
        </div>
    );
}

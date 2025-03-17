"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
};

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (!isValidEmail(email)) {
                setError("Email is invalid");
                return;
            }

            if (!password || password.length < 8) {
                setError("Password is invalid");
                return;
            }
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            if (res.status === 200) {
                setError("");
                router.push('/login');
            }
            else if (res.status === 400) {
                setError("This email is already registered");
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            }
            else {
                const data = await res.json();
                setError(data.message);
            }
        } catch (error) {
            console.error('An unexpected error happened:', error);
            setError('An unexpected error happened');
        }
        setLoading(false);
    };

    return (
        <div className="flex h-dvh w-dvw justify-center items-center z-50 bg-white fixed top-0 left-0">
            <div className="m-auto bg-green-50 px-8 py-[100px] rounded-3xl shadow-2xl w-full sm:w-96">
                <img src="/images/logo.png" alt="Logo" className="h-20 mb-10 mx-auto" />
                <h1 className="text-3xl font-bold font-mono text-center pb-10">Register</h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    {/* <select
                        name="type"
                        id="type"
                        className="p-2 bg-white focus:bg-white text-sm border border-gray-300 rounded-lg"
                        required
                    >
                        <option value="farmer">Farmer</option>
                        <option value="general">General</option>
                    </select> */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 bg-white focus:bg-white text-sm border border-gray-300 rounded-lg"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 bg-white focus:bg-white text-sm border border-gray-300 rounded-lg"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 bg-white focus:bg-white text-sm border border-gray-300 rounded-lg"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-800 text-white p-2 rounded-lg flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? (<div className="w-5 h-5 border-t-2 border-b-2 border-gray-100 rounded-full animate-spin"></div>) : 'Register'}
                    </button>
                    {error && <p className="text-red-500 text-sm pt-2">* {error}</p>}
                </form>
                <p className="text-center text-xl py-3 text-gray-300">- OR -</p>
                <p className="text-center text-sm">Already have an account? <Link href="/login" className="text-green-600">Login</Link></p>
            </div>
        </div>
    );
}
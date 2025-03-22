'use client'
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
};

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (!isValidEmail(email)) {
                setError("Email is invalid");
                setLoading(false);
                return;
            }
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (res.status === 200) {
                setError('Success! Redirecting...');
                let next = window.location.search.split('next=')[1];
                setTimeout(() => {
                    window.location.assign(next ? decodeURIComponent(next) : '/');
                }, 2000);
            }
            else if (res.status === 400) {
                setError('Invalid email or password');
            }
            else {
                setError('An unexpected error happened');
            }
        } catch (error) {
            console.error('An unexpected error happened:', error);
            setError('An unexpected error happened');
        }
        setLoading(false);
    };

    return (
        <div className="flex bg-white h-dvh justify-center w-dvw dark:bg-gray-700 fixed items-center p-3 left-0 top-0 z-50">
            <div className="flex flex-col bg-green-50 justify-center m-auto rounded-3xl shadow-2xl w-full dark:bg-gray-950 items-center px-8 py-[100px] h-auto max-w-96">
                <img src="/images/logo.png" alt="Logo" className="h-32 dark:bg-green-100 mb-10 mx-auto p-6 rounded-2xl" />
                <h1 className="text-3xl text-center font-bold font-mono pb-10">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white border border-gray-300 p-2 rounded-lg text-sm focus:bg-white"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white border border-gray-300 p-2 rounded-lg text-sm focus:bg-white"
                        required
                    />
                    {/* <Link href="/forgotpassword" className="text-[12px] text-green-600">Forgot password?</Link> */}
                    <button
                        type="submit"
                        className="flex bg-green-600 justify-center p-2 rounded-lg text-center text-white hover:bg-green-800 items-center"
                        disabled={loading}
                    >
                        {loading ? (<div className="border-b-2 border-gray-100 border-t-2 h-5 rounded-full w-5 animate-spin"></div>) : 'Login'}
                    </button>
                    {error && <p className={!error.includes("Success") ? "text-red-500 pt-2 text-sm" : "text-green-500 mt-2 text-sm"}>* {error}</p>}
                </form>
                {/* <p className="text-center text-gray-300 text-lg py-3">- OR -</p>
                <p className="text-center text-sm">Don&apos;t have an account? <Link href="/register" className="text-green-600">Register</Link></p> */}
            </div>
        </div>
    );
}
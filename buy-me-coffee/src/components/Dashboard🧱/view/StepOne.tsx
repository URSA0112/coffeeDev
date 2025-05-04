"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
const StepOne = ({ next }: { next: () => void }) => {
    const [showQRCode, setShowQRCode] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState("$2");
    const handleSupport = () => {
        setShowQRCode(true);
    };
    const handleBack = () => {
        setShowQRCode(false);
    };
    return (
        <div className="w-full min-h-screen bg-white">
            {/* Cover Image Area */}
            <div className="w-full h-[339px] flex justify-end items-start p-6 bg-emerald-400">
                <Button variant="secondary" className="flex items-center gap-2">
                    <span>Change cover</span>
                </Button>
            </div>
            <div className="max-w-7xl mx-auto px-4 -mt-16">
                <div className="flex flex-col md:flex-row w-full gap-8 items-start justify-between">
                    {/* Left Column */}
                    <div className="flex w-full md:w-[45%] flex-col gap-6">
                        {/* Profile Card */}
                        <div className="flex p-6 gap-6 flex-col items-start rounded-2xl border bg-white">
                            <div className="w-full flex justify-between items-center">
                                <div className="flex gap-3 items-center">
                                    <div className="w-[50px] h-[50px] bg-gray-200 rounded-full flex items-center justify-center">
                                        <span className="text-gray-500">J</span>
                                    </div>
                                    <p className="text-xl font-medium"></p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Edit page
                                </Button>
                            </div>
                            <div className="flex flex-col w-full gap-2">
                                <h3 className="font-medium">About</h3>
                                <div className="p-4 rounded-lg bg-[#F4F4F5]">
                                    <p> </p>
                                </div>
                            </div>
                        </div>
                        {/* Social Media URL Card */}
                        <div className="flex p-6 flex-col items-start gap-3 rounded-2xl border bg-white">
                            <h3 className="font-medium">Social media URL</h3>
                            <p className="text-blue-600"> </p>
                        </div>
                        {/* Recent Supporters Card */}
                        <div className="flex p-6 flex-col items-start gap-4 rounded-2xl border bg-white">
                            <h3 className="font-medium">Recent Supporters</h3>
                            <div className="flex w-full p-8 flex-col justify-center items-center gap-4 rounded-xl border">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
                                    <Heart className="h-6 w-6 text-gray-400" />
                                </div>
                                <p className="text-gray-600">Be the first one to support</p>
                            </div>
                        </div>
                    </div>
                    {/* Right Column - Donation Form */}
                    <div className="w-full md:w-[45%]">
                        <div className="bg-white p-6 rounded-2xl border">
                            {showQRCode ? (
                                <div className="relative bg-white p-6 rounded-lg">
                                    <div className="flex flex-col items-center justify-center">
                                        <Button
                                            onClick={handleBack}
                                            className="absolute top-2 left-2 p-1 rounded-full hover:bg-gray-100"
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="m15 18-6-6 6-6" />
                                        </svg>
                                        <h2 className="text-xl font-semibold mb-2">Scan QR code</h2>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Scan the QR code to complete your donation
                                        </p>
                                        <div className="w-40 h-40 relative mb-4">
                                            <Image
                                                src="/frame.png"
                                                alt="QR Code"
                                                width={160}
                                                height={160}
                                                className="border border-gray-200 rounded-md"
                                            />
                                        </div>
                                        <Button
                                            onClick={next}
                                            className="w-full bg-black text-white hover:bg-gray-800"
                                        >
                                            Complete Payment
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold"></h2>
                                    <div>
                                        <p className="mb-2 text-sm font-medium">Select amount:</p>
                                        <div className="grid grid-cols-4 gap-2">
                                            <Button
                                                variant="outline"
                                                className={`rounded-full ${selectedAmount === "$1" ? "bg-gray-100" : ""
                                                    }`}
                                                onClick={() => setSelectedAmount("$1")}
                                            >
                                                $1
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className={`rounded-full ${selectedAmount === "$2" ? "bg-gray-100" : ""
                                                    }`}
                                                onClick={() => setSelectedAmount("$2")}
                                            >
                                                $2
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className={`rounded-full ${selectedAmount === "$5" ? "bg-gray-100" : ""
                                                    }`}
                                                onClick={() => setSelectedAmount("$5")}
                                            >
                                                $5
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className={`rounded-full ${selectedAmount === "$10" ? "bg-gray-100" : ""

                                                    }`}
                                                onClick={() => setSelectedAmount("$10")}
                                            >
                                                $10
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">

                                            Enter BuyMeCoffee or social account URL:
                                        </label>
                                        <Input placeholder="buymeacoffee.com/johndoe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Special message:
                                        </label>
                                        <Textarea
                                            placeholder="Thank you for being so awesome everyday!"
                                            className="min-h-[100px]"
                                        />
                                    </div>
                                    <Button
                                        onClick={handleSupport}
                                        className="w-full bg-black text-white hover:bg-gray-800"
                                    >
                                        Support
                                    </Button>
                                </div>

                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default StepOne;


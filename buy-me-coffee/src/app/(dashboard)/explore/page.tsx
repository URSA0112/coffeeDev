'use client'
import { BASE_URL } from "@/app/constants/routes";
import ExplorePage from "@/components/Dashboard🧱/explore/explore";
import axios from "axios";


export default function Explore() {

    const check = async () => {
        console.log(BASE_URL);
        try {
            const res = await axios.post(`${BASE_URL}/api/user`, {
                username: "hello",
                email: "world@yahoo.com",
                userId: "22",
            });
            console.log("✅ Status:", res.status);
            console.log("📦 Data:", res.data);
        } catch (err: any) {
            console.log("❌ Error:", err || err.message);
        }
    };

    return (
        <div className="bg-pink-200 w-full h-full">
            Explore
            <ExplorePage></ExplorePage>
            <button onClick={check} className="w-20 h-20 bg-amber-600"> Check API</button>

        </div>

    );
}

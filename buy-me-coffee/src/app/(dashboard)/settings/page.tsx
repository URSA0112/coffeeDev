
import PersonalInfoSettings from "@/components/Dashboard🧱/settings/profile";
import { Card, CardContent } from "@/components/ui/card";


export default function Settings() {
    return (
        <div className="w-full h-full flex items-center justify-center min-h-screen text-center bg-gray-300">
            <div className="w-[550px] block h-auto">

                <PersonalInfoSettings></PersonalInfoSettings>
            </div>
        </div >
    )
}

import HomeDonationCard from "@/components/Dashboard🧱/1-home/homeDonation";
import HomeCreatorCard from "@/components/Dashboard🧱/1-home/homeUser";


export default function Homepage() {
    return (
        <div className="bg-blue-200 w-full h-full p-10">
            <HomeCreatorCard></HomeCreatorCard>
            <HomeDonationCard></HomeDonationCard>
        </div>
    )
}

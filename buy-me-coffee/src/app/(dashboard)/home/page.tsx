import HomeDonationCard from "@/components/Dashboard🧱/home/homeDonation";
import HomeCreatorCard from "@/components/Dashboard🧱/home/homeUser";


export default function Homepage() {
    return (
        <div className="bg-blue-200 w-full h-full">

            Home
            <HomeCreatorCard></HomeCreatorCard>
            <HomeDonationCard></HomeDonationCard>
        </div>
    )
}

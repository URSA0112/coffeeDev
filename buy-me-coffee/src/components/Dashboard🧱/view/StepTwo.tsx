import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
const StepTwo = ({ back }: { back: () => void }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="max-w-xl w-full border border-dashed border-blue-200 rounded-lg p-8 flex flex-col items-center">
                <div className="bg-green-500 rounded-full p-4 mb-4">
                    <Check className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold mb-8">Donation Complete !</h1>
                <div className="w-full border border-dashed border-blue-200 rounded-lg p-4 mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden">
                            <Image
                                src="/placeholder.svg?height=40&width=40"
                                alt="Jake's profile"
                                width={40}
                                height={40}
                                className="object-cover"
                            />
                        </div>
                        <span className="font-medium">Jake:</span>
                    </div>
                    <div className="bg-blue-100 p-4 rounded">
                        <p className="text-blue-900">
                            Thank you for supporting me! It means a lot to have your support.
                            a step toward creating a more inclusive and accepting community of
                            artists.
                        </p>
                    </div>
                </div>
                <Button
                    onClick={back}
                    variant="default"
                    className="bg-black hover:bg-black/80 text-white px-6"
                >
                    Return to explore
                </Button>
            </div>
        </div>
    );
};
export default StepTwo;

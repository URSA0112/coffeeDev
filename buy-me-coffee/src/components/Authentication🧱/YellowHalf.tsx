export default function YellowHalf() {
    return (

        <div className="flex w-full h-full bg-amber-400 dark:bg-amber-600 items-center justify-center px-8">
            <div className="flex flex-col items-center text-center space-y-8">

                {/* Coffee logo */}
                <div
                    id="CoffeeLogo"
                    className="w-40 h-40 rounded-full bg-amber-500 dark:bg-amber-700 flex items-center justify-center"
                >   <img src="/coffee.png" alt="" className="w-full" />
                </div>


                {/* Titles */}
                <div className="max-w-2xl">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                        Fund your creative work
                    </h1>

                    <h4 className="text-md md:text-1xl font-normal text-gray-700 dark:text-gray-300">
                        Accept support. Start a membership. Setup a shop. It’s easier than you think.
                    </h4>
                </div>
            </div>
        </div>
    )
}
import { Link } from "@inertiajs/react";

const MainContent = () => {
    return (
        <div className="flex justify-center items-center px-4 py-10">
            <div className="bg-[#23B5D3] text-white p-10 rounded-2xl shadow-sm flex flex-col md:flex-row items-center max-w-5xl w-full">
                {/* Left Content (Text) */}
                <div className="w-full md:w-1/2 px-6 md:px-10 mb-8 md:mb-0">
                    <h1 className="text-xl font-bold flex items-center mb-4">
                        {/* <img src="/logo.png" alt="Go Peak Fit" className="h-6 mr-2" /> */}
                    </h1>
                    <h2 className="text-4xl md:text-3xl font-alfarn font-extrabold mb-4 leading-tight">
                        TRANSFORM YOUR<br />
                        <span className="text-white">HEALTH—FOREVER</span><br />
                        <span>
                            <p className="text-gray-800 text-3xl font-extrabold">Start with the $1
                                Challenge</p>
                        </span>
                    </h2>
                    <p className="text-md md:text-md mb-4 text-gray-900 font-medium">
                        You say you want results. You say you want change. But are you
                        actually willing to do what it takes? This isn’t a detox. This isn’t a
                        gimmick. This is your wake-up call.
                    </p>
                    <Link
                        href="/register"
                        className="px-6 py-3 bg-white text-black rounded-full text-md md:text-lg font-medium hover:bg-gray-100 transition text-[10px] font-arial inline-block text-center"
                    >
                        Start Your $1 Challenge Now
                    </Link>
                </div>

                {/* Right Image */}
                <div className="w-full md:w-1/2 flex justify-center relative">
                    <img src="/images/main-img.png" alt="Fitness Images" className="rounded-xl h-[400px] w-[350px]" />

                    {/* Workout Notification Image */}
                    <img
                        src="/images/main-subimg1.png"
                        alt="Workout Notification Images"
                        className="rounded-xl h-12 absolute top-20 md:left-50 transform translate-x-[-100px] translate-y-[-10px]"
                    />

                    {/* Rating Image*/}
                    <img
                        src="/images/main-subimg2.png"
                        alt="Rating Images"
                        className="rounded-xl h-12 absolute bottom-20 md:right-40 transform translate-x-[40px] translate-y-[-10px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default MainContent;

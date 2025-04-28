import { Link } from '@inertiajs/react';
import { useState } from 'react';


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="hidden md:flex bg-[#F7F9FC] py-5 px-40 items-center justify-between shadow-sm">
                <div className="flex">
                    <Link href="/">
                       <img src="/logos/header-logo.png" alt="Go Peak Fit" className="h-6" />              
                    </Link>
                </div>

                <nav className="flex space-x-10 text-gray-700 text-sm font-medium">
                    <a href="#what-we-offer"    className="hover:text-black">What We Offer</a>
                    <a href="#how-it-works"     className="hover:text-black">How It Works</a>
                    <a href="#pricing"          className="hover:text-black">Pricing</a>
                    <a href="#philosophy"       className="hover:text-black">Programs</a>
                </nav>

                <div className="flex space-x-2">
                    <a className="px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-900 text-xs">
                        Start Trial
                    </a>
                    <Link href='/register' className="px-4 py-2 border border-gray-700 text-gray-700 rounded-full text-sm hover:bg-[#20b5c9] hover:text-white text-xs">
                        Login/Signup
                    </Link>
                </div>
            </header>

            {/* Mobile Header */}
            <header className="md:hidden bg-[#F7F9FC] py-4 px-4 flex items-center justify-between shadow-sm">
                <img src="/logos/header-logo.png" alt="Go Peak Fit" className="h-6" />
                
                <button 
                    className="p-2 text-gray-700"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </header>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-[#F7F9FC] shadow-md px-4 pb-4">
                    <nav className="flex flex-col space-y-3 text-gray-700 text-sm font-medium py-3">
                        <a href="#what-we-offer" className="py-2 hover:text-black">What We Offer</a>
                        <a href="#how-it-works"  className="py-2 hover:text-black">How It Works</a>
                        <a href="#pricing"       className="py-2 hover:text-black">Pricing</a>
                        <a href="#philosophy"    className="py-2 hover:text-black">Programs</a>
                    </nav>

                    <div className="flex flex-col space-y-2">
                        <button className="w-full px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-900 text-xs">
                            Start Trial
                        </button>
                        <a
                            href="/register"
                            className="w-full px-4 py-2 border border-gray-700 text-gray-700 rounded-full text-sm hover:bg-[#20b5c9] hover:text-white text-xs text-center block"
                            >
                            Login/Signup
                        </a>

                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
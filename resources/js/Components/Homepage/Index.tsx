import Header from "../Header";
import Footer from "../Footer";
import MainContent from "./MainContent";
import WhatWeOffer from "./WhatWeOffer";
import HowItWorks from "./HowItWorks";
import Philosophy from "./Philosophy";
import Challenge from "./Challenge";
import HardTruth from "./HardTruth";
import Join from "./Join";
import KeyDiff from "./KeyDiff";



function Homepage() {
    return (
    <>
        <div className="flex flex-col min-h-screen min-w-screen">
            <Header />
                <main className="flex-grow justify-center place-items-center">
                    <MainContent />
                    <WhatWeOffer />
                    <HowItWorks />
                    <KeyDiff />
                    <Philosophy />
                    <Challenge />
                    <HardTruth />
                    <Join />
                </main>
            <Footer />
        </div>
    </>
    );
}

export default Homepage;

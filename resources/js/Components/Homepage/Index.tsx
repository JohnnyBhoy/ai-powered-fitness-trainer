import Header from "../Header";
import Footer from "../Footer";
import MainContent from "./MainContent";
import WhatWeOffer from "./WhatWeOffer";
import HowItWorks from "./HowItWorks";
import Philosophy from "./Philosophy";
import Challenge from "./Challenge";
import HardTruth from "./HardTruth";
import Join from "./Join";


function Homepage() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            minWidth:"100vw"
        }}>
            <Header />
                <main style={{ flexGrow: 7}}>
                    <MainContent/>
                    <WhatWeOffer/>
                    <HowItWorks/>
                    <Philosophy/>
                    <Challenge/>
                    <HardTruth/>
                    <Join/>
                </main>
            <Footer />
        </div>
    );
}

export default Homepage;

import Header from "../Header";

import Footer from "./Footer";

function Homepage() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            minWidth:"100vw"
        }}>
            <Header />
                <main style={{ flexGrow: 1, padding: "1rem" }}>
                   
                </main>
            <Footer />
        </div>
    );
}

export default Homepage;

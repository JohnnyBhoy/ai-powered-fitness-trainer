import Header from "../Header";
import Footer from "../Footer";
import CreateAccount from "./CreateAccount";
import LocationAndBiometrics from "./LocationAndBiometrics";
import PaymentInfo from "./PaymentInfo";
import TheGoal from "./TheGoal";


function Registration() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
        }}>
            <Header />
                <main>
                    <CreateAccount/>
                    <LocationAndBiometrics/>
                    <PaymentInfo/>
                    <TheGoal/>
                </main>
            <Footer />
        </div>
    );
}

export default Registration;

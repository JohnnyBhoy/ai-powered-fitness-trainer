import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../Header";
import Footer from "../Footer";
import CreateAccount from "./CreateAccount";
import LocationAndBiometrics from "./LocationAndBiometrics";
import TheGoal from "./TheGoal";
import PaymentInfo from "./PaymentInfo";
import { Toaster } from 'sonner'
import PhoneVerification from "./PhoneVerification";

function Registration() {
    const [step, setStep] = useState(1);

    const steps = [
        { id: 1, component: <CreateAccount onComplete={() => setStep(2)} /> },
        { id: 2, component: <LocationAndBiometrics onComplete={() => setStep(3)} /> },
        { id: 3, component: <PhoneVerification onComplete={() => setStep(4)} /> },
        { id: 4, component: <TheGoal onComplete={() =>  setStep(5)}/> },
        { id: 5, component: <PaymentInfo onComplete={() =>  console.log("test")}/> },
    ];

    return (
        <>
        <Toaster richColors position="top-center" />
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 0 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                        >
                            {steps.find(s => s.id === step)?.component}
                        </motion.div>
                    </AnimatePresence>
                </main>
                <Footer />
            </div>
        </>
       
    );
}

export default Registration;

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Toaster } from 'sonner';
import Footer from "../Footer";
import RegHeader from "../RegistrationHeader";
import ConsentForm from "./ConsentForm";
import CreateAccount from "./CreateAccount";
import LocationAndBiometrics from "./LocationAndBiometrics";
import PhoneVerification from "./PhoneVerification";
import TheGoal from "./TheGoal";

function Registration() {
    // Set the current registration page to 1 on initialize, then save it for the session on creating account
    const currentRegistrationStep = localStorage.getItem('currentStep') as string ?? '1';
    const [step, setStep] = useState(parseInt(currentRegistrationStep));

    const steps = [
        { id: 1, component: <CreateAccount onComplete={() => setStep(2)} /> },
        { id: 2, component: <ConsentForm onComplete={() => setStep(3)} /> },
        { id: 3, component: <LocationAndBiometrics onComplete={() => setStep(4)} /> },
        { id: 4, component: <PhoneVerification onComplete={() => setStep(5)} /> },
        { id: 5, component: <TheGoal onComplete={() => setStep(6)} /> },
    ];

    return (
        <>
            <Toaster richColors position="top-center" />
            <div className="flex flex-col min-h-screen">
                <RegHeader />
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

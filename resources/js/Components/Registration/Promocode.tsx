import { useUserStore } from "@/stores/useUserStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast, Toaster } from 'sonner';
import Footer from "../Footer";
import RegHeader from "../RegistrationHeader";
import { router } from "@inertiajs/react";
import Loading from "../Loading";

function Promocode() {
    //Local state
    const [code, setCode] = useState('');
    const promoCodes = ['G7X92LQA', 'B4K81WZD', 'J2RM5YTN', 'V1NX3QCL', 'K6YB9ZPW', 'T8EQ0HJD', 'F3LA6KUM', 'W5PC2NXR', 'Z0DJ9TBQ', 'N7CH8MLA', 'Y4WV1KJS', 'P3ZX7RGO', 'M2DQ4YUL', 'X6KN3ZVB', 'U9BA0QTY', 'C1EJ6HWR', 'R8LV2KMP', 'S0NZ5JXQ', 'D7HW3FLC', 'H9TP1EVM'];

    //Global states from user store
    const { userId } = useUserStore();

    //Env
    const APPLY_PROMOCODE_URL = import.meta.env.VITE_PROMOCODE_APPLY as string;

    const mutation = useMutation({
        mutationFn: async () => {
            const response = await axios.post(APPLY_PROMOCODE_URL, { user_id: userId, is_promo: 1 });
            return response.data;
        },
        onSuccess: (data) => {
            toast.success('Promo code applied successfully!');

            router.visit('/dashboard');
        },
        onError: (error: any) => {
            toast.error('Failed to apply promo code.');
        }
    });

    //Verifying promo code
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!code.trim()) return;

        try {
            if (validatePromoCode(code)) {
                mutation.mutate();
            } else {
                toast.error('The Promo Code you enter is invalid!');

                setTimeout(() => {
                    setCode('');
                }, 2000);
            };
        } catch (error) {
            toast.error('Something went wrong, please try again.');
        }
    };

    //Promocode validation
    const validatePromoCode = (code: string) => {
        return promoCodes.includes(code);
    }

    return (
        <>
            <Toaster richColors position="top-center" />
            <div className="flex flex-col min-h-screen">
                <RegHeader />
                <main className="flex-grow">

                    <div className="grid place-items-center my-16">
                        <h1 className="text-xl font-semibold mt-2 text-[#23B5D3]">30-DAY CHALLENGE</h1>
                        <h2 className="text-2xl md:text-4xl font-bold mt-2 text-gray-800 max-w-4xl font-alfarn">
                            You’re About to Embark on a Challenge That Will Push You to the Next Level
                        </h2>
                        <p className="max-w-3xl text-xs md:text-sm py-2 text-gray-600">
                            For the next 30 days, you’re committing to discipline, intensity, and real results. This is not just another diet—this is a
                            mental and physical reset designed to strip away excuses, torch excess weight, and prove what you’re capable of.
                        </p>
                    </div>

                    <div className="max-w-md mx-auto p-6 bg-white shadow-2xl rounded-2xl">
                        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Enter Promo Code</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your promo code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="w-full bg-[#23B5D3] text-white py-2 rounded-lg transition duration-200"
                                disabled={mutation.isPending}
                            >
                                {
                                    !mutation.isPending
                                        ? 'Apply Code'
                                        : <Loading text="Applying your promo code, please wait" />
                                }
                            </button>
                        </form>
                    </div>
                </main>
                <Footer />
            </div>
        </>

    );
}

export default Promocode;

import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import UpgradeModal from "./UpgradeModal";
import { ArrowUpRightIcon } from "lucide-react";

const FreeTrialBadge = () => {
    const user = usePage().props.auth.user;
    const [daysLeft, setDaysLeft] = useState<number | null>(null);
    const [trialEndDate, setTrialEndDate] = useState<Date | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const trialStart = new Date(user?.created_at);
        const trialDuration = user.is_promo == 1 ? 30 : 5;

        const end = new Date(trialStart);
        end.setDate(trialStart.getDate() + trialDuration);
        end.setHours(0, 0, 0, 0);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const diffMs = end.getTime() - today.getTime();
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        setDaysLeft(diffDays > 0 ? diffDays : 0);
        setTrialEndDate(end);
    }, []);

    if (daysLeft === null) return null;

    let bgColor = "bg-green-100 text-green-800";
    if (daysLeft <= 2) bgColor = "bg-red-100 text-red-800";
    else if (daysLeft <= 5) bgColor = "bg-yellow-100 text-yellow-800";

    // Handle checkout
    const proceedToCheckout = () => {
        window.location.href = `/checkout?id=${user?.id}&amount=49`;
    }


    // Show this modal after 3seconds for trial end date calculate to upgrade trainee to premium
    setTimeout(() => {
        daysLeft <= 0 && setIsModalOpen(true);
    }, 3000);

    console.log(daysLeft);

    return (
        <>
            {/* Trial Badge */}
            <div
                className={`flex flex-col sm:flex-row sm:items-center gap-2 text-sm px-4 py-2 rounded-full font-medium shadow-sm ${bgColor}`}
            >
                <div className="flex items-center gap-2">
                    {daysLeft <= 0 ? (
                        <span className="text-xs opacity-80">Your trial has expired</span>
                    ) : (
                        <>
                            <span className="font-semibold">⏳ Free Trial:</span>
                            <span>{daysLeft} day{daysLeft !== 1 ? "s" : ""} left</span>
                        </>
                    )}
                </div>

                {daysLeft <= 0 && (
                    <div className="flex items-center gap-3 sm:ml-4">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className={`flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full transition animate-bounce ${daysLeft <= 2
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-white bg-opacity-50 text-black hover:bg-opacity-75"
                                }`}
                        >
                            <ArrowUpRightIcon className="w-4 h-4" />
                            Upgrade Now
                        </button>
                    </div>
                )}
            </div>

            {/* Upgrade Modal */}
            {isModalOpen && (
                <UpgradeModal
                    onClose={() => setIsModalOpen(false)}
                    onUpgrade={proceedToCheckout}
                />
            )}
        </>
    );
};

export default FreeTrialBadge;

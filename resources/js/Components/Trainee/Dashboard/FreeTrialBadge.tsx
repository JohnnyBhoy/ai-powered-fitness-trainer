import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import UpgradeModal from "./UpgradeModal";
import { ArrowUpRightIcon, Clock } from "lucide-react";

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

        setDaysLeft(diffDays >= 0 ? diffDays : 0);
        setTrialEndDate(end);

        // Trigger modal after 3s if expired
        const timer = setTimeout(() => {
            if (diffDays <= 0) setIsModalOpen(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, [user]);

    if (daysLeft === null) return null;

    let bgColor = "bg-green-100 text-green-800";
    if (daysLeft <= 2) bgColor = "bg-red-100 text-red-800 animate-pulse";
    else if (daysLeft <= 5) bgColor = "bg-yellow-100 text-yellow-800";

    // Handle checkout
    const proceedToCheckout = () => {
        window.location.href = `/checkout?id=${user?.id}&amount=49`;
    };

    const totalTrialDays = user.is_promo == 1 ? 30 : 5;
    const progress =
        daysLeft > 0 ? ((totalTrialDays - daysLeft) / totalTrialDays) * 100 : 100;

    return (
        <>
            {/* Trial Badge */}
            <div
                className={`flex flex-col sm:flex-row sm:items-center gap-3 text-sm px-5 py-2 rounded-xl font-medium shadow-md ${bgColor}`}
            >
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 opacity-70" />
                    {daysLeft <= 0 ? (
                        <span className="text-xs opacity-80">Your trial has expired</span>
                    ) : (
                        <>
                            <span className="font-semibold">Free Trial:</span>
                            <span>
                                {daysLeft} day{daysLeft !== 1 ? "s" : ""} left
                            </span>
                        </>
                    )}
                </div>

                {/* Progress bar */}
                {daysLeft > 0 && (
                    <div className="w-full sm:w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}

                {/* Upgrade Button */}
                {daysLeft <= 0 && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-md hover:shadow-lg transition transform hover:scale-105"
                    >
                        <ArrowUpRightIcon className="w-4 h-4" />
                        Upgrade Now
                    </button>
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

import { useEffect } from "react";

type Props = {
  onClose: () => void;
  onUpgrade: () => void;
};

const UpgradeModal = ({ onClose, onUpgrade }: Props) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Get SMS Coaching from a Workout and Diet Expert
        </h2>

        {/* Price */}
        <div className="text-center mb-4">
          <span className="text-4xl font-extrabold text-gray-900">$49</span>
          <p className="text-sm text-gray-500">per month – no contracts</p>
        </div>

        {/* Benefits */}
        <ul className="text-gray-700 space-y-3 mb-6 text-sm">
          <li>📲 Daily SMS tips and motivation from a real trainer</li>
          <li>🧑‍🏫 Personalized guidance based on your fitness goals</li>
          <li>📆 Weekly check-ins for workouts & nutrition</li>
          <li>💬 Ask questions anytime – real human support</li>
          <li>✅ Stay consistent and accountable</li>
        </ul>

        {/* CTA Button */}
        <button
          onClick={onUpgrade}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-150"
        >
          Subscribe Now – $49/month
        </button>

        {/* Note */}
        <p className="mt-3 text-xs text-center text-gray-400">
          Payments are 100% secure via Stripe.
        </p>
      </div>
    </div>
  );
};

export default UpgradeModal;

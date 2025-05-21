import { useState } from "react";
import axios from "axios";

// Normalize phone number (adding country code +1 for US)
const normalizeUSPhone = (input: string): string => {
  let digits = input.replace(/\D/g, ""); // Remove all non-digit characters

  // If the phone number is exactly 10 digits (local U.S. number)
  if (digits.length === 10) {
    return `+1${digits}`; // Prepend +1 for US numbers
  }

  // If the number is already 11 digits and starts with '1' (international format)
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`; // Keep it in international format (+1XXXXXXXXXX)
  }

  return ""; // Invalid format if it's not 10 or 11 digits
};

// Validate if it's a valid U.S. phone number
const isValidUSNumber = (formatted: string): boolean => {
  const match = /^\+1\d{10}$/; // Match U.S. number format (+1XXXXXXXXXX)
  return match.test(formatted);
};


export default function ConsentForm({ onComplete }: { onComplete: () => void }) {
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("");
  const [formatted, setFormatted] = useState("");
  const [error, setError] = useState("");

  const formatPhone = (raw: string): string => {
    let digits = raw.replace(/\D/g, "");

    // Mistakenly typed "4..." thinking it's full number, assume it's area code
    if (digits.length === 10 && digits.startsWith("4")) {
      digits = "1" + digits;
    }

    if (digits.length === 11 && digits.startsWith("1")) {
      return "+1" + digits.slice(1);
    }

    if (digits.length === 10) {
      return "+1" + digits;
    }

    return raw;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      await axios.post("/api/consent", { phone, consent });
      setStatus("✅ Consent recorded. Thank you!");
      onComplete();
    } catch (error: any) {
      setStatus("❌ Submission failed: " + (error.response?.data?.message ?? "Unknown error"));
    }
  };

  const handleBlur = () => {
     const normalized = normalizeUSPhone(phone); // Normalize the input number

    if (!normalized) {
      setError("Please enter a valid U.S. phone number (e.g., 4155551234).");
      setFormatted("");
      return;
    }

    if (!isValidUSNumber(normalized)) {
      setError("Invalid format. Must be a valid 10-digit U.S. number.");
      setFormatted("");
      return;
    }

    setFormatted(normalized);
    setError("");
  };

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers (and prevent entering non-numeric characters)
    const value = e.target.value.replace(/\D/g, "");
    setPhone(value); // Update input with only numbers
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">GoPeakFit SMS Consent</h2>

        <div className="max-w-md mx-auto p-4">
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            required
            placeholder="e.g. 4155551234"
            value={phone}
            onBlur={handleBlur}
            onChange={handleChange} // Only allows numbers
            className="w-full px-3 py-2 border rounded mb-4"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          {formatted && !error && (
            <p className="text-green-600 mt-2 text-sm">Formatted: {formatted}</p>
          )}
        </div>

        <label className="flex items-start space-x-2 mb-4 text-sm">
          <input
            type="checkbox"
            className="mt-1"
            required
            checked={consent}
            onChange={() => setConsent(!consent)}
          />
          <span>
            I agree to receive text messages from <strong>GoPeakFit </strong> with updates, promotions, and notifications. Message and data rates may apply. Reply STOP to unsubscribe at any time.
          </span>
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Consent
        </button>

        {status && <p className="mt-4 text-sm text-center">{status}</p>}
      </form>
    </div>
  );
}

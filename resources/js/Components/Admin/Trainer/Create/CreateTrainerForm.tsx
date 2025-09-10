import { useForm } from "react-hook-form";
import axios from "axios";
import { router } from "@inertiajs/react";

type TrainerFormData = {
  full_name: string;
  gender: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  zip: string;
  specialization: string;
  experience_years: number;
  certifications: string;
  cpr_certified: boolean;
  cpr_expiry?: string;
  liability_insurance: boolean;
  insurance_provider?: string;
  consent_w9: boolean;
};

export default function CreateTrainer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TrainerFormData>();

  const onSubmit = async (data: TrainerFormData) => {
    try {
      await axios.post("/trainers", data);
      router.visit("/trainers");
    } catch (error) {
      console.error(error);
      alert("Error registering trainer");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Trainer Registration
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        {/* Full Name */}
        <input
          {...register("full_name", { required: true })}
          placeholder="Full Name"
          className="border p-2 rounded"
        />
        {errors.full_name && (
          <span className="text-red-500 text-sm col-span-2">Full name is required.</span>
        )}

        {/* Gender */}
        <select
          {...register("gender", { required: true })}
          className="border p-2 rounded"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        {/* Phone */}
        <input
          {...register("phone", { required: true })}
          placeholder="Phone"
          className="border p-2 rounded"
        />

        {/* Email */}
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="border p-2 rounded"
        />

        {/* Location */}
        <input
          {...register("city", { required: true })}
          placeholder="City"
          className="border p-2 rounded"
        />
        <input
          {...register("state", { required: true })}
          placeholder="State"
          className="border p-2 rounded"
        />
        <input
          {...register("zip", { required: true })}
          placeholder="ZIP Code"
          className="border p-2 rounded"
        />

        {/* Specialization */}
        <input
          {...register("specialization")}
          placeholder="Specialization (e.g., Yoga, CrossFit)"
          className="border p-2 rounded"
        />

        {/* Experience Years */}
        <input
          type="number"
          {...register("experience_years", { valueAsNumber: true })}
          placeholder="Years of Experience"
          className="border p-2 rounded"
        />

        {/* Certifications */}
        <input
          {...register("certifications")}
          placeholder="Certifications (e.g., NASM, ACE)"
          className="border p-2 rounded"
        />

        {/* CPR Certified */}
        <label className="flex items-center gap-2 col-span-2">
          <input type="checkbox" {...register("cpr_certified")} />
          CPR Certified
        </label>
        <input
          type="date"
          {...register("cpr_expiry")}
          className="border p-2 rounded col-span-2"
        />

        {/* Liability Insurance */}
        <label className="flex items-center gap-2 col-span-2">
          <input type="checkbox" {...register("liability_insurance")} />
          Has Liability Insurance
        </label>
        <input
          {...register("insurance_provider")}
          placeholder="Insurance Provider"
          className="border p-2 rounded col-span-2"
        />

        {/* Consent W9 */}
        <label className="flex items-center gap-2 col-span-2">
          <input type="checkbox" {...register("consent_w9")} />
          I consent to provide a signed W-9 form
        </label>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Registration
          </button>
        </div>
      </form>
    </div>
  );
}

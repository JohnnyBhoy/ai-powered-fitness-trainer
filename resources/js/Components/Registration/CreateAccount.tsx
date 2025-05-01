import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useUserStore } from '@/stores/useUserStore'
import { toast } from 'sonner'

interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  password_confirmation: string
}

function CreateAccount({ onComplete }: { onComplete: () => void }) {
  const {setUserId} = useUserStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
  })

  const mutation = useMutation({
    mutationFn: (data: RegisterFormData) => axios.post('/register', data),
    onSuccess: (res:any) => {
      const userId = res.data.id
      setUserId(userId);
      toast.success(`Account created successfully! Your user ID is ${userId}`)
      onComplete();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message ?? 'Registration failed.')
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(form)
  }




  return (
    <div className="flex flex-col items-center px-4 bg-white text-black text-center py-10">
      <h1 className="text-xl font-semibold mt-2 text-[#23B5D3]">5-DAY CHALLENGE</h1>
      <h2 className="text-2xl md:text-4xl font-bold mt-2 text-gray-800 max-w-4xl font-alfarn">
        You’re About to Embark on a Challenge That Will Push You to the Next Level
      </h2>
      <p className="max-w-3xl text-xs md:text-sm py-2 text-gray-600">
        For the next 5 days, you’re committing to discipline, intensity, and real results. This is not just another diet—this is a
        mental and physical reset designed to strip away excuses, torch excess weight, and prove what you’re capable of.
      </p>

      <div className="mt-10 flex flex-col lg:flex-row justify-center items-stretch gap-2 lg:gap-2 w-full max-w-6xl pb-10">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 bg-slate-50 px-10 py-10 rounded-xl shadow-md text-left order-1 lg:order-2 flex flex-col justify-center">
          <h3 className="text-lg font-bold mb-6 text-center">Create Your Account</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Inputs */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="first-name" className="block text-sm font-semibold mb-2">First Name</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded-md bg-white"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="last-name" className="block text-sm font-semibold mb-2">Last Name</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  type="text"
                  className="w-full p-2 border border-gray-400 rounded-md bg-white"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-400 rounded-md bg-white"
              />
            </div>

            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold mb-2">Username</label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full p-2 border border-gray-400 rounded-md bg-white"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-semibold mb-2">Password</label>
              <input
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                className="w-full p-2 border border-gray-400 rounded-md pr-10 bg-white"
              />
              <div
                className="absolute right-2 top-8 cursor-pointer text-xl text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEye} style={{ fontSize: "0.85rem" }} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} style={{ fontSize: "0.85rem" }} />
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label htmlFor="confirm-password" className="block text-sm font-semibold mb-2">Confirm Password</label>
              <input
                id="confirm-password"
                name="password_confirmation"
                value={form.password_confirmation}
                onChange={handleChange}
                type={showConfirmPassword ? "text" : "password"}
                className="w-full p-2 border border-gray-400 rounded-md pr-10 bg-white"
              />
              <div
                className="absolute right-2 top-8 cursor-pointer text-xl text-gray-700"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FontAwesomeIcon icon={faEye} style={{ fontSize: "0.85rem" }} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} style={{ fontSize: "0.85rem" }} />
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-[#23B5D3] text-white py-2 rounded-md font-semibold hover:bg-[#1b9bb6] transition"
            >
              {mutation.isPending ? 'Submitting...' : 'CONTINUE'}
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="relative w-full lg:w-1/2 flex justify-center items-center order-2 lg:order-1">
          <div className="w-full flex justify-center items-center relative">
            {/* Main Image */}
            <img
              src="/images/registration.png"
              alt="Fitness Image"
              className="rounded-xl w-3/4 object-contain"
            />

            {/* Notification Image */}
            <img
              src="/images/main-subimg1.png"
              alt="Workout Notification"
              className="rounded-xl absolute top-20 md:left-8  transform-translate-x-1/2 md:h-20 w-28 left-10"
            />

            {/* Rating Image */}
            <img
              src="/images/main-subimg2.png"
              alt="Rating"
              className="rounded-xl absolute bottom-[-40px] md:right-20  transform-translate-x-1/2 right-5 md:w-48 w-32"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;

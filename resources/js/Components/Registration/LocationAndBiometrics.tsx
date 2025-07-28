import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useUserStore } from '@/stores/useUserStore'
import { toast } from 'sonner'
import { ArrowClockwise } from 'react-bootstrap-icons'

type BiometricsFormData = {
    city: string
    state: string
    phone_number: string
    age: number
    sex: 'male' | 'female' | 'other'
    current_weight: number
    goal_weight: number
    fitness_level: string
    strictness_level: number
    equipment_access: string
    food_allergies: string
    user_id: null | number
}

function LocationAndBiometrics({ onComplete }: { onComplete: () => void }) {
    const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
    const { userId } = useUserStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BiometricsFormData>()

    const mutation = useMutation({
        mutationFn: (data: BiometricsFormData) => axios.post('/biometrics', data),
        onSuccess: (res) => {
            toast.success(`Location and biometrics updated.`)
            onComplete();
        },
        onError: (error: any) => {
            submitBtn.classList.remove('disabled');
            submitBtn.disabled = false;

            toast.error(error.response?.data?.message ?? 'Biomertrics failed.')
        },
    })

    const onSubmit = (data: BiometricsFormData) => {

        if (submitBtn) {
            submitBtn.classList.add('disabled');
            submitBtn.disabled = true;
        }

        data = { ...data, user_id: userId }
        mutation.mutate(data)
    }

    return (
        <div className="flex flex-col items-center px-4 bg-white text-black text-center py-10">
            <h1 className="text-xl font-semibold mt-2 text-[#23B5D3]">THE HARD TRUTH</h1>
            <h2 className="text-2xl md:text-4xl font-bold mt-2 text-gray-800 max-w-4xl font-alfarn">
                Most People Won’t Even Try
            </h2>
            <p className="max-w-3xl text-sm md:text-sm py-2 text-gray-600">
                They’ll make excuses. They’ll keep doing what they’ve always done—and stay exactly where they are. That’s not you.
                You’re here because you’re ready to step up. To prove that you can stick to something. To show yourself that you have

                more in you than you’ve been giving.
            </p>

            <div className="mt-10 flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-2 w-full max-w-6xl pb-10">
                {/* Right Side - Form Section (appears first on mobile) */}
                <div className="w-full lg:w-1/2 bg-slate-50 px-10 py-10 rounded-xl shadow-md text-left order-1 lg:order-2">
                    <h3 className="text-lg font-bold mb-6 text-center">Location and Biometrics</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* City and State */}
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label htmlFor="city" className="block text-sm font-semibold mb-2">City</label>
                                <input
                                    id="city"
                                    type="text"
                                    {...register('city')}
                                    className="w-full p-2 border border-gray-400 rounded-md bg-white text-sm"
                                />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="state" className="block text-sm font-semibold mb-2">State</label>
                                <input
                                    id="state"
                                    {...register('state')}
                                    type="text"
                                    className="w-full p-2 border border-gray-400 rounded-md bg-white text-sm"
                                />
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label htmlFor="phone" className="block text-sm font-semibold mb-2">Phone Number</label>

                                <input
                                    id="phone"
                                    {...register('phone_number', {
                                        required: 'Phone number is required',
                                        pattern: {
                                            value: /^(?:\+1)?(?:\d{10})$/, // Allows both +1XXXXXXXXXX or XXXXXXXXXX
                                            message: 'Please enter a valid phone number.',
                                        },
                                    })}
                                    type="tel"
                                    placeholder='Phone number is used to send and receive texts to hold you accountable to the 5 day challenge.'
                                    className="w-full p-2 border border-gray-400 rounded-md bg-white text-sm placeholder:text-[9px] italic"
                                />
                                {errors.phone_number && (
                                    <p className="text-red-500 text-xs">{errors.phone_number.message}</p>
                                )}
                            </div>


                            <div className="w-1/2">
                                <label htmlFor="age" className="block text-sm font-semibold mb-2">Age</label>
                                <input
                                    id="age"
                                    type="number"
                                    {...register('age')}
                                    className="w-full p-2 border border-gray-400 rounded-md bg-white text-sm"
                                />
                            </div>
                        </div>
                        {/* Age and Sex */}

                        {/* Weight Information */}
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label htmlFor="current-weight" className="block text-sm font-semibold mb-2">Current Weight</label>
                                <div className="relative">
                                    <input
                                        id="current-weight"
                                        type="number"
                                        {...register('current_weight')}
                                        className="w-full p-2 border border-gray-400 rounded-md bg-white text-sm pr-10"
                                    />
                                    <span className="absolute right-3 top-2 text-sm text-gray-500">lbs</span>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="goal-weight" className="block text-sm font-semibold mb-2">Goal Weight</label>
                                <div className="relative">
                                    <input
                                        id="goal-weight"
                                        type="number"
                                        {...register('goal_weight')}
                                        className="w-full p-2 border border-gray-400 rounded-md bg-white text-sm pr-10"
                                    />
                                    <span className="absolute right-3 top-2 text-sm text-gray-500">lbs</span>
                                </div>
                            </div>
                        </div>


                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label htmlFor="sex" className="block text-sm font-semibold mb-2">Sex</label>
                                <select
                                    id="sex"
                                    {...register('sex')}
                                    className="w-full p-2 border border-gray-400 rounded-md bg-white text-sm"
                                >
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {/*Strictness Level*/}
                            <div className="w-1/2">
                                <label htmlFor="sex" className="block text-sm font-semibold mb-2">Strictness Level</label>
                                <select
                                    id="strictness_level"
                                    {...register('strictness_level')}
                                    className="w-full p-2 border border-gray-400 rounded-md bg-white text-sm"
                                >
                                    <option value={0}>Select</option>
                                    <option value={1}>Chill: General meal guidelines (no tracking)</option>
                                    <option value={2}>Balanced: Macro targets with suggested portions</option>
                                    <option value={3}>Strict: Precise calorie/macro tracking with specific food weights</option>
                                </select>
                            </div>
                            {/*Strictness Level*/}
                        </div>

                        <div className="flex gap-4">
                            {/* Fitness Level */}
                            <div className='w-1/2'>
                                <label className="block text-sm font-semibold mb-2">Self-assessed Fitness Level</label>
                                <select {...register('fitness_level')} className="w-full p-2 border border-gray-400 rounded-md bg-white text-sm">
                                    <option value="">Select your fitness level</option>
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                            </div>

                            <div className='w-1/2'>
                                <label className="block text-sm font-semibold mb-2">Equipment Access</label>
                                <input
                                    id="equipment-access"
                                    type="text"
                                    {...register('equipment_access')}
                                    className="w-full p-2 border border-gray-400 rounded-md bg-white text-sm"
                                />
                            </div>
                        </div>

                        <div className='w-full'>
                            <label className="block text-sm font-semibold mb-2">Food Allergies</label>
                            <input
                                id="food-allergies"
                                type="text"
                                {...register('food_allergies')}
                                className="w-full p-2 border border-gray-400 rounded-md bg-white text-sm"
                            />
                        </div>

                        {/* Continue Button */}
                        <button
                            type="submit"
                            id="submitBtn"
                            className="w-full bg-[#23B5D3] text-white py-2 rounded-md font-semibold hover:bg-[#1b9bb6] transition mt-6 flex gap-1 place-items-center items-center content-center justify-center"
                        >
                            {mutation.isPending ? (
                                <>
                                    <ArrowClockwise className='animate-spin'/>
                                    Submitting...
                                </>
                            ) : 'CONTINUE'}
                        </button>

                        {mutation.isSuccess && (
                            <p className="text-green-600 text-sm text-center mt-2">
                                Biometrics saved successfully!
                            </p>
                        )}
                        {mutation.isError && (
                            <p className="text-red-500 text-sm text-center mt-2">
                                Something went wrong. Please try again.
                            </p>
                        )}

                    </form>
                </div>

                {/* Left Side - Image Section (appears second on mobile) */}
                <div className="relative w-full lg:w-1/2 flex justify-center items-center order-2 lg:order-1 ">
                    <div className="h-full">
                        <img
                            src="/images/how-it-works.png"
                            alt="Fitness Images"
                            className="rounded-xl h-130 w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LocationAndBiometrics;

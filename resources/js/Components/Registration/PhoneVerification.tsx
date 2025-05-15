import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useUserStore } from '@/stores/useUserStore'
import { toast } from 'sonner'
import { useRef, useState } from 'react'

type PhoneVerificationData = {
    user_id: number | null
    otp: string
}

type ResendPhoneVerificationData = {
    user_id: number | null
}

function PhoneVerification({ onComplete }: { onComplete: () => void }) {
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const { userId } = useUserStore();
    const [otpCode, setOtpCode] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PhoneVerificationData>()

    // Verify phone number by sending OTP code
    const mutation = useMutation({
        mutationFn: (data: PhoneVerificationData) => axios.post('/verify', data),
        onSuccess: (res) => {
            toast.success(`Your phone number verified successfully.`)
            onComplete();
        },
        onError: (error: any) => {
            const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;

            if (submitBtn) {
                submitBtn.classList.remove('disabled');
                submitBtn.disabled = false;
            }
            toast.error(error.response?.data?.message ?? 'Verification failed.');
        },
    })

    // Resend Verification Code (OTP)
    const mutationResend = useMutation({
        mutationFn: (data: ResendPhoneVerificationData) => axios.post('/resend-otp', data),
        onSuccess: (res) => {
            inputsRef.current = [];
            toast.success(`We sent you new verification code (6-digit OTP), please check your inbox.`)
        },
        onError: (error: any) => {
            const submitResendBtn = document.getElementById('submitResendBtn') as HTMLButtonElement;

            if (submitResendBtn) {
                submitResendBtn.classList.remove('disabled');
                submitResendBtn.disabled = false;
            }
            toast.error(error.response?.data?.message ?? 'Resending failed, please try again.');
        },
    })

    // Submit send code
    const onSubmit = (data: PhoneVerificationData) => {
        const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;

        if (submitBtn) {
            submitBtn.classList.add('disabled');
            submitBtn.disabled = true;
        }

        data = { ...data, user_id: userId, otp: otpCode }
        mutation.mutate(data)
    }

    // Submit resend code
    const onSubmitResend = (data: ResendPhoneVerificationData) => {
        const submitResendBtn = document.getElementById('submitResendBtn') as HTMLButtonElement;

        if (submitResendBtn) {
            submitResendBtn.classList.add('disabled');
            submitResendBtn.disabled = true;
        }

        data = { ...data, user_id: userId }
        mutationResend.mutate(data)
    }

    const length = 6;

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;

        if (value && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }

        const otp = inputsRef.current.map(input => input?.value || '').join('');
        setOtpCode(otp);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !inputsRef.current[index]?.value && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 mt-[10%]">
            <h4 className="text-lg font-semibold text-gray-800">Phone number verification, enter OTP we sent you in your phone.</h4>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col items-center gap-6 mt-10">
                <div className="flex gap-3">
                    {Array.from({ length }).map((_, i) => (
                        <input
                            key={i}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            ref={(el) => (inputsRef.current[i] = el)}
                            onChange={(e) => handleChange(e.target.value, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            className="w-12 h-14 text-center text-xl border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))}
                </div>

                <button
                    className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                    type="submit"
                    id="submitBtn">
                    Verify
                </button>

                {mutation.isSuccess && (
                    <p className="text-green-600 text-sm text-center mt-2">
                        Phone number verified!
                    </p>
                )}
                {mutation.isError && (
                    <p className="text-red-500 text-sm text-center mt-2">
                        Something went wrong. Please try again.
                    </p>
                )}
            </form>

            {/** Resend OTP */}
            <form onSubmit={handleSubmit(onSubmitResend)}>
                <h5>Unable to receive OTP? resend it here
                    <button 
                    type="submit"
                    id="submitResendBtn"
                    className='underline text-blue-500 hover:text-blue-800 hover:font-bold ml-2'> Resend OTP.</button>
                </h5>
                {mutationResend.isSuccess && (
                    <p className="text-green-600 text-sm text-center mt-2">
                        Phone number verified!
                    </p>
                )}
                {mutation.isError && (
                    <p className="text-red-500 text-sm text-center mt-2">
                        Something went wrong. Please try again.
                    </p>
                )}
            </form>
        </div >
    );
}

export default PhoneVerification;

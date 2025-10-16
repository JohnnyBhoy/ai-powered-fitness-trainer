import MtTextInput from '@/Components/MtTextInput';
import { useTrainerStore } from '@/stores/useTrainerStore';
import { useForm } from '@inertiajs/react'
import { Button } from '@material-tailwind/react';
import { Loader } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

export default function CreateTrainerForm() {
  // Global states
  const { setShowAddTrainerForm, showAddTrainerForm } = useTrainerStore();

  // Data to be submitted
  const { data, setData, post, processing, errors, reset } = useForm({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    role: 2,
  });

  // Submit trainer
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Data validation
    for (const [key, value] of Object.entries(data)) {
      if (value == "") {
        return toast.error(`${key} is required.`);
        break;
      }
    }

    try {
      post("/admin/trainer/store", {
        onSuccess: () => {
          toast.success('Trainer saved.');
          reset();
          setShowAddTrainerForm(false);
        },
        onError: () => toast.error('Failed to save trainer.'),
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className={`${!showAddTrainerForm && 'hidden'} max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md space-y-4 mt-10`}
    >
      <h2 className="text-2xl font-semibold text-center mb-4 dark:text-gray-300">
        Create Trainer
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {/* First Name */}
        <MtTextInput
          name="first_name"
          data={data.first_name}
          type="text"
          onChange={(e: any) => setData("first_name", e.target.value)}
        />
        {errors.first_name && (
          <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
        )}

        {/* Last Name */}
        <MtTextInput
          name="last_name"
          data={data.last_name}
          type="text"
          onChange={(e: any) => setData("last_name", e.target.value)}
        />
        {errors.last_name && (
          <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
        )}
      </div>


      {/* Username */}
      <MtTextInput
        name="user_name"
        data={data.user_name}
        type="text"
        onChange={(e: any) => setData("user_name", e.target.value)}
      />
      {errors.user_name && (
        <p className="text-red-500 text-xs mt-1">{errors.user_name}</p>
      )}

      {/* Email */}
      <MtTextInput
        name="email"
        data={data.email}
        type="email"
        onChange={(e: any) => setData("email", e.target.value)}
      />
      {errors.email && (
        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
      )}

      {/* Password */}
      <MtTextInput
        name="password"
        data={data.password}
        type="password"
        onChange={(e: any) => setData("password", e.target.value)}
      />
      {errors.password && (
        <p className="text-red-500 text-xs mt-1">{errors.password}</p>
      )}


      <div className="lg:grid grid-cols-2 gap-6">
        <Button
          type="button"
          onClick={() => setShowAddTrainerForm(false)}
          className="w-full mt-4 bg-torq dark:bg-gray-700 dark:hover:bg-gray-900 hover:bg-blue-700 text-white"
        >
          Close
        </Button>

        <Button
          type="submit"
          disabled={processing}
          className="w-full mt-4 bg-torq dark:bg-gray-700 dark:hover:bg-gray-900 hover:bg-blue-700 text-white flex place-items-center gap-2 justify-center"
        >
          {processing ? <><Loader className='animate-spin' /> Creating...</> : "Create Trainer"}
        </Button>
      </div>
    </form>
  )
}

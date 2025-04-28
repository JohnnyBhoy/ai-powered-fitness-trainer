import { useUserStore } from '@/stores/useUserStore'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useForm } from 'react-hook-form'

type GoalFormData = {
  goal: string
  why: string
  past_obstacles: string
  current_struggles: string
  user_id: null | number
}

function TheGoal() {
  const {userId} = useUserStore();
    
  const {
      register,
      handleSubmit,
      formState: { errors },
  } = useForm<GoalFormData>()

  const mutation = useMutation({
      mutationFn: (data: GoalFormData) => axios.post('/goals', data),
      onSuccess: (res) => {
        alert(`Goals updated.`)
      },
      onError: (error: any) => {
        alert(error.response?.data?.message ?? 'Goals update failed.')
      },
    })

  const onSubmit = (data: GoalFormData) => {
      data = {...data, user_id: userId}
      mutation.mutate(data)
  }


  return (
    <div className="flex flex-col items-center px-4 bg-white text-black py-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mt-2 text-[#23B5D3] mb-6 ">THE GOAL</h1>
      <h2 className="text-3xl font-semibold mb-8 font-alfarn text-center">ACCOUNTABILITY THAT DRIVES RESULTS</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-wrap w-full gap-6 mb-8 mt-10">
        <div className="flex-1 min-w-[300px]">
          <label className="block text-left font-medium mb-2">What's your primary health and fitness goal?</label>
          <textarea
            id="goal"
            {...register('goal')}
            className="w-full p-3 border border-gray-300 rounded-lg mb-1 h-40 bg-gray-200 resize-none"
          
          />
           <p className='text-[10px] text-gray-400 italic'>Example: lose 10 pounds and increase lean muscle mass.</p>
        </div>
        
        <div className="flex-1 min-w-[300px]">
          <label className="block text-left font-medium mb-2">Why do you want this?</label>
          <textarea
            id="why"
            {...register('why')}
            className="w-full p-3 border border-gray-300 rounded-lg mb-1 h-40 bg-gray-200 resize-none"
           
          />
          <p className='text-[10px] text-gray-400 italic'>Example: Beach Vacation in 3 months and I want to look good in a swimsuit.</p>
        </div>
      </div>
      
      <div className="flex flex-wrap w-full gap-6 mb-10">
        <div className="flex-1 min-w-[300px]">
          <label className="block text-left font-medium mb-2">What stopped you from reaching your goals in the past?</label>
          <textarea
            id="past_obstacles"
            {...register('past_obstacles')}
            className="w-full p-3 border border-gray-300 rounded-lg mb-1 h-40 bg-gray-200 resize-none"
            
          />
          <p className='text-[10px] text-gray-400 italic'>Example: Lack of consistency, no accountability, emotional eating, busy schedule.</p>
        </div>
        
        <div className="flex-1 min-w-[300px]">
          <label className="block text-left font-medium mb-2">What's the biggest struggle you face when trying to stay on track?</label>
          <textarea
            id="current_struggles"
            {...register('current_struggles')}
            className="w-full p-3 border border-gray-300 rounded-lg mb-1 h-40 bg-gray-200 resize-none"
          />
         <p className='text-[10px] text-gray-400 italic'>Example: Late-night snacking, skipping workouts, not knowing what to eat.</p>
        </div>
      </div>
      
      <button 
       type="submit"
       className="w-full max-w-md bg-[#23B5D3] text-white py-2 rounded-md font-semibold hover:bg-[#1b9bb6] transition mt-6">
        CONTINUE
      </button>
      </form>
    </div>
  );
}

export default TheGoal;
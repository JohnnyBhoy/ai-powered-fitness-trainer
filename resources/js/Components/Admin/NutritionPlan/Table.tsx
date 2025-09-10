import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

type Trainee = {
  id: number;
  name: string;
  goal: string;
};

type NutritionPlan = {
  id: number;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fats_g: number;
  start_date: string;
  end_date?: string;
  trainee: Trainee;
};

type Props = {
  plans: NutritionPlan[];
};

const Table = ({plans} : Props) => {
  return (
   <div className="bg-white shadow rounded-xl overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 border-b">Trainee</th>
                <th className="px-4 py-2 border-b">Goal</th>
                <th className="px-4 py-2 border-b">Calories</th>
                <th className="px-4 py-2 border-b">Macros (P/C/F)</th>
                <th className="px-4 py-2 border-b">Dates</th>
                <th className="px-4 py-2 border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.length > 0 ? (
                plans.map((plan, index) => (
                  <motion.tr
                    key={plan.id}
                    className="hover:bg-gray-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="px-4 py-2 border-b">{plan.trainee.name}</td>
                    <td className="px-4 py-2 border-b capitalize">{plan.trainee.goal.replace('_', ' ')}</td>
                    <td className="px-4 py-2 border-b">{plan.calories} kcal</td>
                    <td className="px-4 py-2 border-b">
                      {plan.protein_g} / {plan.carbs_g} / {plan.fats_g} g
                    </td>
                    <td className="px-4 py-2 border-b">
                      {plan.start_date} - {plan.end_date ?? 'Ongoing'}
                    </td>
                    <td className="px-4 py-2 border-b text-right">
                      <Link
                        href={`/nutrition-plans/${plan.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center text-gray-500 py-4"
                  >
                    No nutrition plans found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
  )
}

export default Table
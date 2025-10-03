import Authenticated from '@/Pages/Layouts/AuthenticatedLayout';
import { getOrdinal } from '@/utils/functions/helperFunctions';
import { motion } from 'framer-motion';
import { Activity, Apple, CheckCircle2, Coffee, ForkKnife } from 'lucide-react';

interface MealData {
  id: number;
  week_number: number;
  day_number: number;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  meal_name: string;
  food_items: string;
  calories: number;
  protein: string;
  carbs: string;
  fats: string;
  notes: string;
}

const mealIcons = {
  breakfast: <Coffee className="w-6 h-6 text-yellow-500" />,
  lunch: <Activity className="w-6 h-6 text-green-500" />,
  dinner: <ForkKnife className="w-6 h-6 text-blue-500" />,
  snack: <Apple className="w-6 h-6 text-red-500" />,
};

const mealColors = {
  breakfast: 'bg-yellow-50 border-yellow-200',
  lunch: 'bg-green-50 border-green-200',
  dinner: 'bg-blue-50 border-blue-200',
  snack: 'bg-red-50 border-red-200',
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, type: 'spring', stiffness: 100 },
  }),
};

const NutritionPlan = ({ plan }: { plan: MealData[] }) => {
  // Group meals by day
  const days = Array.from(
    plan.reduce((map, meal) => {
      const key = `${meal.day_number}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)?.push(meal);
      return map;
    }, new Map<string, MealData[]>())
  );

  return (
    <Authenticated>
      <div className="max-w-6xl mx-auto lg:p-6 space-y-10">
        {days.map(([day, meals], idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-2xl shadow-lg p-6 lg:mt-6 border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">🥗{getOrdinal(parseInt(day))} day of your weekly nutrition plan</h2>
              <span className="text-sm text-gray-500 italic">Week {meals[0].week_number}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {meals.map((meal, i) => (
                <motion.div
                  key={meal.id}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex flex-col p-5 rounded-xl border ${mealColors[meal.meal_type]} cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-300`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {mealIcons[meal.meal_type]}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{meal.meal_name}</h3>
                      <p className="text-sm text-gray-500 capitalize">{meal.meal_type}</p>
                    </div>
                  </div>

                  <div className="text-gray-700 mb-3">
                    {meal.food_items.split(', ').map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 mb-3 text-gray-600 text-sm">
                    <div className="flex items-center gap-1">💪 Protein: {meal.protein} g</div>
                    <div className="flex items-center gap-1">🍞 Carbs: {meal.carbs} g</div>
                    <div className="flex items-center gap-1">🥑 Fats: {meal.fats} g</div>
                    <div className="flex items-center gap-1">🔥 Calories: {meal.calories} kcal</div>
                  </div>

                  <p className="italic text-gray-500 text-sm bg-gray-50 p-2 rounded-md mb-2">
                    {meal.notes}
                  </p>

                  <div className="text-gray-400 text-xs mt-auto">
                    Day {meal.day_number} • Week {meal.week_number}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Authenticated>
  );
};

export default NutritionPlan;

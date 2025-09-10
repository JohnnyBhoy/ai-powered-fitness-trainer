import { Card } from '@/Components/UI/Card';
import { GpfTraineeProps } from '@/types/gpf';
import { useState } from 'react';

type Meal = {
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
};

type DayPlan = {
  day: number;
  meals: Meal[];
  totalCalories: number;
};

type NutritionPlan = {
  [day: number]: DayPlan;
};

const sampleNutrition: NutritionPlan = {
  1: {
    day: 1,
    totalCalories: 2200,
    meals: [
      {
        name: "Breakfast",
        description: "Oatmeal with banana and peanut butter",
        calories: 500,
        protein: 20,
        carbs: 60,
        fats: 15,
      },
      {
        name: "Lunch",
        description: "Grilled chicken breast with brown rice and broccoli",
        calories: 700,
        protein: 45,
        carbs: 70,
        fats: 10,
      },
      {
        name: "Dinner",
        description: "Salmon with quinoa and mixed veggies",
        calories: 700,
        protein: 40,
        carbs: 50,
        fats: 20,
      },
      {
        name: "Snack",
        description: "Greek yogurt with honey and almonds",
        calories: 300,
        protein: 15,
        carbs: 25,
        fats: 10,
      },
    ],
  },
  2: {
    day: 2,
    totalCalories: 2100,
    meals: [
      {
        name: "Breakfast",
        description: "Scrambled eggs with toast and avocado",
        calories: 550,
        protein: 25,
        carbs: 40,
        fats: 20,
      },
      {
        name: "Lunch",
        description: "Turkey wrap with mixed greens and hummus",
        calories: 650,
        protein: 35,
        carbs: 60,
        fats: 15,
      },
      {
        name: "Dinner",
        description: "Beef stir-fry with vegetables and jasmine rice",
        calories: 700,
        protein: 40,
        carbs: 70,
        fats: 18,
      },
      {
        name: "Snack",
        description: "Protein smoothie with berries",
        calories: 200,
        protein: 20,
        carbs: 25,
        fats: 5,
      },
    ],
  },
  // Add days 3-7 here for a full plan
};

const Nutrition = ({ data }: { data: GpfTraineeProps }) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const dayPlan = sampleNutrition[selectedDay];
  console.log(data);

  return (
    <Card className="p-6 mt-3">

        <div className="flex flex-col h-screen bg-gray-50">
          {/* Header */}
          <div className="p-4 bg-green-600 text-white text-center font-bold text-lg shadow">
            7-Day Nutrition Plan
          </div>

          {/* Day Selector */}
          <div className="flex justify-around p-2 bg-white shadow">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition ${selectedDay === day
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                Day {day}
              </button>
            ))}
          </div>

          {/* Nutrition Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {dayPlan ? (
              <div className="bg-white rounded-2xl shadow p-4">
                <h2 className="text-xl font-semibold text-green-600 mb-2">
                  Day {dayPlan.day} Nutrition
                </h2>
                <p className="text-gray-600 mb-4">
                  Total Calories:{" "}
                  <span className="font-bold">{dayPlan.totalCalories} kcal</span>
                </p>

                <ul className="space-y-3">
                  {dayPlan.meals.map((meal, idx) => (
                    <li
                      key={idx}
                      className="p-3 border rounded-lg bg-gray-50 shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-700">
                          {meal.name}
                        </h3>
                        <span className="text-sm font-medium text-green-600">
                          {meal.calories} kcal
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {meal.description}
                      </p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Protein: {meal.protein}g</span>
                        <span>Carbs: {meal.carbs}g</span>
                        <span>Fats: {meal.fats}g</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-10">
                No plan available for Day {selectedDay}.
              </div>
            )}
          </div>
        </div>
    </Card>
  )
}

export default Nutrition
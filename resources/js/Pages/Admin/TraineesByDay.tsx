import { motion } from "framer-motion";
import { ArrowLeft, User } from "lucide-react";
import { router } from "@inertiajs/react";
import Authenticated from "@/Pages/Layouts/AuthenticatedLayout";

interface UserType {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

interface Props {
  day: number;
  users: UserType[];
}

export default function TraineesByDay({ day, users }: Props) {
  const handleBack = () => router.visit("/admin/five-days-trail");

  return (
    <Authenticated>
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
            {users?.length} Trainees Created {day} Day{day > 1 ? "s" : ""} Ago
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Showing all trainees created exactly {day} day{day > 1 ? "s" : ""} ago.
            </p>
          </div>
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        {/* Users List */}
        {users.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {users.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg p-5 transition duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-400">
                  Created at: {new Date(user.created_at).toLocaleString()}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-gray-50 rounded-xl shadow-inner"
          >
            <p className="text-gray-500 text-lg font-medium">
              No trainees found for this day.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Try selecting a different day from the dashboard.
            </p>
          </motion.div>
        )}
      </div>
    </Authenticated>
  );
}

import InputWithIcon from '@/Components/InputWithIcon';
import { useGpfStore } from '@/stores/useGpfStore';
import { useTraineeStore } from '@/stores/useTraineeStore';
import { TraineeFormData } from '@/types/gpf';
import { Dumbbell, Heart, MapPin, Phone, Save, Target, User2, Weight, X } from 'lucide-react';

type AddressFormProps = {
    data: TraineeFormData
    setData: any
    errors: any
    processing: boolean
}

const AddressForm = ({ data, setData, errors, processing }: AddressFormProps) => {
    // Global states
    const { setShowAddTraineeForm } = useGpfStore();
    const { setUpdateTrainee } = useTraineeStore();

    // Close add trainee form handler
    const handleCloseCreateTrainee = () => {
        setShowAddTraineeForm(false);
        setUpdateTrainee(false);
    }

    return (
        <div className="rounded border border-gray-200 bg-white dark:border-gray-700 dark:bg-white/[0.03]">
            <div className="p-4 sm:p-6 gap-6 space-y-4">
                <div className="flex justify-between place-items-center">
                    <h3 className="dark:text-white/90 font-bold text-lg mb-3">Location and Biometrics</h3>
                    <div className="flex justify-end place-items-center dark:text-white/90 gap-3">
                        <button onClick={() => setShowAddTraineeForm(false)} type="button"><X /></button>
                        <button type="submit"><Save /></button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-7 gap-y-2">
                    {/* City */}
                    <InputWithIcon
                        id="city"
                        name="city"
                        type="text"
                        placeholder="Enter city"
                        value={data.city}
                        onChange={(e: any) => setData('city', e.target.value)}
                        icon={<MapPin size={18} />}
                    />
                    {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}

                    {/* State */}
                    <InputWithIcon
                        id="state"
                        name="state"
                        type="text"
                        placeholder="Enter state"
                        value={data.state}
                        onChange={(e: any) => setData('state', e.target.value)}
                        icon={<MapPin size={18} />}
                    />
                    {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}

                    {/* Age */}
                    <InputWithIcon
                        id="age"
                        name="age"
                        type="number"
                        placeholder="Enter age"
                        value={data.age}
                        onChange={(e: any) => setData('age', e.target.value)}
                        icon={<User2 size={18} />}
                    />
                    {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}

                    {/* Phone Number */}
                    <InputWithIcon
                        id="phone_number"
                        name="phone_number"
                        type="text"
                        placeholder="Enter phone number"
                        value={data.phone_number}
                        onChange={(e: any) => setData('phone_number', e.target.value)}
                        icon={<Phone size={18} />}
                    />
                    {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number}</p>}

                    {/* Sex */}
                    <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Sex</label>
                        <select
                            id="sex"
                            name="sex"
                            value={data.sex}
                            onChange={(e) => setData('sex', e.target.value)}
                            className="block w-full rounded-lg border-gray-300 focus:border-brand-500 dark:border-gray-700 focus:ring-brand-500 dark:bg-gray-900 dark:text-white/90 text-gray-500"
                        >
                            <option value="">Select sex</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        {errors.sex && <p className="text-red-500 text-sm">{errors.sex}</p>}
                    </div>


                    {/* Fitness Level */}
                    <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Fitness Level</label>
                        <select
                            id="fitness_level"
                            name="fitness_level"
                            value={data.fitness_level}
                            onChange={(e) => setData('fitness_level', e.target.value)}
                            className="block w-full text-gray-500 rounded-lg border-gray-300 focus:border-brand-500 dark:border-gray-700  focus:ring-brand-500 dark:bg-gray-900 dark:text-white/90"
                        >
                            <option value="">Select level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                        {errors.fitness_level && <p className="text-red-500 text-sm">{errors.fitness_level}</p>}
                    </div>

                    {/* Current Weight */}
                    <InputWithIcon
                        id="current_weight"
                        name="current_weight"
                        type="number"
                        placeholder="Enter current weight (lbs)"
                        value={data.current_weight}
                        onChange={(e: any) => setData('current_weight', e.target.value)}
                        icon={<Weight size={18} />}
                    />
                    {errors.current_weight && <p className="text-red-500 text-sm">{errors.current_weight}</p>}

                    {/* Goal Weight */}
                    <InputWithIcon
                        id="goal_weight"
                        name="goal_weight"
                        type="number"
                        placeholder="Enter goal weight (lbs)"
                        value={data.goal_weight}
                        onChange={(e: any) => setData('goal_weight', e.target.value)}
                        icon={<Target size={18} />}
                    />
                    {errors.goal_weight && <p className="text-red-500 text-sm">{errors.goal_weight}</p>}

                    {/* Equipment Access */}
                    <InputWithIcon
                        id="equipment_access"
                        name="equipment_access"
                        type="text"
                        placeholder="Enter available equipment (e.g., Dumbbells)"
                        value={data.equipment_access}
                        onChange={(e: any) => setData('equipment_access', e.target.value)}
                        icon={<Dumbbell size={18} />}
                    />
                    {errors.equipment_access && <p className="text-red-500 text-sm">{errors.equipment_access}</p>}

                    {/* Food Allergies */}
                    <InputWithIcon
                        id="food_allergies"
                        name="food_allergies"
                        type="text"
                        placeholder="Enter food allergies (if any)"
                        value={data.food_allergies}
                        onChange={(e: any) => setData('food_allergies', e.target.value)}
                        icon={<Heart size={18} />}
                    />
                    {errors.food_allergies && <p className="text-red-500 text-sm">{errors.food_allergies}</p>}


                    {/* Strictness Level */}
                    <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Strictness Level</label>
                        <select
                            id="strictness_level"
                            name="strictness_level"
                            value={data.strictness_level}
                            onChange={(e) => setData('strictness_level', e.target.value)}
                            className="block w-full rounded-lg text-gray-500 border-gray-300 focus:border-brand-500 dark:border-gray-700  focus:ring-brand-500 dark:bg-gray-900 dark:text-white/90"
                        >
                            <option value={0}>Select</option>
                            <option value={1}>Chill: General meal guidelines (no tracking)</option>
                            <option value={2}>Balanced: Macro targets with suggested portions</option>
                            <option value={3}>Strict: Precise calorie/macro tracking with specific food weights</option>
                        </select>
                        {errors.strictness_level && <p className="text-red-500 text-sm">{errors.strictness_level}</p>}
                    </div>

                    {/* Submit Button 
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <button
                        type="button"
                        onClick={handleCloseCreateTrainee}
                        className="w-full bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 dark:hover:bg-gray-900 dark:text-white rounded-lg py-2 hover:bg-gray-200 transition"
                    >
                        Close
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-torq dark:bg-gray-700 border dark:border-gray-900 dark:hover:bg-gray-800 text-white rounded-lg py-2 transition flex place-items-center gap-2 justify-center"
                    >
                        {processing ? <>
                            <Loader className='animate-spin' />
                            Saving...
                        </> : <>
                            <Save />
                            Save
                        </>}
                    </button>
                </div> */}
                </div>
            </div>
        </div>
    );
};

export default AddressForm;

import Modal from '@/Components/Modal';
import { Users } from '@/types/admin';
import { getRoleById, getStrictnessLevel } from '@/utils/functions/helperFunctions';
import moment from 'moment';
import { useState } from 'react';
import TraineeInfo from '../Forms/TraineeInfo';
import { User } from '@/types';

const LatestUsers = ({ users }: { users: Users[] }) => {
    //Local state
    const [filter, setFilter] = useState<string>('');
    const [activeUser, setActiveUser] = useState<User>({
        id: 0,
        first_name: "",
        last_name: "",
        user_name: "",
        email: "",
        email_verified_at: undefined,
        created_at: new Date().toISOString(), // sets to current date
        is_active: 0,
        is_promo: 0,
        trainer_id: null,
        role: null,
        strictness_level: 0,
        trainer_first_name: "",
        trainer_last_name: "",
        current_weight: 0,
        goal_weight: 0,
        city: "",
        state: "",
        age: 0,
        equipment_access: "",
        food_allergies: "",
        sex: "",
    });
    const [showTrainerInfo, setShowTrainerInfo] = useState<boolean>(false);

    const headers = ['Name', 'Role', 'Email', 'Trainer', 'Strictness Level', 'Started', 'Action'];

    const handleShowTrainerInfo = (user: any) => {
        setActiveUser(user);
        setShowTrainerInfo(true);
    }
    console.log(users);
    console.log(activeUser);

    return (

        <div className="lg:p-6 p-3 rounded-lg">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white border">
                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white p-6">

                    <h1 className='lg:text-xl font-bold text-slate-800 pr-6'>Latest Trainees</h1>

                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="table-search-users"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for trainees / trainer"
                        />
                    </div>
                </div>
                <table className="lg:w-full text-sm text-left lg:rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-white border border-b">
                        <tr>

                            {headers.map((header, i) => (
                                <th key={i} scope="col" className="px-6 lg:py-3">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users?.length == 0 ? (
                            <tr>
                                <td colSpan={7} className='text-center'>
                                    <h1 className='py-6 font-semibold text-md animate-pulse'>No Users found in our records...</h1>
                                </td>
                            </tr>
                        ) : (
                            users
                                ?.filter((user) => user.first_name.includes(filter)
                                    || user.last_name?.includes(filter)
                                    || user.trainer_first_name?.includes(filter)
                                    || user.trainer_last_name?.includes(filter)
                                    || user.email.includes(filter))
                                ?.slice(0, 10)
                                ?.map((user: Users) => (
                                    <tr className="bg-white border-b" key={user.id}>
                                        <td className="px-6 py-4">
                                            {user?.first_name} {user?.last_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getRoleById(user?.role, user?.trainer_id)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user?.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user?.trainer_first_name} {user?.trainer_last_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStrictnessLevel(user?.strictness_level) ?? 'Not Specify'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {moment(user?.created_at).format('MMMM D, YYYY hA')}
                                        </td>
                                        <td className="px-6 py-4 text-blue-600 hover:cursor-pointer hover:font-bold hover:underline"
                                            onClick={() => handleShowTrainerInfo(user)}>
                                            View
                                        </td>
                                    </tr>
                                ))
                        )}
                    </tbody>
                </table>

                <Modal show={showTrainerInfo} maxWidth='5xl' onClose={() => setShowTrainerInfo(false)}>
                    <TraineeInfo user={activeUser} onClose={() => setShowTrainerInfo(false)} />
                </Modal>
            </div>
        </div>

    )
}

export default LatestUsers
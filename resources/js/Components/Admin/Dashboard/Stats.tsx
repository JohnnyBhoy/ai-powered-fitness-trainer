import { Cards } from '@/types/admin'
import { Link } from '@inertiajs/react'

const Stats = ({ cards }: { cards: Cards[] }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6 gap-2">
            {cards.map((e:Cards) => (
                <Link href={e.link}>
                     <div
                    key={e.id}
                    className="lg:p-6 p-2 shadow-sm border border-slate-200 bg-white rounded-lg flex justify-between">
                    <div className="">
                        <h3 className='font-bold text-slate-700 text-sm lg:text-lg'>{e.title}</h3>
                        <h3 className='text-4xl font-semibold'>{e.count}</h3>
                        <h3 className='text-sm text-green-800 text-xs'>{e.text}</h3>
                    </div>

                    <img
                        src={e.icon}
                        alt={e.title}
                        className='lg:h-16 h-10 lg:w-16'
                    />

                </div> 
                </Link>
              
            ))}
        </div>

    )
}

export default Stats
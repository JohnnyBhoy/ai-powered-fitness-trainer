import React from 'react'

interface Props {
  className?: string;
}


const DietTips : React.FC<Props> = ({ className }) => {
    return (
         <div className={className}>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Increase protein intake</li>
                <li>Drink 3L of water daily</li>
                <li>Avoid sugar after 6 PM</li>
                <li>Include leafy greens daily</li>
            </ul>
        </div>
    )
}

export default DietTips
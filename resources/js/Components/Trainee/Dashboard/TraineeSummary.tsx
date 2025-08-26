import React from 'react'

interface Props {
  className?: string;
}

const TraineeSummary: React.FC<Props> = ({ className }) => {
    return (
        <div className={className}>
            <p className="text-gray-700">
                Great job this week! Keep up the consistency. Focus on form for squats and increase cardio time by 10 minutes daily.
            </p>
        </div>
    )
}

export default TraineeSummary
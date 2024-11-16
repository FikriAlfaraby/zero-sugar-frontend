import React from 'react'
import FeedbackForm from './FeedbackForm'

const Feedback = ({userId} : {userId : number}) => {
  return (
    <main className="container px-4">
      <div className="border-b mb-4">
        <div className="flex h-16 items-center">
          <h2 className="text-lg font-semibold">Formulir Feedback</h2>
        </div>
      </div>
      <FeedbackForm userId={userId}/>
    </main>
  )
}

export default Feedback
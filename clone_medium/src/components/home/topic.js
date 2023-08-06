import React from 'react'
import {Link } from 'react-router-dom'
function Topic() {


    const topics = [
       'Programming' ,
       'Data Science',
       'Technology',
       'Self Improvement',
       'Machine Learning',
       'Politics'
    ]

    
  return (
    <div>
        <div className='m-5 p-5 max-sm:m-1 max-sm:p-4'>
            <div>
                <h1 className='text-black font-bold text-3xl mb-3 max-sm:text-2xl  '>Discover more of what matters to you</h1>
            </div>
            <div className='flex flex-wrap w-2/3 max-sm:w-full '>
                {
                    topics.map( topic => {
                        return (
                            <Link to= {`/topiclist/${topic}`} className='m-4 p-4 max-sm:m-3 max-sm:p-2 max-sm:text-lg text-black text-xl bg-gray-300 rounded-lg shadow-lg shadow-gray-400  hover:ease-in duration-300 hover:scale-95'>{topic}</Link>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Topic
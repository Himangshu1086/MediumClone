import React from 'react'

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
        <div className='m-5 p-5'>
            <div>
                <h1 className='text-black font-bold text-3xl mb-3 '>Discover more of what matters to you</h1>
            </div>
            <div className='flex flex-wrap w-2/3'>
                {
                    topics.map( topic => {
                        return (
                            <span className='m-4 p-4 text-black text-xl bg-gray-300 rounded-lg shadow-lg shadow-gray-400  hover:ease-in duration-300 hover:scale-95'>{topic}</span>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Topic
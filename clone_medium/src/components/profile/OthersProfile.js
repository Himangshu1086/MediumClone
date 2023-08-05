import React from 'react'
import { useParams } from 'react-router-dom'

function OthersProfile() {

    const {author } = useParams();

    // const [profile , setProfile ] = useState()
  // const [loading , setLoading ] = useState(false)
  // const fetchProfile = async() =>{
  //     const res = await fetch("/profile/author" , {
  //         method:"GET" ,
  //         headers:{
  //             "Content-Type":"application/json",
  //             "author": author
  //         }
  //     });

  //     const result = await  res.json();
  //     setProfile(result);
  //     setLoading(false);
  // }

  //   useEffect(() => {
  //   fetchProfile()
  // }, [])


  return (
    <div><h1 className='text-center mt-96'>{author}</h1></div>
  )
}

export default OthersProfile
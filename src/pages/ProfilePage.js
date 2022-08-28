import userEvent from '@testing-library/user-event'
import { useContext, useEffect, useState, useRef } from 'react'
import mainContext from '../context/mainContext'
import Carousel from '../components/Carousel'
const ProfilePage = () => {
    const img = useRef()
    const [error, setError] = useState();
    const { login, user, setUser } = useContext(mainContext)
    function upload(){
        const options = {
            method: 'POST',
            headers: {"content-type":"application/json"},
            body: JSON.stringify({image:img.current.value, user}),
            credentials: 'include'
        }
        fetch('http://localhost:4000/imageUpload', options)
        .then(res => res.json())
        .then(data => {
            if (!data.error) {
                setError(data.status)
                img.current.value = ''
                setUser(data.user)
            } else {
                setError(data.status)
            }
        })
    }
    return (login ? 
            <div className='profile'>
                <h1>{user.username}</h1>
                <Carousel user={user}/>
                <input ref={img} type='text' placeholder="Your love is just around the corner, just add more picture url's"/>
                <button onClick={upload} >Add new picture</button>
                <h1>{error}</h1>
            </div> :
            <div>Please login</div>
        
    );
};

export default ProfilePage;
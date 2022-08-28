import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import mainContext from '../context/mainContext';
const NavBar = () => {
    const [requests, setRequests] = useState(0)
    const { login, setLogin, setUser, socket, user } = useContext(mainContext)
    const nav = useNavigate();
    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: {"content-type":"application/json"},
            credentials: 'include'
        }
        fetch('http://localhost:4000/autoLogin', options)
        .then(res => res.json())
        .then(data => {
            if (data.user) {
                setUser(data.user)
                setLogin(true)
            }
        })
    }, [])
   
    
    function logout(){
        const options = {
            method: 'GET',
            headers: {"content-type":"application/json"},
            credentials: 'include'
        }
        fetch('http://localhost:4000/logout', options)
        .then(res => res.json())
        .then(data => {
            setLogin(false)
            nav('/')
        })
    }
    return (
        <div className='NavBar'>
            {login && user && <h1 onClick={()=>nav('/profile')}>Profile</h1>}
            {login && user.images.length >= 2 && <h1 onClick={()=>nav('/find')}>Find yor date</h1>}
            {login && user.images.length >= 2 && <h1 onClick={()=>nav('/matches')}>My matches</h1>}
            {login && user.images.length >= 2 && <h1 onClick={()=>nav('/likes')}>Likes</h1>}
            {login && user.images.length <  2 && 
                <div>
                    <h3>Upload more pictures</h3>
                    <h3>to see user photos!</h3>
                </div>
            }
            {login ? <h1 onClick={logout}>Logout</h1> : <h1 onClick={()=>nav('/')}>Login</h1>}

        </div>
    );
};

export default NavBar;
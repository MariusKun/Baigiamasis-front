import { useState, useEffect, useContext } from 'react'
import mainContext from '../context/mainContext';
import Carousel from '../components/Carousel';
const UsersPage = () => {
    const { login, user, setUser, users, setUsers } = useContext(mainContext)
    
    useEffect(()=>{
        const options = {
            method: 'POST',
            headers: {"content-type":"application/json"},
            body: JSON.stringify({user}),
            credentials: 'include'
        }
        fetch('http://localhost:4000/users', options)
        .then(res => res.json())
        .then(data => {
            if(user) {
                data.users = data.users.filter(x=>
                    x.city===user.filterCity && 
                    x.gender===user.filterGender &&
                    x.age<=user.filterAgeMax &&
                    !user.likesGiven.includes(x._id)
                )
                setUsers(data.users)
            }
        })
    }, [user])
    function pass(){
        setUsers(old=>{
            old.shift()
            return [...old]
        })
    }
    function like(id){
        const message = {
            message: `You've just now been liked by ${user.username}!`,
            id: id,
        }
        
        const options = {
            method: 'POST',
            headers: {"content-type":"application/json"},
            body: JSON.stringify({currentUser: users[0], loggedInUser: user}),
            credentials: 'include'
        }
        fetch('http://localhost:4000/like', options)
        .then(res => res.json())
        .then(data => {
            data.users = data.users.filter(x=>
                x.city===user.filterCity && 
                x.gender===user.filterGender &&
                x.age<=user.filterAgeMax &&
                !user.likesGiven.includes(x._id)
            )
            setUser(data.user)
            setUsers(data.users)
        })
            
    }
    return (login ? (users.length > 0 ? 
        <div className='UsersPage'>
            
            <h1>{users[0].username} {users[0].age}</h1>
            <Carousel user={users[0]} />
            <button className='passButton' onClick={pass}>Pass</button>
            <button className='likeButton' onClick={()=>like(users[0]._id)}>Like</button>
        </div> :
        <div>
            There is no users that matches your criteria !
        </div>) :
        (<div>please login</div>)

    );
};

export default UsersPage;
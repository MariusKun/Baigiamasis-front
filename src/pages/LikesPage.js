import { useRef, useEffect, useState, useContext } from 'react'
import mainContext from '../context/mainContext'
import Carousel from '../components/Carousel';
const HistoryPage = () => {
    const [select, setSelect] = useState('likesGiven')
    const { user, setUser, users, setUsers } = useContext(mainContext)
    useEffect(()=>{
        const options = {
            method: 'POST',
            headers: {"content-type":"application/json"},
            body: JSON.stringify({list: user[select]}),
            credentials: 'include'
        }
        fetch('http://localhost:4000/getHistory', options)
        .then(res => res.json())
        .then(data => {
            setUsers([...data.users])
        })
    }, [select])
    return (
        <div className='likesPage'>
            <h3 className='link' onClick={()=>setSelect('likesGiven')}>My likes ({user.likesGiven.length})</h3>
            <h3 className='link' onClick={()=>setSelect('likesGot')}>Who likes me ? ({user.likesGot.length})</h3>
            <div className='list'>
                {users.map((x, i)=>
                    <div className='separateCards' key={i}>
                        <h3>{x.username} {x.age}</h3>
                        <Carousel user={x}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryPage;
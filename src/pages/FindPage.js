import { useRef, useState, useContext } from 'react'
import mainContext from '../context/mainContext';
const FilterPage = () => {
    const { user, setUser } = useContext(mainContext)
    const city = useRef()
    const ageMax = useRef()
    const gender = useRef()
    const [ageOut, setAgeOut] = useState(user.filterAgeMax)
    function saveFilter(){
        const filter = {
            city: city.current.value,
            ageMax: ageMax.current.value,
            gender: gender.current.value,
            user
        }
        const options = {
            method: 'POST',
            headers: {"content-type":"application/json"},
            body: JSON.stringify(filter),
            credentials: 'include'
        }
        fetch('http://localhost:4000/setFilter', options)
        .then(res => res.json())
        .then(data => setUser(data.user))
    }
    return (
        <div className='FindPage'>
            <select ref={city} defaultValue={user.filterCity}>
                {['Vilnius', 'Palanga', 'Plungė', 'Rietavas', 'Linkuva', 'Babrungėnai', 'Kitas kaimas'].map((x, i)=><option key={i} value={x}>{x}</option>) }
            </select>
            <select ref={gender} defaultValue={user.filterGender}>
                <option value='male'>men</option>
                <option value='female'>women</option>
            </select>
            <input ref={ageMax} onInput={()=> setAgeOut(ageMax.current.value)} type='range' min='18' max='100' defaultValue={user.filterAgeMax}/>
            <h4>Max age: {ageOut}</h4>
            <button onClick={saveFilter} >Save Filter</button>

        </div>
    );
};

export default FilterPage;
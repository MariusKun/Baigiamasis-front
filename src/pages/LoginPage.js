import { useRef, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import mainContext from '../context/mainContext';
const LoginPage = () => {
    const { login, setLogin, setUser } = useContext(mainContext)
    const nav = useNavigate();
    const usernameL = useRef()
    const passwordL = useRef()
    const checkbox = useRef()
    const usernameR = useRef()
    const passwordR1 = useRef()
    const passwordR2 = useRef()
    const gender = useRef()
    const city = useRef()
    const age = useRef()
    const [error, setError] = useState('Login or register to your new adventure !')

    function loginBtn(){
        const user = {
            username: usernameL.current.value,
            password: passwordL.current.value,
            checkbox: checkbox.current.checked,
        }
        const options = {
            method: 'POST',
            headers: {"content-type":"application/json"},
            body: JSON.stringify(user),
            credentials: 'include'
        }
        fetch('http://localhost:4000/login', options)
        .then(res => res.json())
        .then(data => {
            if (!data.error) {
                setLogin(true)
                setUser(data.user)
                nav('/profile')
            } else {
                setError(data.status)
            }
        })
    }
    function register(){
        if (passwordR1.current.value!==passwordR2.current.value) return setError('passwords dont match')
        const user = {
            username: usernameR.current.value,
            password: passwordR1.current.value,
            city: city.current.value,
            gender: gender.current.value,
            age: age.current.value,
        }
        const options = {
            method: 'POST',
            headers: {"content-type":"application/json"},
            body: JSON.stringify(user),
            credentials: 'include'
        }
        fetch('http://localhost:4000/register', options)
        .then(res => res.json())
        .then(data => setError(data.status))
    }
        
        return (
        <div className='startPage'>
            <div className='forms'>
                <div className='loginCard'>
                    <h3>Login</h3>
                    <input onKeyDown={e=>e.key==='Enter' && loginBtn()} ref={usernameL} type='text' autoFocus placeholder='username' defaultValue=''/>
                    <input ref={passwordL} type='text' placeholder='password' defaultValue=''/>
                    <button onClick={loginBtn} >Login</button>
                    {/* <h5>Stay logged in </h5> */}
                    <label className='label' for="Stay logged in"> Stay logged in</label>
                    <input className='check' ref={checkbox} type="checkbox" name="Stay logged in"/>
                </div><br/>
                <div className='registerCard'>
                    <h3>Register</h3>
                    <input ref={usernameR} type='text' placeholder='username'/>
                    <input ref={passwordR1} type='text' placeholder='password' defaultValue=''/>
                    <input ref={passwordR2} type='text' placeholder='password' defaultValue=''/>
                    <input ref={age} type='number' defaultValue='18'/>
                    <select ref={gender}>
                        <option value='male'>male</option>
                        <option value='female'>female</option>
                    </select>
                    <select ref={city}>
                        {['Vilnius', 'Palanga', 'Plungė', 'Rietavas', 'Linkuva', 'Babrungėnai', 'Kitas kaimas'].map((x, i)=><option key={i} value={x}>{x}</option>) }
                    </select>
                    <button onClick={register}>Register</button>
                </div>
            </div>
            <h1>{error}</h1>
        </div>
    );
};

export default LoginPage;
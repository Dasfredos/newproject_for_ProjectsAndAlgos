import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = ({setUser}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/login',{ email, password}, { withCredentials: true })
            .then ( res => {
                setUser(res.data.user)
                navigate("/searchfootyevents");
            })
            .catch( err => {console.log(err.response.data); setErrors(err.response.data.errors)} )
    }

    return (
        <div className='max-content'>
            <h2 className='my-4'>
                Login
            </h2>

            {errors && <span className='accent'>{errors}</span>}
            <form onSubmit = {handleSubmit}>
                <label>
                    Email:
                    <input type='text' className="mx-2" onChange={ e => setEmail(e.target.value) }/>
                </label>
                <label>
                    Password:
                    <input type='password' className="mx-2" onChange={ e => setPassword(e.target.value) } />
                </label>
                <input type='submit' value='Submit' className='btn btn-secondary mt-3'/>
            </form>
        </div>
    )
}

export default Login
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = ({ setUser }) => {
    const [first, setFirst] = useState("")
    const [last, setLast] = useState("")
    const [email, setEmail] = useState("")
    const [confirmEmail, setConfirmEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [aboutMe, setAboutMe] = useState("")
    const [skillLevels, setSkillLevels] = useState(['', 'For Fun', 'Sunday League', 'College', 'Semi Pro', 'Pro']);
    const [skillLevel, setSkillLevel] = useState('')
    const [errors, setErrors] = useState('')
    const navigate = useNavigate()

    const handleSkillLevelChange = (e) => {
        setSkillLevel(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('register form')
        axios.post('http://localhost:3000/api/register', {
            first, last, email, confirmEmail, password, confirmPassword, skillLevel, aboutMe
        }, { withCredentials: true })
            .then(res => {
                console.log("logged user" + res.data.user)
                setUser(res.data.user)
                navigate("/searchfootyevents")

            })
            .catch(error => {
                console.log(error);
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    setErrors(error.response.data.errors);
                }
            })
    }
    return (

        <div class='container d-flex justify-content-center'>
            <div class="col-6 ">
                <h2 className="text-center mt-4">
                    Register
                </h2>
                <form className="mt-4" onSubmit={handleSubmit}>
                    <div className="form-group row justify-content-center mb-3">
                        <label className="col-sm-2 col-form-label">First Name:</label>
                        <div className="col-sm-6">
                            {errors.first && <span className="accent">{errors.first.message}</span>}
                            <input type='text' onChange={e => setFirst(e.target.value)} className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row justify-content-center mb-3">
                        <label className="col-sm-2 col-form-label">Last Name:</label>
                        <div className="col-sm-6">
                            {errors.last && <span className="accent">{errors.last.message}</span>}
                            <input type='text' onChange={e => setLast(e.target.value)} className="form-control" />
                        </div>
                    </div>

                    <div className="form-group row justify-content-center mb-3">
                        <label className="col-sm-2 col-form-label">Email:</label>
                        <div className="col-sm-6">
                            {errors.email && <span className="accent">{errors.email.message}</span>}
                            <input type='text' onChange={e => setEmail(e.target.value)} className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row justify-content-center mb-3">
                        <label className="col-sm-2 col-form-label">Confirm Email:</label>
                        <div className="col-sm-6">
                            {errors.confirmEmail && <span className="accent">{errors.confirmEmail.message}</span>}
                            <input type='text' onChange={e => setConfirmEmail(e.target.value)} className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row justify-content-center mb-3">
                        <label className="col-sm-2 col-form-label">Password:</label>
                        <div className="col-sm-6">
                            {errors.password && <span className="accent">{errors.password.message}</span>}
                            <input type='password' onChange={e => setPassword(e.target.value)} className="form-control" />
                        </div>
                    </div>

                    <div className="form-group row justify-content-center mb-3">
                        <label className="col-sm-2 col-form-label">Confirm Password:</label>
                        <div className="col-sm-6">
                            {errors.confirmPassword && <span className="accent">{errors.confirmPassword.message}</span>}
                            <input type='password' onChange={e => setConfirmPassword(e.target.value)} className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row justify-content-center ">
                        <label className="col-sm-2 col-form-label">Skill Level:</label>
                        <div className="col-sm-6">
                            {errors.skillLevel && <span className="accent">{errors.skillLevel.message}</span>}
                            <select value={skillLevel} onChange={handleSkillLevelChange} className="form-control" >
                                <option value="" disabled hidden>Select Skill Level...</option>
                                {skillLevels.map((color, index) => (
                                    <option key={index} value={color}>
                                        {color}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group row justify-content-center mb-3">
                        <label className="col-sm-2 col-form-label">About Me:</label>
                        <div className="col-sm-6">
                            {errors.aboutMe && <span className="accent">{errors.aboutMe.message}</span>}
                            <textarea
                                rows="5"
                                onChange={e => setAboutMe(e.target.value)}
                                className="form-control"
                                placeholder="Tell us about yourself">
                            </textarea>
                        </div>
                    </div>
                    <div className="form-group justify-content-center">
                        <input type='submit' value='Submit' className="btn btn-primary mt-3" />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Register
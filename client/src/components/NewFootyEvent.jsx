import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function NewFootyEvent(props) {
    const autocompleteInputRef = useRef(null);
    const [errors, setErrors] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        address: ''
    });
    const navigate = useNavigate();

    const handleInputChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        
        axios.post('http://localhost:3000/api/createfootyevent', formData, { withCredentials: true })
            .then(res => {
                navigate('/searchfootyevents');
            })
            .catch(err => {
                setErrors(err.response.data.errors);
            });
    }

    return (
        <div className="container d-flex justify-content-center mt-4 ">
        <div className="col-6">
            <form onSubmit={handleSubmit}>
                <div className='form-group row justify-content-center'>
                    <label htmlFor="name" className="col-sm-2 col-form-label">Park/Meet Up Location:</label>
                    <div className="col-sm-6">
                        <input
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                    </div>
                </div>

                <div className='form-group row justify-content-center'>
                    <label htmlFor="date" className="col-sm-2 col-form-label">Date:</label>
                    <div className="col-sm-6">
                        <input
                            className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                        />
                        {errors.date && <div className="invalid-feedback">{errors.date.message}</div>}
                    </div>
                </div>

                <div className='form-group row justify-content-center'>
                    <label htmlFor="time" className="col-sm-2 col-form-label">Time:</label>
                    <div className="col-sm-6">
                        <input
                            className={`form-control ${errors.time ? 'is-invalid' : ''}`}
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                        />
                        {errors.time && <div className="invalid-feedback">{errors.time.message}</div>}
                    </div>
                </div>
                <div className='form-group row justify-content-center'>
                    <label htmlFor="address" className="col-sm-2 col-form-label">Address:</label>
                    <div className="col-sm-6">
                        <input
                            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                            ref={autocompleteInputRef}
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                        {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
                    </div>
                </div>
                <div className="form-group justify-content-center">
                    <button type="submit" className='btn btn-secondary mt-3'>Submit</button>
                </div>
            </form>
        </div>
    </div>

    );
}
export default NewFootyEvent;


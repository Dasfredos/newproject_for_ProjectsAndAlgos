import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from 'axios';

function EditEvent(props) {
    const autocompleteInputRef = useRef(null);
    const { user, setUser } = props;
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        address: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState('');


    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/footyevent/${id}`, { withCredentials: true })
            .then(res => { console.log(res.data)
                const { name, date, time, address } = res.data;
                setFormData({ name, date, time, address });
            })
            .catch(err => {
                console.log("Couldnt edit event: ", err);
            });
    }, [id]);

    const handleInputChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .patch(`http://localhost:8000/api/footyevent/${id}`, formData, { withCredentials: true })
            .then(res => {
                console.log("handleSubmit", formData);
                console.log(res);
                console.log(res.data);
                navigate(`/searchfootyevents`);
            })
            .catch(err => {
                console.log(err);
                setErrors(err.response.data.errors);
            });
    };

    return (
        <div className="container d-flex justify-content-center mt-4">
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
                                value={formData.date.substring(0, 10)}
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

export default EditEvent;

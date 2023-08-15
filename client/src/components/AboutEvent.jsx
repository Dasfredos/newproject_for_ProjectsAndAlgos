import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link, useNavigate } from "react-router-dom";

const AboutEvent = (props) => {
    const [events, setEvents] = useState([]);
    const { user, setUser } = props;
    const [footyevent, setFootyEvent] = useState({})
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        address: '',
        creator: {
            first: '',
            last: ''
        }
    });

    useEffect(() => {
        axios.get(`http://localhost:8000/api/footyevent/${id}`)
            .then(res => {
                console.log(res.data);
                setFootyEvent(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/footyevent/${id}`, { withCredentials: true })
            .then(res => {
                console.warn(res.data);
                const { name, date, time, address, creator } = res.data;
                setFormData({ name, date, time, address, creator });
            })
            .catch(err => {
                console.log("Error with event: ", err);
            });
    }, [id]);


    const convertTo12HourFormat = (timeString) => {
        const timeParts = timeString.split(':');
        let hours = parseInt(timeParts[0], 10);
        const minutes = timeParts[1];
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + ':' + minutes + ' ' + ampm; 
    }

// `try to understand more

    return (
        <div>
            <h2 className="mt-4">{formData.name}</h2>
            <p className="mt-4"> </p>
            <p>Address: {formData.address}</p>
            <p>Date: {formData.date.substring(0, 10)}</p>
            <p>Time: {convertTo12HourFormat(formData.time)}</p>
            <div>
                <p className=''>Created by: {formData.creator.first} {formData.creator.last} </p>
            </div>
        </div>
    )
}

export default AboutEvent
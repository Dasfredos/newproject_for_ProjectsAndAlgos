import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link, useNavigate } from "react-router-dom";

const AboutUser= (props) => {
    const [events, setEvents] = useState([]);
    const { user, setUser } = props;
    const [footyEvent, setFootyEvent] = useState({})
    const { id } = useParams();
    const navigate = useNavigate();


    const [formData, setFormData] = useState({

        creator: {
            first: '',
            last: '',
            aboutMe: '',
            skillLevel: ''
        }
    });


    useEffect(() => {
        axios.get(`http://localhost:3000/api/user/${id}`)
            .then(res => {
                console.log(res.data);
                setFootyEvent(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/footyevents/${id}`)
            .then(res => {
                console.log(res.data);
                setFootyEvent(res.data);

            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/footyevents/${id}`, { withCredentials: true })
            .then(res => {
                console.warn(res.data);
                const { name, date, time, address, creator } = res.data;
                setFormData({ name, date, time, address, creator });
            })
            .catch(err => {
                console.log("Error fetching footy event: ", err);
            });
    }, [id]);

    return (
        <div>
            <h2 className="mt-4">{formData.creator.first} {formData.creator.last}</h2>
            <div>
                <p className="mt-4"> </p>
            </div>
            <div>
                <p>Skill Level: {formData.creator.skillLevel}</p>
            </div>


            <div>
                <p className=''>About Me:  </p>
                <p>{formData.creator.aboutMe}</p>
            </div>
        </div>
    )
}

export default AboutUser
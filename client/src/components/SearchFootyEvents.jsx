import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link, useNavigate } from "react-router-dom";


const SearchFootyEvents = (props) => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    SearchFootyEvents.defaultProps = {
        user: {}
    };


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const fetchFootyEvents = () => {
        const url = searchTerm ? `http://localhost:8000/api/footyevents?address=${searchTerm}` : "http://localhost:8000/api/footyevents";
        axios.get(url)
            .then((res) => {
                const currentDate = new Date();
                const currentHour = currentDate.getHours();
                const currentMinute = currentDate.getMinutes();
                console.log(res.data);
                const futureEvents = res.data.filter((event) => {
                    if (new Date(event.date) > currentDate) {
                        return true;
                    }
                    else if (new Date(event.date).setHours(0, 0, 0, 0) === currentDate.setHours(0, 0, 0, 0)) {
                        const eventTime = event.time.split(':');
                        const eventHour = parseInt(eventTime[0], 10);
                        const eventMinute = parseInt(eventTime[1], 10);
                        return (eventHour > currentHour || (eventHour === currentHour && eventMinute > currentMinute));
                    }
                    return false;
                });

                setEvents(futureEvents);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(fetchFootyEvents, [searchTerm]);

    const convertTo12HourFormat = (timeString) => {
        const timeParts = timeString.split(':');
        let hours = parseInt(timeParts[0], 10);
        const minutes = timeParts[1];
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + ':' + minutes + ' ' + ampm;
    }

    const deleteFootyEvent = (id) => {
        axios.delete(`http://localhost:8000/api/footyevents/${id}`)
            .then(res => {
                fetchFootyEvents();
            })
            .catch(err => console.error(err));
    };

    return (
        <div className='bg-dark text-white searchpage' >
            <h1 className="py-4">Footy PickUp Events</h1>
            <h4 className="mt-4"> Find pick up games near you!</h4>
            <label htmlFor="search" className='mx-2' >Search for a pick up event!</label>
            <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search by address" className='my-4' />

            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th className='text-white'>Park/Meet Up Location:</th>
                        <th className='text-white'>Action:</th>
                        <th className='text-white'>Address:</th>
                        <th className='text-white'>Date:</th>
                        <th className='text-white'>Time:</th>
                        <th className='text-white'>Created By:</th>
                    </tr>
                </thead>

                <tbody>
                    {props.user._id}
                    {
                        Array.isArray(events) && events.map((place, idx) => {


                            return (
                                <tr key={idx}>
                                    <td className='text-white'>
                                        <Link className='text-white' to={`/viewfootyevents/${place._id}`}> {place.name}</Link></td>


                                    <td className='text-white'> {props.user && props.user._id === place.creator._id && <button className='btn btn-danger' onClick={() => deleteFootyEvent(place._id)}>Delete</button>}
                                        {
                                            props.user._id === place.creator._id &&
                                            <Link to={`/editfootyevent/${place._id}`}>
                                                <button className='btn btn-warning mx-2'>Edit</button>
                                            </Link>
                                        }
                                        <Link className="btn btn-primary" to={`/viewfootyevents/${place._id}`}> View</Link>
                                    </td>
                                    <td className='text-white'>{place.address}</td>
                                    <td className='text-white'>{place.date}</td>
                                    <td className='text-white'>{convertTo12HourFormat(place.time)}</td>

                                    <Link className="btn btn-primary" to={`/user/${place._id}`}>

                                        <td className='text-white'>{place.creator.first} {place.creator.last} </td>
                                    </Link>
                                </tr>
                            )
                        })}
                </tbody>
            </table>

        </div>
    )
}

export default SearchFootyEvents
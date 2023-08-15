import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';


const NavBar = ({ user, setUser }) => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/user-current`, { withCredentials: true })
            .then(res => {
                console.log("current user" + res.data)
                setUser(res.data);

            })
            .catch(err => {
                console.log("current user error: " + err);
                setUser({});

            });

    }, []);


    const handleToggle = () => {
        setNavbarOpen(!navbarOpen);
    }

    const closeMenu = () => {
        setNavbarOpen(false);
    }

    const handleLogout = (e) => {
        console.log("logging out");
        axios
            .get('http://localhost:8000/api/logout', { withCredentials: true })
            .then(res => {
                setUser(null);
                console.log("successful logout")
                window.location.href = '/'
            })
            .catch(err => console.log("logout error: " + err));
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" onClick={handleToggle}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${navbarOpen ? "show" : ""}`} id="navbarTogglerDemo02">
                <ul className="navbar-nav mx-auto text-center">
                    <h3 className="navbar-brand">{(user && user.first) ? `Hi ${user.first},` : ""}</h3>
                    {(
                        location.pathname === '/createfootyevent' ||
                        location.pathname.startsWith('/editfootyevent') ||
                        location.pathname.startsWith('/viewfootyevent') ||
                        location.pathname.startsWith('/user')
                    ) ? (
                        <>
                            <li className="nav-item active">
                                <Link to="/searchfootyevents" className="nav-link" onClick={closeMenu}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/logout" className="nav-link" onClick={handleLogout}>Logout</Link>
                            </li>
                        </>
                    ) : (location.pathname === '/searchfootyevents') ? (
                        <>
                            <li className="nav-item">
                                <Link to="/createfootyevent" className="nav-link" onClick={closeMenu}>Create Footy Event</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/logout" onClick={handleLogout} className="px-4 nav-link" onChange={closeMenu}>Logout</Link>
                            </li>
                        </>
                    ) : (user && user.first) ? (
                        <>
                            <li className="nav-item">
                                <Link to="/createfootyevent" className="nav-link" onClick={closeMenu}>Create Footy Event</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/logout" onClick={handleLogout} className="nav-link" onChange={closeMenu}>Logout</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link" onClick={closeMenu}>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link" onClick={closeMenu}>Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;

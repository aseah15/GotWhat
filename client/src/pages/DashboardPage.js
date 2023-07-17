import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import SideMenu from '../components/SideMenu';
import { Link } from "react-router-dom";

export default function DashboardPage() {
    const { token, isAuthenticated, logout } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [operatingHours, setOperatingHours] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        if (isAuthenticated) {
            //Retrieve User Information
            getUserInformation();
        }
    }, [isAuthenticated]);

    const getUserInformation = async () => {
        try {
            //check route
            const response = await axios.get(`${backendUrl}/user`, 
            {withCredentials: true, 
                headers: {Authorization: `Bearer ${token}`, } });

            const userData = response.data.user;
            const { name, role, email, operatingHours, address, contact } = userData;
            setName(name);
            setRole(role);
            setEmail(email);
            setOperatingHours(operatingHours);
            setAddress(address);
            setContact(contact);
        } catch (error) {
            alert(error.response.data.error);
        }
    };

    const handleUpdatePassword = async (event) => {
        event.preventDefault();

        if (currentPassword === newPassword) {
            return alert("New password is the same as the current password!")
        }

        if (newPassword !== repeatNewPassword) {
            return alert("Passwords do not match!");
        }

        try {
            //check route
            const response = await axios.patch(`${backendUrl}/user/password`, 
            { currentPassword, newPassword }, 
            { withCredentials: true, 
                headers: {Authorization: `Bearer ${token}`, }});

            console.log(response);

            console.log(response.data.message);
            setCurrentPassword('');
            setNewPassword('');
            setRepeatNewPassword('');
        } catch (error) {
            alert(error.response.data.error);
        }
    };

    //check what other logic is needed
    const handleLogout = () => {
        logout();
    }

  return (
    <div className='bg-[#365b6d] h-screen'>
        <SideMenu />
        { isAuthenticated ? (
            <div>
                <h2 className='justify-center pt-20 pb-8 lg:px-8 text-center text-4xl font-bold text-white'>Welcome, { name }</h2>               

                <div className='grid grid-cols-2 p-12'>
                    <div className='font-bold text-white p-6'>
                        <div className='mb-8 text-2xl'>
                            <h3>Role: </h3> { role }
                        </div>

                        {/* user.avatar && <img src={user.avatar} alt="Avatar" className='rounded-full h-20 w-20 mb-4' /> */}

                        <div className='flex mb-8 text-2xl'>
                            <h3>Email: { email }</h3> 
                        </div>

                        {role === "business" && 
                            <div>
                                <div className='mb-8 text-2xl'>
                                    <h3>Operating Hours:</h3> { operatingHours }
                                </div>

                                <div className='mb-8 text-2xl'>
                                    <h3>Address:</h3> { address }
                                </div>

                                <div className='mb-8 text-2xl'>
                                    <h3>Contact:</h3> { contact }
                                </div>
                            </div>
                        }

                        <Link to="/home">
                            <button onClick={handleLogout} className='bg-red-500 text-white px-4 py-2 rounded'>
                                Logout
                            </button>
                        </Link>
                    </div>

                    <form onSubmit={ handleUpdatePassword } className='bg-white border rounded shadow p-6'>
                        <h2 className="text-xl font-bold mb-4 text-center">Update your password</h2>
                        <div className='mb-4'>
                            <label htmlFor="currentPassword" className='block mb-2 font-bold'>
                                Current Password
                            </label>
                            <input 
                                type="password" 
                                id="currentPassword" 
                                className='border rounded px-3 py-2 w-full' 
                                value={currentPassword}
                                onChange={(event) => setCurrentPassword(event.target.value)}
                                required 
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="newPassword" className='block mb-2 font-bold'>
                                New Password
                            </label>
                            <input 
                                type="password" 
                                id="newPassword" 
                                className='border rounded px-3 py-2 w-full' 
                                value={newPassword}
                                onChange={(event) => setNewPassword(event.target.value)}
                                required 
                            />                        
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="repeatNewPassword" className='block mb-2 font-bold'>
                                Repeat New Password
                            </label>
                            <input 
                                type="password" 
                                id="repeatNewPassword" 
                                className='border rounded px-3 py-2 w-full' 
                                value={repeatNewPassword}
                                onChange={(event) => setRepeatNewPassword(event.target.value)}
                                required 
                            />                        
                        </div>
                        <button type='submit' className='bg-blue-500 text-white font-bold px-4 py-2 rounded'>
                            Update Password
                        </button>
                    </form>
                </div>
            </div>
        ) : (
            <div>
                <h2 className='flex h-screen items-center justify-center text-4xl font-bold text-white'>Please login to access the dashboard</h2>
                {/* render login form or redirect to login page or can just leave it for user to go to side menu to click on log in */}
            </div>
        )};
    </div>
  );
};
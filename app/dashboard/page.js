// dashboard/page.jsx
'use client'
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Form from '../components/Form';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/getAllUsers');
                console.log(response)
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (users.length > 0 && user) {
            const loggedInUserData = users.find(u => u.email === user.email);
            setLoggedInUser(loggedInUserData);
            setLoading(false);
        }
    }, [users, user]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen gap-6">
            <h1 className='text-3xl text-lime-300'>Dashboard</h1>
            <Form initialData={loggedInUser} onSubmit={() => {}} />
        </div>
    );
};

export default Dashboard;

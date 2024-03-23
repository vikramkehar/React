import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditUserModal = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the user ID from the URL
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        date_of_birth: '',
        created_at: '',
        project_id: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:3002/getuser/${id}`);
                const userData = await response.json();
                setFormData(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:3002/updateuser/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data.message);
            navigate('/');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handlecancel= () =>{
        navigate("/")
    };

    return (
        <div className="container">
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="project_id" className="form-label">Project ID</label>
                    <input type="integer" className="form-control" id="project_id" name="project_id" value={formData.project_id} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="first_name" name="first_name" value={formData.first_name} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="last_name" name="last_name" value={formData.last_name} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="date_of_birth" className="form-label">Date of Birth</label>
                    <input type="date" className="form-control" id="date_of_birth" name="date_of_birth" value={formData.date_of_birth} onChange={handleInputChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="submit" className="btn btn-primary" onClick={handlecancel}>Cancel</button>
            </form>
        </div>
    );
};

export default EditUserModal;


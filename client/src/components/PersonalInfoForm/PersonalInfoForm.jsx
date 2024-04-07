import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import './PersonalInfoForm.css';

const PersonalInfoForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        country: '',
        city: '',
        zipCode: '',
        password: '' 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData); // For example, you can log the form data to the console
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputProps={{ style: { borderRadius: '25px' } }} // Rounded corners styling
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputProps={{ style: { borderRadius: '25px' } }} // Rounded corners styling
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputProps={{ style: { borderRadius: '25px' } }} // Rounded corners styling
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Phone Number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputProps={{ style: { borderRadius: '25px' } }} // Rounded corners styling
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputProps={{ style: { borderRadius: '25px' } }} // Rounded corners styling
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputProps={{ style: { borderRadius: '25px' } }} // Rounded corners styling
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Zip Code"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputProps={{ style: { borderRadius: '25px' } }} // Rounded corners styling
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputProps={{ style: { borderRadius: '25px' } }} // Rounded corners styling
                    />
                </Grid> {/* Move the closing tag to here */}
            </Grid>

            <div style={{ textAlign: 'center' }}>
                <Button type="submit" variant="contained" color="primary" sx={{ bgcolor: '#012F74' }}>
                    Save
                </Button>
            </div>
        </form>
    );
};

export default PersonalInfoForm;

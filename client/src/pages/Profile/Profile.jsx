import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import PSidebar from '../../components/PSidebar/PSidebar';
import PersonalInfoForm from "../../components/PersonalInfoForm/PersonalInfoForm.jsx";

const Profile = () => {
    return (
        <Grid container spacing={2} sx={{ width: '95%' }}>
            <Grid item xs={3}>
                <PSidebar />
            </Grid>
            <Grid item xs={12} md={9}>
                <Paper sx={{ padding: 2, marginTop: 4 }}>
                    <Typography variant="h6" sx={{ fontFamily: 'Montserrat', fontSize: '36pt', fontWeight: '600', marginBottom: 2, textAlign: 'center' }}>Personal Information</Typography>
                    {/* Moved the PersonalInfoForm component inside the Grid container */}
                    <Grid container spacing={2} direction="column" alignItems="flex-start"> {/* Set alignItems to 'flex-start' to left-align items */}
                        <Grid item xs={12}>
                            <PersonalInfoForm />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Profile;


// //old sidebar with no buttons
import React from 'react';
import { NavLink } from 'react-router-dom';
import './PSidebar.css';

const PSidebar = () => {
    const handleSignOut = () => {
        // Handle sign out logic
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h3>User Profile Management</h3>
            </div>
            <nav className="sidebar-links">
                <NavLink className="sidebar-link" to="/profile">Personal Info</NavLink>
                {/* <NavLink className="sidebar-link" to="/profile/emails-passwords">Emails & Passwords</NavLink> */}
                <NavLink className="sidebar-link" to="/pastorders">Past Orders</NavLink>
                <NavLink className="sidebar-link" to="/" onClick={handleSignOut}>Sign Out</NavLink>
            </nav>
        </div>
    );
};

export default PSidebar;


// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import EmailIcon from '@mui/icons-material/Email';
// import HistoryIcon from '@mui/icons-material/History';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import './PSidebar.css';

// const PSidebar = () => {
//     const handleSignOut = () => {
//         // Handle sign out logic
//     };

//     return (
//         <div className="sidebar">
//             <div className="sidebar-header">
//                 <h3>User Profile Management</h3>
//             </div>
//             <nav className="sidebar-links">
//                 <List>
//                     <ListItem button component={NavLink} to="/profile/personal-information">
//                         <ListItemIcon>
//                             <AccountCircleIcon />
//                         </ListItemIcon>
//                         <ListItemText primary="Personal Info" />
//                     </ListItem>
//                     <ListItem button component={NavLink} to="/profile/emails-passwords">
//                         <ListItemIcon>
//                             <EmailIcon />
//                         </ListItemIcon>
//                         <ListItemText primary="Emails & Passwords" />
//                     </ListItem>
//                     <ListItem button component={NavLink} to="/profile/past-orders">
//                         <ListItemIcon>
//                             <HistoryIcon />
//                         </ListItemIcon>
//                         <ListItemText primary="Past Orders" />
//                     </ListItem>
//                     <ListItem button onClick={handleSignOut}>
//                         <ListItemIcon>
//                             <ExitToAppIcon />
//                         </ListItemIcon>
//                         <ListItemText primary="Sign Out" />
//                     </ListItem>
//                 </List>
//             </nav>
//         </div>
//     );
// };

// export default PSidebar;


// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import HistoryIcon from '@mui/icons-material/History';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import './PSidebar.css';

// const PSidebar = () => {
//     const handleSignOut = () => {
//         // Handle sign out logic
//     };

//     return (
//         <div className="sidebar">
//             <div className="sidebar-header">
//                 <h3>User Profile Management</h3>
//             </div>
//             <nav className="sidebar-links">
//                 <List>
//                     <ListItem button component={NavLink} to="/profile/personal-information">
//                         <ListItemIcon>
//                             <AccountCircleIcon />
//                         </ListItemIcon>
//                         <ListItemText primary="Personal Info" />
//                     </ListItem>
//                     {/* Removed the Emails & Passwords tab */}
//                     <ListItem button component={NavLink} to="/profile/past-orders">
//                         <ListItemIcon>
//                             <HistoryIcon />
//                         </ListItemIcon>
//                         <ListItemText primary="Past Orders" />
//                     </ListItem>
//                     <ListItem button onClick={handleSignOut}>
//                         <ListItemIcon>
//                             <ExitToAppIcon />
//                         </ListItemIcon>
//                         <ListItemText primary="Sign Out" />
//                     </ListItem>
//                 </List>
//             </nav>
//         </div>
//     );
// };

// export default PSidebar;


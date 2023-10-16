// LeftNavBar.tsx
import React, { useState } from 'react';
import MenuItem from '../../MenuItem';
import './style.css';
import { useNavigate,useLocation  } from 'react-router-dom';
import { UseAppContext } from '../../../contexts/appContext';
import ConfirmDialog from '../../ConfirmDialog/ConfirmDialog'; // Adjust the path if ConfirmDialog.tsx is located elsewhere

const LeftNavBar: React.FC = () => {
    const appContext = UseAppContext();
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);

    function handleLogout() {
        sessionStorage.clear();
        localStorage.clear();
        appContext.clear(); // Ensure this method exists and is typed correctly within your context
        navigate("/signin");
    }

    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    return (
        <div className='LeftNavBar'>
            <img className="logo" src='/Logo.svg' alt="Logo" />
            <div className='MenuItems'>
                <div onClick={() => {navigate("/"); }}  className={splitLocation[1] === "" ? "active" : ""}>
                    <MenuItem value="Generators" logoClass='fas fa-cogs' menuIcon="/images/icon1.svg" />
                </div>
                <div onClick={() => {navigate("/moderation"); }} className={splitLocation[1] === "moderation" ? "active" : ""}>
                    <MenuItem value="Moderation" logoClass='fas fa-gavel' menuIcon="/images/icon2.svg"/>
                </div>
                <div onClick={() => {navigate("/gallery"); }} className={splitLocation[1] === "gallery" ? "active" : ""}>
                    <MenuItem value="Gallery" logoClass='fas fa-images' menuIcon="/images/icon3.svg"/>
                </div>
                <div className='border'></div>
                <MenuItem value="My Organization" logoClass='fas fa-building' isDisabled={false} menuIcon="/images/icon4.svg"/>
                <MenuItem value="Support" logoClass='fas fa-headset' isDisabled={false} menuIcon="/images/icon5.svg"/>
                <div className="logout" onClick={() => setOpenDialog(true)}>
                    <MenuItem value="Logout" logoClass='fas fa-sign-out-alt' menuIcon="/images/icon6.svg"/>
                </div>
            </div>

            <ConfirmDialog 
                open={openDialog}
                title="Confirm Logout"
                message="Are you sure you want to log out?"
                onConfirm={() => { handleLogout(); setOpenDialog(false); }}
                onCancel={() => setOpenDialog(false)}
            />
            {/* <div style={{color:"black", padding:"0.5rem", position:"absolute", bottom: 0}}>version:0.1 build: {process.env.REACT_APP_GIT_COMMIT?.slice(0,4)}</div> */}
        </div>
    );
}

export default LeftNavBar;

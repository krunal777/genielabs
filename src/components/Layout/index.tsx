/* eslint-disable */
import React, { ReactNode, useEffect } from 'react';
import './style.css';
import LeftNavBar from './LeftNavBar/LeftNavBar';
import TopNavBar from './TopNavBar';
import Select3DObjectScreen from '../../Screens/Select3DObjectScreen/Select3DObjectScreen';
import SelectCharacter from '../../Screens/SelectCharacter/SelectCharacter';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import EnterPromptScreen from '../../Screens/EnterPromptScreen/EnterPromptScreen';
import { UseAppContext } from '../../contexts/appContext';
import GalleryScreen from '../../Screens/GalleryScreen/GalleryScreen';
import ModerationScreen from '../../Screens/ModerationScreen/ModerationScreen';
import { Button } from '@mui/material';


import Tabs from "./tabs/Tabs";
import Tab from "./tabs/Tab";

interface LayoutProps {
  children?: ReactNode;
}


function Layout({children}: LayoutProps) {
  const navigate = useNavigate();
  const appContext = UseAppContext();
  const auth = useAuth()
  useEffect(() => {
    if (sessionStorage.getItem("loggedIn") === null){
      navigate("/signin")
    }
  }, []);
  return (
    
    <div className="Layout">
             <LeftNavBar/>
             <div className='Box'>
             <TopNavBar/>
              <div style={{marginTop:80}}>
                {/* <Tabs>
                    <Tab title="tab 1"><div>Hello CodeSandbox</div></Tab>
                    <Tab title="tab 2"><div>Start editing to see some magic happen!</div></Tab>
                    <Tab title="tab 3">tab 3</Tab>
                    <Tab title="tab 4">tab 4</Tab>
                </Tabs> */}

                <Routes >
                  <Route path="/" element={<SelectCharacter/>}/>
                  <Route path="/Select3DObjectScreen" element={<Select3DObjectScreen/>}/>
                  <Route path="/enter_prompt" element={<EnterPromptScreen/>}/>
                  <Route path="/gallery" element={<GalleryScreen/>}/>
                  <Route path="/moderation" element={<ModerationScreen/>}/>
                </Routes>
                </div>
              </div>      

    </div>
  );
}

export default Layout;
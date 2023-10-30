import { useState, useEffect } from 'react';
import * as React from 'react';
import './GalleryScreen.css';
import '../screen.css';
import api from '../../api';
import Objects3DGallery from '../../components/Objects3DGallery/Objects3DGallery';
import { Object3D } from '../../contexts/appContext';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FilterComponent from './FilterComponent';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}





function GalleryScreen() {
    const [objects3D, setObjects3D] = useState<Array<Object3D>>([]);

    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        api.get("/get_revisions?limit=50").then(res => {
            setObjects3D(res.data);
        });
    }, []);

    return (
        <div className='gallery_wrapper'>
            <div className="top_heading">
                <h2>Prompts Gallery</h2>            
                <button className="start_over_btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20.8216 15C19.5618 18.8327 15.9539 21.6 11.6996 21.6C6.39768 21.6 2.09961 17.302 2.09961 12C2.09961 6.69809 6.39768 2.40002 11.6996 2.40002C14.8094 2.40002 17.5739 3.87872 19.3283 6.17137M20.0153 7.20002C19.8081 6.84187 19.5785 6.49834 19.3283 6.17137M19.3283 6.17137L17.0996 8.40002H21.8996V3.60002L19.3283 6.17137ZM19.4996 8.00002L20.9996 6.00002" stroke="#343434" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    Start over
                </button>
            </div>
            <div className='gallery_tab tab_css'>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="User’s Prompts" {...a11yProps(0)} />
                            <Tab label="My Propmpts" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <div className="gallery_listing">
                            <FilterComponent/>
                            <Objects3DGallery 
                                objects={objects3D} 
                                selectedObject={null} 
                                selectable={false} 
                                show3D={false} 
                            />
                        </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        No data
                    </CustomTabPanel>
                </Box>
            </div>
        </div>
    );
}

export default GalleryScreen;

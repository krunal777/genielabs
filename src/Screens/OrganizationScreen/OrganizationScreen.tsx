import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EditableTextList from '../../components/AccountDetails/AccountDetails';
import ApiToken from '../../components/ApiToken/ApiToken';


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

export default function OrganizationScreen() {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
  
    return (
        <div className="organization_wrapper">
            <div className='tab_css'>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Account Details" {...a11yProps(0)} />
                            <Tab label="API Token" {...a11yProps(1)} />
                            <Tab label="Plan and Credits" {...a11yProps(2)} />
                            <Tab label="Admins" {...a11yProps(3)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <EditableTextList/>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <ApiToken/>     
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                    Item Three
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                    Item four
                    </CustomTabPanel>
                </Box>
            </div>
        </div>
    );
}



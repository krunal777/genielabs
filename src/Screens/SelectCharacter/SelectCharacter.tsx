import { useEffect, useState } from 'react';
import './SelectCharacter.css';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { Object3D, UseAppContext } from '../../contexts/appContext';
import { Render3DObjects } from '../../components/Render3DObjects/Render3DObjects';
import Tabs from "../../components/TabComponent/Tabs";


function SelectCharacter() {
    const appContext = UseAppContext();
    const navigate = useNavigate();
    const [filteredObjects, setFilteredObjects] = useState<Array<Object3D>>([]);
    const [activeObjectName, setActiveObjectName] = useState<string>()


    useEffect(()=>{
        setFilteredObjects(appContext.available3DObjects)
        setActiveObjectName(appContext.available3DObjects[0]?.name)
    } , [appContext.available3DObjects])
    return (
        <div className='avtar_clothong'>
             {/* new_avtar */}
             <div className='new_avtar'>
                <Button variant="outlined">                    
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6L12 18M18 12L6 12" stroke="#343434" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                    Create New Generator
                </Button>
            </div>
            {/* new_avtar */}

            {/* tabing */}
            <Tabs />
            {/* tabing end */}


        </div>    
    );
}

export default SelectCharacter;

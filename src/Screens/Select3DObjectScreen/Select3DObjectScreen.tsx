import { useEffect, useState } from 'react';
import './Select3DObjectScreen.css';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { Object3D, UseAppContext } from '../../contexts/appContext';
import { Render3DObjects } from '../../components/Render3DObjects/Render3DObjects';



function Select3DObjectScreen() {
    const appContext = UseAppContext();
    const navigate = useNavigate();
    const [filteredObjects, setFilteredObjects] = useState<Array<Object3D>>([]);
    const [activeObjectName, setActiveObjectName] = useState<string>()

    useEffect(()=>{
        setFilteredObjects(appContext.available3DObjects)
        setActiveObjectName(appContext.available3DObjects[0]?.name)
    } , [appContext.available3DObjects])
    return (
        <div className="screen">
            <div className="header">
                <h1>Unleash Your Imagination!</h1>
            </div>

            <div className="sub-header">
                <h2>Pick Your 3D Star</h2>
            </div>

            {filteredObjects.length > 0 ? (
                <div className="Objects3DGallery">
                    <Render3DObjects 
                        objects={filteredObjects} 
                        onActiveObjectIndexChange = {
                            (new_name)=>{
                                setActiveObjectName(new_name); 
                                appContext.setSelectedObject(appContext.available3DObjects.filter((obj)=>obj.name === new_name)[0])
                            
                        }}
                    />
                </div>
            ) : (
                'Loading...'
            )}
              <Button 
                    variant="contained" 
                    color="default" 
                    onClick={() => 
                        {   
                        navigate("/enter_prompt")
                }}
                >
                    Ready to Roll! 
                </Button>
        </div>
    );
}

export default Select3DObjectScreen;

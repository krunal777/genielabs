import { useEffect, useState } from 'react';
import './SelectCharacter.css';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { Object3D, UseAppContext } from '../../contexts/appContext';
import { Render3DObjects } from '../../components/Render3DObjects/Render3DObjects';



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
                <path d="M12 6L12 18M18 12L6 12" stroke="#343434" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                    Create New Generator
                </Button>
            </div>
            {/* new_avtar */}
            <div className="screen">
                <div className="header">
                    <h1>Start creating something cool!</h1>
                </div>
                <div className="sub-header">
                    <h3>Choose the character you'd like to dress up</h3>
                </div>
                <div className='search-header'>
                    <input id="search-box" placeholder='Know the character’s name?' />
                </div>
                {/* {filteredObjects.length > 0 ? (
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
                </Button> */}
                <div className='wrap_charchter row'>
                    <div className='char_box col'>
                        <div className="char_img">
                            <img src="../../../images/box_1.png" alt="" />
                        </div>
                        <div className='char_name'>
                            <h3>Rainbow</h3>
                        </div>
                    </div>
                    <div className='char_box col'>
                        <div className="char_img">
                            <img src="../../../images/box_1.png" alt="" />
                        </div>
                        <div className='char_name'>
                            <h3>Rainbow</h3>
                        </div>
                    </div>
                    <div className='char_box col'>
                        <div className="char_img">
                            <img src="../../../images/box_1.png" alt="" />
                        </div>
                        <div className='char_name'>
                            <h3>Rainbow</h3>
                        </div>
                    </div>
                    <div className='char_box col'>
                        <div className="char_img">
                            <img src="../../../images/box_1.png" alt="" />
                        </div>
                        <div className='char_name'>
                            <h3>Rainbow</h3>
                        </div>
                    </div>
                    <div className='char_box col'>
                        <div className="char_img">
                            <img src="../../../images/box_1.png" alt="" />
                        </div>
                        <div className='char_name'>
                            <h3>Rainbow</h3>
                        </div>
                    </div>
                </div>
                <div className='start_btn_container'>
                    <button className='btn_black'>I picked my character, Let’s continue</button> 
                </div>
            </div>
        </div>    
    );
}

export default SelectCharacter;

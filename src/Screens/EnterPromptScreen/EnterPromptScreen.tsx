/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Button, LinearProgress, TextField, Typography } from '@material-ui/core';
import './style.css';
import { UseAppContext } from '../../contexts/appContext';
import { useNavigate } from 'react-router-dom';
import { getTexture, getResult } from '../../services/APIService'
import { Render3DObjects } from '../../components/Render3DObjects/Render3DObjects';
import { Object3D } from '../../contexts/appContext';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';




function EnterPromptScreen() {
    const appContext = UseAppContext();
    const navigate = useNavigate();
    const [creationId, setCreationId] = useState<string>("");
    const [prompt, setPrompt] = useState("");
    const [selectedParts, setSelectedParts] = useState<Array<string>>([]);
    const [objects, setObjects] = useState<Array<Object3D>>();

    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const [timeRemaining, setTimeRemaining] = useState<number>(0)
    const [timeLimit, setTimeLimit] = useState<number>(0)


    useEffect(() => {
        // Only set up the interval if timeRemaining is greater than 0
        if (timeRemaining > 0) {
            const intervalId = setInterval(() => {
                setTimeRemaining(prevTime => prevTime - 0.01);
            }, 10);
    
            // Clear the interval when the component is unmounted or when timeRemaining becomes 0
            return () => clearInterval(intervalId);
        }
    }, [timeRemaining]);



    const handlePartSelection = (part: string) => {
        if (selectedParts.includes(part)) {
            setSelectedParts(prevParts => prevParts.filter(p => p !== part));
        } else {
            setSelectedParts(prevParts => [...prevParts, part]);
        }
    };

    const fetchTextureAndResult = async () => {

        
        setIsWaiting(true);
        const textureData = await getTexture(selectedParts, appContext.selectedObject?.name, prompt, creationId);
        

        
        if (textureData?.creation_id && textureData?.time_remaining) {

            setTimeLimit(parseInt(textureData?.time_remaining)+ 5)
            setTimeRemaining(parseInt(textureData?.time_remaining) + 5 )

            setCreationId(textureData.creation_id);

        
            const getResultInterval = window.setInterval(async () => {
                const result = await getResult(textureData.creation_id);
                if (result.is_ready) {
                        if(appContext.selectedObject)
                        {
                            let temp  = {...appContext.selectedObject}
                            temp.glb_s3_path = result.s3_path
                            setObjects([temp])
                        }


                    clearInterval(getResultInterval);
                    setIsWaiting(false);
                    setTimeRemaining(0)
                }
            }, 3000);
        } else {
            console.error(textureData?.error);
            setIsWaiting(false);
        }

        setPrompt("");
        setSelectedParts([]);
    };

    useEffect(() => {
        if (!appContext.selectedObject) {
            console.error("no selected object")
            navigate("/");
        }
        if(appContext.selectedObject)
        {
            setObjects([appContext?.selectedObject])
        }
    }, [navigate]);

    return (
        <div className="screen">
            <div className="header">
                <h1>Design Your 3D Star</h1>
            </div>
  
                {
                    objects ? <Render3DObjects objects={objects} /> : "No object"
                }

                <TextField
                    disabled={isWaiting}
                    value={prompt}
                    onChange={(e) => { setPrompt(e.target.value) }}
                    placeholder="e.g Brown leather with red flower in pocket"
                    style={{width:500, marginTop:40, display: isWaiting ? "none" : ""}}
                />

            <div className="toggle-button-group" >
                {
                    !isWaiting ?                 <div className="parts-container" style={{display:"flex", flexDirection:"column"}}>
                    <div style={{color:"black", fontSize:25, marginBottom:10}}>Select parts:</div>
                        {appContext.selectedObject?.parts_3d ? appContext.selectedObject?.parts_3d.map(part => (
                            <Button 
                                variant={selectedParts.includes(part.name) ? 'contained' : 'text'}
                                key={part.name} 
                                onClick={() => handlePartSelection(part.name)}
                            >
                                {part.name.replace("_", " ").toLowerCase()}
                            </Button>
                        )) : <></>}
                    </div> : <></>
                }

            </div>

                <Button variant="contained" disabled={!prompt || isWaiting} onClick={fetchTextureAndResult}          style={{width:500, display: isWaiting ? "none" : ""}}>
                    Generate <AutoFixNormalIcon style={{marginLeft:"5"}}/> 
                </Button>
                <div style={{ marginTop: '16px' }}>
    {timeRemaining > 1 && (

        
        <>
            <LinearProgress variant="determinate" value={100-(timeRemaining / timeLimit)*100 }/>
            <Typography variant="caption" align="center" style={{ marginTop: 'px', color:"black", fontSize:20}}>
            Time Remaining: {timeRemaining.toFixed()}
            </Typography>
        </>
    )}
    {
       isWaiting && !timeRemaining ? "Calculating..." : <></> 
    }
</div>
            </div>
    );
}

export default EnterPromptScreen;
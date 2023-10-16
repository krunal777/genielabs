import { useState, useEffect } from 'react';
import './GalleryScreen.css';
import '../screen.css';
import api from '../../api';
import Objects3DGallery from '../../components/Objects3DGallery/Objects3DGallery';
import { Object3D } from '../../contexts/appContext';

function GalleryScreen() {
    const [objects3D, setObjects3D] = useState<Array<Object3D>>([]);

    useEffect(() => {
        api.get("/get_revisions?limit=50").then(res => {
            setObjects3D(res.data);
        });
    }, []);

    return (
        <div className="screen">
            <header style={{ paddingTop: "2.5rem" }}>
                <h1 style={{ 
                    color: '#343434', 
                    fontSize: 36, 
                    fontFamily: 'Roboto', 
                    fontWeight: '400', 
                    wordWrap: 'break-word' 
                }}>
                    Your Last Creations:
                </h1>
            </header>
            <Objects3DGallery 
                objects={objects3D} 
                selectedObject={null} 
                selectable={false} 
                show3D={false} 
            />
        </div>
    );
}

export default GalleryScreen;

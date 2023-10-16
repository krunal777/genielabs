/* eslint-disable */
import React, { useEffect, useState} from 'react';
import { Object3D, UseAppContext } from '../../contexts/appContext';
import "./Objects3DGallery.css";



interface Objects3DGalleryProps {
    objects: Object3D[];
    selectedObject: string | null;
    selectable: boolean;
    show3D?: boolean;
}

const Objects3DGallery: React.FC<Objects3DGalleryProps> = ({ objects, selectable, show3D }) => {
    const [selected, setSelected] = useState<string | null>(null);

    const appContext = UseAppContext();

    function onSelect(itemName: string) {
        if (selectable) {
            setSelected(itemName);
            let selectedObject = appContext.available3DObjects?.filter(item => item.name.toLowerCase() === itemName)[0];
            appContext.setSelectedObject(selectedObject);
            sessionStorage.setItem("selected3DObject", JSON.stringify(selectedObject));
        }
    }
    

    return (
        <div className="gallery-container" style={{width:"100%", height:"56vh", display:"flex", flexWrap: "wrap"}}>
            {objects.length  ? objects.map(item => (
                <div
                    key={item.name}
                    className={`gallery-item ${selected === item.name ? 'selected' : ''}`}
                    onClick={() => onSelect(item.name)}
                >
                    {!show3D ?
                        <img src={item.preview_s3_path} style={{ height: 200, width: 150 }} />
                        :
                        item.glb_s3_path ?
                            "" : item.name
                    }
                    {item?.prompt ? <div className="gallery-item-overlay">
                        {item?.prompt} <br></br> {item?.part_list ? `(${item.part_list.replace(" ", ", ")})` : ""}
                    </div> : ""}
                </div>
            )) : "Loading..."}
        </div>
    );
}

export default Objects3DGallery;

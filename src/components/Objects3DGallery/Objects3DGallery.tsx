import React, { useEffect, useState} from 'react';
import { Object3D, UseAppContext } from '../../contexts/appContext';
import "./Objects3DGallery.css";


interface Objects3DGalleryProps {
    objects: Object3D[];
    selectedObject: string | null;
    selectable: boolean;
    show3D?: boolean;
}

interface ItemType {
    
    selectedObject?: string | null;
    selectable?: boolean;
    show3D?: boolean;

    prompt?: string;
    preview_s3_path?: string;
    uuid?:string;
    creation_time?: string | any ;
    part_list?: string;
}

const Objects3DGallery: React.FC<Objects3DGalleryProps> = ({ objects, selectable, show3D }) => {
    const [selected, setSelected] = useState<string | null>(null);

    const [data, setData] = useState<ItemType[]>([]); // Use the defined type here
    const [selectedItem, setSelectedItem] = useState<ItemType | null>(null); // Use the defined type here
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const appContext = UseAppContext();

    function onSelect(item: any) {
        if (selectable) {
            // setSelected(item);
            // let selectedObject = appContext.available3DObjects?.filter(item => item.name.toLowerCase() === itemName)[0];
            // appContext.setSelectedObject(selectedObject);
            // sessionStorage.setItem("selected3DObject", JSON.stringify(selectedObject));
            setSelectedItem(item);
            setIsPopupOpen(true);
        }
    }

    const openPopup = (item: ItemType) => {
        setSelectedItem(item);
        setIsPopupOpen(true);
    };
    

    const closePopup = () => {
        setIsPopupOpen(false);
    };
    
    const dateTimeString =  selectedItem?.creation_time;
    let currDate,convertedTime;


    const convertDateFormat = (inputDate:string) => {
        const [month, day, year] = inputDate.split('/');
        return `${day}-${month}-${year}`;
    };

    if(typeof dateTimeString === 'string'){
        const [date, time] = dateTimeString.split(',');    
        currDate = convertDateFormat(date);
        convertedTime = time.split(':').slice(0, 2).join(':');
    }


    
    return (
        <>
        {isPopupOpen && (
                    
            <div className="popup">
                <div onClick={closePopup} className="popupWrap-bg"></div>
                <div className="popupWrap">
                    <div className="popupHaader">
                        <h4><strong>User ID</strong>: {selectedItem?.uuid}</h4>
                        <button onClick={closePopup} className='close_popup'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18M18 18L6 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </button>
                    </div>
                    <div className="popupBody">
                        <figure>
                            <img src={selectedItem?.preview_s3_path} alt={selectedItem?.preview_s3_path} /> 
                        </figure>
                    </div>
                    <div className="popupFooter">
                        <p>{selectedItem?.prompt}</p>
                        <div className="publish-info">
                            <div className="date">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                        <path d="M4.34295 5.5H11.6001M3.84772 1.5V2.70015M12.0001 1.5V2.7M14.4001 5.7L14.4001 12.5001C14.4001 14.1569 13.0569 15.5001 11.4001 15.5001H4.6001C2.94324 15.5001 1.6001 14.1569 1.6001 12.5001V5.7C1.6001 4.04315 2.94325 2.7 4.6001 2.7H11.4001C13.057 2.7 14.4001 4.04314 14.4001 5.7Z" stroke="#7C7C7C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </span>
                                <span>{currDate}</span>
                            </div>
                            <div className="time">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                        <path d="M10.1629 10.8115C10.5559 10.9425 10.9806 10.7301 11.1116 10.3371C11.2426 9.94419 11.0302 9.51945 10.6373 9.38846L10.1629 10.8115ZM8.0001 9.29997H7.2501C7.2501 9.6228 7.45667 9.9094 7.76293 10.0115L8.0001 9.29997ZM8.7501 5.95481C8.7501 5.5406 8.41431 5.20481 8.0001 5.20481C7.58588 5.20481 7.2501 5.5406 7.2501 5.95481H8.7501ZM10.6373 9.38846L8.23727 8.58846L7.76293 10.0115L10.1629 10.8115L10.6373 9.38846ZM8.7501 9.29997V5.95481H7.2501V9.29997H8.7501ZM13.6501 8.49997C13.6501 11.6204 11.1205 14.15 8.0001 14.15V15.65C11.9489 15.65 15.1501 12.4488 15.1501 8.49997H13.6501ZM8.0001 14.15C4.87969 14.15 2.3501 11.6204 2.3501 8.49997H0.850098C0.850098 12.4488 4.05126 15.65 8.0001 15.65V14.15ZM2.3501 8.49997C2.3501 5.37957 4.87969 2.84998 8.0001 2.84998V1.34998C4.05126 1.34998 0.850098 4.55114 0.850098 8.49997H2.3501ZM8.0001 2.84998C11.1205 2.84998 13.6501 5.37957 13.6501 8.49997H15.1501C15.1501 4.55114 11.9489 1.34998 8.0001 1.34998V2.84998Z" fill="#7C7C7C"/>
                                    </svg>
                                </span>
                                <span>{convertedTime}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <h2>{selectedItem?.prompt}</h2> */}
                {/* <span>{}</span> */}
                
              {/* <button onClick={closePopup}>Close</button> */}
            </div>
          )}
        <div className="gallery-container" style={{width:"100%", display:"flex", flexWrap: "wrap"}}>
            {objects.length  ? objects.map((item,index) => (
                <div
                    key={index}
                    className={`gallery-item ${selected === item.name ? 'selected' : ''}`}
                    onClick={() => openPopup(item)}
                >
                    {!show3D ?
                        <img src={item.preview_s3_path} style={{ height: 200, width: 150 }} />
                        :
                        item.glb_s3_path ?
                            "" : item.name
                    }
                    {item?.prompt ? <div className="gallery-item-overlay">
                        {item?.prompt} <br></br> {item?.part_list ? `(${item.part_list.replace(" ", ", ")})` : ""}
                        <span className='more_info'>
                            More info 
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9.5999 7.2L14.3999 12L9.5999 16.8" stroke="#343434" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>  
                        </span>
                    </div> : ""}
                </div>
            )) : "Loading..."}
        </div>
        </>
    );
}

export default Objects3DGallery;

/* eslint-disable */
import { useRef, useEffect, useState } from "react";
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import "./Render3DObjects.css";
import { Object3D, UseAppContext } from "../../contexts/appContext";

import { ArrowForwardIos, ArrowBackIos } from "@material-ui/icons";




export const Render3DObjects = ({ objects, onActiveObjectIndexChange }: { objects: Object3D[], onActiveObjectIndexChange?: (selectedName: string) => void; }) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef(new THREE.WebGLRenderer({ antialias: true }));
    const sceneRef = useRef(new THREE.Scene());
    const cameraRef = useRef(new THREE.PerspectiveCamera(100, 1, 0.1, 1000));
    const appContext = UseAppContext()

    const [activeObjectIndex, setActiveObjectIndex] = useState<number>(1);
    const width = 400, height = 400;
    
    sceneRef.current.background = new THREE.Color(0xffffff);
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
    const loader = new GLTFLoader();

    const loadObjects = () => {
        objects.forEach((object : Object3D) => {
            if (object.glb_s3_path) {
                loader.load(
                    object.glb_s3_path,
                    (gltf) => {
                        const loadedObject = gltf.scene;
                        let box = new THREE.Box3().setFromObject(loadedObject);
                        let size = box.getSize(new THREE.Vector3());
                        let center = box.getCenter(new THREE.Vector3());
                        loadedObject.position.set(-center.x, -center.y, -center.z);
                        const maxSize = Math.max(size.x, size.y, size.z);
                        const scale = 2 / maxSize;
                        loadedObject.scale.set(scale, scale, scale);
                        loadedObject.position.x = (sceneRef.current.children.length - 1) * 4;
                        loadedObject.userData = { "name": object.name }
                        sceneRef.current.add(loadedObject);
                        if(sceneRef.current.children.length === 2){
                            appContext.setSelectedObject(object)
                            console.log(object.name)
                        }
                    },
                    (xhr) => { },
                    (error) => {
                        console.error(error);
                    }
                );
            }
        })


    }


    useEffect(() => {
        if (!canvasRef.current) return;
        sceneRef.current.clear();
        sceneRef.current.add(ambientLight);

        loadObjects();


        rendererRef.current.setSize(width, height);
        canvasRef.current.innerHTML = '';
        canvasRef.current.appendChild(rendererRef.current.domElement);

        cameraRef.current.position.z = 1.5;

        let controls: any;

        if (objects.length === 1) {
            controls = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
            controls.minDistance = 1;
            controls.maxDistance = 10;
        }

        const animate = () => {
            requestAnimationFrame(animate);
            if (controls) controls.update();
            rendererRef.current.render(sceneRef.current, cameraRef.current);
        };
        animate();

        const canvas = rendererRef.current.domElement;
        const handleContextLoss = (event: Event) => {
            event.preventDefault();
        };

        canvas.addEventListener('webglcontextlost', handleContextLoss, false);

        return () => {
            if (controls) controls.dispose();
            canvas.removeEventListener('webglcontextlost', handleContextLoss, false);
            rendererRef.current.dispose();
        };

    }, [objects]);

    useEffect(() => {
        if (onActiveObjectIndexChange) {
            onActiveObjectIndexChange(sceneRef.current.children[activeObjectIndex]?.userData["name"])
        }
        if (sceneRef.current.children.length > 1) {
            cameraRef.current.position.x = sceneRef.current.children[activeObjectIndex].position.x;
        }

    }, [activeObjectIndex, objects]);

    const NextArrow = () => (
        objects.length === 1 ? <></> : 
        <ArrowForwardIos onClick={() => setActiveObjectIndex(prevIndex => prevIndex != sceneRef.current.children.length - 1 ?  Math.min(prevIndex + 1, sceneRef.current.children.length - 1): 1 )} className="arrow-button right-arrow"/>

    );

    const PrevArrow = () => (
        objects.length === 1 ? <></> : 
        <ArrowBackIos onClick={() => setActiveObjectIndex(prevIndex => prevIndex != 1 ? Math.max(prevIndex - 1, 1) : sceneRef.current.children.length-1)}
        
             className="arrow-button left-arrow"/>
    );

    return (
        <div>
            <div className="canvas-wrapper">
                <PrevArrow />
                <div ref={canvasRef}></div>
                <NextArrow />
            </div>

            <div style={{ color: "black", marginTop: -50}}>{sceneRef.current.children.length != 1 ? appContext.selectedObject?.name.toUpperCase() : ""}</div>
        </div>
    );
};
import React from 'react';
import './style.css';

interface Object3DPreview {
  label: string;
  url: string
}

function Object3DPreview(props: Object3DPreview) {
  return (
    <figure  style={{height:212, width:248}}>
    <img src={props.url} alt={props.label}  style={{height:212, width:248}}/>
    <figcaption>{props.label}</figcaption>
</figure>
  );
}

export default Object3DPreview;
import React, { useEffect, useState, useRef } from 'react';
import { Storage } from "aws-amplify";
import * as styles from '../styles/Account.module.css'
//custom hooks
import useDesignManager from '../customHooks/useDesignManager';
//actions
import { drawPoints, drawLines } from '../actions'

export default function Account() {
    return (
        <div className={styles.accountContainer}>
            <DesignList/>
        </div>
    )
}

const DesignList = () => {
    const [designs] = useDesignManager();

    const listItems = designs.map((design) =>
        <DesignItem design={design} key={design.id} />
    );

    return (
       <div className={styles.designListContainer}>
            <h1>Your saved designs</h1>
           {listItems}
        </div>
    )
}

const DesignItem = (props) => {
    const canvasRef = useRef();

    useEffect(() => {
        Storage.get(props.design.image.key)
            .then((url) => drawCanvas(url))
            .catch((err) => console.log('error fetching image', err))
    }, [])

    const drawCanvas = (imageUrl) => {
        //draws image on canvas
        let ctx = canvasRef.current.getContext('2d');
        var img = new Image;
        img.src = imageUrl;
        img.onload = () => {
            canvasRef.current.height = img.height / img.width * canvasRef.current.width;
            ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
            let displayScaleFactor = canvasRef.current.width / img.width;
            //draw points and lines
            drawPoints(canvasRef, props.design.points, displayScaleFactor);
            drawLines(canvasRef, props.design.points, displayScaleFactor);
        }
    }

    return (
        <div>
            <p>id = {props.design.id}</p>
            <canvas ref={canvasRef} className={styles.canvas}/>
        </div>
    )
}

function stringToPointsParser (str) {
    let split = str.split(',');
    let outArray = new Array(split.length /2).fill(0).map(() => new Array(2).fill(0));
    for (let i = 0; i < split.length; i++) {
        outArray[Math.floor(i/2)][i%2] = parseFloat(split[i]);
    }
    return outArray;
}

//click to *order* changes to in progress
//download svg for each design
//ability to delete each design
//logout
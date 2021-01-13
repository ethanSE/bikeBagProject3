import React, { useRef, useContext, useEffect, useState } from 'react';
//hooks
import { useWindowWidth } from '../customHooks/useWindowWidth'
//context
import { CustomSpecContext } from '../context';
//actions
import { drawPoints, drawLines } from '../actions'
//styles
import styles from '../styles/ScaleInput.module.css'

export default function ScaleInput() {
    const { customSpecUIState, setActiveCustomSpecPhase } = useContext(CustomSpecContext)
    switch (customSpecUIState.scale) {
        case 'active':
            return <ScaleInputActive />
        case 'minimized':
            return (
                <div className={styles.minimized} onClick={() => setActiveCustomSpecPhase('scale')}>
                    <h3>Scale</h3>
                </div>
            )
        default:
            return null;
    }
}

const ScaleInputActive = () => {
    const [windowWidth] = useWindowWidth(50)
    const [topTubePoints, setTopTubePoints] = useState([]);
    const [sourceDimensions, setSourceDimensions] = useState(null);
    const { setCustomSpecState, customSpecState, setActiveCustomSpecPhase } = useContext(CustomSpecContext)
    let canvasScaleRef = useRef();
    let scaleInputRef = useRef();
    let scaleInputDivRef = useRef();
    let ctx;

    useEffect(() => {
        setTimeout(() => {
            window.scroll({
                top: scaleInputDivRef.current.offsetTop,
                behavior: "smooth",
            });
        }, 0);
    }, [])

    //loads image onto canvas and calls drawTopTubePoints
    const drawCanvas = () => {
        if (!sourceDimensions) {
            setSourceDimensions({ imageHeight: customSpecState.image.height, imageWidth: customSpecState.image.width });
        }
        //recalculates in case windown size changed
        let displayScaleFactor = scaleInputDivRef.current.clientWidth / customSpecState.image.width;
        canvasScaleRef.current.width = customSpecState.image.width * displayScaleFactor;
        canvasScaleRef.current.height = customSpecState.image.height * displayScaleFactor;
        ctx = canvasScaleRef.current.getContext('2d');
        ctx.drawImage(customSpecState.image, 0, 0, canvasScaleRef.current.width, canvasScaleRef.current.height); //draws image on canvas
        drawPoints(canvasScaleRef, topTubePoints, displayScaleFactor)
        drawLines(canvasScaleRef, topTubePoints, displayScaleFactor)
    }

    //draws the image and points on the canvas when window width or points changes
    useEffect(() => {
        drawCanvas();
    }, [windowWidth, topTubePoints])

    //captures user click on the canvas and converts to pixel coordinates of original image
    const canvasScaleClick = (evt) => {
        let displayScaleFactor = scaleInputDivRef.current.clientWidth / sourceDimensions.imageWidth;
        if (topTubePoints.length < 2) {
            let rect = canvasScaleRef.current.getBoundingClientRect();
            let x = (evt.clientX - rect.left);
            let y = (evt.clientY - rect.top);
            let xSourceCoord = x / displayScaleFactor;
            let ySourceCoord = y / displayScaleFactor;
            if (topTubePoints.length === 1) {
                setTopTubePoints([topTubePoints[0], [xSourceCoord, ySourceCoord]]);
            } else {
                setTopTubePoints([[xSourceCoord, ySourceCoord]]);
            }
        }
    }

    //establishes a ratio of source image pixels to inches
    const setPixelToInchScale = (event) => {
        event.preventDefault();
        if (topTubePoints.length === 2) {
            let distance = Math.hypot(topTubePoints[0][0] - topTubePoints[1][0], topTubePoints[0][1] - topTubePoints[1][1])
            let scale = (distance / scaleInputRef.value);
            setCustomSpecState({ ...customSpecState, scale: scale })
            setActiveCustomSpecPhase('shape');
        }
    }

    return (
        <div className={styles.scaleInput} ref={scaleInputDivRef} style={{ minHeight: '50vh' }}>
            <h3>Scale</h3>
            <form onSubmit={(event) => setPixelToInchScale(event)} className={styles.scaleInputForm}>
                <input ref={(input) => { scaleInputRef = input }} placeholder='Top Tube Length in inches' type='number' />
                <button className={styles.button} type='submit'>Submit</button>
                <button className={styles.button} onClick={() => setTopTubePoints([])}>Reset</button>
            </form>
            <canvas ref={canvasScaleRef} width='0' height='0' onClick={canvasScaleClick} />
        </div>
    )
}
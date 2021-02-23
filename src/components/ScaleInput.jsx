import React, { useRef, useContext, useEffect, useState } from 'react';
//hooks
import { useWindowWidth } from '../customHooks/useWindowWidth'
//context
import { CustomSpecContext } from '../context';
//actions
import { drawPoints, drawLines } from '../actions'
//styles
import styles from '../styles/ScaleInput.module.css'
//components
import ErrorMessage from './ErrorMessage'

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
    const { setCustomSpecState, customSpecState, setActiveCustomSpecPhase } = useContext(CustomSpecContext);
    const [windowWidth] = useWindowWidth(0);
    const [displayScaleFactor, setDisplayScaleFactor] = useState();
    const [length, setLength] = useState();
    const [message, setMessage] = useState(null);
    let canvasRef = useRef();
    let scaleInputDivRef = useRef();
    let topTubePoints = useRef([]);
    let selectedPoint = useRef({ selected: false }).current;

    //scroll window to focus on this component when it is first rendered
    useEffect(() => {
        setTimeout(() => {
            window.scroll({
                top: scaleInputDivRef.current.offsetTop,
                behavior: "smooth",
            });
        }, 0);
    }, [])

    //draws the image and points on the canvas when window width changes
    useEffect(() => {
        setDisplayScaleFactor(scaleInputDivRef.current.clientWidth / customSpecState.image.width);
        drawCanvas();
    }, [windowWidth, displayScaleFactor])

    //loads image onto canvas and calls drawTopTubePoints
    const drawCanvas = () => {
        //recalculates in case windown size changed
        canvasRef.current.width = customSpecState.image.width * displayScaleFactor;
        canvasRef.current.height = customSpecState.image.height * displayScaleFactor;
        let ctx = canvasRef.current.getContext('2d');
        ctx.drawImage(customSpecState.image, 0, 0, canvasRef.current.width, canvasRef.current.height); //draws image on canvas
        drawPoints(canvasRef, topTubePoints.current, displayScaleFactor);
        drawLines(canvasRef, topTubePoints.current, displayScaleFactor);
    }

    //establishes a ratio of source image pixels to inches
    function setSourcePixelToInchScale(event) {
        event.preventDefault();

        if (topTubePoints.current.length < 2) {
            setMessage('select two points');
        } else if (!length) {
            setMessage('enter a measurement');
            drawCanvas();
        } else {
            let distance = Math.hypot(topTubePoints.current[0].x - topTubePoints.current[1].x, topTubePoints.current[0].y - topTubePoints.current[1].y)
            let scale = (distance / length);
            setCustomSpecState({ ...customSpecState, scale: scale })
            setActiveCustomSpecPhase('shape');
        }
    }

    const mouseDownFunction = (evt) => {
        //express press location in source image pixels
        let click = getSourceCoords(evt, canvasRef, displayScaleFactor);

        //get index of point that the click is within
        let selectedIndex = topTubePoints.current.findIndex((point) => {
            return Math.hypot(click.x - point.x, click.y - point.y) * displayScaleFactor < 10;
        });

        //if click is in an existing point 
        if (selectedIndex >= 0) {
            //track point as selected for dragging using selectedPoint ref
            selectedPoint = { selected: true, index: selectedIndex }
        } else if (topTubePoints.current.length < 2) {
            //add a new point
            topTubePoints.current = [...topTubePoints.current, { x: click.x, y: click.y }];
            //track as selected for dragging
            selectedPoint = { selected: true, index: topTubePoints.current.length - 1 }
            drawCanvas();
        }
    }

    const dragPoint = (evt) => {
        //if a point is selected
        if (selectedPoint.selected) {
            let newPos = getSourceCoords(evt, canvasRef,displayScaleFactor);

            //move that point to the current cursor location and redraw
            topTubePoints.current[selectedPoint.index] = newPos;
            drawCanvas();
        }
    }

    const deselect = () => {
        selectedPoint.selected = false;
    }
    
    const reset = (e) => {
        e.preventDefault();
        topTubePoints.current = [];
        drawCanvas();
        setMessage(null);
    }

    return (
        <div className={styles.scaleInput} ref={scaleInputDivRef} style={{ minHeight: '50vh', justifyContent: 'center' }}>
            <h3>Scale</h3>
            <p>This step establishes a scale from image units to real world units. Upload a photo of your bike from the side. Select two points in the image and enter the real world distance. Points can be dragged for fine-tuning </p>
            <ErrorMessage message={message} />
            <form onSubmit={setSourcePixelToInchScale} className={styles.scaleInputForm}>
                <input onChange={(e) => setLength(e.target.value)} placeholder='Top Tube Length in inches' type='number' step="0.1" value={length} />
                <button className={styles.button} type='submit'>Submit</button>
                <button className={styles.button} onClick={reset}>Reset</button>
            </form>
            <canvas
                ref={canvasRef}
                width='0'
                height='0'
                onMouseDown={mouseDownFunction}
                onMouseUp={deselect}
                onMouseOut={deselect}
                onMouseMove={dragPoint}
            />
        </div>
    )
}

const getSourceCoords = (evt, ref, displayScaleFactor) => {
    let rect = ref.current.getBoundingClientRect();
    return (
        {
            x: (evt.clientX - rect.left) / displayScaleFactor,
            y: (evt.clientY - rect.top) / displayScaleFactor
        }
    )
}
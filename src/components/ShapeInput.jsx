import React, { useRef, useContext, useEffect, useState } from 'react';
//hooks
import { useWindowWidth } from '../customHooks/useWindowWidth'
import styles from '../styles/ShapeInput.module.css'
//context
import { CustomSpecContext, ModeContext, UserContext } from '../context';
//actions
import { drawPoints, drawLines } from '../actions'
//graphql
import { API, graphqlOperation, Storage } from "aws-amplify";
import { createCustomDesign } from '../graphql/mutations'
//uuid
import { v4 as uuid } from 'uuid';
import config from '../aws-exports'

const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket
} = config

export default function ShapeInput() {
    const { customSpecUIState, setActiveCustomSpecPhase } = useContext(CustomSpecContext)

    switch (customSpecUIState.shape) {
        case 'active':
            return <ShapeInputActive />
        case 'minimized':
            return (
                <div className={styles.minimized} onClick={() => setActiveCustomSpecPhase('shape')}>
                    <h3>Shape</h3>
                </div>
            )
        default:
            return null;
    }
}

const ShapeInputActive = () => {
    const { setActiveMainComponent } = useContext(ModeContext)
    const { customSpecState, setActiveCustomSpecPhase } = useContext(CustomSpecContext);
    const { user } = useContext(UserContext);
    const [windowWidth] = useWindowWidth(0)
    const [points, setPoints] = useState([]);
    let canvasShapeRef = useRef();
    let shapeInputDivRef = useRef();
    let displayScaleFactor = useRef();

    //draws the image and points on the canvas when window width or points changes
    useEffect(() => {
        drawCanvas();
    }, [windowWidth, points])

    //scrolls div to top of view port when first rendered
    useEffect(() => {
        setTimeout(() => {
            window.scroll({
                top: shapeInputDivRef.current.offsetTop,
                behavior: "smooth",
            });
        }, 0);
    }, [])

    const drawCanvas = () => {
        //set width of canvas to be equal to its parent div
        canvasShapeRef.current.width = shapeInputDivRef.current.clientWidth;
        //set height based on width and image ratio
        displayScaleFactor.current = canvasShapeRef.current.width / customSpecState.image.width;
        canvasShapeRef.current.height = displayScaleFactor.current * customSpecState.image.height;
        //draws image on canvas
        let ctx = canvasShapeRef.current.getContext('2d');
        //draw points and lines
        ctx.drawImage(customSpecState.image, 0, 0, canvasShapeRef.current.width, canvasShapeRef.current.height);
        drawPoints(canvasShapeRef, points, displayScaleFactor.current);
        drawLines(canvasShapeRef, points, displayScaleFactor.current);
    }

    //allows users to submit
    const shapeInputSubmit = async () => {
        //do some kind of checking(?)
        //is shape closed?
        //number of points(?)
        await uploadDesign(customSpecState.imageRaw, points, customSpecState.scale, user.attributes.sub);
        setActiveCustomSpecPhase('clear');
        setActiveMainComponent('account')
    }

    // allows user to select points
    const canvasShapeClick = (evt) => {
        //get display coordinate of click
        let rect = canvasShapeRef.current.getBoundingClientRect();
        let x = (evt.clientX - rect.left);
        let y = (evt.clientY - rect.top);
        //transform to source coordinate
        let xSourceCoord = x * customSpecState.image.width / canvasShapeRef.current.width;
        let ySourceCoord = y * customSpecState.image.height / canvasShapeRef.current.height;

        //loop through points if the new click is within the circle drawn around and existing point
        //it should be the same point
        points.forEach((point) => {
            //get distance froim click to point
            let xDistance = point[0] * displayScaleFactor.current - xSourceCoord * displayScaleFactor.current;
            let yDistance = point[1] * displayScaleFactor.current - ySourceCoord * displayScaleFactor.current
            let distance = Math.hypot(xDistance,yDistance);
            // if click is within drawn circle
            if (distance < 10) {        
                //add that same point to the array
                setPoints([...points, point]); 
                return;
            };
        });

        setPoints([...points, [xSourceCoord, ySourceCoord]]);
    }
    
    return (
        <div className={styles.shapeInput} ref={shapeInputDivRef} style={{ minHeight: '50vh' }}>
            <h3>Shape</h3>
            <div className={styles.buttonRow}>
                <button className={styles.button} onClick={shapeInputSubmit}>Submit Design</button>
                <button className={styles.button} onClick={() => setPoints([])}>Reset Shape</button>
            </div>
            <canvas ref={canvasShapeRef} width='0' height='0' onClick={canvasShapeClick} />
        </div>
    )
}

const uploadDesign = async (image, shape, scale, userId) => {
    try {
        //upload image
        let {key} = await Storage.put(`${uuid()}`, image, { contentType: 'image/png' })
        //create new bag object
        const newBag = {
            id: `${uuid()}`,
            owner: userId,
            image: {
                bucket: bucket,
                region: region,
                key: key,
            },
            scale: scale,
            points: shape.toString(),
            isOrdered: false
        }
        //store in dynamoDB
        await API.graphql(graphqlOperation(createCustomDesign, { input: newBag }));
    } catch (e) {
        console.log(e)
    }
}
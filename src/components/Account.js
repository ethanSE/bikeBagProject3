import React, { useContext, useEffect, useRef } from 'react';
import { API, graphqlOperation, Storage } from "aws-amplify";
import * as styles from '../styles/Account.module.css'
//actions
import { drawPoints, drawLines } from '../actions'
import { SavedDesignsContext, ModeContext } from '../context';
//graphql
import { deleteDesign } from '../graphql/mutations';

export default function Account() {
    return (
        <div className={styles.accountContainer}>
            <DesignList />
        </div>
    )
}

const DesignList = () => {
    const { designs, status, refresh } = useContext(SavedDesignsContext);

    switch (status) {
        case 'done':
            return (
                <div className={styles.designListContainer}>
                    <h1>Your saved designs</h1>

                    <CreateDesignButton status={status} designCount={designs.length} />

                    { designs.map((design) => <DesignItem design={design} key={design.id} />)}
                </div >
            )
        case 'loading':
            return (
                <p>loading</p>
            );
        default:
            return (
                <div>
                    <button className={styles.button} onClick={refresh}>RELOAD</button>
                </div>
            )
    }
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
            if (canvasRef?.current) {
                //user may have navigated away while one or more image was loading
                canvasRef.current.height = img.height / img.width * canvasRef.current.width;
                ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
                let displayScaleFactor = canvasRef.current.width / img.width;
                //draw points and lines
                drawPoints(canvasRef, props.design.points, displayScaleFactor);
                drawLines(canvasRef, props.design.points, displayScaleFactor);
            }
        }
    }

    async function deleteDesignMut() {
        console.log(props.design)
        try {
            await API.graphql(graphqlOperation(deleteDesign, { input: { id: props.design.id, _version: props.design._version } }))
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.design}>
            <p>id = {props.design.id}</p>
            <canvas ref={canvasRef} className={styles.canvas} />
            <button className={styles.button} onClick={deleteDesignMut}>DELETE</button>
        </div>
    )
}

const CreateDesignButton = (props) => {
    const { setActiveMainComponent } = useContext(ModeContext)

    if (props.status !== 'done' || props.designCount > 0) {
        return null
    }

    return (
        <div className={styles.createDesignContainer}>
            <p>You have no saved designs</p>
            <div className={styles.button} onClick={() => setActiveMainComponent('customSpec')}>
                <p>create</p>
            </div>
        </div>
    )
}

//click to *order* changes to in progress
//download svg for each design
//ability to delete each design
//logout
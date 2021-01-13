import React, { useRef } from 'react';
import C2S from 'canvas2svg';

function Download(props) {
    let downloadCanvas = useRef();
    let svgString = '';
    var outputCanvasWidth = 0;
    var outputCanvasHeight = 0;

    if(props.coords[0]){
        outputCanvasWidth = Math.max(...(props.coords[0].map(c => c[0])));
        outputCanvasHeight = Math.max(...(props.coords[0].map(c => c[1])));
    }

    function renderClicked() {
        if (props.coords.length) {
            var ctx = downloadCanvas.current.getContext('2d');
            ctx.beginPath();
            ctx.strokeStyle = "#FF0000";
            ctx.lineWidth = 3;
            ctx.moveTo(props.coords[0][0][0], props.coords[0][0][1]);
            for (let i = 1; i < props.coords[0].length; i++) {
                ctx.lineTo(props.coords[0][i][0], props.coords[0][i][1]);
                ctx.moveTo(props.coords[0][i][0], props.coords[0][i][1]);
            }
            ctx.stroke();
        }
    }

    function downloadClicked() {
        if(props.coords.length) { 
             // let width = Math.max(props.coords.map((coord) => {return (Math.max(...(coord.map(c => c[0]))))})); trying to do some code golf          
            let xMaxOfShapes = props.coords.map((coord) => {
                return (Math.max(...(coord.map(c => c[0]))));
            });
            let width = Math.max(...xMaxOfShapes);
            let height = Math.max(...(props.coords[0].map(c => c[1])));
            var ctx2 = new C2S(width, height);
            console.log(props.maxSideLength);
            if (props.coords) {
                props.coords.forEach((side) => {
                    ctx2.beginPath();
                    ctx2.strokeStyle = "#FF0000";
                    ctx2.lineWidth = 1;
                    ctx2.moveTo(side[0][0], side[0][1]);
                    for (let i = 1; i < side.length; i++) {
                        ctx2.lineTo(side[i][0], side[i][1]);
                        ctx2.moveTo(side[i][0], side[i][1]);
                    }
                    ctx2.stroke();
                })
                svgString = ctx2.getSerializedSvg(true);
                let start = svgString.indexOf('width=');
                let end = svgString.indexOf('>');
                let widthInches = width / props.scale;
                let heightInches = height / props.scale;
                let inchesScale = `width='${widthInches}in' height='${heightInches}in' viewBox='0 0 ${width} ${height}'`
                svgString = svgString.substr(0, start) + inchesScale + svgString.substr(end);
                const svgDownload = document.createElement('a');
                const file = new Blob([svgString], { type: 'text/plain' });
                svgDownload.href = URL.createObjectURL(file);
                svgDownload.download = "bagPlan.svg";
                document.body.appendChild(svgDownload);
                svgDownload.click();
            }
        }        
    }

    function placeOrder() {
        console.log('hi44444');
    }

    function signInClicked() {
        //set active main component

    }
    
    let customOrderOrSignIn = (props.user)  ? (
        <button onClick={placeOrder} className='button'>Order Custom</button>
    ) : (
        <button onClick = { signInClicked } className = 'button'>Order Custom</button>
    );
    
    if (props.customSpecUI.download === 'active') {
        return (
            <div className='results'>
                <button className='button' onClick={renderClicked}>Render</button>
                <button className='button' onClick={downloadClicked}>Download SVG</button>
                {customOrderOrSignIn}
                <canvas className='outputCanvas' ref={downloadCanvas} width={outputCanvasWidth} height={outputCanvasHeight} />
            </div>
        );
    } else {
        return null;
    }
}

export default Download;
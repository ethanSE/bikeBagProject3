import React from 'react';
import { connect } from 'react-redux';

function Message(props) {
    var messageBody = null;
    if (props.customSpecUI.image === 'hidden') {
        messageBody = 'Select a style'
    } else if (props.customSpecUI.image === 'active'){
        messageBody = 'upload a photo of your bike'
    } else if (props.customSpecUI.scale === 'active'){
        messageBody = 'specify scale. Select the ends of the top tube and enter the length';
    } else if (props.customSpecUI.shape === 'active') {
        messageBody = 'enter shape'
    }
    return (
        <div className='message'>
            <p>{messageBody}</p>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        scale: state.scale,
        coords: state.coords,
        customSpecUI: state.customSpecUI
    }
}

export default connect(mapStateToProps)(Message);
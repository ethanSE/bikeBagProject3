import React, { useContext } from 'react';
//components
import StyleSelection from './StyleSelection';
import ImageUpload from './ImageUpload';
import ScaleInput from './ScaleInput';
import ShapeInput from './ShapeInput';
//context
import { UserContext } from '../context';
//styles
import styles from '../styles/CustomSpec.module.css';

import { Auth } from 'aws-amplify';

export default function CustomSpecification() {
    const { user } = useContext(UserContext)

    if (!user) return <SignInPrompt />
    
    return (
        <div className={styles.customSpecContainer}>
            <div className={styles.customSpecContents} >
                <StyleSelection />
                <ImageUpload />
                <ScaleInput />
                <ShapeInput />
            </div>
        </div>
    );
}

const SignInPrompt = () => {
    return (
        <div className={styles.customSpecContainer}>
            <div className={styles.customSpecContents} >
                <h1>Sign in to create a custom bag</h1>
                <button className={styles.signInButton} onClick={() => Auth.federatedSignIn()}> Sign In </button>
            </div>
        </div>
    )
}
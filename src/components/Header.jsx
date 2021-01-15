import React, { useContext } from 'react';
import { ModeContext, UserContext } from '../context';
import styles from '../styles/Header.module.css';
import { Auth } from 'aws-amplify';

export default function Header() {
    const { setActiveMainComponent } = useContext(ModeContext);

    return (
        <div className={styles.header}>
            <div className={styles.headerContent}>
                <h1 className={styles.headerTitle}>Bike Bag Project</h1>
                <div className={styles.links}>
                    <SignInOutComponent />
                    <h3 onClick={() => setActiveMainComponent('customSpec')}> Custom </h3>
                    <h3 onClick={() => setActiveMainComponent('home')}> Home </h3>
                    <h3 onClick={() => setActiveMainComponent('history')}> History</h3>
                </div>
            </div>
        </div> 
    )
}

const SignInOutComponent = () => {
    const { setActiveMainComponent } = useContext(ModeContext);
    const { user } = useContext(UserContext);

    if (user) {
        return (<h3 onClick={() => setActiveMainComponent('account')}> Account </h3>)
    } else {
        return (
            <h3 onClick={() => Auth.federatedSignIn()}> Sign In </h3>
        )
    }
}
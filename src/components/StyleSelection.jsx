import React, { useContext } from 'react';
import TopTube from '../assets/images/Toptube';
import Full from '../assets/images/Full';
import Front from '../assets/images/Front';
import { CustomSpecContext } from '../context';
import styles from '../styles/StyleSelection.module.css';

const StyleSelection = () => {
    const { customSpecState, setCustomSpecState, setActiveCustomSpecPhase } = useContext(CustomSpecContext)

    const handleClick = (style) => {
        setCustomSpecState({ ...customSpecState, style: style })
        setActiveCustomSpecPhase('image');
    }

    return (
        <div className={styles.styleContainer}>
            <div className={customSpecState.style === 'topTube' ? styles.styleItemActive : styles.styleItem}
                onClick={() => handleClick('topTube')}>
                <h4>Top Tube</h4>
                <TopTube className={styles.bagIcon} />
            </div>
            <div className={customSpecState.style === 'front' ? styles.styleItemActive : styles.styleItem}
                onClick={() => handleClick('front')}>
                <h4>Front</h4>
                <Front className={styles.bagIcon} />
            </div>
            <div className={customSpecState.style === 'full' ? styles.styleItemActive : styles.styleItem}
                onClick={() => handleClick('full')}>
                <h4>Full</h4>
                <Full className={styles.bagIcon} />
            </div>
        </div>
    )
}

export default StyleSelection;
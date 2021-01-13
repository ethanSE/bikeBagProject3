import React, { useContext } from 'react';
import { ModeContext } from '../context';
import styles from '../styles/Home.module.css';
import BackupIcon from '@material-ui/icons/Backup';
import SquareFootIcon from '@material-ui/icons/SquareFoot';
import CreateIcon from '@material-ui/icons/Create';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const Home = () => {
    const { setActiveMainComponent } = useContext(ModeContext);
    return (
        <div className={styles.home}>
            
            <h1>How it works</h1>

            <div className={styles.iconDescContainer}>
                <div className={styles.bigScreenReverseRow}>
                    <div className={styles.icon}>
                        <BackupIcon fontSize={'inherit'} color={'inherit'} />
                    </div>

                    <div className={styles.text}>
                        <p>1. Upload an image of your bike</p>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.icon}>
                        <SquareFootIcon fontSize={'inherit'} color={'inherit'} />
                    </div>
                    <div className={styles.text}>
                        <p>2. Measure your bike to establish the scale</p>
                    </div>
                </div>

                <div className={styles.bigScreenReverseRow}>
                    <div className={styles.icon}>
                        <CreateIcon fontSize={'inherit'} color={'inherit'} />
                    </div>

                    <div className={styles.text}>
                        <p>3. Outline your desired shape</p>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.icon}>
                        <AddShoppingCartIcon fontSize={'inherit'} color={'inherit'} />
                    </div>
                    <div className={styles.text}>
                        <p>4. Submit your design and receive your custom bike frame bag</p>
                    </div>
                </div>
            </div>
            <button className='button' onClick={() => setActiveMainComponent('customSpec')}> create custom bag</button>
        </div>
    )
}

export default Home;
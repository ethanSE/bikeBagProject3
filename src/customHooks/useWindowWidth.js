import { debounce } from '../actions';
import {useState, useEffect} from 'react'

export function useWindowWidth(debounceTimer) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    useEffect(() => {
        window.addEventListener('resize', debounce(() => setWindowWidth(window.innerWidth), debounceTimer));
        return () => {
            window.removeEventListener('resize', debounce(() => setWindowWidth(window.innerWidth), debounceTimer))
        };
    }, [])

    return [windowWidth];
};
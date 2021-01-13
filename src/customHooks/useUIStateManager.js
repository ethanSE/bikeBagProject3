//the process of a user completing the design of a bag occurs in phases
//each phase of user interaction occurs in a seperate component
//completion of a phase reveals the next component and minimizes the previous component
//a user can click on a previous component that is minimized to go back to that step
//this hook abstracts the reducer that manages whether each component is inactive, active, or minimized

import { useReducer } from 'react';

const initialCustomSpecUIState = {
    image: null,
    scale: null,
    shape: null,
    download: null
}

const customSpecUIReducer = (state, action) => {
    switch (action) {
        case 'image':
            return {
                ...state,
                image: 'active',
                scale: state.scale === null ? null : 'minimized',
                shape: state.shape === null ? null : 'minimized',
            }
        case 'scale':
            return {
                ...state,
                scale: 'active',
                image: 'minimized',
                shape: state.shape == null ? null : 'minimized',
            }
        case 'shape':
            return {
                ...state,
                shape: 'active',
                image: 'minimized',
                scale: 'minimized',
            }
        case 'clear':
            return {
                image: null,
                scale: null,
                shape: null,
                download: null
            }
        default:
            throw new Error('invalid custom spec phase');
    }
}

export function useUIStateManager() {
    const [customSpecUIState, dispatch] = useReducer(customSpecUIReducer, initialCustomSpecUIState);

    const setActiveCustomSpecPhase = newActive => {
        dispatch(newActive)
    };
    
    return [customSpecUIState, setActiveCustomSpecPhase];
};
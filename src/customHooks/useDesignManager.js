import { useState, useEffect, useReducer } from 'react';
import { API, graphqlOperation } from "aws-amplify";
import { listDesigns } from '../graphql/queries';
import { onCreateDesign, onUpdateDesign, onDeleteDesign } from '../graphql/subscriptions';

export default function useDesignManager(user) {
    const [designs, dispatch] = useReducer(reducer, [])
    const [status, setStatus] = useState('loading');
    const [subs, setSubs] = useState([])

    useEffect(() => {
        if (user) {
            fetchDesigns();
            setUpSubscriptions();
        }
        return () => {
            subs.forEach((sub) => sub.unsubscribe())
        }
    }, [user])

    const fetchDesigns = async () => {
        try {
            let result = await API.graphql(graphqlOperation(listDesigns, {
                filter: {
                    owner: {
                        eq: user.attributes.sub
                    }
                }
            }));
            dispatch({ type: 'addDesigns', value: result.data.listDesigns.items });
            setStatus('done');
        } catch (e) {
            setStatus('failed');
            console.log(e);
        }
    }

    const setUpSubscriptions = () => {
        //subscribe to new design event
        let newDesignSub = API.graphql(graphqlOperation(onCreateDesign))
            .subscribe({
                next: (newDesignResult) => {
                    const newDesign = newDesignResult.value.data.onCreateDesign;
                    dispatch({ type: 'addDesigns', value: [newDesign] });
                },
                error: (error) => console.log(error)
            })
        //subscribe to design update event
        let updateDesignSub = API.graphql(graphqlOperation(onUpdateDesign))
            .subscribe({
                next: (updatedDesignResult) => {
                    const updatedDesign = updatedDesignResult.value.data.onUpdateDesign;
                    //dispatch update action
                    dispatch({ type: 'updateDesign', value: updatedDesign });
                },
                error: (error) => console.log(error)
            })

        let deleteDesignSub = API.graphql(graphqlOperation(onDeleteDesign))
            .subscribe({
                next: (deletedDesignResult) => {
                    const deletedDesign = deletedDesignResult.value.data.onDeleteDesign;
                    dispatch({ type: 'deleteDesign', value: deletedDesign});
                }
            })
        setSubs([newDesignSub, updateDesignSub, deleteDesignSub])
    }

    const refresh = async () => {
        setStatus('loading');
        fetchDesigns();
    }

    return [designs, status, refresh]
}

function reducer(state, action) {
    switch (action.type) {
        case 'addDesigns':
            //enforce uniqueness of new design
            //i've seen the resolver fire more than one event for the same action
            //not sure why
            if (!state.some((design) => design.id === action.value.id)) {
                return [...state, ...action.value].filter((item) => !item._deleted).sort((a, b) => Date.parse(a.createdAt) > Date.parse(b.createdAt) ? 1 : -1)
            } else {
                return state;
            }
        case 'updateDesign':
            let newState = state;
            newState[newState.findIndex((item) => item.id === action.value.id)] = action.value;
            return newState;
        case 'deleteDesign':
            return state.filter((item) => item.id != action.value.id)
        default:
            throw new Error('invalid action type');
    }
}
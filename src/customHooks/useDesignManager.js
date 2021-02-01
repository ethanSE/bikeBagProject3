import { useState, useEffect } from 'react';
import { API, graphqlOperation } from "aws-amplify";
import { listCustomDesigns } from '../graphql/queries'

export default function useDesignManager (user) {
    const [designs, setDesigns] = useState([])
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        if (user) {
            fetchDesigns();
        }
    }, [user])

    const fetchDesigns = async () => {
        try {
            let result = await API.graphql(graphqlOperation(listCustomDesigns, {
                filter: {
                    owner: {
                        eq: user.attributes.sub
                    }
                }
            }));
            let items = result.data.listCustomDesigns.items;
            let sortedItems = items.sort((a,b) => Date.parse(a.createdAt) > Date.parse(b.createdAt) ? 1 : -1)
            setDesigns(sortedItems);
            setStatus('done');
        } catch (e) {
            setStatus('failed')
            console.log(e);
        }
    }

    const refresh = async () => {
        setStatus('loading');
        fetchDesigns();
    }

    return [designs, status, refresh]
}
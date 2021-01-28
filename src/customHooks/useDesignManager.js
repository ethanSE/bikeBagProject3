import { useContext, useState, useEffect } from 'react';
import { API, graphqlOperation } from "aws-amplify";
import { listCustomDesigns } from '../graphql/queries'
import { UserContext } from '../context';

export default function useDesignManager () {
    const { user } = useContext(UserContext)
    const [designs, setDesigns] = useState([])

    useEffect(() => {
        fetchDesigns();
    }, [])

    const fetchDesigns = async () => {
        let result = await API.graphql(graphqlOperation(listCustomDesigns, {
            filter: {
                owner: {
                    eq: user.attributes.sub
                }
            }
        }));
        console.log(result)
        setDesigns(result.data.listCustomDesigns.items)
    }

    return [designs]
}
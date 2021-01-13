import React, { useEffect, useContext, useState } from 'react';
//graphql
import { API, graphqlOperation, Storage } from "aws-amplify";
import { listCustomDesigns } from '../graphql/queries'
import { UserContext } from '../context';

export default function Account() {
    const { user } = useContext(UserContext)
    const [designs, setDesigns] = useState([])

    useEffect(() => {
        fetchDesigns();
    }, [])

    const fetchDesigns = async () => {
        console.log(user)
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

    return (
        <div>
            <h1>Your saved designs</h1>
            <DesignList designs={designs} />
        </div>
    )
}

const DesignList = (props) => {
    const listItems = props.designs.map((design) =>
        <li><DesignItem design={design} key={design.id} /></li>
    );

    return (
        <ul>{listItems}</ul>
    )
}

const DesignItem = (props) => {
    const [imageUrl, setImageUrl] = useState()
    useEffect(() => {
        Storage.get(props.design.image.key)
            .then((url) => setImageUrl(url))
            .catch((err) => console.log('error fetching image', err))
    }, [])
    return (
        <div>
            <p>this is a design. id = ${props.design.id}</p>
            <img src={imageUrl} />
        </div>
    )
}



//view your saved designs
//click to *order* changes to in progress
//download svg for each design
//ability to delete each design
//logout
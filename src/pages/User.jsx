import React, {useContext, useEffect} from 'react';
import {useParams} from "react-router-dom";
import GithubContext from "../context/Github/GithubContext";

const User = ({match}) => {
    const params = useParams()
    const {getUser, user} = useContext(GithubContext)

    useEffect(() => {
        getUser(params.login)
    }, [])

    return (
        <div>
            {user.login}
        </div>
    );
};

export default User;
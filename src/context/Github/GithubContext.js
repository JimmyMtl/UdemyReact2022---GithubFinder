import React, {createContext, useEffect, useReducer} from 'react';
import GithubReducer from "./GithubReducer"

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;


export const GithubProvider = ({children}) => {


    const initialState = {
        users: [],
        loading: false
    }
    const [state, dispatch] = useReducer(GithubReducer, initialState)

    // Get initial users (testing purposing)
    const fetchUsers = async () => {
        setLoading()
        let response = await fetch(`${GITHUB_URL}/users`, {
            method: 'GET',
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })
        let data = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: data
        })
    }

    // Set loading
    const setLoading = () => {
        dispatch({
            type: 'SET_LOADING'
        })
    }
    return <GithubContext.Provider value={{users: state.users, loading: state.loading, fetchUsers}}>
        {children}
    </GithubContext.Provider>
};
export default GithubContext
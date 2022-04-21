import React, {createContext, useReducer} from 'react';
import GithubReducer from "./GithubReducer"

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;


export const GithubProvider = ({children}) => {


    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }
    const [state, dispatch] = useReducer(GithubReducer, initialState)

    // Get user repos
    const getUserRepos = async (login) => {
        setLoading()

        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10
        })
        let response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
            method: 'GET',
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })
        let data = await response.json()

        dispatch({
            type: 'GET_REPOS',
            payload: data
        })
    }
    // Get search results
    const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams({
            q: text
        })

        let response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            method: 'GET',
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })
        let {items} = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: items
        })
    }
    // Get user with login
    const getUser = async (login) => {
        setLoading()


        let response = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })
        if (response.status === 404) {
            window.location = '/notfound'
        } else {
            let data = await response.json()

            dispatch({
                type: 'GET_USER',
                payload: data
            })
        }
    }

    // Clear users from state
    const clearUsers = () => {
        dispatch({
            type: 'CLEAR_USERS',
        })
    }
    // Set loading
    const setLoading = () => {
        dispatch({
            type: 'SET_LOADING'
        })
    }

    return <GithubContext.Provider
        value={{
            users: state.users,
            loading: state.loading,
            user: state.user,
            repos: state.repos,
            getUser,
            searchUsers,
            clearUsers,
            getUserRepos
        }}>
        {children}
    </GithubContext.Provider>
};
export default GithubContext
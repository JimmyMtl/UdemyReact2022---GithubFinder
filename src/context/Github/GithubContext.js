import React, {createContext, useReducer} from 'react';
import GithubReducer from "./GithubReducer"

const GithubContext = createContext();

export const GithubProvider = ({children}) => {


    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }
    const [state, dispatch] = useReducer(GithubReducer, initialState)

    // Get user repos

    // Set loading
    const setLoading = () => {
        dispatch({
            type: 'SET_LOADING'
        })
    }

    return <GithubContext.Provider
        value={{
            ...state,
            dispatch,
        }}>
        {children}
    </GithubContext.Provider>
};
export default GithubContext
import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
    baseURL: GITHUB_URL,
    headers: {
        Authorization: `token ${GITHUB_TOKEN}`
    }
})
// Get search results
export const searchUsers = async (text) => {

    const params = new URLSearchParams({
        q: text
    })

    let response = await github.get(`/search/users?${params}`)

    return response.data.items;
}
// Get user with login
export const getUser = async (login) => {

    let response = await fetch(`${GITHUB_URL}/users/${login}`, {
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`
        }
    })

    if (response.status === 404) {

        window.location = '/notfound'

    } else {

        const data = await response.json()
        return data

    }

}
// Get user and repos
export const getUserAndRepos = async (login) => {
    const [user, repos] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos`)
    ])

    return {user: user.data, repos: repos.data}
    // const params = new URLSearchParams({
    //     sort: 'created',
    //     per_page: 10
    // })
    // let response = await github.get(`/users/${login}/repos?${params}`, {
    //     method: 'GET',
    //     headers: {
    //         Authorization: `token ${GITHUB_TOKEN}`
    //     }
    // })
    // let data = await response.json()
    // return data
}



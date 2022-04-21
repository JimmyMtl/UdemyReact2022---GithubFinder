const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// Get search results
export const searchUsers = async (text) => {

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

    return items;
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

export const getUserRepos = async (login) => {
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
    return data
}



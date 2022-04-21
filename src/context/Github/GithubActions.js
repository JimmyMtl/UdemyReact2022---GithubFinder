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
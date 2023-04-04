const axios = require('axios')
const fs = require('fs')

const BEARER_TOKEN =
    'AAAAAAAAAAAAAAAAAAAAAIP%2BmQEAAAAAOHfTjnKf0pyaYjgIkh4mW4ERll8%3DcTYC32pjN7YyCgmVuNgsQybt6X6rCRoTMWZScvKIN2vuwFDCyN'

async function fetchUserID(username) {
    try {
        const url = `https://api.twitter.com/2/users/by/username/${username}`

        const headers = {
            Authorization: `Bearer ${BEARER_TOKEN}`,
        }
        const response = await axios.get(url, { headers })
        return response.data.data.id
    } catch (error) {
        console.error('Error fetching user ID:', error.message)
    }
}

async function fetchTweets() {
    try {
        const userID = await fetchUserID('physiologyfish')
        const url = `https://api.twitter.com/2/users/${userID}/tweets`

        const headers = {
            Authorization: `Bearer ${BEARER_TOKEN}`,
        }

        const params = {
            max_results: 100, // Fetch up to 100 tweets
            expansions: 'attachments.media_keys',
            'media.fields': 'url',
            'tweet.fields': 'created_at',
        }

        const response = await axios.get(url, { params, headers })
        const data = response.data

        const tweets = data.data.map((tweet) => {
            return {
                id: tweet.id,
                text: tweet.text,
                created_at: tweet.created_at,
            }
        })

        fs.writeFileSync('tweets.json', JSON.stringify(tweets, null, 2))
        console.log('Tweets saved to tweets.json')
    } catch (error) {
        console.error('Error fetching tweets:', error.message)
    }
}

fetchTweets()

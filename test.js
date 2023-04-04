const axios = require('axios')

const BEARER_TOKEN =
    'AAAAAAAAAAAAAAAAAAAAAIP%2BmQEAAAAAOHfTjnKf0pyaYjgIkh4mW4ERll8%3DcTYC32pjN7YyCgmVuNgsQybt6X6rCRoTMWZScvKIN2vuwFDCyN'
const USER_ID = '95316081'

const url = `https://api.twitter.com/2/users/${USER_ID}/tweets`

const headers = {
    Authorization: `Bearer ${BEARER_TOKEN}`,
}

const params = {
    max_results: 100,
    'tweet.fields': 'created_at',
}

axios
    .get(url, { headers, params })
    .then((response) => {
        const tweets = response.data.data.map((tweet) => {
            return {
                id: tweet.id,
                text: tweet.text,
                created_at: tweet.created_at,
            }
        })

        console.log(tweets)
    })
    .catch((error) => {
        console.error('Error fetching tweets:', error.message)
    })

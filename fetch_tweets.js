const { TwitterApi } = require('twitter-api-v2')
const fs = require('fs')

const BEARER_TOKEN =
    'AAAAAAAAAAAAAAAAAAAAAIP%2BmQEAAAAAOHfTjnKf0pyaYjgIkh4mW4ERll8%3DcTYC32pjN7YyCgmVuNgsQybt6X6rCRoTMWZScvKIN2vuwFDCyN'

async function fetchTweets() {
    try {
        const client = new TwitterApi(BEARER_TOKEN)
        const readOnlyClient = client.readOnly

        const user = await readOnlyClient.v2.userByUsername('physiologyfish')
        const userID = user.id

        const userTimeline = await client.v2.userTimeline(userID, {
            max_results: 100,
            'tweet.fields': 'created_at',
        })

        const tweets = userTimeline.data.map((tweet) => {
            return {
                id: tweet.id,
                text: tweet.text,
                created_at: tweet.created_at,
            }
        })

        fs.writeFileSync('tweets_v2.json', JSON.stringify(tweets, null, 2))
        console.log('Tweets saved to tweets_v2.json')
    } catch (error) {
        console.error('Error fetching tweets:', error.message)
    }
}

fetchTweets()

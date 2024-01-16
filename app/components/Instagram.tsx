const REVALIDATE = 604800

async function getInstagramToken() {
    try {
        // Exchange the authorization code for an access token
        const res = await fetch('https://api.instagram.com/oauth/access_token', {
            next: { revalidate: REVALIDATE },
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: process.env.INSTAGRAM_CLIENT_ID,
                client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
                code: process.env.INSTAGRAM_AUTHORIZATION_CODE,
            }),
        });

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
        }

        const tokenData = await res.json();
        const accessToken = tokenData.access_token;

        return accessToken;
    } catch (error) {
        console.error('Failed to fetch Instagram token:', error);
        return null
    }
}
async function getInstagramPostData() {
    try {
        const accessToken = await getInstagramToken();

        if (!accessToken) {
            throw new Error('Failed to fetch data')
        }

        // Fetch posts using the token
        const res = await fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,thumbnail_url,username&access_token=${accessToken}`, { next: { revalidate: REVALIDATE } });

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
        }

        const data = await res.json();

        return data.data || []
    } catch (error) {
        console.error('Failed to fetch Instagram token:', error);
        return []
    }
}

export default async function InstagramPosts() {
    const posts = await getInstagramPostData()

    if (!posts || posts.length === 0) {
        return null;
    }

    // add in type

    return (
        <div id="instafeed">
            {posts.map(post => (
                <a key={post.id} href={post.permalink} target="_blank" rel="noopener noreferrer">
                    <img src={post.media_url} alt={post.location} loading="lazy" />
                </a>
            ))}
        </div>
    );

}
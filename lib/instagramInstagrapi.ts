export async function getInstagramPosts(username: string) {
    const INSTAGRAPI_BASE_URL = 'https://instagrapi.luenwarneke.com';

    try {
        // POST to /auth/login
        const loginResponse = await fetch(`${INSTAGRAPI_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: process.env.INSTAGRAM_USERNAME,
                password: process.env.INSTAGRAM_PASSWORD
            })
        });

        if (!loginResponse.ok) {
            console.log('Login failed', loginResponse.status, loginResponse.statusText);
            return null;
        }

        const loginData = await loginResponse.json();
        const sessionid = loginData.sessionid;

        // POST /media/user_medias
        const postsResponse = await fetch(`${INSTAGRAPI_BASE_URL}/media/user_medias`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sessionid: sessionid,
                // Ensure this is the correct field and format for the user identifier
                user_id: username
            })
        });

        if (!postsResponse.ok) {
            console.log('Failed to fetch posts');
            return null;
        }

        const postsData = await postsResponse.json();
        console.log(postsData);
        return postsData;
    } catch (error) {
        console.error('Error fetching Instagram posts:', error);
        return null;
    }
}

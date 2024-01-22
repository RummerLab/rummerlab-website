import { Key } from "react";
import Image from 'next/image';
import { getLongLivedToken } from '@/lib/metaToken';



async function getInstagramPostData() {
    try {
        //const accessToken = await getLongLivedToken();
        const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
        // https://www.youtube.com/watch?v=kLFSTaCqzdQ
        // Get access token: https://developers.facebook.com/apps/362219269878369/instagram-basic-display/basic-display/?business_id=3489130994739818

        if (!accessToken) {
            throw new Error('Failed to get access token')
        }

        // Fetch posts using the token
        const res = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${accessToken}`, { 
            next: { 
                revalidate: 604800 // 1 week
            } 
        });

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
        }

        const data = await res.json();

        console.log(data)

        return data.data || []
    } catch (error) {
        console.error('Failed to fetch Instagram post data:', error);
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

                    {posts.map((post: { id: Key | null | undefined; permalink: string | undefined; media_url: string | undefined; location: string | undefined; }) => (
                        <a key={post.id} href={post.permalink} target="_blank" rel="noopener noreferrer">
                            {(post.media_url) && <Image src={post.media_url} alt={post.location ?? ''} loading="lazy" />}
                        </a>
                    ))}

        </div>
    );

}
import { Key } from 'react';
import Image from 'next/image';
import { getInstagramPostData, mutateCaption, generateAlt } from '@/lib/instagramAPI';

export default async function InstagramPosts() {
    const rummerlabId = null; //'3666266808';
    const posts = await getInstagramPostData(rummerlabId)

    if (!posts || posts.length === 0) {
        return null;
    }

    // Filter - The Media's type. Can be IMAGE, VIDEO, or CAROUSEL_ALBUM
    // https://developers.facebook.com/docs/instagram-basic-display-api/reference/media#fields
    //const images = posts.filter((post: { media_type: string; }) => post.media_type === 'IMAGE');

    return (
        <div className="h-36 overflow-y-hidden text-center">
            {posts.map((post: { id: Key; permalink: string; media_url: string; caption: string; media_type: string; thumbnail_url: string; }) => {
                    const imageUrl = post.thumbnail_url ?? post.media_url;

                    let caption = mutateCaption(post.caption);
                    const altText = generateAlt(caption);
    
                    return (
                        <a key={post.id} href={post.permalink} target="_blank" rel="noopener noreferrer" className="relative group inline-block hover:grayscale transition duration-150 cursor-pointer">
                            {imageUrl && (
                                <>
                                    <Image
                                        src={imageUrl}
                                        alt={altText}
                                        width={128}
                                        height={128}
                                        className="h-36 w-36 inline-block object-cover aspect-square rounded-sm"
                                        loading="lazy" 
                                    />
                                </>
                            )}
                        </a>
                    )
                }
            )}
        </div>
    )
}
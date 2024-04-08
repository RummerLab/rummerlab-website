import { Key } from 'react';
import Image from 'next/image';
import { getInstagramPostData, mutateCaption, generateAlt, generateCaption } from '@/lib/instagramAPI';

export const revalidate = 86400;
export const dynamic = "force-dynamic";

export default async function Posts() {
    const rummerlabId = null; //'3666266808';
    const posts = await getInstagramPostData(rummerlabId)

    if (!posts || posts.length === 0) {
        console.error('No Instagram posts found');
        return null;
    }

    // Filter - The Media's type. Can be IMAGE, VIDEO, or CAROUSEL_ALBUM
    // https://developers.facebook.com/docs/instagram-basic-display-api/reference/media#fields
    //const images = posts.filter((post: { media_type: string; }) => post.media_type === 'IMAGE');

    return (
        <div className="text-center">
            {posts.map((post: { id: Key; permalink: string; media_url: string; caption: string; media_type: string; thumbnail_url: string; }) => {
                const imageUrl = post.thumbnail_url ?? post.media_url;

                let caption = mutateCaption(post.caption);
                const altText = generateAlt(caption);
                const captionText = generateCaption(caption);

                return (
                    <a key={post.id} href={post.permalink} target="_blank" rel="noopener noreferrer" className="relative group inline-block hover:bg-opacity-90 hover:grayscale transition duration-150 cursor-pointer overflow-hidden">
                        {imageUrl && (
                            <>
                                <Image
                                    src={imageUrl}
                                    alt={altText}
                                    width={500}
                                    height={300}
                                    className="h-96 w-full object-cover aspect-square rounded-sm"
                                    loading="lazy"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-20 text-white text-sm p-1 transition-opacity duration-150 group-hover:bg-opacity-70">
                                    {captionText}
                                </div>
                            </>
                        )}
                    </a>
                )
            }
            )}
        </div>
    )
}
import { Key } from 'react';
import Image from 'next/image';
import { getLongLivedToken } from '@/lib/metaToken';

async function getInstagramPostData() {
    try {
        //const accessToken = await getLongLivedToken();
        const accessToken = process.env.APP_ACCESS_TOKEN;
        // https://www.youtube.com/watch?v=kLFSTaCqzdQ
        // Get access token: https://developers.facebook.com/apps/362219269878369/instagram-basic-display/basic-display/?business_id=3489130994739818

        if (!accessToken) {
            throw new Error('Failed to get access token')
        }

        // Fetch posts using the token
        const res = await fetch(`https://graph.instagram.com/me/media?fields=caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${accessToken}`, { 
        next: { 
                revalidate: 604800 // 1 week
            } 
        });

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
        }

        const data = await res.json();

        if (!data || !data.data || data.data.length === 0) {
            throw new Error('Failed to parse data')
        }
        
        return data.data || []
    } catch (error) {
        console.error('Failed to fetch Instagram post data:', error);
        return []
    }
}

function mutateCaption(caption: string) {
    let text = caption.split('\n')[0].trim();
    text = text.split("📸")[0].trim();
    text = text.split("📷")[0].trim();
    text = text.split("Image by")[0].trim();
    text = text
    .replace(/Repost @rummerjodie with @get_repost/gi,"")
    .replace(/ Dr\. /gi, " Dr ")
    .replace(/ w\/ /gi, " with ")
    .replace(/@rummerlab/gi,"RummerLab")
    .replace(/#rummerlab/gi,"RummerLab")
    .replace(/Rummer ?Lab/gi,"RummerLab")
    .replace(/@physioshark/gi,"Physioshark")
    .replace(/#physioshark/gi,"Physioshark")
    .replace(/#climatechange/gi,"Climate Change")
    .replace(/#babysharks/gi,"baby sharks")
    .replace(/#newyorkcity/gi,"New York City")
    .replace(/@rummerjodie/gi,"Dr Jodie Rummer")
    .replace(/Dr. Jodie Rummer (@rummerjodie)/gi,"Dr Jodie Rummer")
    .replace(/@tomvierus/gi,"Tom Vierus")
    .replace(/@wildlifeconservationfilmfest|@wcff_org/gi,"Wildlife Conservation FilmFest")
    .replace(/Wildlife Conservation FilmFest Wildlife Conservation FilmFest/gi,"Wildlife Conservation FilmFest")
    .replace(/#greatbarrierreef/gi,"Great Barrier Reef")
    .replace(/#reeffish/gi,"reef fish")
    .replace(/#marinebiology/gi,"marine biology")
    .replace(/#marinelife/gi,"marine life")
    .replace(/#oceanlife/gi,"ocean life")
    .replace(/#fishareawesome/gi,"fish are awesome")
    .replace(/#natureisawesome/gi,"nature is awesome")
    .replace(/#rummerlabproud/gi,"")
    .replace(/#conphys/gi,"Conservation Physiology")
    .replace(/Adam Donnie/gi,"Adam Downie")
    .replace(/@adamtdownie/gi,"Adam Downie").replaceAll("Adam Downie Adam Downie","Adam Downie")
    .replace(/@adamdownunder/gi,"Adam Oscar")
    .replace(/@ianbouyoucos/gi,"Ian Bouyoucos")
    .replace(/@khannan18/gi,"Kelly Hannan")
    .replace(/@emmhiggins/gi,"Emily Higgins")
    .replace(/@teish_prescott/gi,"Teish Prescott")
    .replace(/@wheel_house23/gi,"Carolyn Wheeler")
    .replace(/@sharkcolin/gi,"Colin Simpfendorfer")
    .replace(/@thelittleafrican/gi,"Kristy Potgieter")
    .replace(/@emmhiggins/gi,"Emily Higgins")
    .replace(/@rachelskubel/gi,"Rachel Skubel")
    .replace(/@drneilhammer/gi,"Dr Neil Hammerschlag")
    .replace(/@hesssybille/gi,"Antonius Schoenig")
    .replace(/@universityofnewengland/gi,"University of New England")
    .replace(/@newenglandaquarium/gi,"New England Aquarium")
    .replace(/#tropicalfish/gi,"tropical fish")
    .replace(/#tigersharks/gi,"tiger sharks")
    .replace(/#epauletteshark/gi,"epaulette shark")
    .replace(/#fishphysiology/gi,"fish physiology")
    .replace(/#orpheusisland/gi,"Orpheus Island")
    .replace(/@bbcnews/gi,"BBC News")
    .replace(/@flindersuniversity/gi,"Flinders University")
    .replace(/@universityofbc/gi,"University of British Columbia")
    .replace(/@lorealaustralia/gi,"L'Oréal Australia & New Zealand")
    .replace(/@coral_coe/gi,"CoralCoE")
    .replace(/@coral.coe/gi,"CoralCoE")
    .replace(/@reefhqaquarium/gi,"Reef HQ Aquarium")
    .replace(/@jamescookuniversity/gi,"James Cook University")
    .replace(/#jamescookuniversity/gi,"James Cook University")
    .replace(/@villanovau/gi,"Villanova University")
    .replace(/@university_of_illinois/gi,"University of Illinois")
    .replace(/@universityofmichigann/gi,"University Of Michigan")
    .replace(/@carleton_u/gi,"Carleton University")
    .replace(/@yale/gi,"Yale University")
    .replace(/@discoverunb/gi,"University of New Brunswick")
    .replace(/@ucsantacruz/gi,"University of California, Santa Cruz")
    .replace(/@macquarieuni/gi,"Macquarie University")
    .replace(/@univmiami/gi,"University of Miami")
    .replace(/#macquarieuni/gi,"Macquarie University")
    .replace(/#umiami/gi,"University of Miami")
    .replace(/#portjacksonshark/gi,"Port Jackson Shark")
    .replace(/@mcmasteru/gi,"McMaster University")
    .replace(/@abcradionational/gi,"ABC Radio National")
    .replace(/@abcradionnational/gi,"ABC Radio National")
    .replace(/@abcnews_au/gi,"ABC News Australia")
    .replace(/@UNESCO/gi,"UNESCO")
    .replace(/#meettheteam/gi,"Meet The Team:")
    .replace(/#bestteamever/gi,"Best Team Ever")
    .replace(/#womeninscience/gi,"women in science")
    .replace(/#research/gi,"research")
    .replace(/#conservation/gi,"conservation")
    .replace(/#townsville/gi,"Townsville")
    .replace(/#queensland/gi,"Queensland")
    .replace(/#Australia/gi,"Australia")
    .trim();
    return text;
}

function truncateSentence(text: string, numberOfCharacters: number) {
    if (text.length <= numberOfCharacters) return text;
    const regex = new RegExp(`\\b[\\w']+(?:[^\\w\\n]+[\\w']+){0,${numberOfCharacters - 1}}\\b`, 'g');
    const subString = text.match(regex); // split up text into n words

    if (subString && subString.length > 0) {
        // find nearest end of sentence
        const period = subString[0].lastIndexOf('.');
        const questionMark = subString[0].lastIndexOf('?');
        const exclamationMark = subString[0].lastIndexOf('!');
        const ellipsis = subString[0].lastIndexOf('...');

        const endOfSentence = Math.max(period, questionMark, exclamationMark, ellipsis);

        // If a sentence-ending punctuation is found
        if (endOfSentence !== -1) {
            return subString[0].substring(0, endOfSentence + 1);
        }

        // If no sentence-ending punctuation is found
        return subString[0];
    }

    return text;
}
  
function generateAlt(caption: string) {
    let text = caption.split('\n')[0].trim();
    text = truncateSentence(text, 30);
    let words = text.split(' ');
    words.forEach((word, index) => {
        if (word.startsWith("#")) {
            word = word.replace(/[A-Z]/g, str => ' ' + str);
            words[index] = word.substring(1);
        }
        if (word.startsWith("@")) {
            word = word.replace(/[A-Z]/g, str => ' ' + str);
            words[index] = word.substring(1);
        }
    });
    text = words.join(' ');
    return text
}
function generateCaption(caption: string) {
    let words = caption.split(' ');
    words.forEach((word, index) => {
        if (word.startsWith("#")) {
            word = word.replace(/[A-Z]/g, str => ' ' + str);
            words[index] = word.substring(1);
        }
    });
    return words.join(' ');
}

export default async function InstagramPosts() {
    const posts = await getInstagramPostData()

    if (!posts || posts.length === 0) {
        return null;
    }

    // Filter - The Media's type. Can be IMAGE, VIDEO, or CAROUSEL_ALBUM
    // https://developers.facebook.com/docs/instagram-basic-display-api/reference/media#fields
    //const images = posts.filter((post: { media_type: string; }) => post.media_type === 'IMAGE');

    return (
        <div className="h-37 text-center overflow-hidden">
            {posts.map((post: { id: Key; permalink: string; media_url: string; caption: string; media_type: string; thumbnail_url: string; }) => {
                    const imageUrl = post.thumbnail_url ?? post.media_url;

                    let caption = mutateCaption(post.caption);
                    const altText = generateAlt(caption);
                    const captionText = generateCaption(caption);
    
                    return (
                        <a key={post.id} href={post.permalink} target="_blank" rel="noopener noreferrer" className="relative group inline-block hover:bg-opacity-90 cursor-pointer">
                            {imageUrl && (
                                <>
                                    <Image
                                        src={imageUrl}
                                        alt={altText}
                                        width={500}
                                        height={300}
                                        className="h-37 w-37 inline-block object-cover aspect-square hover:grayscale rounded-sm transition duration-150 md:h-62 md:w-62 sm:h-50 sm:w-50"
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


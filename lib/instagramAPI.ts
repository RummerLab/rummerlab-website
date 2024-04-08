/**
 * Exchanges a short-lived Instagram access token for a long-lived one.
 * @param shortLivedToken The short-lived token to exchange.
 * @returns The long-lived token, or an error message if the exchange fails.
 */
export async function getLongLivedToken(shortLivedToken: string): Promise<string> {
    const clientId = process.env.INSTAGRAM_CLIENT_ID;
    const clientSecret = process.env.INSTAGRAM_CLIENT_SECRET; 
    const redirectUri = 'YOUR_REDIRECT_URI';
    const grantType = 'ig_exchange_token'; // The grant type for token exchange

    // Construct the request URL
    const requestUrl = `https://graph.instagram.com/access_token?grant_type=${grantType}&client_secret=${clientSecret}&access_token=${shortLivedToken}`;

    try {
        // Make the request to exchange tokens
        const response = await fetch(requestUrl, {
            method: 'GET', // Token exchange is a GET request
        });

        // Parse the JSON response
        const data = await response.json();

        // Check if the response contains a long-lived token
        if (data && data.access_token) {
            console.log('Successfully obtained long-lived token.');
            return data.access_token; // Return the long-lived token
        } else {
            // Log and throw error if no token is found in the response
            console.error('Failed to obtain long-lived token:', data);
            throw new Error('Failed to obtain long-lived token.');
        }
    } catch (error) {
        // Log and rethrow any errors that occur during the fetch operation
        console.error('Error exchanging short-lived token for a long-lived token:', error);
        throw error;
    }
}


async function accessTokenExpired(accessToken: string): Promise<boolean> {
    try {
        // Use a lightweight endpoint for checking; fetching the user's profile could be an option.
        const response = await fetch(`https://graph.instagram.com/me?fields=id&access_token=${accessToken}`);
        
        // If the request is successful, the token is still valid.
        if (response.ok) {
            const data = await response.json();
            console.log('Instagram Token is valid, user ID:', data.id);
            return false;
        }

        // If the response status is 400 or 401, it's likely that the token has expired or is invalid.
        if (response.status === 400 || response.status === 401) {
            console.log('Instagram Token has expired or is invalid');
            return true;
        }

        // For any other HTTP status, log it and return true as a precaution.
        console.error('Unexpected response status:', response.status);
        return true;
    } catch (error) {
        console.error('Failed to check access token expiration:', error);
        // If an error occurs (e.g., network issue), assume the token might be expired for safety.
        return true;
    }
}

export async function getInstagramPostData(id: string | null) {
    try {
        //const accessToken = await getLongLivedToken();
        let accessToken = process.env.APP_ACCESS_TOKEN;
        // https://www.youtube.com/watch?v=kLFSTaCqzdQ
        // Get access token: https://developers.facebook.com/apps/362219269878369/instagram-basic-display/basic-display/?business_id=3489130994739818

        if (!accessToken) {
            throw new Error('Failed to get access token')
        }
        if (await accessTokenExpired(accessToken)) {
            throw new Error('Access token expired')
        }

        const userId = id ?? 'me';

        // Fetch posts using the token
        const res = await fetch(`https://graph.instagram.com/${userId}/media?fields=caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${accessToken}`, {
            next: {
                revalidate: 86400 // 1 day
            }
        });

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data');
        }

        const data = await res.json();

        if (!data || !data.data || data.data.length === 0) {
            throw new Error('Failed to parse data')
        }

        // console.log('Instagram post data:', data.data);

        return data.data || []
    } catch (error) {
        console.error('Failed to fetch Instagram post data:', error);
        return []
    }
}

export function mutateCaption(caption: string) {
    let text = caption.split('\n')[0].trim();
    text = text.split("📸")[0].trim();
    text = text.split("📷")[0].trim();
    text = text.split("Image by")[0].trim();
    text = text
        .replace(/Repost @rummerjodie with @get_repost/gi, "")
        .replace(/ Dr\. /gi, " Dr ")
        .replace(/ w\/ /gi, " with ")
        .replace(/@rummerlab/gi, "RummerLab")
        .replace(/#rummerlab/gi, "RummerLab")
        .replace(/Rummer ?Lab/gi, "RummerLab")
        .replace(/@physioshark/gi, "Physioshark")
        .replace(/#physioshark/gi, "Physioshark")
        .replace(/#climatechange/gi, "Climate Change")
        .replace(/#babysharks/gi, "baby sharks")
        .replace(/#newyorkcity/gi, "New York City")
        .replace(/@rummerjodie/gi, "Dr Jodie Rummer")
        .replace(/Dr. Jodie Rummer (@rummerjodie)/gi, "Dr Jodie Rummer")
        .replace(/@tomvierus/gi, "Tom Vierus")
        .replace(/@wildlifeconservationfilmfest|@wcff_org/gi, "Wildlife Conservation FilmFest")
        .replace(/Wildlife Conservation FilmFest Wildlife Conservation FilmFest/gi, "Wildlife Conservation FilmFest")
        .replace(/#greatbarrierreef/gi, "Great Barrier Reef")
        .replace(/#reeffish/gi, "reef fish")
        .replace(/#marinebiology/gi, "marine biology")
        .replace(/#marinelife/gi, "marine life")
        .replace(/#oceanlife/gi, "ocean life")
        .replace(/#fishareawesome/gi, "fish are awesome")
        .replace(/#natureisawesome/gi, "nature is awesome")
        .replace(/#rummerlabproud/gi, "")
        .replace(/#conphys/gi, "Conservation Physiology")
        .replace(/Adam Donnie/gi, "Adam Downie")
        .replace(/@adamtdownie/gi, "Adam Downie").replaceAll("Adam Downie Adam Downie", "Adam Downie")
        .replace(/@adamdownunder/gi, "Adam Oscar")
        .replace(/@ianbouyoucos/gi, "Ian Bouyoucos")
        .replace(/@josemilio.trujillo.m/gi, "José E Trujillo")
        .replace(/@khannan18/gi, "Kelly Hannan")
        .replace(/@emmhiggins/gi, "Emily Higgins")
        .replace(/@teish_prescott/gi, "Teish Prescott")
        .replace(/@wheel_house23/gi, "Carolyn Wheeler")
        .replace(/@sharkcolin/gi, "Colin Simpfendorfer")
        .replace(/@thelittleafrican/gi, "Kristy Potgieter")
        .replace(/@emmhiggins/gi, "Emily Higgins")
        .replace(/@rachelskubel/gi, "Rachel Skubel")
        .replace(/@drneilhammer/gi, "Dr Neil Hammerschlag")
        .replace(/@hesssybille/gi, "Antonius Schoenig")
        .replace(/@universityofnewengland/gi, "University of New England")
        .replace(/@newenglandaquarium/gi, "New England Aquarium")
        .replace(/#tropicalfish/gi, "tropical fish")
        .replace(/#tigersharks/gi, "tiger sharks")
        .replace(/#epauletteshark/gi, "epaulette shark")
        .replace(/#fishphysiology/gi, "fish physiology")
        .replace(/#orpheusisland/gi, "Orpheus Island")
        .replace(/@bbcnews/gi, "BBC News")
        .replace(/@flindersuniversity/gi, "Flinders University")
        .replace(/@universityofbc/gi, "University of British Columbia")
        .replace(/@lorealaustralia/gi, "L'Oréal Australia & New Zealand")
        .replace(/@coral_coe/gi, "CoralCoE")
        .replace(/@coral.coe/gi, "CoralCoE")
        .replace(/@reefhqaquarium/gi, "Reef HQ Aquarium")
        .replace(/@jamescookuniversity/gi, "James Cook University")
        .replace(/#jamescookuniversity/gi, "James Cook University")
        .replace(/@villanovau/gi, "Villanova University")
        .replace(/@university_of_illinois/gi, "University of Illinois")
        .replace(/@universityofmichigann/gi, "University Of Michigan")
        .replace(/@carleton_u/gi, "Carleton University")
        .replace(/@yale/gi, "Yale University")
        .replace(/@discoverunb/gi, "University of New Brunswick")
        .replace(/@ucsantacruz/gi, "University of California, Santa Cruz")
        .replace(/@macquarieuni/gi, "Macquarie University")
        .replace(/@univmiami/gi, "University of Miami")
        .replace(/#macquarieuni/gi, "Macquarie University")
        .replace(/#umiami/gi, "University of Miami")
        .replace(/#portjacksonshark/gi, "Port Jackson Shark")
        .replace(/@mcmasteru/gi, "McMaster University")
        .replace(/@abcradionational/gi, "ABC Radio National")
        .replace(/@abcradionnational/gi, "ABC Radio National")
        .replace(/@abcnews_au/gi, "ABC News Australia")
        .replace(/@UNESCO/gi, "UNESCO")
        .replace(/#meettheteam/gi, "Meet The Team:")
        .replace(/#bestteamever/gi, "Best Team Ever")
        .replace(/#womeninscience/gi, "women in science")
        .replace(/#research/gi, "research")
        .replace(/#conservation/gi, "conservation")
        .replace(/#townsville/gi, "Townsville")
        .replace(/#queensland/gi, "Queensland")
        .replace(/#Australia/gi, "Australia")
        .trim();
    return text;
}

export function truncateSentence(text: string, numberOfCharacters: number) {
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

export function generateAlt(caption: string) {
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
export function generateCaption(caption: string) {
    let words = caption.split(' ');
    words.forEach((word, index) => {
        if (word.startsWith("#")) {
            word = word.replace(/[A-Z]/g, str => ' ' + str);
            words[index] = word.substring(1);
        }
    });
    return words.join(' ');
}

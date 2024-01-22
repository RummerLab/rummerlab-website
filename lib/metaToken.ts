// Function to exchange a short-lived token for a long-lived token
let longLivedToken = '';

export async function getLongLivedToken() {
  if (!longLivedToken) {
    return await exchangeShortLivedTokenForLongLivedToken();
  }
  const isTokenValid = await revalidateLongLivedToken(longLivedToken);
  if (!isTokenValid) {
    return await exchangeShortLivedTokenForLongLivedToken();
  }
  return longLivedToken;
  
};

async function exchangeShortLivedTokenForLongLivedToken() {
  try {
    const shortLivedToken = process.env.SHORT_LIVED_TOKEN;

    if (!shortLivedToken) {
      console.error("Error getting Meta Token: No short-lived token provided.");
      return null;
    }

    const response = await fetch('https://graph.facebook.com/v18.0/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'fb_exchange_token',
        client_id: process.env.APP_ID,
        client_secret: process.env.APP_SECRET,
        fb_exchange_token: shortLivedToken,
      }),
    });

    const data = await response.json();

    if (!data.access_token) {
      console.error("Error getting Meta Token:", data.error.code, data.error.type, data.error.message);
      return null;
    }

    console.log("Meta Token:", data.access_token)
    return data.access_token;
  } catch (error) {
    console.error('Error getting long-lived token:', error);
    return null;
  }
};

// Function to revalidate a long-lived token
async function revalidateLongLivedToken(longLivedToken: string) {
  const appAccessToken = `${process.env.APP_ID}|${process.env.APP_SECRET}`;

  try {
    const response = await fetch(`https://graph.facebook.com/debug_token?input_token=${longLivedToken}&access_token=${appAccessToken}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data && data.data && data.data.is_valid) {
      console.log("Meta Token is valid.");
      console.log("Meta Token expires at: ", new Date(data.data.expires_at * 1000));

      return longLivedToken;
    } else {
      console.log("Meta Token is invalid.");
      return null;
    }
  } catch (error) {
    console.error('Error revalidating long-lived token:', error);
    return null;
  }
};

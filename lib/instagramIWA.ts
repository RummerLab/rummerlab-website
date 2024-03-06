// https://github.com/amamenko/inky-doodle/blob/master/index.js
const Instagram = require("./instagram-web-api");
const FileCookieStore = require("tough-cookie-filestore2");

const instagramLoginFunction = async () => {
    // Persist cookies after Instagram client log in
    const cookieStore = new FileCookieStore("./cookies.json");

    const client = new Instagram(
      {
        username: process.env.INSTAGRAM_USERNAME,
        password: process.env.INSTAGRAM_PASSWORD,
        cookieStore,
      },
      {
        language: "en-US",
      }
    );
    }
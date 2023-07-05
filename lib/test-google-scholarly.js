const Scholar = require("google-scholarly-updated");

(async () => {
  try {
    await Scholar.init();
    const authorProfile = await Scholar.getAuthorProfile('ynWS968AAAAJ', 'all');
    console.log('Author Profile:', authorProfile);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();

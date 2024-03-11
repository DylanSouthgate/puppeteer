let m3u8Url = null;

chrome.webRequest.onResponseStarted.addListener(function(details) {
  const responseUrl = details.url;
  if (responseUrl.includes('.m3u8')) {
    m3u8Url = responseUrl;
    console.log(responseUrl);
    chrome.tabs.sendMessage(details.tabId, { type: 'm3u8Url', url: m3u8Url });
  }
  if (responseUrl.includes('https://rapid-cloud.co')) {
    console.log(details);
  }
}, { urls: ["<all_urls>"] }, ["responseHeaders"]);

chrome.webRequest.onCompleted.addListener(
  (details) => {
    // Check if the request was successful (status code 200)
    if (details.statusCode === 200) {
      // Log the response data
      console.log('URL:', details.url);
      console.log('Response Headers:', details.responseHeaders);
      console.log('Response Body:', details.responseText); // This contains the response data
    }
  },
  { urls: ["<all_urls>"] }, // You can specify specific URLs here if needed
  ["responseHeaders", "extraHeaders"]
);
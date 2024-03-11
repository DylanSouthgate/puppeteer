chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === 'm3u8Url') {
    const div = document.createElement('div');
    div.className = "m3u8";
    div.textContent = request.url;
    document.body.appendChild(div);
//    document.querySelector('.container').remove();
  }
  if (request.type === 'listATags') {
    window.location.href = 'https://example.com';
/*    const aTags = Array.from(document.querySelectorAll('.episodes-ul > a'));
    const hrefs = aTags.map(a => ({
      title: a.title,
      data_number: a.getAttribute('data-number'),
      data_id: a.getAttribute('data-id'),
      href: a.href,
    }));
    console.log(hrefs)
    fetch('http://localhost:8080/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: hrefs }),
    })
      .then(response => response.json())
      .then(data => {
        sendResponse({ message: data.message });
      })
      .catch(error => {
        sendResponse({ error: 'Error sending data to server' });
      });*/
//    sendResponse(hrefs);
  }
});
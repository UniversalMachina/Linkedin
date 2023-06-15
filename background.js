let originalTabId;


chrome.browserAction.onClicked.addListener((tab) => {
  originalTabId = tab.id;
  chrome.tabs.executeScript(tab.id, { file: 'content.js' });
});

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log('Message received');

//   if (request.message === 'navigate') {

//     setTimeout(() => {
//       chrome.tabs.executeScript(sender.tab.id, { file: 'content.js' });
//     }, 2000); // 2000 ms delay
//   }
// });

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   if (changeInfo.status === 'complete') {
//     chrome.tabs.executeScript(tabId, { file: 'content.js' });
//   }
// });


// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   // Only run on complete, active, original tab
//   if (tab.active && tabId === originalTabId) {
//     chrome.tabs.executeScript(tabId, { file: 'content.js' });
//   }
// });
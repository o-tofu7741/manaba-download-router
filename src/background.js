let base_folder = "manaba-downloads";
let subjectName = "None";
let filenameChange = false;

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

function getText(selector) {
  const el = document.querySelector(selector);
  return el.innerText;
}

async function getSubjectName(tabId) {
  const subjectName = await chrome.scripting.executeScript({
    target: { tabId: tabId },
    function: getText,
    args: ["#coursename"]
  });
  return subjectName[0].result;
}

async function isManaba(inputUrl, tabId) {
  if (!inputUrl) {
    inputUrl = "https://example.com/";
  }
  const url = new URL(inputUrl);
  if (/manaba/i.test(url.hostname)) {
    subjectName = await getSubjectName(tabId);
    if (!subjectName){
      subjectName = "None"
      filenameChange = false;
    } else {
      filenameChange = true;
    }
  } else {
    subjectName = "None";
    filenameChange = false;
  }
}

chrome.tabs.onActivated.addListener(async function(activeInfo) {
  const tab = await getCurrentTab();
  await isManaba(tab.url, tab.id);
  console.log("タブが切り替えられました: " + subjectName + ", " + filenameChange);
});

chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {
  if (tab.active && changeInfo.url) {
    await isManaba(tab.url, tab.id);
    console.log("現在アクティブなタブでページの移動がありました: " + subjectName + ", " + filenameChange);
  }
});

chrome.windows.onFocusChanged.addListener(function(windowId) {
  chrome.windows.getCurrent(async function(currentWindow) {
    try {
      if (windowId === currentWindow.id) {
      const tab = await getCurrentTab();
      await isManaba(tab.url, tab.id);
      console.log("アクティブなウィンドウが変更されました: " + subjectName + ", " + filenameChange);
      }
    } catch {
      console.log("chrome閉じたか何かのエラー")
    }
  });
});

chrome.downloads.onDeterminingFilename.addListener(async function(item, suggest) {
  if (filenameChange) {
    const proposedFilename = base_folder + "/" + subjectName + "/" + item.filename;
    suggest({ filename: proposedFilename });
  } else {
    suggest();
  }
});

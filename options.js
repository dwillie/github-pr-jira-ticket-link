function saveOptions(e) {
  chrome.storage.local.set({
    orgName: document.querySelector("#orgName").value
  });
  e.preventDefault();
}

function restoreOptions() {
  chrome.storage.local.get('orgName', (res) => {
    document.querySelector("#orgName").innerText = res.orgName;
    document.querySelector("#orgName").value = res.orgName || 'Pick an Org Name';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
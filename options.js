function saveOptions(e) {
  browser.storage.sync.set({
    orgName: document.querySelector("#orgName").value
  });
  e.preventDefault();
}

function restoreOptions() {
  var storageItem = browser.storage.managed.get('orgName');
  storageItem.then((res) => {
    document.querySelector("#orgName").innerText = res.orgName;
  });

  var gettingItem = browser.storage.sync.get('orgName');
  gettingItem.then((res) => {
    document.querySelector("#orgName").value = res.orgName || 'Pick an Org Name';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
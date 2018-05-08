console.log(browser.storage.managed);
var storageItem = browser.storage.sync.get('orgName');
console.log(storageItem);

storageItem.then(a => { 
    prTitle = document.getElementsByClassName("js-issue-title")[0];
    const ticketTagRegex = /([A-Z]+\-[0-9]+)+/g;
    prTitle.innerHTML = prTitle.innerHTML.replace(ticketTagRegex, "<a href=\"http://" + a.orgName + ".atlassian.net/browse/$&\">$&</a>"); 
});
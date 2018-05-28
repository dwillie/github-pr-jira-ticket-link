console.log(browser.storage.managed);
var storageItem = browser.storage.sync.get('orgName');
console.log(storageItem);

storageItem.then(a => { 
    const ticketTagRegex = /([A-Z]+\-[0-9]+)+/g;

    setInterval(() => {
        var prTitle = document.getElementsByClassName("js-issue-title")[0];
        if (prTitle && prTitle.innerHTML.indexOf("atlassian.net") == -1) { // Already contains a link to JIRA
            prTitle.innerHTML = prTitle.innerHTML.replace(ticketTagRegex, "<a target=\"_blank\" href=\"http://" + a.orgName + ".atlassian.net/browse/$&\">$&</a>"); 
        }

        document.querySelectorAll(".p-0").forEach(element => {
            if (element.innerHTML.indexOf("atlassian.net") == -1) {
                element.innerHTML = element.innerHTML.replace(ticketTagRegex, "</a><a style=\"font-weight:bold\" target=\"_blank\" href=\"http://" + a.orgName + ".atlassian.net/browse/$&\">$&</a>"); 
            }
        });
    }, 1000);
});
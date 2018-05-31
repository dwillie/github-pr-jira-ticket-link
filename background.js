console.log(browser.storage.managed);
var storageItem = browser.storage.sync.get('orgName');
console.log(storageItem);

storageItem.then(a => { 
    const ticketTagRegex = /([A-Z]+\-[0-9]+)+/g;

    setInterval(() => {
        var prTitle = document.getElementsByClassName("js-issue-title")[0];
        if (unlinked(prTitle)) { // Already contains a link to JIRA
            prTitle.innerHTML = prTitle.innerHTML.replace(ticketTagRegex, "<a target=\"_blank\" href=\"http://" + a.orgName + ".atlassian.net/browse/$&\">$&</a>"); 
        }

        document.querySelectorAll("div.col-9").forEach(element => {
            if (unlinked(element)) {
                element.innerHTML = element.innerHTML.replace(ticketTagRegex, "\
                    <a \
                    class=\"v-align-middle no-underline h4 js-navigation-open\" \
                    target=\"_blank\" \
                    href=\"http://" + a.orgName + ".atlassian.net/browse/$&\">\
                        $&\
                    </a>\
                    <a href=\"" + element.firstElementChild.getAttribute("href") + "\" class=\"link-gray-dark v-align-middle no-underline h4 js-navigation-open\">"); 
            }
        });
    }, 1000);
});

function unlinked(element) {
    return element && element.innerHTML.indexOf("atlassian.net") == -1;
}
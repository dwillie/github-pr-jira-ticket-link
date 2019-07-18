const storageItem = chrome.storage.local.get('orgName', userData => {
    const ticketTagRegex = /([A-Z]+\-[0-9]+)+/g;

    var lastHandledLocation = "";

    const intervalId = setInterval(() => {
        if (lastHandledLocation === document.location.href) {
            console.log("Location not changed: " + lastHandledLocation + " vs " + document.location.href);
            return;
        }

        console.log("Location changed: " + document.location.href + " Allowing the page to load before attempting linking.");
        setTimeout(() => {
            const prTitle = document.querySelector("span.js-issue-title");
            if (prTitle != null && isUnlinked(prTitle)) {
                prTitle.innerHTML = prTitle.innerHTML.replace(ticketTagRegex, prTitleLink(userData.orgName));

                // PR context confirmed, linking handled, set lastHandledLocation to prevent further refreshes
                lastHandledLocation = document.location.href;
                return;
            }

            const prLinks = document.querySelectorAll("a.h4");
            prLinks.forEach(element => {
                if (element.id.match(/issue_[0-9]+/) != null && isUnlinked(element)) {
                    element.outerHTML = element.outerHTML.replace(ticketTagRegex, prLinkLink(userData.orgName, element));
                }
            });

            if (prLinks.length > 0) {
                // PR List context confirmed, linking handled, set lastHandledLocation to prevent further refreshes
                lastHandledLocation = document.location.href;
            }
        }, 2500);
    }, 1000);
});

function isUnlinked(element) {
    return element && element.innerHTML.indexOf("atlassian.net") == -1;
}

function prTitleLink(orgName) {
    return "<a id=\"\" target=\"_blank\" href=\"http://" + orgName + ".atlassian.net/browse/$&\">$&</a>";
}

function prLinkLink(orgName, element) {
    return "\
    </a><a \
    class=\"v-align-middle no-underline h4 js-navigation-open\" \
    target=\"_blank\" \
    href=\"http://" + orgName + ".atlassian.net/browse/$&\">\
        $&\
    </a>\
    <a href=\"" + element.getAttribute("href") + "\" class=\"link-gray-dark v-align-middle no-underline h4 js-navigation-open\">";
}
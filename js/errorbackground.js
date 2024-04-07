setInterval(function(){
    try {
        var divElement = document.querySelector("div.graphic.halfSection");
        var msWebview = document.getElementById("x-ms-webview");
        if (msWebview && msWebview.getAttribute("src") === "ms-appx-web://microsoft.windows.cloudexperiencehost/webapps/inclusiveOobe/view/oobeError-main.html") { 
            divElement.classList.add('errorbackground');
        } else if (msWebview && msWebview.getAttribute("src").startsWith("https://")) {
            msWebview.classList.add('loginaccountfix');
        } else {
            divElement.classList.remove('errorbackground');
            msWebview.classList.remove('loginaccountfix');
        }
    } catch (e) {}
}, 100)


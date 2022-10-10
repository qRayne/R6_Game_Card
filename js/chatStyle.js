const applyStyles = iframe => {
    let styles = {
        fontColor: "#FFFFFF",
        fontGoogleName: "Inter Tight",
        fontSize: "15px",
        inputBackgroundColor: "transparent",
        inputFontColor: "#40E0D0",
        height: "700px",
        memberListFontColor: "#40E0D0",
        memberListBackgroundColor: "transparent"
    }
    setTimeout(() => {
        iframe.contentWindow.postMessage(JSON.stringify(styles), "*");
    }, 100);
}
var htmlTxt = document.getElementById("htmlTxt"),
    htmlDisplayFrame = document.getElementById("htmlDisplayFrame"),
    syntaxH = document.getElementById("syntaxHeader"),
    syntax = document.getElementById("syntax"),
    syntaxClosed = false;

convertMdHtml = () => {
    setTimeout(() => {
        let md = document.getElementById("input").value;
        htmlDisplayFrame.style.display = "none"
        let htmlC = md.mdToHTML()
        let url = URL.createObjectURL(new Blob([
            `<!DOCTYPE html><html><head></head><body>` + htmlC + "</body></html>"
        ], {
            type: "text/html"
        }))
        htmlDisplayFrame.src = url
        console.log([url, md, htmlC])
        htmlTxt.value = htmlC;
    }, 1);
}

displayHTML = (html) => {
    console.log(html)
    htmlDisplayFrame.style.display = ""
}

downloadHTML = (html) => {
    var fileName = prompt("File Name")
    let downloadBtnA = document.getElementById("downloadBtnA")
    downloadBtnA.href = htmlDisplayFrame.src
    console.log(htmlDisplayFrame.src)
    downloadBtnA.download = fileName
    downloadBtnA.click()
}

copyHTML = (elem) => {
    elem.select();
    elem.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

/*var mdTextElems = document.getElementsByClassName("mdTxt")
for (i = 0; i < mdTextElems.length; i++) {
    mdTextElems[i].innerHTML = mdTextElems[i].innerHTML.mdToHTML()
}*/

function checkSyntaxMenu(event) {
    switch (event) {
        case "out":
            if (syntaxClosed == false) {
                syntaxH.innerHTML = "Syntax";
            }
            break;
        case "hover":
            if (syntaxClosed == false) {
                syntaxH.innerHTML = "Hide Syntax";
            }
            break;
        case "click":
            if (syntaxClosed == false) {
                syntaxClosed = true;
                syntax.style = "height: 78px; overflow: hidden;";
                syntaxH.innerHTML = "Show Syntax";
            } else if (syntaxClosed == true) {
                syntaxClosed = false;
                syntax.style = "";
                syntaxH.innerHTML = "Syntax";
            }
            break;
    }
}
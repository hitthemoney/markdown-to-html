var htmlTxt = document.getElementById("htmlTxt"),
    htmlDisplayFrame = document.getElementById("htmlDisplayFrame"),
    syntaxH = document.getElementById("syntaxHeader"),
    syntax = document.getElementById("syntax"),
    syntaxClosed = false;

mdToHtml = (md) => {
    for (i in mdHtml) {
        //console.log([md, i])
        //console.log(md.split(i))
        //let md = md.split(i).join(`<${mdHtml[i]}>`)
        let mdLength = md.split(i).length
        for (ii = 0; ii < mdLength / 2; ii++) {
            if (mdHtml[i].length == 1) {
                md = md.replace(i, `<${mdHtml[i][0]}>`)
                md = md.replace(i, `</${mdHtml[i][0]}>`)
            } else if (mdHtml[i].length == 2) {
                md = md.replace(i, `<${mdHtml[i][0]}><${mdHtml[i][1]}>`)
                md = md.replace(i, `</${mdHtml[i][0]}></${mdHtml[i][1]}>`)
            }
        }
        /*let md2 = md;
        md = "";
        for (num = 0; num < md2.length; num++) {
            console.log([md, md2])
            //if (md2[num + 1] !== undefined) {
                md += `${md2[num]}<${mdHtml[i]}>${md2[num + 1]}`
                console.log([md2[num], mdHtml[i], md2[num + 1], `${md2[num]}<${mdHtml[i]}>${md2[num + 1]}`])
            //} 
        }*/
        //console.log(md)
    }
    /*console.log(md)
    md = md.split("<")
    let md2 = md.length
    console.log(md)
    let ht = false
    console.log(md2)
    for (num = 0; num < md2; num++) {
        console.log([num, num + num])
        if (ht == false) {
            md.splice(num, 0, '<');
            ht = true
        } else if (ht == true) {
            md.splice(num, 0, '</');
            ht = false
        }
    }
    console.log(md)
    md = md.join("")
    console.log(md)*/
    return md
}

removeUHtml = (html) => {
    for (i in mdHtml) {
        console.log(i)
        html = html.split(`<${mdHtml[i]}></${mdHtml[i]}>`).join("")
    }
    return html
}

convertMdHtml = (md) => {
    htmlDisplayFrame.style.display = "none"
    let htmlC = mdToHtml(md)
    var matches = htmlC.split(/\n|\s\n/);
    htmlC = matches.join("<br>\n") + "<br>";
    //let htmlC = md.split("**").join("<b>").split("*").join("<i>")
    let url = URL.createObjectURL(new Blob([
        `<!DOCTYPE html><html><head><style>body, html {background: #fff;}</style></head><body><p>` +
        htmlC + "</p></body></html>"
    ], {
        type: "text/html"
    }))
    htmlDisplayFrame.src = url
    let iframeDoc = htmlDisplayFrame.contentDocument
    let promise = new Promise((resolve, reject) => {
        var interval = setInterval(() => {
            //console.log(iframeDoc.body.outerHTML)
            try {
                if (htmlDisplayFrame.contentDocument.body.innerHTML !== "") {
                    let html = htmlDisplayFrame.contentDocument.body
                        .innerHTML //removeUHtml(htmlDisplayFrame.contentDocument.body.innerHTML)
                    /*"<!DOCTYPE html>" + (htmlDisplayFrame.contentDocument
                            .body.innerHTML).split("<b></b>").join("").split("<i></i>")
                        .join("")*/
                    //htmlDisplayFrame.contentDocument.body.innerHTML = html
                    resolve(html)
                    clearInterval(interval)
                }
            } catch {

            }
        }, 1);
    });
    promise.then((val) => {
        //val = removeUHtml(val)
        htmlDisplayFrame.contentDocument.body.innerHTML = val
        console.log([url, md, htmlC, val])
        htmlTxt.value = val;
    });
}

displayHTML = (html) => {
    console.log(html)
    /*let url = URL.createObjectURL(new Blob([
        `<!DOCTYPE html><html><head><style>body, html {background: #fff;}</style></head><body>` +
        html + "</body></html>"
    ], {
        type: "text/html"
    }))
    htmlDisplayFrame.src = url*/
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

var mdTextElems = document.getElementsByClassName("mdTxt")
for (i = 0; i < mdTextElems.length; i++) {
    mdTextElems[i].innerHTML = mdToHtml(mdTextElems[i].innerHTML)
}

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
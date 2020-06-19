! function () {
    var mdHtml = [{
        "***": ["b", "i"],
        "___": ["b", "i"],
        "**": ["b"],
        "__": ["b"],
        "*": ["i"],
        "_": ["i"],
        "```": ["code"],
        "```": ["code", "pre"],
        "~": ["del"]
    }, {
        "> ": "blockquote",
        "###### ": "h6",
        "##### ": "h5",
        "#### ": "h4",
        "### ": "h3",
        "## ": "h2",
        "# ": "h1",
        "": "p"
    }];

    String.prototype.mdToHTML = function () {
        var md = this.toString();
        for (i in mdHtml[0]) {
            let mdLength = md.split(i).length;
            for (ii = 0; ii < mdLength / 2; ii++) {
                if (mdHtml[0][i].length == 1) {
                    md = md.replace(i, `<${mdHtml[0][i][0]}>`);
                    md = md.replace(i, `</${mdHtml[0][i][0]}>`);
                } else if (mdHtml[0][i].length == 2) {
                    md = md.replace(i, `<${mdHtml[0][i][1]}><${mdHtml[0][i][0]}>`);
                    md = md.replace(i, `</${mdHtml[0][i][0]}></${mdHtml[0][i][1]}>`);
                };
            };
        };
        md = md.split("\n");
        let hasP = false;
        let hasPNum = 0;
        for (i in mdHtml[1]) {
            let mdLength = md.length;
            for (ii = 0; ii < mdLength; ii++) {
                let blockquote = false;
                if (md[ii].slice(0, 2) == "> ") {
                    blockquote = true;
                    md[ii] = md[ii].slice(2)
                }
                if ((md[ii].slice(0, i.length) == i)) {
                    if (i !== "") {
                        let oldMd = md.toString();
                        md[ii] = md[ii].replace(`${i}`, `<${mdHtml[1][i]}>`);
                        let newMd = md.toString();
                        if (oldMd !== newMd) {
                            md[ii] += `</${mdHtml[1][i]}>`;
                            if (hasP) {
                                md[ii] = "</p>" + md[ii];
                                hasP = false;
                            };
                        };
                    } else if (i == "" && (md[ii] !== "" || hasP == true)) {
                        if (md[ii].slice(0, 2) !== "<h" && md[ii].slice(0, 4) !== "<pre") {
                            md[ii] += "<br>\n"
                        } else if (md[ii].slice(0, 4) == "<pre") {
                            md[ii] += "\n"
                        }
                        if (md[ii].slice(0, 2) !== "<h" && hasP == false) {
                            md[ii] = "<p>" + md[ii];
                            hasP = true;
                            hasPNum = ii
                        };
                        if (hasP && ii == mdLength - 1) {
                            md[ii] += "</p>";
                            hasP = false;
                        };
                    };
                };
                /* console.log(md[ii]) */
                if (blockquote == true && i == "") {
                    md[ii] = "<blockquote>" + md[ii] + "</blockquote>"
                } else if (blockquote == true && i !== "") {
                    md[ii] = "> " + md[ii] + ""
                }
            };
        };
        /* console.log(md) */
        md = md.join("")
        return md;
    };

    window.parsePageMarkdown = (str) => {
        let mdElems = document.getElementsByTagName("md");
        for (i = 0; i < mdElems.length; i++) {
            if (str == "replace") {
                if (mdElems[i].getAttribute("parsed") !== "true") {
                    mdElems[i].outerHTML = mdElems[i].innerText.mdToHTML();
                }
            } else if (str == "keep") {
                mdElems[i].innerHTML = mdElems[i].innerText.mdToHTML();
            } else {
                mdElems[i].innerHTML = mdElems[i].innerText.mdToHTML();
                mdElems[i].setAttribute("parsed", "true")
            };
        };
    };
    let scripts = document.getElementsByTagName("script");
    for (i = 0; i < scripts.length; i++) {
        try {
            if (scripts[i].getAttribute("src") !== null) {
                var url = new URL(scripts[i].getAttribute("src"));
                var nHUrl = url.hostname + url.pathname;
                if (nHUrl == "hitthemoney.com/markdown-to-html/js/api.js" || "hitthemoney.com/markdown-to-html/js/api.min.js") {
                    let src = scripts[i].getAttribute("src");
                    let sp = new URL(src).searchParams;
                    if (sp.get("parseOnload") !== null) {
                        parsePageMarkdown(decodeURI(sp.get("parseOnload")));
                    }
                    break;
                };
            };
        } catch {};
    };
}();
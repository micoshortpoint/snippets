const copyrightLines = document.querySelectorAll(`.copyright, .footer-copy-social > p`);

copyrightLines.forEach((copyright) => {
    let yearRegex = /Copyright 2\d{3}/;
    let thisYear = "Copyright " + (new Date()).getFullYear();  
    let newCopyright = copyright.innerHTML.replace(yearRegex, thisYear);
    copyright.innerHTML = newCopyright;
});
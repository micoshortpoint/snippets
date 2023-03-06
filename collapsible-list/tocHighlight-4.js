const article = document.querySelector(`#article-body`);

const subsectionTitles = article.querySelectorAll(`h2[id], h3[id], h4[id], h5[id], h6[id]`);

const subsectionIds = Array.prototype.map.call(subsectionTitles,
    (t => t.getAttribute(`id`)));

const tocMain = article.querySelector(`p.fd-toc+ul`);

const tocSide = document.querySelector(`.solution-sidebar p.fd-toc+ul`);

const tocLinksMain = tocMain.querySelectorAll(`a`);

const tocLinksSide = tocSide.querySelectorAll(`a`);

const tocLinkHrefs = Array.prototype.map.call(tocLinksMain,
    (a => a.getAttribute(`href`)));

let titleHeights;

function calculateHeights() {
    titleHeights = Array.prototype.map.call(subsectionTitles,
       (t => t.getBoundingClientRect().top - document.body.getBoundingClientRect().top));
}

// Assuming headings, tocLinks, and headingsHeights indexes correspond properly
// Optionally, first create toc dynamically based on the headings (to eliminate chance of mapping error)

function tocItemSelect(item) {
    console.log(item);
    const parentToc = item.closest(`p.fd-toc+ul`);
    parentToc.setAttribute(`data-processing-selected`, `1`);
    const currentSelected = parentToc.querySelector(`.selected.main-selected-leaf`);
    if(currentSelected) {
        currentSelected.classList.remove(`selected`, `main-selected-leaf`);
        let currentSelectedParent = currentSelected.parentElement.closest(`li.collapsible`);
        while(currentSelectedParent) {
            // currentSelectedParent.querySelector(`:scope > a`).classList.remove(`selected`);
            currentSelectedParent = currentSelectedParent.parentElement.closest(`li.collapsible`);
        }
    }
    // console.log(`removed selected`, currentSelected, `new selected`, item);
    item.classList.add(`selected`, `main-selected-leaf`);
    let parentLi = item.parentElement.closest(`li.collapsible`);
    while(parentLi) {
        if(!parentLi.classList.contains(`active`)) {
            toggleCollapseList(parentLi);
            closeSiblingLis(parentLi);
        }
        // parentLi.querySelector(`:scope > a`).classList.add(`selected`);
        parentLi = parentLi.parentElement.closest(`li.collapsible`);
    }

    parentToc.setAttribute(`data-processing-selected`, `0`);
}


function proximityOf(num, arr) {
    // binary search;
    let a = 0
    let z = arr.length - 1;
    let m = Math.floor((z + a) / 2);
    console.log(a, arr[a], m, arr[m], z, arr[z]);
    let located = false;
    if(num >= arr[z]) return z;
    if(num <= arr[a]) return a;
    while(!located) {
        if(z - a == 0) {
            located = true;
            // console.log(`answer`, a);
            return a;
        }
        if(z - a == 1) {
            located = true;
            // console.log(`answer`, a);
            // For the use case, return a. For general uses, return the closest to mean(a, z).
            return a;
        }
        if(num > arr[m]) {
            a = m;
            m = Math.floor((z + a) / 2);
            console.log(a, arr[a], m, arr[m], z, arr[z]);
        }
        else {
            z = m;
            m = Math.floor((z + a) / 2);
            console.log(a, arr[a], m, arr[m], z, arr[z]);
        }
    }


}

function focusAt(hIndex) {
    while(hIndex > 0 && subsectionTitles[hIndex - 1].getBoundingClientRect().top > 0) {
        hIndex -= 1;
        // correction for titles still visible and closer to the top of the screen
    }
    tocItemSelect(tocLinksSide[hIndex]);
    tocItemSelect(tocLinksMain[hIndex]);
}



function tocClickEvent(event, linkArr) {
    const link = event.target.closest(`a`);
    if(!link) return;
    const href = link.getAttribute(`href`);
    if(!href) return;
    if(Array.prototype.indexOf.call(subsectionIds, href.slice(1)) != -1) return;
    event.preventDefault();
    let newIdIndex = Array.prototype.indexOf.call(linkArr, link);
    while(linkArr[newIdIndex].parentElement.parentElement.parentElement.classList.contains(`collapsible`)) {
        console.log(`newIdIndex`, newIdIndex);
        console.log(linkArr[newIdIndex]);
        newIdIndex -= 1;
    }
    const newId = subsectionIds[newIdIndex];
    link.setAttribute(`href`, `#${newId}`);
    link.click();
}

function scrollingOverSubsections() {
    const screenCenter = window.scrollY + window.innerHeight/2;
    heightIndex = proximityOf(screenCenter, titleHeights);
    focusAt(heightIndex);
}

function initTocHighlight() {
    calculateHeights();
    let timer = null;

    tocMain.addEventListener(`click`, event => tocClickEvent(event, tocLinksMain));
    tocSide.addEventListener(`click`, event => tocClickEvent(event, tocLinksSide));
    window.addEventListener(`resize`, calculateHeights);
    document.addEventListener(`scroll`, () => {
        if(timer !== null) {
            clearTimeout(timer);        
        }
        timer = setTimeout(scrollingOverSubsections, 300);
    })
}

initTocHighlight();
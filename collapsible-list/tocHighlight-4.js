const article = document.querySelector(`#article-body`);
let subsectionTitles, subsectionIds, tocMain, tocSide, tocLinksMain, tocLinksSide, tocLinkHrefs, titleHeights;
let activeToc;

function tocCaching() {
    if(!article) return false;
    subsectionTitles = article.querySelectorAll(`h1[id]:not([id=""]):not(.solution-article-title), h2[id]:not([id=""]), h3[id]:not([id=""]), h4[id]:not([id=""]), h5[id]:not([id=""]), h6[id]:not([id=""])`);
    subsectionTitles = Array.prototype.filter.call(subsectionTitles, 
        (t => t.innerText != ``));
    if(subsectionTitles.length < 1) return false;
    
    subsectionIds = Array.prototype.map.call(subsectionTitles,
        (t => t.getAttribute(`id`)));
    
    tocMain = article.querySelector(`p.fd-toc+ul`);
    tocSide = document.querySelector(`.solution-sidebar p.fd-toc+ul`);

    if(!tocMain || !tocSide) return false;
    
    tocLinksMain = tocMain.querySelectorAll(`a`);
    
    tocLinksSide = tocSide.querySelectorAll(`a`);
    
    tocLinkHrefs = Array.prototype.map.call(tocLinksMain,
        (a => a.getAttribute(`href`)));

    if(tocMain.getAttribute(`data-toc-visible`) == `1`) {
        activeToc = tocMain;
    }
    else {
        activeToc = tocSide;
    }
    calculateHeights();

    return true;
}

function calculateHeights() {
    titleHeights = Array.prototype.map.call(subsectionTitles,
        (t => t.getBoundingClientRect().top - document.body.getBoundingClientRect().top));
    console.log(`heights calculated`);
}

// Assuming headings, tocLinks, and headingsHeights indexes correspond properly
// Optionally, first create toc dynamically based on the headings (to eliminate chance of mapping error)

function tocItemSelect(item) {
    console.log(item);
    const parentToc = item.closest(`p.fd-toc+ul`);
    const currentSelected = parentToc.querySelector(`.selected.main-selected-leaf`);
    if(currentSelected) {
        currentSelected.classList.remove(`selected`, `main-selected-leaf`);
        let currentSelectedParent = currentSelected.parentElement.closest(`li.collapsible`);
        while(currentSelectedParent) {
            // currentSelectedParent.querySelector(`:scope > a`).classList.remove(`selected`);
            console.log(`ISSUE: while  on tocItemSelect 1`)
            currentSelectedParent = currentSelectedParent.parentElement.closest(`li.collapsible`);
        }
    }
    console.log(`removed selected`, currentSelected, `new selected`, item);
    item.classList.add(`selected`, `main-selected-leaf`);
    let parentLi = item.parentElement.closest(`li.collapsible`);
    while(parentLi) {
        console.log(`ISSUE: while  on tocItemSelect 2`)
        if(!parentLi.classList.contains(`active`)) {
            closeSiblingLis(parentLi);
            toggleCollapseList(parentLi);
        }
        // parentLi.querySelector(`:scope > a`).classList.add(`selected`);
        parentLi = parentLi.parentElement.closest(`li.collapsible`);
    }
}


function proximityOf(num, arr) {
    // binary search;
    if(arr.length < 1) return;
    let a = 0
    let z = arr.length - 1;
    let m = Math.floor((z + a) / 2);
    console.log(a, arr[a], m, arr[m], z, arr[z]);
    let located = false;
    if(num >= arr[z]) return z;
    if(num <= arr[a]) return a;
    while(!located) {
        console.log(`ISSUE: while  on proximityOf`)
        if(z - a == 0) {
            located = true;
            console.log(`answer`, a);
            return a;
        }
        if(z - a == 1) {
            located = true;
            console.log(`answer`, a);
            // For the use case, return a. For general uses, return where it is closer.
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
        console.log(`ISSUE: while  on focusAt`)
        hIndex -= 1;
        // correction for titles still visible and closer to the top of the screen
    }
    console.log(`final hIndex`, hIndex);
    // if(activeToc == tocMain) {
    //     tocItemSelect(tocLinksMain[hIndex]);
    // }
    if(activeToc == tocSide)  {
        tocItemSelect(tocLinksSide[hIndex]);
    }
}



function tocClickEvent(event, linkArr) {
    const link = event.target.closest(`a`);
    if(!link) return;
    const href = link.getAttribute(`href`);
    if(!href) return;
    // if(Array.prototype.indexOf.call(subsectionIds, href.slice(1)) != -1) return;
    // event.preventDefault();
    // let newIdIndex = Array.prototype.indexOf.call(linkArr, link);
    // while(linkArr[newIdIndex].parentElement.parentElement.parentElement.classList.contains(`collapsible`)) {
    //     console.log(`ISSUE: while  on tocClickEvent`)
    //     console.log(`newIdIndex`, newIdIndex);
    //     console.log(linkArr[newIdIndex]);
    //     newIdIndex -= 1;
    // }
    // const newId = subsectionIds[newIdIndex];
    // link.setAttribute(`href`, `#${newId}`);
    // link.click();
}

function tocClickEvent2(event) {
    const link = event.target.closest(`a`);
    if(!link) return;
    let href = link.getAttribute(`href`);
    if(!href) return;
    event.preventDefault();
    href = href.slice(1);
    let scrollIndex = subsectionIds.indexOf(href);
    scrollTo(0, titleHeights[scrollIndex] - 16);
}

function scrollingOverSubsections() {
    if(activeToc.getAttribute(`data-toc-visible`) == `0`) {
        if(activeToc == tocMain) activeToc = tocSide;
        else activeToc = tocMain;
        console.log(`calculate height because toc visible switched`);
        calculateHeights();
    }
    let correctFirstHeight = subsectionTitles[0].getBoundingClientRect().top - document.body.getBoundingClientRect().top;
    let compareFirstHeight = titleHeights[0];
    if(Math.abs(compareFirstHeight - correctFirstHeight) > 2) {
        console.log(`calculate height because first height wrong`);
        calculateHeights();
    }
    const screenCenter = window.scrollY + window.innerHeight/2;
    heightIndex = proximityOf(screenCenter, titleHeights);
    console.log(`titles`, subsectionIds, `hrefs`, tocLinkHrefs, `index`, heightIndex, `heights`, titleHeights);
    focusAt(heightIndex);
}

function initTocHighlight() {
    if(!tocCaching()) return;

    let timer = null;
    
    tocMain.addEventListener(`click`, event => {
        tocClickEvent(event, tocLinksMain);
        tocClickEvent2(event);
    });
    tocSide.addEventListener(`click`, event => {
        tocClickEvent(event, tocLinksSide);
        tocClickEvent2(event);
    });
    article.addEventListener(`resize`, () => {
        console.log(`calculate height because article resize`);
        calculateHeights();
    });
    window.addEventListener(`resize`, calculateHeights);
    document.addEventListener(`scroll`, () => {
        if(timer !== null) {
            clearTimeout(timer);        
        }
        timer = setTimeout(scrollingOverSubsections, 200);
    })
}

initTocHighlight();
// global vars
const transitionDuration = 0.3;
const liCollapseTransition = `height ${transitionDuration}s ease-out`;

function hrefFixes(toc) {
    toc.querySelectorAll(`a`).forEach(a => {
        let href = decodeURIComponent(a.getAttribute(`href`));
        a.setAttribute(`href`, href);
        a.setAttribute(`data-descriptive-href`, href);
    })
}

// modify hrefs

const modifyHref = (li) => {
    const parentLink = li.querySelector(`:scope > a`);
    const li0 = li.querySelectorAll(`:scope > ul > li`)[0];
    const link0 = li0.querySelector(`:scope > a`);
    parentHref = parentLink.getAttribute(`href`);
    if(!parentHref) return;
    link0.setAttribute(`href`, parentHref);
    parentLink.setAttribute(`href`, ``);
}

// change list marker to dropdown

const hasChildFilterLi = (li) => {
    if(li.classList.contains(`collapsible`)) return;

    const hidden = document.createElement(`div`);
    toc.append(hidden);
    hidden.style.display = `none`;
    
    let dropdownSvg = document.createElement(`svg`);
    hidden.append(dropdownSvg);
    dropdownSvg.outerHTML =  `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 6L8 9L11 6" stroke="#3161D1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`; 
    dropdownSvg = hidden.querySelector(`svg`); // cloneable svg element
   
    li.classList.add(`collapsible`);
    li.prepend(dropdownSvg.cloneNode(true));
}

// toggleCollapseList implementation

const toggleCollapseList = (li) => {
    const subUl = li.querySelector(`:scope > ul`);
    const subUlLis = subUl.querySelectorAll(`:scope > li`);
    const ulLen = subUlLis.length;
    
    li.style.height = `auto`;
    let closedHeight = li.clientHeight - subUl.clientHeight;
    let openHeight = li.clientHeight;
    let startHeight = closedHeight;
    let finalHeight = openHeight;
    
    if(li.classList.contains(`active`)) {
        startHeight = openHeight;
        finalHeight = closedHeight;
    }
    
    li.style.height = startHeight + `px`;
    
    const motionTransitions = () => {
        li.style.height = finalHeight + `px`;
        let finalTransformX = finalHeight - closedHeight - subUl.clientHeight;
        subUl.style.transform = `translate(0, ${finalTransformX}px)`;
    }
    
    let opacTransDelay = (li.classList.contains(`active`)) ? transitionDuration/ulLen/2 : transitionDuration/ulLen; // faster transition. see notes

    const opacityTransitions = () => {
        for(let i = 0; i < ulLen; i++) {
            let duration = (opacTransDelay).toFixed(3) + `s`;
            let delay = (i*opacTransDelay).toFixed(3) + `s`;
            let ii = li.classList.contains(`active`) ? i : (ulLen - 1 - i);
            if(subUlLis[ii].classList.contains(`collapsible`)) {
                subUlLis[ii].style.transition = `${liCollapseTransition}, opacity ${duration} linear ${delay}`;
            } else {
                subUlLis[ii].style.transition = `opacity ${duration} linear ${delay}`;   
            }
            subUlLis[ii].style.opacity = li.classList.contains(`active`) ? 0 : 1;
        }
    }

    setTimeout(motionTransitions, 0);
    setTimeout(opacityTransitions, 0);

    let clearFinalHeight = li.classList.contains(`active`) ? finalHeight + `px` : `auto`;

    setTimeout(() => { li.classList.toggle(`active`); }, 0);

    setTimeout(() => { li.style.height = clearFinalHeight; }, transitionDuration*1000 + 100);

}


const closeSiblingLis = (li) => {
    const siblingLis = [...li.parentElement.children].filter(c => c != li);
    
    siblingLis.forEach((sibLi) => {
        // console.log(sibLi);
        if(!sibLi.classList.contains(`collapsible`)) return;
        if(!sibLi.classList.contains(`active`)) return;
        toggleCollapseList(sibLi);
    })
}

function createToc(toc)  {
    if(toc.getAttribute(`data-toc-collapse-enabled`) == `1`) return;
    hrefFixes(toc);

    // find li.has-child
    
    const childUls = toc.querySelectorAll(`li > ul`);
    childUls.forEach((ul) => {
        ul.parentElement.classList.add(`has-child`);
    });
    const hasChildLi = toc.querySelectorAll(`li.has-child`);
   
    // initialization

    hasChildLi.forEach((li) => { 
        hasChildFilterLi(li);
        modifyHref(li);
        li.classList.add(`active`);
        toggleCollapseList(li);
    });

    // Debounce from https://www.freecodecamp.org/news/javascript-debounce-example/#:~:text=In%20JavaScript%2C%20a%20debounce%20function,all%20use%20cases%20for%20debounce.
    let timer;
    const debounce_leading = (func, timeout = 300) => {
        (() => {
            if (!timer) {
                func();
            }
            clearTimeout(timer);
            timer = setTimeout(() => {
                timer = undefined;
            }, timeout);  
        })();
    }


    toc.addEventListener(`click`, (e) => {
        let a = e.target.closest(`a`);
        let svg = e.target.closest(`svg`);
        if(!a && !svg) return;
        let li = e.target.closest(`li`);
        if(!li || !li.classList.contains(`collapsible`)) return;
        e.preventDefault();
        debounce_leading(() => {
            toggleCollapseList(li);
            closeSiblingLis(li);
        }, 300);
    });

    toc.setAttribute(`data-toc-collapse-enabled`, `1`);

}

const toc0 = document.querySelector(`.solution-article .article_body p.fd-toc+ul`); // limit to toc only
createToc(toc0);



const stickySidebar = document.querySelector('.solution-sidebar');
const stickyTopValue = 40;
stickySidebar.style.top = stickyTopValue + `px`;

let sidebarToc;

function createTocCopy() {
    const tocP = document.querySelector(`.solution-article .article_body p.fd-toc`);
    const tocUl = document.querySelector(`.solution-article .article_body p.fd-toc+ul`);
    const solutionArticle = document.createElement(`div`);
    solutionArticle.classList.add(`item`, `solution-article`, `solution-article-toc-container`);
    const articleBody = document.createElement(`div`);
    articleBody.classList.add(`article_body`);
    const newTocUl = tocUl.cloneNode(true);
    newTocUl.setAttribute(`data-toc-collapse-enabled`, `0`);
    articleBody.append(tocP.cloneNode(true), newTocUl);
    solutionArticle.append(articleBody);
    stickySidebar.append(solutionArticle);
    sidebarToc = document.querySelector(`.solution-article-toc-container`);
    sidebarToc.style.opacity = `0`;
}

function scrolledPast(elem) {
    let rect = elem.getBoundingClientRect();
    return rect.bottom <= 0;
}

function relatedArticlesDisappear() {
    const relatedArticles = document.querySelector(`.solution-article-related_articles`);
    if(stickyTopValue < stickySidebar.getBoundingClientRect().top) {
        relatedArticles.style.opacity = ``;
        relatedArticles.style.position = ``;
        relatedArticles.style.pointerEvents = ``;
    }
    else {
        relatedArticles.style.opacity = `0`; 
        relatedArticles.style.position = `absolute`;
        relatedArticles.style.pointerEvents = `none`;
    }
    
}

function sidebarTocAppear() {
    const tocUl = document.querySelector(`.solution-article .article_body p.fd-toc+ul`);
    if(scrolledPast(tocUl)) {
        sidebarToc.style.opacity = ``;
        sidebarToc.style.pointerEvents = ``;
    } 
    else {
        sidebarToc.style.opacity = `0`;
        sidebarToc.style.pointerEvents = `none`;
    } 
}

function initStickyToc() {
    if(stickySidebar.querySelector(`.fd-toc+ul`)) return;
    createTocCopy();
    createToc(sidebarToc.querySelector(`.fd-toc+ul`));

    document.addEventListener('scroll', () =>{
        relatedArticlesDisappear();
        sidebarTocAppear();
    });
}

initStickyToc();


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
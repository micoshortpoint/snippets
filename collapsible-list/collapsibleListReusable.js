let toc0 = document.querySelector(`.solution-article .article_body p.fd-toc+ul`);

function createToc() {
    const tocPlaceholder = document.querySelector(`.solution-article .article_body p.fd-toc+ul`);
    if(!tocPlaceholder) return;
    const toc = document.createElement(`ul`);
    const article = document.querySelector(`#article-body`);
    let subsectionTitles = article.querySelectorAll(`h1[id]:not([id=""]):not(.solution-article-title), h2[id]:not([id=""]), h3[id]:not([id=""]), h4[id]:not([id=""]), h5[id]:not([id=""]), h6[id]:not([id=""])`);
    subsectionTitles = Array.prototype.filter.call(subsectionTitles, 
        (t => t.innerText != ``));
    
    let subsectionIds = Array.prototype.map.call(subsectionTitles,
        (t => t.getAttribute(`id`)));

    let subsectionTexts = Array.prototype.map.call(subsectionTitles,
        (t => t.innerText));

    let ulQueue = [toc];

    subsectionTitles.forEach((t, i, arr) => {
        let tag = t.tagName;
        let next = arr[i+1] || arr[i];
        let nextTag = next.tagName;
        let depth = Number(tag[1]);
        let nextDepth = Number(nextTag[1]);

        let li = document.createElement(`li`);
        let a = document.createElement(`a`);
        let subUl = document.createElement(`ul`);

        a.setAttribute(`href`, `#${subsectionIds[i]}`);
        a.innerText = subsectionTexts[i];
        li.append(a);
        ulQueue[ulQueue.length - 1].append(li);

        if(nextDepth > depth) {
            ulQueue.push(subUl);
            li.append(subUl);
        }
        else if(nextDepth < depth) {
            let diff = depth - nextDepth;
            for(let i = 0; i < diff; i++) {
                if(ulQueue.length > 1) ulQueue.pop();
            }
        }

    })

    tocPlaceholder.parentElement.replaceChild(toc, tocPlaceholder);
    console.log(`old`, tocPlaceholder)
    console.log(`new`, toc);
    toc0 = document.querySelector(`.solution-article .article_body p.fd-toc+ul`);
}

createToc();

// global vars
const transitionDuration = 0.3;
const liCollapseTransition = `height ${transitionDuration}s ease-out`;

function hrefFixes(toc) {
    toc.querySelectorAll(`a`).forEach(a => {
        let href = decodeURIComponent(a.getAttribute(`href`));
        a.setAttribute(`href`, href);
        a.setAttribute(`data-descriptive-href`, href);
        a.removeAttribute(`target`);
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
    parentLink.classList.add(`toc-disabled-link`);
}

// change list marker to dropdown

const hasChildFilterLi = (li, toc) => {
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
    subUl.style.display = ``;
    li.style.height = `auto`;
    let closedHeight = li.clientHeight - subUl.clientHeight;
    let openHeight = li.clientHeight;
    let startHeight = closedHeight;
    let finalHeight = openHeight;
    subUl.style.pointerEvents = ``;

    
    if(li.classList.contains(`active`)) {
        startHeight = openHeight;
        finalHeight = closedHeight;
        subUl.style.pointerEvents = `none`;
    }
    
    li.style.height = startHeight + `px`;
    
    const motionTransitions = () => {
        void li.offsetWidth;   
        li.style.height = finalHeight + `px`;
        let finalTransformX = finalHeight - closedHeight - subUl.clientHeight;
        console.log(`finalHeight`, finalHeight, `closedHeight`, closedHeight, `subulclientHeight`, subUl.clientHeight, `finalTransformX`, finalTransformX);
        subUl.style.transform = `translate(0, ${finalTransformX}px)`;
    }
    
    let opacTransDelay = (li.classList.contains(`active`)) ? transitionDuration/ulLen/2 : transitionDuration/ulLen; // faster transition. see notes

    const opacityTransitions = () => {
        void li.offsetWidth;  
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

    motionTransitions();
    opacityTransitions();
    // setTimeout(motionTransitions, 0);
    // setTimeout(opacityTransitions, 0);

    // let clearFinalHeight = li.classList.contains(`active`) ? finalHeight + `px` : `auto`;
    let clearFinalHeight = `auto`;

    setTimeout(() => { li.classList.toggle(`active`); }, 0);

    setTimeout(() => {
        if(!li.classList.contains(`active`)) subUl.style.display = `none`;
        li.style.height = clearFinalHeight; 
    }, 
        transitionDuration*1000 + 100);

}


const closeSiblingLis = (li) => {
    const siblingLis = [...li.parentElement.children].filter(c => c != li);
    
    siblingLis.forEach((sibLi) => {
        console.log(sibLi);
        if(!sibLi.classList.contains(`collapsible`)) return;
        if(!sibLi.classList.contains(`active`)) return;
        toggleCollapseList(sibLi);
    })
}

function collapsibleTocInit(toc) {
    if(!toc) return;
    if(toc.getAttribute(`data-toc-collapse-enabled`) == `1`) return;
    toc.setAttribute(`data-toc-visible`, `1`);
    hrefFixes(toc);

    // find li.has-child
    
    const childUls = toc.querySelectorAll(`li > ul`);
    childUls.forEach((ul) => {
        ul.parentElement.classList.add(`has-child`);
    });
    const hasChildLi = toc.querySelectorAll(`li.has-child`);
   
    // initialization

    hasChildLi.forEach((li) => { 
        hasChildFilterLi(li, toc);
        modifyHref(li);
        li.classList.add(`active`);
        setTimeout(() => {
            toggleCollapseList(li);
        }, 0)
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
        if(a && a.classList.contains(`toc-disabled-link`)) e.preventDefault();
        setTimeout(() => {
            if(toc.getAttribute(`data-toc-visible`) == `0`) return;
            let svg = e.target.closest(`svg`);
            if(!a && !svg) return;
            let li = e.target.closest(`li`);
            if(!li || !li.classList.contains(`collapsible`)) return;
            e.preventDefault();
            debounce_leading(() => {
                toggleCollapseList(li);
                closeSiblingLis(li);
            }, 300);
        }, 0)
    });

    toc.setAttribute(`data-toc-collapse-enabled`, `1`);

}

collapsibleTocInit(toc0);
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

}

// const toc0 = document.querySelector(`.solution-article .article_body p.fd-toc+ul`); // limit to toc only
// createToc(toc0);
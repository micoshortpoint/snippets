const article = document.querySelector(`#article-body`);

function groupSubsection(h, nextH) {
    let id = h.getAttribute(`id`);
    while(h.parentElement != article) {
        h = h.parentElement;
    }
    if(nextH) {
        while(nextH.parentElement != article) {
            nextH = nextH.parentElement;
        }
    }
    else {
        nextH = article.lastElementChild;
    }

    let box = document.createElement(`div`);
    box.append(h.cloneNode(true));
    let lastSibling = h.nextElementSibling;
    while(lastSibling && lastSibling != nextH) {
        box.append(lastSibling);
        lastSibling = h.nextElementSibling;
    }
    article.replaceChild(box, h);
    box.setAttribute(`data-subsection-id`, id);
}

function isVisible(elem, from) {
    const rect = elem.getBoundingClientRect();
    const viewHeight = window.innerHeight;
    // console.table(rect);
    // console.log(elem.getAttribute(`data-subsection-id`), from);
    let topVisible = rect.top >= 0;
    let topHigh = rect.top < Math.round(viewHeight/2);
    let bottomVisible = rect.bottom <= viewHeight;
    let bottomLow = rect.bottom > Math.round(viewHeight/2);
    let topOutHigh =  rect.top < 0;
    let bottomOutLow = rect.bottom > viewHeight;
    if(from === `below`) {
        return topHigh && topVisible || topOutHigh && bottomLow;
    }
    else if(from === `above`) {
        return bottomLow && bottomVisible || bottomOutLow && topHigh;
    }
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

function tocItemSelect(item) {
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

const directables = article.querySelectorAll(`h2[id], h3[id], h4[id], h5[id]`);
directables.forEach((item, i, arr) => {
    groupSubsection(item, arr[i+1]);
});

const articleSubsections = article.querySelectorAll(`[data-subsection-id]`);

let lastScrollTop = window.pageYOffset;
let currentVisibleSubsection = null;

window.addEventListener("scroll", () => {
    let didScrollDown = true;
    let from = `below`;
    let inc = 1;
    
    let st = window.pageYOffset;
    if (st >= lastScrollTop) {
        didScrollDown = true;
        from = `below`;
        inc = 1;

    }
    else {
        didScrollDown = false;
        from = `above`;
        inc = -1;
    }
    lastScrollTop = st <= 0 ? 0 : st; 
    let startI = 0;
    let max = articleSubsections.length;
    if(currentVisibleSubsection) {
        startI = Array.prototype.indexOf.call(articleSubsections, currentVisibleSubsection);
    }
    let highlighted = false;
    function iterativeCheck(dir = 1) {
        for(let i = startI; i < max && i >= 0; i += dir*inc) {
            let sub = articleSubsections[i];
            // console.log(`testing`, sub.getAttribute(`data-subsection-id`));
            if(isVisible(sub, from)) {
                // console.log(`test succeeded`)
                var highlightID = sub.getAttribute(`data-subsection-id`);
                // console.log(`highlightID`, highlightID);
                var items = document.querySelectorAll(`[data-descriptive-href="#${highlightID}"]`);
                items.forEach(i => tocItemSelect(i));
                currentVisibleSubsection = sub;
                highlighted = true;
                break;
            }
            else {
                highlighted = false;
                // console.log(`test failed`)
            
            } 
        }
    }
    iterativeCheck();
    if(!highlighted) iterativeCheck(-1);

});


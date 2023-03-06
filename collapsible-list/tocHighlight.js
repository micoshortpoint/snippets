var observerMargin = `200px`;
var observerOptions = {
    threshold: 1.0,
    rootMargin: `${observerMargin} 0px ${observerMargin} 0px`,
};

const autoScrolling = false;

function groupSubsections() {

}


const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (!autoScrolling) {
            if (entry.isIntersecting) {
                var target = entry.target.getAttribute(`id`);
                console.log(`target`, target);
                var items = document.querySelectorAll(`[data-descriptive-href="#${target}"], [data-descriptive-href='#${target}']`);
                items.forEach(i => tocItemSelect(i));
            }
        }
    })
}, observerOptions);

function tocItemSelect(item) {
    const parentToc = item.closest(`p.fd-toc+ul`);
    const currentSelected = parentToc.querySelector(`.selected.main-selected-leaf`);
    if(currentSelected) {
        currentSelected.classList.remove(`selected`, `main-selected-leaf`);
        let currentSelectedParent = currentSelected.parentElement.closest(`li.collapsible`);
        while(currentSelectedParent) {
            currentSelectedParent.querySelector(`:scope > a`).classList.remove(`selected`);
            currentSelectedParent = currentSelectedParent.parentElement.closest(`li.collapsible`);
        }
    }
    console.log(`removed selected`, currentSelected, `new selected`, item);
    item.classList.add(`selected`, `main-selected-leaf`);
    let parentLi = item.parentElement.closest(`li.collapsible`);
    while(parentLi) {
        parentLi.querySelector(`:scope > a`).classList.add(`selected`);
        parentLi = parentLi.parentElement.closest(`li.collapsible`);
    }
}

const directables = document.querySelector(`#article-body`).querySelectorAll(`h2[id], h3[id], h4[id], h5[id]`);
let Hs = [`H2`, `H3`, `H4`, `H5`];
directables.forEach(item => {
    let brother = item;
    while(Hs.indexOf(brother.nextElementSibling.tagName)) {
        
    }
    observer.observe(item);
});
const stickySidebar = document.querySelector('.solution-sidebar');
const stickyTopValue = 40;

let sidebarToc;

function stickySidebarPrep() {
    if(!stickySidebar) return false;
    stickySidebar.style.top = stickyTopValue + `px`;
    return true;
}

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
    if(!document.querySelector(`.fd-toc+ul`)) return;
    if(!stickySidebarPrep()) return;
    if(stickySidebar.querySelector(`.fd-toc+ul`)) return;
    createTocCopy();
    createToc(sidebarToc.querySelector(`.fd-toc+ul`));

    document.addEventListener('scroll', () =>{
        relatedArticlesDisappear();
        sidebarTocAppear();
    });
}

initStickyToc();

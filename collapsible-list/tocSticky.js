const stickySidebar = document.querySelector('.solution-sidebar');
const stickyTopValue = 40;

let sidebarTocContainer;

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
    sidebarTocContainer = document.querySelector(`.solution-article-toc-container`);
    sidebarTocContainer.style.opacity = `0`;
}

function scrolledPast(elem) {
    let rect = elem.getBoundingClientRect();
    return rect.bottom <= 0;
}

function relatedArticlesDisappear(disappear) {
    const relatedArticles = document.querySelector(`.solution-article-related_articles`);
    if(disappear) {
        relatedArticles.style.opacity = `0`; 
        relatedArticles.style.position = `absolute`;
        relatedArticles.style.pointerEvents = `none`;
    }
    else {
        relatedArticles.style.opacity = ``;
        // keep it `absolute`
        relatedArticles.style.pointerEvents = ``;
    }
    
}

function sidebarTocAppear() {
    const tocMain = document.querySelector(`.solution-article .article_body p.fd-toc+ul`);
    const tocSide = document.querySelector(`.solution-sidebar p.fd-toc+ul`);
    if(scrolledPast(tocMain)) {
        relatedArticlesDisappear(true);
        sidebarTocContainer.style.opacity = ``;
        sidebarTocContainer.style.pointerEvents = ``;
        tocMain.setAttribute(`data-toc-visible`, `0`);
        tocSide.setAttribute(`data-toc-visible`, `1`);
    } 
    else {
        sidebarTocContainer.style.opacity = `0`;
        sidebarTocContainer.style.pointerEvents = `none`;
        tocMain.setAttribute(`data-toc-visible`, `1`);
        tocSide.setAttribute(`data-toc-visible`, `0`);
        relatedArticlesDisappear(false);
    } 
}

function initStickyToc() {
    if(!document.querySelector(`.fd-toc+ul`)) return;
    if(!stickySidebarPrep()) return;
    if(stickySidebar.querySelector(`.fd-toc+ul`)) return;
    createTocCopy();
    collapsibleTocInit(sidebarTocContainer.querySelector(`.fd-toc+ul`));
    sidebarTocContainer.querySelector(`.fd-toc+ul`).setAttribute(`data-toc-visible`, `0`);

    document.addEventListener('scroll', () => {
        setTimeout(sidebarTocAppear, 0);
        // sidebarTocAppear();
    });
}

initStickyToc();
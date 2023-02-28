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
    articleBody.append(tocP.cloneNode(true), tocUl.cloneNode(true));
    solutionArticle.append(articleBody);
    stickySidebar.append(solutionArticle);
    sidebarToc = document.querySelector(`.solution-article-toc-container`);
    sidebarToc.style.opacity = `0`;
}

createTocCopy();
createToc(sidebarToc.querySelector(`.fd-toc+ul`));

function scrolledPast(elem) {
    let rect = elem.getBoundingClientRect();
    return rect.bottom <= 0;
}

function relatedArticlesDisappear() {
    const relatedArticles = document.querySelector(`.solution-article-related_articles`);
    if(stickyTopValue < stickySidebar.getBoundingClientRect().top) {
        relatedArticles.style.opacity = ``;
        relatedArticles.style.position = ``;
    }
    else {
        relatedArticles.style.opacity = `0`; 
        relatedArticles.style.position = `absolute`;
    }
    
}

function sidebarTocAppear() {
    const tocUl = document.querySelector(`.solution-article .article_body p.fd-toc+ul`);
    scrolledPast(tocUl) ? sidebarToc.style.opacity = `` : sidebarToc.style.opacity = `0`;
}

document.addEventListener('scroll', () =>{
    relatedArticlesDisappear();
    sidebarTocAppear();
});

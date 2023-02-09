// Helper functions

const clearElement = (element) => {
    while(typeof element.firstChild !== `undefined` && element.firstChild !== null) {
        element.removeChild(element.firstChild);
    }
}

// Globals
let fragment = document.createDocumentFragment();
const form = document.querySelector(`#offer-section form`);

const hidden = document.createElement(`div`);
document.body.append(hidden);
hidden.style.display = `none`;
let svg = document.createElement(`svg`);
hidden.append(svg);

// SVGs

const svgs = {
    uploadIcon : `<svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M29.9683 25.7162H14.5225L1.5127 40.8398" stroke="#A4C2F4" stroke-width="2"/>
    <path d="M70.5154 40.8398L57.5052 25.7162H42.0312" stroke="#A4C2F4" stroke-width="2"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M49.4734 40.8398V47.7143C49.4734 50.4986 47.2162 52.7555 44.4319 52.7555H27.7504C24.9661 52.7555 22.7092 50.4983 22.7092 47.7143V40.8398H1.5127V65.1458C1.5127 68.2118 4.0213 70.7204 7.0873 70.7204H64.9408C68.0068 70.7204 70.5154 68.2118 70.5154 65.1458V40.8398H49.4734V40.8398Z" stroke="#A4C2F4" stroke-width="2"/>
    <path d="M36 2V39.8864" stroke="#A4C2F4" stroke-width="2"/>
    <path d="M26.5508 11.4482L35.999 2L45.4475 11.4482" stroke="#A4C2F4" stroke-width="2"/>
    </svg>`,
    trashIcon : `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.999 6.69873C11.999 6.14645 11.5513 5.69873 10.999 5.69873C10.4467 5.69873 9.99902 6.14645 9.99902 6.69873V17.9818C9.99902 18.5341 10.4467 18.9818 10.999 18.9818C11.5513 18.9818 11.999 18.5341 11.999 17.9818V6.69873Z" fill="#3161D1"/>
    <path d="M15.0714 5.70094C15.6225 5.73762 16.0395 6.21409 16.0028 6.76515L15.2517 18.0482C15.215 18.5993 14.7386 19.0163 14.1875 18.9796C13.6364 18.9429 13.2194 18.4665 13.2561 17.9154L14.0072 6.63231C14.0439 6.08125 14.5203 5.66426 15.0714 5.70094Z" fill="#3161D1"/>
    <path d="M7.99096 6.6323C7.95427 6.08124 7.4778 5.66425 6.92674 5.70094C6.37567 5.73763 5.95869 6.21409 5.99537 6.76516L6.74654 18.0482C6.78323 18.5993 7.2597 19.0163 7.81076 18.9796C8.36182 18.9429 8.77881 18.4665 8.74212 17.9154L7.99096 6.6323Z" fill="#3161D1"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.07408 1.03051C8.20836 0.619147 8.59199 0.34082 9.02472 0.34082H12.9576C13.3903 0.34082 13.774 0.619147 13.9083 1.03051L14.5555 3.01331H20.4998C21.0521 3.01331 21.4998 3.46102 21.4998 4.01331C21.4998 4.56559 21.0521 5.01331 20.4998 5.01331H19.6307L18.4863 20.8049C18.4484 21.3277 18.0131 21.7326 17.4889 21.7326H4.49395C3.96971 21.7326 3.53446 21.3278 3.49656 20.8049L2.35208 5.01331H1.48242C0.930137 5.01331 0.482422 4.56559 0.482422 4.01331C0.482422 3.46102 0.930137 3.01331 1.48242 3.01331H7.42686L8.07408 1.03051ZM8.15234 5.01336L8.1419 5.01331H4.35732L5.4241 19.7326H16.5587L17.6254 5.01331H13.8404L13.83 5.01336H8.15234ZM12.2321 2.34082L12.4516 3.01331H9.53071L9.75023 2.34082H12.2321Z" fill="#3161D1"/>
    </svg>
    `,
    blueTriangle :  `<svg class="sp-dev-css__blue-triangle" width="97" height="102" viewBox="0 0 97 102" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.42" d="M96.3925 0.0201587L70.1545 101.752L0.000300195 27.7116L96.3925 0.0201587Z" fill="#ADDDF8"/>
    </svg>` ,
    greenRightTriangle : `<svg class="sp-dev-css__green-right-triangle" width="68" height="70" viewBox="0 0 68 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.6" d="M4.53408 69.9577C0.987987 69.9735 -0.823412 65.709 1.64997 63.1678L61.1336 2.0545C63.6374 -0.517892 68 1.25471 68 4.84445L68 65.6942C68 67.8964 66.2199 69.6844 64.0177 69.6941L4.53408 69.9577Z" fill="#CCE8C6"/>
    </svg>`,
    peachSquare : `<svg class="sp-dev-css__peach-square" width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="15.5576" width="60.1091" height="60.1091" transform="rotate(15 15.5576 0)" fill="#FFE8E5" fill-opacity="0.8"/>
    </svg>`,
    yellowSemiCircle : `<svg class="sp-dev-css__yellow-semi-circle" width="214" height="121" viewBox="0 0 214 121" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.6" fill-rule="evenodd" clip-rule="evenodd" d="M0.824948 0C0.280474 4.36722 0 8.81642 0 13.3311C0 72.2435 47.7579 120.001 106.67 120.001C165.583 120.001 213.34 72.2435 213.34 13.3311C213.34 8.81642 213.06 4.36722 212.515 0H0.824948Z" fill="#FFF0C2"/>
    </svg>`    
};

// Some cleanup

(() => {
    const cleanThem = document.querySelectorAll(`h1, h2, h3, h4, h5, h6, p, label, legend`);
    cleanThem.forEach((c) => {
        c.classList.remove(...c.classList);
    })

    const legends = form.querySelectorAll(`legend`);
    legends.forEach((legend) => {
        if(legend.innerText.length < 30) return;
        legend.classList.add(`sp-dev-css__legend-label`);
    })
})();

// Banner


(() => {
    const deptIcon = document.querySelector(`[data-cy="department-name"]`); 
    deptIcon.innerHTML = deptIcon.innerText; // removes the icon and cleans it up a bit

    const strippedLocationBox = document.querySelector(`.custom-css-style-job-location`);
    if(!strippedLocationBox) return;
    let locationBox = strippedLocationBox;
    while(locationBox.parentElement.innerText == locationBox.innerText) {
        locationBox = locationBox.parentElement;
    }
    const copiedStrippedLocationBox = strippedLocationBox.cloneNode(true);
    const locationBoxSvg = locationBox.querySelector(`svg`);
    const newLocationBox = document.createElement(`span`);
    newLocationBox.classList.add(`sp-dev-css__location-box`);
    newLocationBox.append(locationBoxSvg);
    newLocationBox.append(strippedLocationBox);
    locationBox.parentElement.replaceChild(newLocationBox, locationBox);
})();

// Banner bg

(() => {
    const bannerBg = document.querySelector(`.custom-css-style-first-section-background`);
    const bannerBgShapes = document.createElement(`div`);
    bannerBgShapes.classList.add(`sp-dev-css__banner-bg-shapes`);
    bannerBgShapes.innerHTML = svgs.blueTriangle + svgs.greenRightTriangle + svgs.peachSquare + svgs.yellowSemiCircle;
    bannerBg.append(bannerBgShapes);
})();


// Job description

(() => {
    const strong2h4 = document.querySelectorAll(`#offer-section p > strong`);
    
    strong2h4.forEach((h4) => {
        if(h4.parentElement.innerText === h4.innerText) {
            h4.classList.add(`sp-dev-css__h4`);
        }
    });
})();


// Structure

(() => {
    const wrapperPadders = document.querySelectorAll(`[data-cy="section-wrapper-padder"]`);
    
    wrapperPadders.forEach((wp) => {
        let container = wp;
        let wpStyles = window.getComputedStyle(container);
        let maxWidth = wpStyles.getPropertyValue(`max-width`);
        // Find the default "container"
        while(!/\d/.test(maxWidth[0]) && maxWidth.slice(0, 4) !== `calc`) {
            container = container.firstElementChild;
            wpStyles = window.getComputedStyle(container);
            maxWidth = wpStyles.getPropertyValue(`max-width`);
        }
        container.classList.remove(...container.classList);
        container.classList.add(`sp-dev-css__container`);
    });
    
    const strippedSideBox = document.querySelector(`[data-cy="apply-button"]`).parentElement;
    let sideBox = strippedSideBox;
    while(sideBox.parentElement.innerText == sideBox.innerText) {
        sideBox = sideBox.parentElement;
    }
    
    const strippedMainBox = document.querySelector(`#offer-section h3`).parentElement;
    
    const structureBox = sideBox.parentElement;
    const structureBoxFragment = document.createDocumentFragment();
    structureBoxFragment.append(strippedMainBox);
    structureBoxFragment.append(strippedSideBox);
    clearElement(structureBox);
    structureBox.append(structureBoxFragment);
    
    structureBox.classList.add(`sp-dev-css__structure`);
    strippedMainBox.classList.add(`sp-dev-css__structure-main`);
    strippedSideBox.classList.add(`sp-dev-css__structure-side`, `sp-dev-css__default-side-box`);

})();

// Nav structure

(() => {
    const navBar = document.querySelector(`[data-cy="navigation-section-position"]`);
    const container = navBar.querySelector(`[data-cy="navigation-section-grid-container"]`);
    container.classList.remove(...container.classList);
    container.classList.add(`sp-dev-css__container`);

    const navBarInlineStyles = navBar.querySelectorAll(`[style]`);
    navBarInlineStyles.forEach((i) => {
        if(i.style.minHeight) {
            i.style = ``;
            i.classList.add(`sp-dev-css__nav`);
        }
    })
    const navBarBtn = navBar.querySelectorAll(`[data-cy="navigation-section-button"]`);
    navBarBtn.forEach((btn) => {
        btn.classList.add(`sp-dev-css__btn`, `sp-dev-css__btn-small-transparent`);
    });
})();

// Application form

(() => {
    form.classList.add(`sp-dev-css__structure`);
    const formLegendSpan = form.querySelectorAll(`legend span, label span`);
    
    formLegendSpan.forEach((span) => {
        if(span.innerText === `*`)  {
            span.classList.add(`sp-dev-css__required-field-mark`);
        }
    });
    
    const formWrapper = document.createElement(`div`);
    const fieldsets = form.querySelectorAll(`:scope > fieldset`);
    const formWrapperFragment = document.createDocumentFragment();
    
    fieldsets.forEach((f) => {
        formWrapperFragment.append(f);
    });
    formWrapper.append(formWrapperFragment);
    form.prepend(formWrapper);
    formWrapper.classList.add(`sp-dev-css__fieldsets`, `sp-dev-css__structure-main`);
    formWrapper.nextElementSibling.classList.add(`sp-dev-css__submit-box`, `sp-dev-css__structure-side`);
})();

// Application form - file inputs

(() => {
    const fileInputs = form.querySelectorAll(`input[type="file"]`);
    const nonVideoFileInputs = [];
    fileInputs.forEach((fi) => {
        if(fi.closest(`[data-selector="video-recorder-container"]`)) return;
        let fiContainer = fi.parentElement;
        fiContainer.classList.add(`sp-dev-css__file-input-container`);
        svg.outerHTML = svgs.uploadIcon;
        svg = hidden.querySelector(`svg`); // cloneable svg element
        fiContainer.append(svg.cloneNode(true));
        nonVideoFileInputs.push(fi);
    });
    
    let processFileInputButtonsInterval;
    
    const processFileInputButtons = (btns) => {
        btns.forEach((btn) => {
            clearInterval(processFileInputButtonsInterval);
            btn.classList.add(`sp-dev-css__btn`, `sp-dev-css__btn-small-transparent`);
            if(btn.getAttribute(`aria-label`) === `Remove`) {
                btn.innerHTML = svgs.trashIcon;         
            }
        });
    }
    
    nonVideoFileInputs.forEach((f) => {
        f.addEventListener(`change`, () => {
            let parent = f.closest(`.sp-dev-css__file-input-container`);
            if(parent.classList.contains(`sp-dev-css__file-input-filled`)) return;
            if(f.files[0]) {
                parent.classList.add(`sp-dev-css__file-input-filled`);
                processFileInputButtonsInterval = setInterval(() => {
                    processFileInputButtons(parent.querySelectorAll(`button`))
                }, 10);
            } 
        })
    })
})();

// Application form - other inputs

(() => {
    form.querySelectorAll(`.sp-dev-css__file-input-container`).forEach((f) => {
        f.addEventListener(`click`, (e) => {
            if(e.target.closest(`button[aria-label="Remove"]`)) f.classList.remove(`sp-dev-css__file-input-filled`);
        })
    })
    
    const phoneInputs = form.querySelectorAll(`input[type="tel"]`);
    phoneInputs.forEach((pi) => {
        pi.value = "";
        let piCountryPicker = pi.previousElementSibling;
        pi.parentElement.removeChild(piCountryPicker);
        pi.classList.add(`sp-dev-css__small-w-input`);
    
    });
    
    const checkboxInputs = form.querySelectorAll(`input[type="checkbox"]`);
    checkboxInputs.forEach((c) => {
        c.parentElement.querySelector(`svg`).parentElement.classList.add(`sp-dev-css__checkbox`);
    });
})();


// Video record

(() => {
    const videoInput = form.querySelector(`[data-selector="video-recorder-container"]`);
    if(!videoInput) return;
    const videoInputApp = videoInput.closest(`[app]`);
    videoInputApp.classList.add(`sp-dev-css__small-w-input`, `sp-dev-css__video-file-input-container`);    
    
    let videoInputContainer = videoInputApp;
    
    while(!videoInputContainer.parentElement.querySelector(`label`)) {
        videoInputContainer = videoInputContainer.parentElement;
    }
    
    fragment = document.createDocumentFragment();
    fragment.append(videoInputApp);
    videoInputContainer.parentElement.replaceChild(fragment, videoInputContainer);
})();


// Sidebox

(() => {
    const sideBoxes = document.querySelectorAll(`.sp-dev-css__structure-side`);
    
    sideBoxes.forEach((box) => {
        const sideBoxButtons = box.querySelectorAll(`.sp-dev-css__structure-side button`);
        const fragment = document.createDocumentFragment();
        sideBoxButtons.forEach((btn) => {
    
            if(btn.dataset.cy == `apply-button`) {
                btn.classList.add(`sp-dev-css__btn`, `sp-dev-css__btn-primary`);
            }
    
            if(btn.getAttribute(`type`) === `submit`) {
                btn.classList.add(`sp-dev-css__btn`, `sp-dev-css__btn-primary`);
            }
            
            if(btn.parentElement.querySelector(`:scope > .indeed-apply-widget`)) {
                btn.classList.add(`sp-dev-css__btn`, `sp-dev-css__btn-primary-transparent`);
                btn = btn.parentElement;
                btn.classList.add(`sp-dev-css__indeed-apply-btn`);
            }
    
            if(/Share job/ig.test(btn.innerText)) {
                btn.classList.add(`sp-dev-css__btn`, `sp-dev-css__btn-link`);
                
            }
            fragment.append(btn);
        });
        clearElement(box);
        box.append(fragment);  
    });
    
    // Sidebox texts
    const submitBoxText = `Apply for a job now and become a part of amazing team.`;
    const defaultSideText = `World's best intranet sites are designed using ShortPoint`;
    
    const submitBoxTextP = document.createElement(`p`);
    submitBoxTextP.innerText = submitBoxText;
    document.querySelector(`.sp-dev-css__submit-box`).prepend(submitBoxTextP);
    
    const defaultSideTextP = document.createElement(`p`);
    defaultSideTextP.innerText = defaultSideText;
    document.querySelector(`.sp-dev-css__default-side-box`).prepend(defaultSideTextP);

})();
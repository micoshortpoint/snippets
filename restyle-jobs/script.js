// Helper functions

const clearElement = (element) => {
    while(typeof element.firstChild !== `undefined` && element.firstChild !== null) {
        element.removeChild(element.firstChild);
    }
}

// Globals
let fragment = document.createDocumentFragment();
const form = document.querySelector(`#offer-section form`);

// Some cleanup

const headings = document.querySelectorAll(`h1, h2, h3, h4, h5, h6`);
headings.forEach((h) => {
    h.classList.remove(...h.classList);
})


const formPs = form.querySelectorAll(`p`);
formPs.forEach((p) => {
   p.classList.remove(...p.classList) 
});

const formLabels = form.querySelectorAll(`label`);
formLabels.forEach((label) => {
   label.classList.remove(...label.classList);
});

// Headline

const deptIcon = document.querySelector(`[data-cy="department-name"]`); 
deptIcon.innerHTML = deptIcon.innerText; // removes the icon and cleans it up a bit

// Job description

const strong2h4 = document.querySelectorAll(`#offer-section p > strong`);

strong2h4.forEach((h4) => {
    if(h4.parentElement.innerText === h4.innerText) {
        h4.classList.add(`sp-dev-css__h4`);
    }
});


// Structure

const wrapperPadders = document.querySelectorAll(`[data-cy="section-wrapper-padder"]`);

wrapperPadders.forEach((wp) => {
    let container = wp;
    let wpStyles = window.getComputedStyle(container);
    let maxWidth = wpStyles.getPropertyValue(`max-width`);
    // Find the default "container"
    while(!/\d/.test(maxWidth[0])) {
        container = container.firstElementChild;
        wpStyles = window.getComputedStyle(container);
        maxWidth = wpStyles.getPropertyValue(`max-width`);
    }
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



// Application form

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

const fileInputs = form.querySelectorAll(`input[type="file"]`);
fileInputs.forEach((fi) => {
    let fiContainer = fi.parentElement;
    fiContainer.classList.add(`sp-dev-css__file-input-container`);
});

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

// Video record

const videoInput = form.querySelector(`[data-selector="video-recorder-container"]`);
const videoInputApp = videoInput.closest(`[app]`);
videoInputApp.classList.add(`sp-dev-css__small-w-input`, `sp-dev-css__file-input-container`);


let videoInputContainer = videoInputApp;

while(!videoInputContainer.parentElement.querySelector(`label`)) {
    videoInputContainer = videoInputContainer.parentElement;
}

fragment = document.createDocumentFragment();
fragment.append(videoInputApp);
videoInputContainer.parentElement.replaceChild(fragment, videoInputContainer);

// Sidebox buttons

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
            btn.classList.add(`sp-dev-css__btn`, `sp-dev-css__btn-primary-white`);
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
const defaultSideText = `World's best intranet sites 
are designed using ShortPoint`;

const submitBoxTextP = document.createElement(`p`);
submitBoxTextP.innerText = submitBoxText;
document.querySelector(`.sp-dev-css__submit-box`).prepend(submitBoxTextP);

const defaultSideTextP = document.createElement(`p`);
defaultSideTextP.innerText = defaultSideText;
document.querySelector(`.sp-dev-css__default-side-box`).prepend(defaultSideTextP);
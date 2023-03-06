function refreshToc() {
    const toc0 = document.querySelector(`.solution-article .article_body p.fd-toc+ul`);
    toc0.outerHTML = `<ul data-identifyelement="504" data-toc-collapse-enabled="1">
        <li data-identifyelement="505"><a data-identifyelement="506" href="#Before-we-begin">Before we begin</a></li>
        <li data-identifyelement="507"><a data-identifyelement="508" href="#What-is-Live-Mode?">What is Live Mode?</a>
        </li>
        <li data-identifyelement="509"><a data-identifyelement="510" href="#Enabling-the-Live-Mode">Enabling the Live
                        Mode</a></li>
        <li data-identifyelement="511" class="has-child collapsible" style="height: 24px;"><svg width="16" height="16"
                        viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 6L8 9L11 6" stroke="#3161D1" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                        </path>
                </svg><a data-identifyelement="512" href="#The-Visual-Builder-Basics">The Live Mode Basics</a>
                <ul data-identifyelement="513" style="transform: translate(0px, -120px);">
                        <li data-identifyelement="514" style="transition: opacity 0.03s linear 0s; opacity: 0;"><a
                                        data-identifyelement="515" href="#EasyPass">EasyPass</a></li>
                        <li data-identifyelement="516" style="transition: opacity 0.03s linear 0.03s; opacity: 0;"><a
                                        data-identifyelement="517" href="#Resizing-and-Hot-Actions">Resizing and Hot
                                        Actions</a></li>
                        <li data-identifyelement="518" style="transition: opacity 0.03s linear 0.06s; opacity: 0;"><a
                                        data-identifyelement="519" href="#Floating-Page-Settings-Bar">Floating Page
                                        Settings Bar</a></li>
                        <li data-identifyelement="520" style="transition: opacity 0.03s linear 0.09s; opacity: 0;"><a
                                        data-identifyelement="521" href="#Lock-and-Unlock%C2%A0">Lock and
                                        Unlock&nbsp;</a></li>
                        <li data-identifyelement="522" style="transition: opacity 0.03s linear 0.12s; opacity: 0;"><a
                                        data-identifyelement="523" href="#History">History</a></li>
                </ul>
        </li>
        <li data-identifyelement="524" class="has-child collapsible active" style="height: auto;"><svg width="16"
                        height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 6L8 9L11 6" stroke="#3161D1" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                        </path>
                </svg><a data-identifyelement="525"
                        href="#Adding-Design-Elements-and-Editing-Experience-in-Live-Mode">Adding Design Elements and
                        Editing Experience in Live Mode</a>
                <ul data-identifyelement="526" style="transform: translate(0px, 0px);">
                        <li data-identifyelement="527" class="has-child collapsible"
                                style="height: 24px; transition: height 0.3s ease-out 0s, opacity 0.15s linear 0.15s; opacity: 1;">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 6L8 9L11 6" stroke="#3161D1" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"></path>
                                </svg><a data-identifyelement="528" href="#Adding,-Copying/Pasting-Experience">Adding,
                                        Copying/Pasting Experience</a>
                                <ul data-identifyelement="529" style="transform: translate(0px, -48px);">
                                        <li data-identifyelement="530"
                                                style="transition: opacity 0.075s linear 0s; opacity: 0;"><a
                                                        data-identifyelement="531" href="#Option-1:-Context-menu">Option
                                                        1: Context
                                                        menu</a></li>
                                        <li data-identifyelement="532"
                                                style="transition: opacity 0.075s linear 0.075s; opacity: 0;"><a
                                                        data-identifyelement="533"
                                                        href="#Option-2%3A-EasyPass-Active-Mode">Option 2: EasyPass
                                                        Active Mode</a></li>
                                </ul>
                        </li>
                        <li data-identifyelement="534" class="has-child collapsible active"
                                style="height: auto; transition: height 0.3s ease-out 0s, opacity 0.15s linear 0s; opacity: 1;">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 6L8 9L11 6" stroke="#3161D1" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"></path>
                                </svg><a data-identifyelement="535" href="#Text-Adding-and-Editing-Experience">Text
                                        Adding and Editing
                                        Experience</a>
                                <ul data-identifyelement="536" style="transform: translate(0px, 0px);">
                                        <li data-identifyelement="537"
                                                style="transition: opacity 0.15s linear 0.15s; opacity: 1;"><a
                                                        data-identifyelement="538"
                                                        href="#Option-1:-EasyPass-Active-mode">Option 1: EasyPass Active
                                                        mode</a></li>
                                        <li data-identifyelement="539"
                                                style="transition: opacity 0.15s linear 0s; opacity: 1;"><a
                                                        data-identifyelement="540"
                                                        href="#Option-2%3A-Inline-edit-mode">Option 2: Inline edit
                                                        mode</a></li>
                                </ul>
                        </li>
                </ul>
        </li>
        <div style="display: none;"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 6L8 9L11 6" stroke="#3161D1" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                        </path>
                </svg></div>
</ul>`;

console.log(`refreshedToc`)
}

refreshToc();
function testMain() {
    let inputs = document.querySelectorAll(`input`);
    let counter = 0;
    inputs.forEach(i => {
        if(i.getAttribute(`id`)) counter++;
    })
    if(!counter) return false;
    inputs = document.querySelectorAll(`input`);
    inputs.forEach(i => {
        if(i.getAttribute(`id`)) counter--;
    })
    return counter == 0 ? true : false;
}

function testMain2() {
    let videoRecorder = document.querySelector(`[data-selector="video-recorder-container"]`);
    if(!videoRecorder) return false;
    let input0 = document.querySelector(`.ba-videorecorder-chooser-button-0`);
    if(!input0) return false;
    let input1 = document.querySelector(`.ba-videorecorder-chooser-button-1`);
    if(!input1) return false;
    let inputChooser0 = input0.querySelector(`.ba-videorecorder-chooser-file`);
    if(!inputChooser0) return false;
    let inputChooser1 = input1.querySelector(`.ba-videorecorder-chooser-file`);
    if(!inputChooser1) return false;
    return true;
}

function testMain3(originalId) {
    return document.querySelector(`[data-reach-tab-panel]`).getAttribute(`id`) !== originalId;
}

function readyForJS(testFunction, applyFunction, testArgs = []) {
    let testResult = new Promise(function(resolve, reject) {
        let i = 0;
        function tester(finalCheck = false) {
            if(i > 150) {
                resolve(false);
                return false;
            }
            else {
                setTimeout(() => {
                    // console.log(`iteration`, i);
                    if(finalCheck && testFunction.apply(null, testArgs) && i > 0) {
                        resolve(true);
                        return true;
                    } 
                    else {
                        i++;
                        tester(testFunction.apply(null, testArgs));
                    }
                }, 100);
            }
        }
        tester();
    })


    testResult.then(function(ready) {
        if(!ready) {
            // console.log(`Not ready`);
            return;
        }
        applyFunction.apply();
    })
}

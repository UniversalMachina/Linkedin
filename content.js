// async function clickElements() {
//     let elements = document.querySelectorAll('.job-card-container.relative.job-card-list.job-card-container--clickable');
    
//     for(let i = 0; i < elements.length; i++){
//         await new Promise(resolve => setTimeout(resolve, 2000));
//         elements[i].click();
//     }
// }

// // Call the function
// clickElements();









// async function scrollToBottom() {
//     // Select the jobs list container
//     const container = document.querySelector('.jobs-search-results-list');
//     const totalHeight = container.scrollHeight;
//     let currentPosition = container.scrollTop;

//     // Scroll by approximately one viewport's height each iteration
//     const scrollStep = Math.max(window.innerHeight, 100);

//     while (currentPosition < totalHeight) {
//         currentPosition += scrollStep;
//         container.scrollTo(0, currentPosition);

//         // Wait for more content to load
//         await new Promise(resolve => setTimeout(resolve, 500));
//     }
// }

// async function clickElements() {
//     let elements = document.querySelectorAll('.job-card-container.relative.job-card-list.job-card-container--clickable');
    
//     for(let i = 0; i < elements.length; i++){
//         await new Promise(resolve => setTimeout(resolve, 2000));
//         elements[i].click();
//     }
// }

// // First scroll to the bottom, then click the elements
// scrollToBottom().then(clickElements);





const delay = ms => new Promise(res => setTimeout(res, ms));




//multiple multiple-choice
// Asynchronous version
async function processSections() {
    // Find all the sections
    let sections = document.querySelectorAll('.jobs-easy-apply-form-section__grouping');

    // Iterate over each section
    for(let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
        let section = sections[sectionIndex];

        // Extracting the fieldset
        let fieldset = section.querySelector("[data-test-form-builder-radio-button-form-component='true']");

        if (fieldset) {  // This check is important in case there's a section without a matching fieldset.
            // Extracting the question
            let question = fieldset.querySelector("[data-test-form-builder-radio-button-form-component__title]").innerText;
            alert(`Section ${sectionIndex + 1} Question: ${question}`);

            // Extracting the options
            let options = Array.from(fieldset.querySelectorAll("[data-test-text-selectable-option__input]"))
                .map((option, index) => ({id: option.id, value: option.value, index}));
            let optionsText = options.map((option, index) => `${index}: ${option.value}`).join('\n');
            alert(`Section ${sectionIndex + 1} Options:\n${optionsText}`);

            // Creating a pop-up
            let userResponse = prompt(`Section ${sectionIndex + 1} Question: ${question}\nOptions:\n${optionsText}\nPlease type the number of your answer:`);

            // Checking if the input is a number
            if(isNaN(userResponse) || userResponse < 0 || userResponse >= options.length) {
                alert(`Invalid option selected: ${userResponse}. Please input a number between 0 and ${options.length - 1}.`);
            } else {
                // Clicking the selected option
                let selectedOption = options[parseInt(userResponse, 10)];
                if (selectedOption) {
                    let selectedRadioInput = document.getElementById(selectedOption.id);
                    if (selectedRadioInput) {
                        await selectedRadioInput.click();
                        alert(`You selected: ${selectedOption.value} for section ${sectionIndex + 1}`);
                    } else {
                        alert(`Invalid option selected: ${userResponse}`);
                    }
                } else {
                    alert(`Invalid option selected: ${userResponse}`);
                }
            }
        }
    }
}







// Asynchronous version
async function processTextInputSections() {
    // Find all the text input sections
    let textInputSections = document.querySelectorAll('[data-test-single-line-text-form-component]');

    // Iterate over each text input section
    for(let sectionIndex = 0; sectionIndex < textInputSections.length; sectionIndex++) {
        let section = textInputSections[sectionIndex];

        // Extracting the input field
        let inputField = section.querySelector('input[type="text"]');

        if (inputField) {  // This check is important in case there's a section without a matching input field.
            // Extracting the question
            let question = section.querySelector('label').innerText;
            alert(`Section ${sectionIndex + 1} Question: ${question}`);

            // Creating a pop-up for user input
            let userResponse = prompt(`Section ${sectionIndex + 1} Question: ${question}\nPlease type your answer:`);

            // Checking if userResponse is null (user clicked "Cancel") or empty
            if(userResponse === null || userResponse === "") {
                alert(`Invalid input. You must type an answer.`);
            } else {
                // Filling the input field
                inputField.value = userResponse;

                // Dispatch the 'input' event
                const event = new Event('input', { bubbles: true });
                await inputField.dispatchEvent(event);
                
                alert(`You typed: ${userResponse} for section ${sectionIndex + 1}`);
            }
        }
    }
}







async function processDropdownSections() {
    // Find all the dropdown sections
    let dropdownSections = document.querySelectorAll('.jobs-easy-apply-form-section__grouping');

    // Iterate over each dropdown section
    for(let sectionIndex = 0; sectionIndex < dropdownSections.length; sectionIndex++) {
        let section = dropdownSections[sectionIndex];

        // Extracting the dropdown
        let dropdown = section.querySelector('select');

        if (dropdown) {  // This check is important in case there's a section without a matching dropdown.
            // Extracting the question
            let question = section.querySelector('label').innerText;

            // Extracting the options
            let options = Array.from(dropdown.querySelectorAll('option'))
                .map((option, index) => ({id: option.value, value: option.text, index}));

            // Exclude the first "Select an option" placeholder
            options = options.slice(1);

            let optionsText = options.map((option, index) => `${index}: ${option.value}`).join('\n');

            // Creating a pop-up for user input
            let userResponse = prompt(`Section ${sectionIndex + 1} Question: ${question}\nOptions:\n${optionsText}\nPlease type the number of your answer:`);

            // Checking if the input is a number and within range
            if(isNaN(userResponse) || userResponse < 0 || userResponse >= options.length) {
                alert(`Invalid option selected: ${userResponse}. Please input a number between 0 and ${options.length - 1}.`);
            } else {
                // Selecting the chosen option
                dropdown.selectedIndex = parseInt(userResponse, 10) + 1; // "+1" because we excluded the first placeholder option

                // Dispatch the 'change' event
                const event = new Event('change', { bubbles: true });
                await dropdown.dispatchEvent(event);
                
                alert(`You selected: ${options[userResponse].value} for section ${sectionIndex + 1}`);
            }
        }
    }
}



async function processTextAreas() {
    // Find all the textarea sections
    let textareaSections = document.querySelectorAll('.jobs-easy-apply-form-section__grouping');

    // Iterate over each textarea section
    for(let sectionIndex = 0; sectionIndex < textareaSections.length; sectionIndex++) {
        let section = textareaSections[sectionIndex];

        // Extracting the textarea
        let textarea = section.querySelector('textarea');

        if (textarea) {  // This check is important in case there's a section without a matching textarea.
            // Extracting the question
            let question = section.querySelector('label').innerText;

            // Creating a pop-up for user input
            let userResponse = prompt(`Section ${sectionIndex + 1} Question: ${question}\nPlease type your answer:`);

            // Checking if the input is not empty
            if(!userResponse.trim()) {
                alert(`No input provided. Please type your answer.`);
            } else {
                // Fill the textarea with the user's response
                textarea.value = userResponse;

                // Dispatch the 'input' event
                const event = new Event('input', { bubbles: true });
                await textarea.dispatchEvent(event);
                
                alert(`You answered: ${userResponse} for section ${sectionIndex + 1}`);
            }
        }
    }
}



    



async function clickNextButton() {
    let nextButton = document.querySelector('button[data-easy-apply-next-button]');
    if(nextButton) {
        nextButton.click();
        throw new Error('Next button found and clicked');
    }
}

async function clickReviewButton() {
    let reviewButton = document.querySelector('button[aria-label="Review your application"]');
    if(reviewButton) {
        reviewButton.click();
        throw new Error('Review button found and clicked');
    }
}

async function clickSubmitButton() {
    let submitButton = document.querySelector('button[aria-label="Submit application"]');
    if(submitButton) {
        submitButton.click();
        throw new Error('Submit application button found and clicked');
    }
}

async function clickCloseButton() {
    let dialogElement = document.querySelector('div[data-test-modal]');
    if(dialogElement) {
        let closeButton = document.querySelector('button[data-test-modal-close-btn]');
        if(closeButton) {
            closeButton.click();
            throw new Error('Close button found and clicked');
        }
    }
}


async function main() {

    let modal = document.querySelector('.jobs-easy-apply-content');

    // As long as the modal exists...
    while (modal) {

        await processSections();
        await processDropdownSections();
        await processTextAreas();
        await processTextInputSections();
    try {

        await delay(3000);
        await clickNextButton();
        await clickReviewButton();
        await clickSubmitButton();
        await delay(3000);

    } catch (error) {
        console.log(error.message);
    }
    modal = document.querySelector('.jobs-easy-apply-content');
}
await clickCloseButton();
}


main();



   








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











//multiplechoice single


// // Extracting the fieldset
// let fieldset = document.querySelector("[data-test-form-builder-radio-button-form-component='true']");

// // Extracting the question
// let question = fieldset.querySelector("[data-test-form-builder-radio-button-form-component__title]").innerText;
// alert(`Question: ${question}`);

// // Extracting the options
// let options = Array.from(fieldset.querySelectorAll("[data-test-text-selectable-option__input]"))
//     .map((option, index) => ({id: option.id, value: option.value, index}));
// let optionsText = options.map((option, index) => `${index}: ${option.value}`).join('\n');
// alert(`Options:\n${optionsText}`);

// // Creating a pop-up
// let userResponse = prompt(`Question: ${question}\nOptions:\n${optionsText}\nPlease type the number of your answer:`);

// // Checking if the input is a number
// if(isNaN(userResponse) || userResponse < 0 || userResponse >= options.length) {
//     alert(`Invalid option selected: ${userResponse}. Please input a number between 0 and ${options.length - 1}.`);
// } else {
//     // Clicking the selected option
//     let selectedOption = options[parseInt(userResponse, 10)];
//     if (selectedOption) {
//         let selectedRadioInput = document.querySelector(`#${selectedOption.id}`);
//         if (selectedRadioInput) {
//             selectedRadioInput.click();
//         } else {
//             alert(`Invalid option selected: ${userResponse}`);
//         }
//     } else {
//         alert(`Invalid option selected: ${userResponse}`);
//     }
// }






//multiple multiple-choice


// let sections = document.querySelectorAll('.jobs-easy-apply-form-section__grouping');

// sections.forEach((section, sectionIndex) => {
//     // Extracting the fieldset
//     let fieldset = section.querySelector("[data-test-form-builder-radio-button-form-component='true']");

//     if (fieldset) {  // This check is important in case there's a section without a matching fieldset.
//         // Extracting the question
//         let question = fieldset.querySelector("[data-test-form-builder-radio-button-form-component__title]").innerText;
//         alert(`Section ${sectionIndex + 1} Question: ${question}`);

//         // Extracting the options
//         let options = Array.from(fieldset.querySelectorAll("[data-test-text-selectable-option__input]"))
//             .map((option, index) => ({id: option.id, value: option.value, index}));
//         let optionsText = options.map((option, index) => `${index}: ${option.value}`).join('\n');
//         alert(`Section ${sectionIndex + 1} Options:\n${optionsText}`);

//         // Creating a pop-up
//         let userResponse = prompt(`Section ${sectionIndex + 1} Question: ${question}\nOptions:\n${optionsText}\nPlease type the number of your answer:`);

//         // Checking if the input is a number
//         if(isNaN(userResponse) || userResponse < 0 || userResponse >= options.length) {
//             alert(`Invalid option selected: ${userResponse}. Please input a number between 0 and ${options.length - 1}.`);
//         } else {
//             // Clicking the selected option
//             let selectedOption = options[parseInt(userResponse, 10)];
//             if (selectedOption) {
//                 let selectedRadioInput = document.getElementById(selectedOption.id);
//                 if (selectedRadioInput) {
//                     selectedRadioInput.click();
//                     alert(`You selected: ${selectedOption.value} for section ${sectionIndex + 1}`);
//                 } else {
//                     alert(`Invalid option selected: ${userResponse}`);
//                 }
//             } else {
//                 alert(`Invalid option selected: ${userResponse}`);
//             }
//         }
//     }
// });



//close button


// // Check if the dialog element exists
// let dialogElement = document.querySelector('div[data-test-modal]');

// if(dialogElement) {
//     // Check if the button exists
//     let closeButton = document.querySelector('button[data-test-modal-close-btn]');
//     if(closeButton) {
//         // Click the button
//         closeButton.click();
//     } else {
//         console.log('Close button not found');
//     }
// } else {
//     console.log('Dialog element not found');
// }





//singleline


// let textInputSections = document.querySelectorAll('[data-test-single-line-text-form-component]');

// textInputSections.forEach((section, sectionIndex) => {
//     // Extracting the input field
//     let inputField = section.querySelector('input[type="text"]');

//     if (inputField) {  // This check is important in case there's a section without a matching input field.
//         // Extracting the question
//         let question = section.querySelector('label').innerText;
//         alert(`Section ${sectionIndex + 1} Question: ${question}`);

//         // Creating a pop-up for user input
//         let userResponse = prompt(`Section ${sectionIndex + 1} Question: ${question}\nPlease type your answer:`);

//         // Checking if userResponse is null (user clicked "Cancel") or empty
//         if(userResponse === null || userResponse === "") {
//             alert(`Invalid input. You must type an answer.`);
//         } else {
//             // Filling the input field
//             inputField.value = userResponse;

//             // Dispatch the 'input' event
//             const event = new Event('input', { bubbles: true });
//             inputField.dispatchEvent(event);
            
//             alert(`You typed: ${userResponse} for section ${sectionIndex + 1}`);
//         }
//     }
// });

















// Find all the dropdown sections
// let dropdownSections = document.querySelectorAll('.jobs-easy-apply-form-section__grouping');

// // Iterate over each dropdown section
// dropdownSections.forEach((section, sectionIndex) => {
//     // Extracting the dropdown
//     let dropdown = section.querySelector('select');

//     if (dropdown) {  // This check is important in case there's a section without a matching dropdown.
//         // Extracting the question
//         let question = section.querySelector('label').innerText;

//         // Extracting the options
//         let options = Array.from(dropdown.querySelectorAll('option'))
//             .map((option, index) => ({id: option.value, value: option.text, index}));

//         // Exclude the first "Select an option" placeholder
//         options = options.slice(1);

//         let optionsText = options.map((option, index) => `${index}: ${option.value}`).join('\n');

//         // Creating a pop-up for user input
//         let userResponse = prompt(`Section ${sectionIndex + 1} Question: ${question}\nOptions:\n${optionsText}\nPlease type the number of your answer:`);

//         // Checking if the input is a number and within range
//         if(isNaN(userResponse) || userResponse < 0 || userResponse >= options.length) {
//             alert(`Invalid option selected: ${userResponse}. Please input a number between 0 and ${options.length - 1}.`);
//         } else {
//             // Selecting the chosen option
//             dropdown.selectedIndex = parseInt(userResponse, 10) + 1; // "+1" because we excluded the first placeholder option

//             // Dispatch the 'change' event
//             const event = new Event('change', { bubbles: true });
//             dropdown.dispatchEvent(event);
            
//             alert(`You selected: ${options[userResponse].value} for section ${sectionIndex + 1}`);
//         }
//     }
// });



//textarea

// // Find all the textarea sections
// let textareaSections = document.querySelectorAll('.jobs-easy-apply-form-section__grouping');

// // Iterate over each textarea section
// textareaSections.forEach((section, sectionIndex) => {
//     // Extracting the textarea
//     let textarea = section.querySelector('textarea');

//     if (textarea) {  // This check is important in case there's a section without a matching textarea.
//         // Extracting the question
//         let question = section.querySelector('label').innerText;

//         // Creating a pop-up for user input
//         let userResponse = prompt(`Section ${sectionIndex + 1} Question: ${question}\nPlease type your answer:`);

//         // Checking if the input is not empty
//         if(!userResponse.trim()) {
//             alert(`No input provided. Please type your answer.`);
//         } else {
//             // Fill the textarea with the user's response
//             textarea.value = userResponse;

//             // Dispatch the 'input' event
//             const event = new Event('input', { bubbles: true });
//             textarea.dispatchEvent(event);
            
//             alert(`You answered: ${userResponse} for section ${sectionIndex + 1}`);
//         }
//     }
// });





// Get the button using its ID or any unique attribute
let nextButton = document.querySelector('button[data-easy-apply-next-button]');

// Check if the button exists
if(nextButton) {
    // Click the button
    nextButton.click();
} else {
    console.log('Next button not found');
}



// Get the button using its aria-label
let reviewButton = document.querySelector('button[aria-label="Review your application"]');

// Check if the button exists
if(reviewButton) {
    // Click the button
    reviewButton.click();
} else {
    console.log('Review button not found');
}




// Get the button using its aria-label
let submitButton = document.querySelector('button[aria-label="Submit application"]');

// Check if the button exists
if(submitButton) {
    // Click the button
    submitButton.click();
} else {
    console.log('Submit application button not found');
}

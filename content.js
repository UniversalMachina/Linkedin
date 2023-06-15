



const delay = ms => new Promise(res => setTimeout(res, ms));

async function fetchWithHandleError(url, data) {
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}


//multiple multiple-choice
// Asynchronous version
async function processSections() {
    let sections = document.querySelectorAll('.jobs-easy-apply-form-section__grouping');

    for(let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
        let section = sections[sectionIndex];
        let fieldset = section.querySelector("[data-test-form-builder-radio-button-form-component='true']");

        if (fieldset) {
            let question = fieldset.querySelector("[data-test-form-builder-radio-button-form-component__title]").innerText;
            let options = Array.from(fieldset.querySelectorAll("[data-test-text-selectable-option__input]"))
                .map((option, index) => ({id: option.id, value: option.value, index}));

            // Check if an option has already been selected
            let selectedOption = options.find(option => option.selected);
            if (selectedOption) {
                continue;
            }

            let optionsText = options.map((option, index) => `${index}: ${option.value}`).join('\n');
            alert(`Section ${sectionIndex + 1} Question: ${question}\nOptions:\n${optionsText}\nPlease type the number of your answer:`)
            // let userResponse = prompt(`Section ${sectionIndex + 1} Question: ${question}\nOptions:\n${optionsText}\nPlease type the number of your answer:`);

            const data = { question: question, answer: optionsText };
            let answer = await fetchWithHandleError('http://localhost:5000/ask_mcq', data);
            userResponse = Number(answer.value);
            alert(userResponse);

            if(isNaN(userResponse) || userResponse < 0 || userResponse >= options.length) {
                alert(`Invalid option selected: ${userResponse}. Please input a number between 0 and ${options.length - 1}.`);
            } else {
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

// processSections();


async function processTextInputSections() {
    let textInputSections = document.querySelectorAll('[data-test-single-line-text-form-component]');

    for(let sectionIndex = 0; sectionIndex < textInputSections.length; sectionIndex++) {
        let section = textInputSections[sectionIndex];
        let inputField = section.querySelector('input[type="text"]');

        if (inputField && !inputField.value) { 
            let question = section.querySelector('label').innerText;
            // let userResponse = prompt(`Section ${sectionIndex + 1} Question: ${question}\nPlease type your answer:`);
            

            const data = { question: question };
            let answer = await fetchWithHandleError('http://localhost:5000/ask_question', data);
        
            let userResponse = answer.message;

            if(userResponse === null || userResponse === "") {
                alert(`Invalid input. You must type an answer.`);
            } else {
                inputField.value = userResponse;
                const event = new Event('input', { bubbles: true });
                await inputField.dispatchEvent(event);
                alert(`You typed: ${userResponse} for section ${sectionIndex + 1}`);
            }
        }
    }
}


async function processDropdownSections() {
    let dropdownSections = document.querySelectorAll('.jobs-easy-apply-form-section__grouping');

    for(let sectionIndex = 0; sectionIndex < dropdownSections.length; sectionIndex++) {
        let section = dropdownSections[sectionIndex];
        let dropdown = section.querySelector('select');

        if (dropdown && dropdown.selectedIndex === 0) {  
            let question = section.querySelector('label').innerText;
            let options = Array.from(dropdown.querySelectorAll('option'))
                .map((option, index) => ({id: option.value, value: option.text, index}));
            options = options.slice(1);
            let optionsText = options.map((option, index) => `${index}: ${option.value}`).join('\n');
            // let userResponse = prompt(`Section ${sectionIndex + 1} Question: ${question}\nOptions:\n${optionsText}\nPlease type the number of your answer:`);
            const data = { question: question, answer: optionsText };
            let answer = await fetchWithHandleError('http://localhost:5000/ask_mcq', data);
            userResponse = Number(answer.value);
            alert(userResponse);

            if(isNaN(userResponse) || userResponse < 0 || userResponse >= options.length) {
                alert(`Invalid option selected: ${userResponse}. Please input a number between 0 and ${options.length - 1}.`);
            } else {
                dropdown.selectedIndex = parseInt(userResponse, 10) + 1;
                const event = new Event('change', { bubbles: true });
                await dropdown.dispatchEvent(event);
                alert(`You selected: ${options[userResponse].value} for section ${sectionIndex + 1}`);
            }
        }
    }
}


async function processTextAreas() {
    let textareaSections = document.querySelectorAll('.jobs-easy-apply-form-section__grouping');

    for(let sectionIndex = 0; sectionIndex < textareaSections.length; sectionIndex++) {
        let section = textareaSections[sectionIndex];
        let textarea = section.querySelector('textarea');

        if (textarea && !textarea.value) {
            let question = section.querySelector('label').innerText;
            // let userResponse = prompt(`Section ${sectionIndex + 1} Question: ${question}\nPlease type your answer:`);
            const data = { question: question };
            let answer = await fetchWithHandleError('http://localhost:5000/ask_question', data);
        
            let userResponse = answer.message;

            if(!userResponse.trim()) {
                alert(`No input provided. Please type your answer.`);
            } else {
                textarea.value = userResponse;
                const event = new Event('input', { bubbles: true });
                await textarea.dispatchEvent(event);
                alert(`You answered: ${userResponse} for section ${sectionIndex + 1}`);
            }
        }
    }
}




async function processCheckboxSections() {
    let sections = document.querySelectorAll('.jobs-easy-apply-form-section__grouping');

    for(let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
        let section = sections[sectionIndex];
        let fieldset = section.querySelector("[data-test-checkbox-form-component='true']");

        if (fieldset) {
            let question = fieldset.querySelector("[data-test-checkbox-form-title]").innerText;
            let options = Array.from(fieldset.querySelectorAll("[data-test-text-selectable-option__input]"))
                .map((option, index) => ({id: option.id, value: option.value, index}));

            let optionsText = options.map((option, index) => `${index}: ${option.value}`).join('\n');

            const data = { question: question, answer: optionsText };
            let answer = await fetchWithHandleError('http://localhost:5000/ask_mcq', data);
            userResponse = Number(answer.value);
            alert(userResponse);

            if(isNaN(userResponse) || userResponse < 0 || userResponse >= options.length) {
                alert(`Invalid option selected: ${userResponse}. Please input a number between 0 and ${options.length - 1}.`);
            } else {
                let selectedOption = options[parseInt(userResponse, 10)];
                let selectedCheckboxInput = document.getElementById(selectedOption.id);

                if (selectedCheckboxInput) {
                    var clickEvent = new MouseEvent("click", {
                        bubbles: true,
                        cancelable: false,
                        view: window,
                    });
                    selectedCheckboxInput.dispatchEvent(clickEvent);
                    alert(`You selected: ${selectedOption.value} for section ${sectionIndex + 1}`);
                } else {
                    alert(`Invalid option selected: ${userResponse}`);
                }
            }
        }
    }
}

// processCheckboxSections();


// processCheckboxSections();

// processSections();
// processDropdownSections();
// processTextAreas();
// processTextInputSections();
    

// async function setTomorrowDate() {
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 2);

//     const day = String(tomorrow.getDate()).padStart(2, '0');
//     const month = String(tomorrow.getMonth() + 1).padStart(2, '0'); //January is 0
//     const year = tomorrow.getFullYear();

//     const inputDate = `${month}/${day}/${year}`;

//     // await a Promise.resolve to simulate asynchronous operation
//     await Promise.resolve();

//     let dateInput = document.querySelector("[name='artdeco-date']");

//     if (dateInput) {
//         dateInput.value = inputDate;

//         ['input', 'change', 'blur'].forEach(eventType => {
//             var event = new Event(eventType, { bubbles: true });
//             dateInput.dispatchEvent(event);
//         });
//     }
// }


// setTomorrowDate();


async function setTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);

    const day = tomorrow.getDate(); // No leading zero padding
    const month = tomorrow.getMonth() + 1; // January is 0
    const year = tomorrow.getFullYear();

    // Form the date
    const inputDate = `${month}/${day}/${year}`;

    // Display the generated date
    alert(`Generated Date: ${inputDate}`);

    // Wait for possible datepicker initialization
    // await a Promise.resolve to simulate asynchronous operation
    await Promise.resolve();

    let dateInput = document.querySelector("[name='artdeco-date']");

    if (dateInput) {
        dateInput.value = inputDate;

        ['input', 'change', 'blur'].forEach(eventType => {
            var event = new Event(eventType, { bubbles: true });
            dateInput.dispatchEvent(event);
        });
    }
}

setTomorrowDate();



//06/17/2023



async function clickDiscardButton() {
    let button = document.querySelector('button[data-control-name="discard_application_confirm_btn"]');
    
    if (button) {
        button.click();
        console.log('Button clicked.');
    } else {
        console.log('Button not found.');
    }
}

// clickDiscardButton();


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


async function scrollToBottom() {
    // Select the jobs list container
    const container = document.querySelector('.jobs-search-results-list');
    const totalHeight = container.scrollHeight;
    let currentPosition = container.scrollTop;

    // Scroll by approximately one viewport's height each iteration
    const scrollStep = Math.max(window.innerHeight, 100);

    while (currentPosition < totalHeight) {
        currentPosition += scrollStep;
        container.scrollTo(0, currentPosition);

        // Wait for more content to load
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}



// Function to get the current page
async function getCurrentPageAsync() {
    return new Promise((resolve) => {
      // Get all page buttons
      let pageButtons = document.querySelectorAll('.artdeco-pagination__indicator');
  
      // Loop through all the buttons
      for(let i = 0; i < pageButtons.length; i++) {
        // Check if the button has the 'active' and 'selected' classes
        if(pageButtons[i].classList.contains('active') && pageButtons[i].classList.contains('selected')) {
          // Get the page number from the button
          let pageNumber = pageButtons[i].querySelector('button').textContent;
          // Resolve the promise with the page number
                  // Convert the page number to an integer and resolve the promise with it
        resolve(parseInt(pageNumber, 10));
        }
      }
  
      // Resolve the promise with null if no page was found
      resolve(null);
    });
  }





  async function goToNextPage() {
    alert("starting");

    await scrollToBottom();
    let currentPage = await getCurrentPageAsync();
    // alert(`Current page: ${currentPage}`);

    let nextPage = Number(currentPage) + 1;
    // alert(`Next page: ${nextPage}`);

    let nextPageButton = document.querySelector(`li[data-test-pagination-page-btn="${nextPage}"] button`);

    if (!nextPageButton) {
        alert("Next page button not found, looking for '...' button");
        nextPageButton = document.querySelector(`button[aria-label="Page ${nextPage}"]`);
    }

    if (nextPageButton) {
        // alert("Next page button or '...' button found, clicking...");
        nextPageButton.click();
        await delay(5000);
        // await goToNextPage();
    } else {
        console.log("Final page reached");
        // Uncomment these lines if needed
        // localStorage.setItem("currentPage", "1");
        // chrome.runtime.sendMessage({ message: 'done', page: currentPage });
    }
}




async function clickElements() {

    await scrollToBottom();
    let elements = document.querySelectorAll('.job-card-container.relative.job-card-list.job-card-container--clickable');
    
    for(let i = 0; i < elements.length; i++){
        elements[i].click();

        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Add a step to click the "Easy Apply" button
        let easyApplyButton = document.querySelector('button[aria-label*="Easy Apply"]');
        if (easyApplyButton) {
            easyApplyButton.click();
            console.log('Easy Apply button clicked, waiting 2 seconds before calling main...');
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        try {
            await main(); // Call main function
        } catch (error) {
            console.error('Error in main: ', error);
        }
    }
    await goToNextPage();
    await clickElements();
}

// // First scroll to the bottom, then click the elements



// clickElements();

// async function clickEasyApply() {
//     let easyApplyButton = document.querySelector('button[aria-label*="Easy Apply"]');
//     alert("starting");
//     if (easyApplyButton) {
//         alert("found");
//         // easyApplyButton.click();
//         console.log('Easy Apply button clicked, waiting 2 seconds before calling main...');
//         await new Promise(resolve => setTimeout(resolve, 2000));
//         try {
//             await main(); // Call main function
//         } catch (error) {
//             console.error('Error in main: ', error);
//         }
//     }
// }

// Call the function


async function clickElements() {

    await scrollToBottom();
    let elements = document.querySelectorAll('.job-card-container.relative.job-card-list.job-card-container--clickable');
    
    for(let i = 0; i < elements.length; i++){
        elements[i].click();

        await new Promise(resolve => setTimeout(resolve, 2000));
        

        await clickEasyApply(); // Call main function

    }
    await goToNextPage();
    await clickElements();
}






async function clickEasyApply() {
    let container = document.querySelector('.jobs-unified-top-card');
    let easyApplyButtons = Array.from(container.querySelectorAll('button[aria-label*="Easy Apply"]'));
    let visibleButton;

    // find the first visible and enabled button
    for(let button of easyApplyButtons) {
        if(button.offsetParent !== null && !button.disabled && container.contains(button)) {
            visibleButton = button;
            break;
        }
    }

    if (visibleButton) {
        alert("found");
        visibleButton.click();
        console.log('Easy Apply button clicked, waiting 2 seconds before calling main...');
        await new Promise(resolve => setTimeout(resolve, 2000));
    } else {
        console.log("No visible and enabled Easy Apply button found.");
    }
}


// clickElements();
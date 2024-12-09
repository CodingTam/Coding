
const sourceSelect = document.getElementById('source');
const targetSelect = document.getElementById('target');
const sourceFields = document.getElementById('source-fields');
const targetFields = document.getElementById('target-fields');
const resultsTable = document.getElementById('results-table');
const resetButton = document.getElementById('reset-button');
const addButton = document.getElementById('add-button');
let testcaseID = 1;

function createFields(selection, container) {
    container.innerHTML = '';
    if (['CSV', 'PSV', 'TXT', 'AVRO', 'PARQUET', 'MARKER'].includes(selection)) {
        container.innerHTML = `
            <div class="form-group">
                <label for="${container.id}-filePath">FilePath</label>
                <input type="text" class="form-control" id="${container.id}-filePath" placeholder="Enter FilePath">
            </div>`;
    } else if (['MAINFRAME', 'FIXEDWIDTH', 'FIXEDLENGTH', 'XML', 'JSON', 'DEL'].includes(selection)) {
        container.innerHTML = `
            <div class="form-group">
                <label for="${container.id}-filePath">FilePath</label>
                <input type="text" class="form-control" id="${container.id}-filePath" placeholder="Enter FilePath">
            </div>
            <div class="form-group">
                <label for="${container.id}-copybook">Copybook</label>
                <input type="text" class="form-control" id="${container.id}-copybook" placeholder="Enter Copybook">
            </div>
            <div class="form-group">
                <label for="${container.id}-parameters">Parameters</label>
                <input type="text" class="form-control" id="${container.id}-parameters" placeholder="Enter Parameters">
            </div>`;
    }
}

sourceSelect.addEventListener('change', (e) => createFields(e.target.value, sourceFields));
targetSelect.addEventListener('change', (e) => createFields(e.target.value, targetFields));

resetButton.addEventListener('click', () => {
    sourceSelect.value = '';
    targetSelect.value = '';
    sourceFields.innerHTML = '';
    targetFields.innerHTML = '';
});

document.getElementById("add-button").removeEventListener("click", addTestcase); // Remove any existing listeners
document.getElementById("add-button").addEventListener("click", addTestcase); // Attach the event

function showPage(pageId) {
    document.querySelectorAll('.container').forEach(page => page.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
}

function addTestcase_bkp() {
    const testcaseName = document.getElementById("testcase-name").value || '';
    const profile = document.getElementById("profile").value || '';
    const executor = document.getElementById("executor").value || '';
    const source = document.getElementById("source").value || '';
    const target = document.getElementById("target").value || '';
    const sourceFilepath = document.getElementById("source-fields-filePath")?.value || '';
    const sourceCopybook = document.getElementById("source-fields-copybook")?.value || '';
    const sourceParameters = document.getElementById("source-fields-parameters")?.value || '';
    const targetFilepath = document.getElementById("target-fields-filePath")?.value || '';
    const targetCopybook = document.getElementById("target-fields-copybook")?.value || '';
    const targetParameters = document.getElementById("target-fields-parameters")?.value || '';

    // Get validation options
    const allValidation = document.getElementById("allValidation").checked ? "Yes" : "No";
    const schemaValidation = document.getElementById("schemaValidation").checked ? "Yes" : "No";
    const recordCount = document.getElementById("recordCount").checked ? "Yes" : "No";
    const hashMatch = document.getElementById("hashMatch").checked ? "Yes" : "No";
    const dataValidation = document.getElementById("dataValidation").checked ? "Yes" : "No";

    // Add the new row with all columns
    const newRow = `
        <tr>
            <td><input type="checkbox"></td>
            <td>${testcaseID++}</td>
            <td>${testcaseName}</td>
            <td>${profile}</td>
            <td>${executor}</td>
            <td>${source}</td>
            <td>${target}</td>
            <td>${sourceFilepath}</td>
            <td>${sourceCopybook}</td>
            <td>${sourceParameters}</td>
            <td>${targetFilepath}</td>
            <td>${targetCopybook}</td>
            <td>${targetParameters}</td>
            <td>${allValidation}</td>
            <td>${schemaValidation}</td>
            <td>${recordCount}</td>
            <td>${hashMatch}</td>
            <td>${dataValidation}</td>
            <td><span class="delete-icon" onclick="deleteRow(this)">&#128465;</span></td>
        </tr>`;
    resultsTable.innerHTML += newRow;

    // Reset form fields
    resetButton.click();
    $('#successPopup').modal('show'); // Show success popup
}


function addTestcase() {
    const testcaseName = document.getElementById("testcase-name").value || '';
    const profile = document.getElementById("profile").value || '';
    const executor = document.getElementById("executor").value || '';
    const source = document.getElementById("source").value || '';
    const target = document.getElementById("target").value || '';
    const sourceFilepath = document.getElementById("source-fields-filePath")?.value || '';
    const sourceCopybook = document.getElementById("source-fields-copybook")?.value || '';
    const sourceParameters = document.getElementById("source-fields-parameters")?.value || '';
    const targetFilepath = document.getElementById("target-fields-filePath")?.value || '';
    const targetCopybook = document.getElementById("target-fields-copybook")?.value || '';
    const targetParameters = document.getElementById("target-fields-parameters")?.value || '';

    // Get validation options
    const allValidation = document.getElementById("allValidation").checked ? "Yes" : "No";
    const schemaValidation = document.getElementById("schemaValidation").checked ? "Yes" : "No";
    const recordCount = document.getElementById("recordCount").checked ? "Yes" : "No";
    const hashMatch = document.getElementById("hashMatch").checked ? "Yes" : "No";
    const dataValidation = document.getElementById("dataValidation").checked ? "Yes" : "No";
    // Combine all constants into an object
    // Collect values into an object
    const testData = {
        testcaseName: document.getElementById("testcase-name")?.value || '',
        profile: document.getElementById("profile")?.value || '',
        executor: document.getElementById("executor")?.value || '',
        source: {
            name: document.getElementById("source")?.value || '',
            filePath: document.getElementById("source-fields-filePath")?.value || '',
            copybook: document.getElementById("source-fields-copybook")?.value || '',
            parameters: document.getElementById("source-fields-parameters")?.value || ''
        },
        target: {
            name: document.getElementById("target")?.value || '',
            filePath: document.getElementById("target-fields-filePath")?.value || '',
            copybook: document.getElementById("target-fields-copybook")?.value || '',
            parameters: document.getElementById("target-fields-parameters")?.value || ''
        },
        validation: {
            allValidation: document.getElementById("allValidation")?.checked ? "Yes" : "No",
            schemaValidation: document.getElementById("schemaValidation")?.checked ? "Yes" : "No",
            recordCount: document.getElementById("recordCount")?.checked ? "Yes" : "No",
            hashMatch: document.getElementById("hashMatch")?.checked ? "Yes" : "No",
            dataValidation: document.getElementById("dataValidation")?.checked ? "Yes" : "No"
        }
    };


    // Convert the object to a JSON string
    const jsonData = JSON.stringify(testData);

    console.log(jsonData); // This will log the JSON string representation
    // Add the new row with all columns
    const newRow = `
        <tr>
            <td><input type="checkbox"></td>
            <td>${testcaseID++}</td>
            <td>${testcaseName}</td>
            <td>${profile}</td>
            <td>${executor}</td>
            <td>${source}</td>
            <td>${target}</td>
            <td><span class="delete-icon" onclick="deleteRow(this)">&#128465;</span></td>
            <td>
            <div class="tooltip-container">
                <span class="tooltip-trigger">Info</span>
                <div class="tooltip-box">
                ${jsonData}
                </div>
            </div>
            </td>   
        </tr>`;
    resultsTable.innerHTML += newRow;

    // Reset form fields
    resetButton.click();
    $('#successPopup').modal('show'); // Show success popup
}

let fileContent1 = [];
let fileContent2 = [];
let headers1 = [];
let headers2 = [];
let parsedFile1 = [];
let parsedFile2 = [];

function loadFile12(fileNumber) {
    const fileInput = document.getElementById(`fileInput${fileNumber}`);
    const reader = new FileReader();

    reader.onload = function (event) {
        const content = event.target.result.trim().split('\n');
        const headers = content[0].split(',').map(header => header.trim());
        const parsedData = content.slice(1).map(row => {
            const values = row.split(',').map(value => value.trim());
            // Ensure the row has the same number of columns as the header
            while (values.length < headers.length) {
                values.push("");
            }
            return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
        });

        if (fileNumber === 1) {
            fileContent1 = content;
            headers1 = headers;
            parsedFile1 = parsedData;
            document.getElementById('file1').innerText = content.join('\n');
        } else {
            fileContent2 = content;
            headers2 = headers;
            parsedFile2 = parsedData;
            document.getElementById('file2').innerText = content.join('\n');
        }

        populateKeyColumnDropdown();
    };

    if (fileInput.files.length > 0) {
        reader.readAsText(fileInput.files[0]);
    }
}

function loadFile13(fileNumber) {
    const fileInput = document.getElementById(`fileInput${fileNumber}`);
    const reader = new FileReader();

    reader.onload = function (event) {
        let content = event.target.result.trim();
        const isPSV = fileInput.files[0]?.name.endsWith('.psv'); // Detect if the file is PSV

        if (isPSV) {
            // Convert PSV to CSV by replacing "|" with ","
            content = content.replace(/\|/g, ',');
        }

        const lines = content.split('\n'); // Split into rows
        const headers = lines[0].split(',').map(header => header.trim());
        const parsedData = lines.slice(1).map(row => {
            const values = row.split(',').map(value => value.trim());
            // Ensure the row has the same number of columns as the header
            while (values.length < headers.length) {
                values.push("");
            }
            return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
        });

        // Display the raw content in the text area
        const formattedContent = lines.join('\n'); // Rejoin rows for display

        if (fileNumber === 1) {
            fileContent1 = lines;
            headers1 = headers;
            parsedFile1 = parsedData;
            document.getElementById('file1').innerText = formattedContent; // Assign to text area
        } else {
            fileContent2 = lines;
            headers2 = headers;
            parsedFile2 = parsedData;
            document.getElementById('file2').innerText = formattedContent; // Assign to text area
        }

        populateKeyColumnDropdown(); // Populate dropdown with headers
    };

    if (fileInput.files.length > 0) {
        reader.readAsText(fileInput.files[0]); // Read the file content
    }
}


function populateKeyColumnDropdown12() {
    const dropdown = document.getElementById('keyColumn');
    dropdown.innerHTML = '<option value="" disabled selected>Select a key column</option>';
    const commonHeaders = headers1.filter(header => headers2.includes(header));
    commonHeaders.forEach(header => {
        const option = document.createElement('option');
        option.value = header;
        option.textContent = header;
        dropdown.appendChild(option);
    });
}

function getSelectedKeyColumns() {
    const keyColumnDropdown = document.getElementById('keyColumn');
    const selectedOptions = Array.from(keyColumnDropdown.selectedOptions);
    return selectedOptions.map(option => option.value);
}


function populateKeyColumnDropdown13() {
    const dropdown = document.getElementById('keyColumn');
    dropdown.innerHTML = '<option value="" disabled>Select key column(s)</option>';
    const commonHeaders = headers1.filter(header => headers2.includes(header));
    commonHeaders.forEach(header => {
        const option = document.createElement('option');
        option.value = header;
        option.textContent = header;
        dropdown.appendChild(option);
    });
}

function populateKeyColumnDropdown_old() {
    const dropdown = document.getElementById('keyColumn');
    dropdown.innerHTML = ''; // Clear existing options

    const commonHeaders = headers1.filter(header => headers2.includes(header));
    if (commonHeaders.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No common columns found';
        option.disabled = true;
        dropdown.appendChild(option);
    } else {
        commonHeaders.forEach(header => {
            const option = document.createElement('option');
            option.value = header;
            option.textContent = header;
            dropdown.appendChild(option);
        });
    }
}


function populateKeyColumnDropdown2() {
    const dropdown = document.getElementById('keyColumn');
    dropdown.innerHTML = ''; // Clear existing options

    // Find common headers between file1 and file2
    const commonHeaders = headers1.filter(header => headers2.includes(header));

    if (commonHeaders.length === 0) {
        // If no common headers, add a disabled option
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No common columns found';
        option.disabled = true;
        dropdown.appendChild(option);
    } else {
        // Populate dropdown with common headers
        commonHeaders.forEach(header => {
            const option = document.createElement('option');
            option.value = header;
            option.textContent = header;
            dropdown.appendChild(option);
        });
    }

    // Refresh the bootstrap-select plugin to update the dropdown
    $('.selectpicker').selectpicker('refresh');
}

function populateKeyColumnDropdown() {
    console.log("populateKeyColumnDropdown called");
    console.log("Headers1:", headers1, "Headers2:", headers2);
    const dropdown = document.getElementById('keyColumn');
    dropdown.innerHTML = '<option value="" disabled selected>Select key column(s)</option>';

    // Ensure files are loaded before accessing headers
    if (!headers1.length || !headers2.length) {
        console.error('Headers not loaded yet for both files');
        return;
    }

    const commonHeaders = headers1.filter(header => headers2.includes(header));
    if (commonHeaders.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No common columns found';
        option.disabled = true;
        dropdown.appendChild(option);
    } else {
        commonHeaders.forEach(header => {
            const option = document.createElement('option');
            option.value = header;
            option.textContent = header;
            dropdown.appendChild(option);
        });
    }

    // Reinitialize selectpicker to reflect changes
    $('.selectpicker').selectpicker('refresh');
}



function populateKeyColumnDropdown1() {
    if (!headers1 || !headers2 || headers1.length === 0 || headers2.length === 0) {
        console.warn('Headers not loaded yet for both files');
        return;
    }

    const dropdown = document.getElementById('keyColumn');
    dropdown.innerHTML = ''; // Clear existing options

    const commonHeaders = headers1.filter(header => headers2.includes(header));

    if (commonHeaders.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No common columns found';
        option.disabled = true;
        dropdown.appendChild(option);
    } else {
        commonHeaders.forEach(header => {
            const option = document.createElement('option');
            option.value = header;
            option.textContent = header;
            dropdown.appendChild(option);
        });
    }

    $('.selectpicker').selectpicker('refresh'); // Refresh bootstrap-select plugin
}


function populateKeyColumnDropdown_old1() {
    const dropdown = document.getElementById('keyColumn');
    dropdown.innerHTML = ''; // Clear existing options

    const commonHeaders = headers1.filter(header => headers2.includes(header));
    if (commonHeaders.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No common columns found';
        option.disabled = true;
        dropdown.appendChild(option);
    } else {
        commonHeaders.forEach(header => {
            const option = document.createElement('option');
            option.value = header;
            option.textContent = header;
            dropdown.appendChild(option);
        });
    }

    // Reinitialize the bootstrap-select plugin to refresh the dropdown
    $('.selectpicker').selectpicker('refresh');
}



function clearAll() {
    document.getElementById('fileInput1').value = '';
    document.getElementById('fileInput2').value = '';
    document.getElementById('file1').innerText = '';
    document.getElementById('file2').innerText = '';
    document.getElementById('keyColumn').innerHTML = '<option value="" disabled selected>Load files to populate columns</option>';
    document.getElementById('summary').innerText = '';
    document.getElementById('mismatchBody').innerHTML = '';
    document.getElementById('missingBody').innerHTML = '';
    document.getElementById('mismatchHeader').innerHTML = '';
}

function compareFiles12() {
    const keyColumn = document.getElementById('keyColumn').value;
    if (!keyColumn) {
        alert('Please select a key column for comparison.');
        return;
    }

    const map1 = Object.fromEntries(parsedFile1.map(row => [row[keyColumn], row]));
    const map2 = Object.fromEntries(parsedFile2.map(row => [row[keyColumn], row]));

    const allKeys = new Set([...Object.keys(map1), ...Object.keys(map2)]);
    let mismatchCount = 0;
    let missingCount = 0;

    const updatedFile1 = [...fileContent1];
    const updatedFile2 = [...fileContent2];

    // Clear previous data
    document.getElementById('mismatchBody').innerHTML = '';
    document.getElementById('missingBody').innerHTML = '';
    document.getElementById('mismatchHeader').innerHTML = headers1.map(header => `<th>${header}</th>`).join('');

    allKeys.forEach(key => {
        if (map1[key] && map2[key]) {
            const mismatchedFields = headers1.filter(header => map1[key][header] !== map2[key][header]);
            if (mismatchedFields.length > 0) {
                mismatchCount++;
                const row = document.createElement('tr');
                headers1.forEach(header => {
                    const cell = document.createElement('td');
                    if (mismatchedFields.includes(header)) {
                        cell.textContent = `${map1[key][header]} | ${map2[key][header]}`;
                        cell.classList.add('table-highlight');
                    } else {
                        cell.textContent = map1[key][header];
                    }
                    row.appendChild(cell);
                });
                document.getElementById('mismatchBody').appendChild(row);
            }
        } else if (map1[key]) {
            missingCount++;
            const row = document.createElement('tr');
            row.innerHTML = `<td>${key}</td><td>Present in left but missing in right</td>`;
            document.getElementById('missingBody').appendChild(row);
        } else if (map2[key]) {
            missingCount++;
            const row = document.createElement('tr');
            row.innerHTML = `<td>${key}</td><td>Present in right but missing in left</td>`;
            document.getElementById('missingBody').appendChild(row);
        }
    });

    document.getElementById('summary').innerText = `${mismatchCount} data mismatches, ${missingCount} missing/mismatched rows.`;
}

function syncScroll(sourceId) {
    const otherId = sourceId === 'file1' ? 'file2' : 'file1';
    const source = document.getElementById(sourceId);
    const target = document.getElementById(otherId);
    target.scrollTop = source.scrollTop;
    target.scrollLeft = source.scrollLeft;
}

function highlightRowInFile11(containerId, keyColumn, mismatchedKeys) {
    const contentBox = document.getElementById(containerId);
    const lines = contentBox.innerText.split('\n');
    const updatedLines = lines.map((line, index) => {
        // Skip the header row
        if (index === 0) return line;

        const rowData = line.split(',').map(value => value);
        const key = rowData[headers1.indexOf(keyColumn)];
        
        if (mismatchedKeys.has(key)) {
            return `<span class="highlight">${line}</span>`;
        }
        return line;
    });
    contentBox.innerHTML = updatedLines.join('\n');
}

function highlightRowInFile13(containerId, compoundKeys) {
    const textArea = document.getElementById(containerId);
    const lines = textArea.innerText.split('\n'); // Split content into rows for processing
    const updatedLines = lines.map((line, index) => {
        // Skip the header row (index 0)
        if (index === 0 || line.trim() === '') return line;

        const rowKey = compoundKeys.find(key => line.startsWith(key));
        if (rowKey) {
            return `<span class="highlight">${line}</span>`;
        }
        return line;
    });

    // Update the text area content with highlights
    textArea.innerHTML = updatedLines.join('\n');
}

function highlightRowInFile(containerId, compoundKeys) {
    const textArea = document.getElementById(containerId);
    const lines = textArea.innerText.split('\n'); // Split content into rows for processing
    const updatedLines = lines.map((line, index) => {
        if (index === 0 || line.trim() === '') return line; // Skip header or empty rows

        const rowKey = compoundKeys.find(key => line.startsWith(key));
        if (rowKey) {
            return `<span class="highlight">${line}</span>`; // Highlight mismatched rows
        }
        return line;
    });

    // Update the text area content with highlights
    textArea.innerHTML = updatedLines.join('\n');
}


function compareFiles13() {
    const keyColumn = document.getElementById('keyColumn').value;
    if (!keyColumn) {
        alert('Please select a key column for comparison.');
        return;
    }

    const map1 = Object.fromEntries(parsedFile1.map(row => [row[keyColumn], row]));
    const map2 = Object.fromEntries(parsedFile2.map(row => [row[keyColumn], row]));

    const allKeys = new Set([...Object.keys(map1), ...Object.keys(map2)]);
    let mismatchCount = 0;
    let missingCount = 0;
    const mismatchedKeys = new Set();

    document.getElementById('mismatchBody').innerHTML = '';
    document.getElementById('missingBody').innerHTML = '';
    document.getElementById('mismatchHeader').innerHTML = headers1.map(header => `<th>${header}</th>`).join('');

    allKeys.forEach(key => {
        if (map1[key] && map2[key]) {
            const mismatchedFields = headers1.filter(header => map1[key][header] !== map2[key][header]);
            if (mismatchedFields.length > 0) {
                mismatchCount++;
                mismatchedKeys.add(key);

                const row = document.createElement('tr');
                headers1.forEach(header => {
                    const cell = document.createElement('td');
                    if (mismatchedFields.includes(header)) {
                        cell.textContent = `${map1[key][header]} | ${map2[key][header]}`;
                        cell.classList.add('table-highlight');
                    } else {
                        cell.textContent = map1[key][header];
                    }
                    row.appendChild(cell);
                });
                document.getElementById('mismatchBody').appendChild(row);
            }
        } else if (map1[key]) {
            missingCount++;
            mismatchedKeys.add(key);
            const row = document.createElement('tr');
            row.innerHTML = `<td>${key}</td><td>Present in left but missing in right</td>`;
            document.getElementById('missingBody').appendChild(row);
        } else if (map2[key]) {
            missingCount++;
            mismatchedKeys.add(key);
            const row = document.createElement('tr');
            row.innerHTML = `<td>${key}</td><td>Present in right but missing in left</td>`;
            document.getElementById('missingBody').appendChild(row);
        }
    });

    // Apply highlights to mismatched rows
    highlightRowInFile('file1', keyColumn, mismatchedKeys);
    highlightRowInFile('file2', keyColumn, mismatchedKeys);

    document.getElementById('summary').innerText = `${mismatchCount} data mismatches, ${missingCount} missing/mismatched rows.`;
}

function downloadHTMLReport12() {
    const keyColumn = document.getElementById('keyColumn').value;
    const summaryText = document.getElementById('summary').innerText;
    const mismatchTable = document.getElementById('mismatchTable').outerHTML;
    const missingTable = document.getElementById('missingTable').outerHTML;

    // Construct the HTML content
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Comparison Report</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1, h2 { text-align: center; }
            table { width: 80%; margin: 20px auto; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f0f0f0; }
            .table-highlight { background-color: #ffcccc; }
        </style>
    </head>
    <body>
        <h1>File Comparison Report</h1>
        <p><strong>Key Column Used:</strong> ${keyColumn}</p>
        <p><strong>Summary:</strong> ${summaryText}</p>
        <h2>Data Mismatches</h2>
        ${mismatchTable}
        <h2>Missing Rows</h2>
        ${missingTable}
    </body>
    </html>`;

    // Create a Blob and download link
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'comparison_report.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addNotification("Your action was successfully completed!");
}

function downloadHTMLReport13() {
    const keyColumn = document.getElementById('keyColumn').value;
    const summaryText = document.getElementById('summary').innerText;
    const mismatchTable = document.getElementById('mismatchTable').outerHTML;
    const missingTable = document.getElementById('missingTable').outerHTML;

    // Generate timestamp
    const timestamp = new Date();
    const formattedTimestamp = timestamp.toISOString().replace('T', ' ').split('.')[0]; // Format: YYYY-MM-DD HH:MM:SS
    const fileTimestamp = timestamp.toISOString().replace(/[-:T]/g, '_').split('.')[0]; // For file name: YYYY_MM_DD_HH_MM_SS

    // Get the input file names
    const fileInput1 = document.getElementById('fileInput1').files[0]?.name || 'Not Provided';
    const fileInput2 = document.getElementById('fileInput2').files[0]?.name || 'Not Provided';

    // Generate report file name
    const reportFileName = `comparison_report_${fileTimestamp}.html`;

    // Construct the HTML content
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Comparison Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1, h2 { text-align: center; }
        table { width: 80%; margin: 20px auto; border-collapse: collapse; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background-color: #f0f0f0; }
        .table-highlight { background-color: #ffcccc; }
    </style>
</head>
<body>
    <h1>File Comparison Report</h1>
    <p><strong>Key Column Used:</strong> ${keyColumn}</p>
    <p><strong>Summary:</strong> ${summaryText}</p>
    <p><strong>Report Generated On:</strong> ${formattedTimestamp}</p>
    <p><strong>Report File Name:</strong> ${reportFileName}</p>
    <p><strong>Input File 1:</strong> ${fileInput1}</p>
    <p><strong>Input File 2:</strong> ${fileInput2}</p>
    <h2>Data Mismatches</h2>
    ${mismatchTable}
    <h2>Missing Rows</h2>
    ${missingTable}
</body>
</html>`;

    // Create a Blob and download link
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = reportFileName; // Add timestamp to the file name
    document.body.appendChild(link);
    link.click(); // Automatically trigger the download
    document.body.removeChild(link);
}

function compareFiles14() {
    const keyColumn = document.getElementById('keyColumn').value;
    if (!keyColumn) {
        alert('Please select a key column for comparison.');
        return;
    }

    // Create maps for fast lookup by key
    const map1 = Object.fromEntries(parsedFile1.map(row => [row[keyColumn], row]));
    const map2 = Object.fromEntries(parsedFile2.map(row => [row[keyColumn], row]));

    const allKeys = new Set([...Object.keys(map1), ...Object.keys(map2)]);
    let mismatchCount = 0;
    let missingCount = 0;

    // Dynamically align columns
    const commonHeaders = headers1.filter(header => headers2.includes(header)); // Common columns
    const headerMap1 = Object.fromEntries(commonHeaders.map(header => [header, headers1.indexOf(header)]));
    const headerMap2 = Object.fromEntries(commonHeaders.map(header => [header, headers2.indexOf(header)]));

    // Clear previous data
    document.getElementById('mismatchBody').innerHTML = '';
    document.getElementById('missingBody').innerHTML = '';
    document.getElementById('mismatchHeader').innerHTML = commonHeaders.map(header => `<th>${header}</th>`).join('');

    allKeys.forEach(key => {
        if (map1[key] && map2[key]) {
            const mismatchedFields = commonHeaders.filter(header => {
                const value1 = map1[key][header] || "";
                const value2 = map2[key][header] || "";
                return value1 !== value2;
            });

            if (mismatchedFields.length > 0) {
                mismatchCount++;

                // Create a table row for mismatched data
                const row = document.createElement('tr');
                commonHeaders.forEach(header => {
                    const cell = document.createElement('td');
                    if (mismatchedFields.includes(header)) {
                        cell.textContent = `${map1[key][header]} | ${map2[key][header]}`;
                        cell.classList.add('table-highlight');
                    } else {
                        cell.textContent = map1[key][header] || '';
                    }
                    row.appendChild(cell);
                });
                document.getElementById('mismatchBody').appendChild(row);
            }
        } else if (map1[key]) {
            missingCount++;
            const row = document.createElement('tr');
            row.innerHTML = `<td>${key}</td><td>Present in left but missing in right</td>`;
            document.getElementById('missingBody').appendChild(row);
        } else if (map2[key]) {
            missingCount++;
            const row = document.createElement('tr');
            row.innerHTML = `<td>${key}</td><td>Present in right but missing in left</td>`;
            document.getElementById('missingBody').appendChild(row);
        }
    });

    document.getElementById('summary').innerText = `${mismatchCount} data mismatches, ${missingCount} missing/mismatched rows.`;
}

function compareFiles15() {
    const selectedKeyColumns = getSelectedKeyColumns();
    if (selectedKeyColumns.length === 0) {
        alert('Please select at least one key column for comparison.');
        return;
    }

    // Create maps with compound keys
    const getCompoundKey = (row, keyColumns) => keyColumns.map(col => row[col] || '').join('|');
    const map1 = Object.fromEntries(parsedFile1.map(row => [getCompoundKey(row, selectedKeyColumns), row]));
    const map2 = Object.fromEntries(parsedFile2.map(row => [getCompoundKey(row, selectedKeyColumns), row]));

    const allKeys = new Set([...Object.keys(map1), ...Object.keys(map2)]);
    let mismatchCount = 0;
    let missingCount = 0;

    // Dynamically align columns
    const commonHeaders = headers1.filter(header => headers2.includes(header));
    const headerMap1 = Object.fromEntries(commonHeaders.map(header => [header, headers1.indexOf(header)]));
    const headerMap2 = Object.fromEntries(commonHeaders.map(header => [header, headers2.indexOf(header)]));

    // Clear previous data
    document.getElementById('mismatchBody').innerHTML = '';
    document.getElementById('missingBody').innerHTML = '';
    document.getElementById('mismatchHeader').innerHTML = commonHeaders.map(header => `<th>${header}</th>`).join('');

    allKeys.forEach(key => {
        if (map1[key] && map2[key]) {
            const mismatchedFields = commonHeaders.filter(header => {
                const value1 = map1[key][header] || "";
                const value2 = map2[key][header] || "";
                return value1 !== value2;
            });

            if (mismatchedFields.length > 0) {
                mismatchCount++;

                // Create a table row for mismatched data
                const row = document.createElement('tr');
                commonHeaders.forEach(header => {
                    const cell = document.createElement('td');
                    if (mismatchedFields.includes(header)) {
                        cell.textContent = `${map1[key][header]} | ${map2[key][header]}`;
                        cell.classList.add('table-highlight');
                    } else {
                        cell.textContent = map1[key][header] || '';
                    }
                    row.appendChild(cell);
                });
                document.getElementById('mismatchBody').appendChild(row);
            }
        } else if (map1[key]) {
            missingCount++;
            const row = document.createElement('tr');
            row.innerHTML = `<td>${key}</td><td>Present in left but missing in right</td>`;
            document.getElementById('missingBody').appendChild(row);
        } else if (map2[key]) {
            missingCount++;
            const row = document.createElement('tr');
            row.innerHTML = `<td>${key}</td><td>Present in right but missing in left</td>`;
            document.getElementById('missingBody').appendChild(row);
        }
    });

    document.getElementById('summary').innerText = `${mismatchCount} data mismatches, ${missingCount} missing/mismatched rows.`;
}

function compareFiles() {
    const selectedKeyColumns = getSelectedKeyColumns();
    if (selectedKeyColumns.length === 0) {
        alert('Please select at least one key column for comparison.');
        return;
    }

    // Create compound keys
    const getCompoundKey = (row, keyColumns) => keyColumns.map(col => row[col] || '').join('|');
    const map1 = Object.fromEntries(parsedFile1.map(row => [getCompoundKey(row, selectedKeyColumns), row]));
    const map2 = Object.fromEntries(parsedFile2.map(row => [getCompoundKey(row, selectedKeyColumns), row]));

    const allKeys = new Set([...Object.keys(map1), ...Object.keys(map2)]);
    const mismatchedKeys = [];
    let mismatchCount = 0;
    let missingCount = 0;

    // Prepare common headers for comparison
    const commonHeaders = headers1.filter(header => headers2.includes(header));

    // Clear previous data
    document.getElementById('mismatchBody').innerHTML = '';
    document.getElementById('missingBody').innerHTML = '';
    document.getElementById('mismatchHeader').innerHTML = commonHeaders.map(header => `<th>${header}</th>`).join('');

    // Compare files based on compound keys
    allKeys.forEach(key => {
        if (map1[key] && map2[key]) {
            const mismatchedFields = commonHeaders.filter(header => {
                const value1 = map1[key][header] || '';
                const value2 = map2[key][header] || '';
                return value1 !== value2;
            });

            if (mismatchedFields.length > 0) {
                mismatchCount++;
                mismatchedKeys.push(key);

                const row = document.createElement('tr');
                commonHeaders.forEach(header => {
                    const cell = document.createElement('td');
                    if (mismatchedFields.includes(header)) {
                        cell.textContent = `${map1[key][header]} | ${map2[key][header]}`;
                        cell.classList.add('table-highlight');
                    } else {
                        cell.textContent = map1[key][header] || '';
                    }
                    row.appendChild(cell);
                });
                document.getElementById('mismatchBody').appendChild(row);
            }
        } else if (map1[key]) {
            missingCount++;
            mismatchedKeys.push(key);
            const row = document.createElement('tr');
            row.innerHTML = `<td>${key}</td><td>Present in left but missing in right</td>`;
            document.getElementById('missingBody').appendChild(row);
        } else if (map2[key]) {
            missingCount++;
            mismatchedKeys.push(key);
            const row = document.createElement('tr');
            row.innerHTML = `<td>${key}</td><td>Present in right but missing in left</td>`;
            document.getElementById('missingBody').appendChild(row);
        }
    });

    // Apply row highlights for mismatched keys
    highlightRowInFile('file1', mismatchedKeys);
    highlightRowInFile('file2', mismatchedKeys);

    document.getElementById('summary').innerText = `${mismatchCount} data mismatches, ${missingCount} missing/mismatched rows.`;
}


function downloadHTMLReport14() {
    const selectedKeyColumns = getSelectedKeyColumns(); // Fetch all selected key columns
    if (selectedKeyColumns.length === 0) {
        alert('Please select at least one key column.');
        return;
    }

    const summaryText = document.getElementById('summary').innerText;
    const mismatchTable = document.getElementById('mismatchTable').outerHTML;
    const missingTable = document.getElementById('missingTable').outerHTML;

    // Generate timestamp
    const timestamp = new Date();
    const formattedTimestamp = timestamp.toISOString().replace('T', ' ').split('.')[0]; // Format: YYYY-MM-DD HH:MM:SS
    const fileTimestamp = timestamp.toISOString().replace(/[-:T]/g, '_').split('.')[0]; // For file name: YYYY_MM_DD_HH_MM_SS

    // Get the input file names
    const fileInput1 = document.getElementById('fileInput1').files[0]?.name || 'Not Provided';
    const fileInput2 = document.getElementById('fileInput2').files[0]?.name || 'Not Provided';

    // Generate report file name
    const reportFileName = `comparison_report_${fileTimestamp}.html`;

    // Create HTML content for the report
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Comparison Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1, h2 { text-align: center; }
        table { width: 80%; margin: 20px auto; border-collapse: collapse; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background-color: #f0f0f0; }
        .table-highlight { background-color: #ffcccc; }
    </style>
</head>
<body>
    <h1>File Comparison Report</h1>
    <p><strong>Key Columns Used:</strong> ${selectedKeyColumns.join(', ')}</p>
    <p><strong>Summary:</strong> ${summaryText}</p>
    <p><strong>Report Generated On:</strong> ${formattedTimestamp}</p>
    <p><strong>Report File Name:</strong> ${reportFileName}</p>
    <p><strong>Input File 1:</strong> ${fileInput1}</p>
    <p><strong>Input File 2:</strong> ${fileInput2}</p>
    <h2>Data Mismatches</h2>
    ${mismatchTable}
    <h2>Missing Rows</h2>
    ${missingTable}
</body>
</html>`;

    // Create a Blob and download link
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = reportFileName; // Add timestamp to the file name
    document.body.appendChild(link);
    link.click(); // Automatically trigger the download
    document.body.removeChild(link);
}


function downloadHTMLReport() {
    const selectedKeyColumns = getSelectedKeyColumns();
    if (selectedKeyColumns.length === 0) {
        alert('Please select at least one key column.');
        return;
    }

    const summaryText = document.getElementById('summary').innerText;
    const mismatchTable = document.getElementById('mismatchTable').outerHTML;
    const missingTable = document.getElementById('missingTable').outerHTML;

    const timestamp = new Date();
    const formattedTimestamp = timestamp.toISOString().replace('T', ' ').split('.')[0];
    const fileTimestamp = timestamp.toISOString().replace(/[-:T]/g, '_').split('.')[0];

    const fileInput1 = document.getElementById('fileInput1').files[0]?.name || 'Not Provided';
    const fileInput2 = document.getElementById('fileInput2').files[0]?.name || 'Not Provided';

    const reportFileName = `comparison_report_${fileTimestamp}.html`;

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Comparison Report</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1, h2 { text-align: center; }
                table { width: 80%; margin: 20px auto; border-collapse: collapse; }
                th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                th { background-color: #f0f0f0; }
                .table-highlight { background-color: #ffcccc; }
            </style>
        </head>
        <body>
            <h1>File Comparison Report</h1>
            <p><strong>Key Columns Used:</strong> ${selectedKeyColumns.join(', ')}</p>
            <p><strong>Summary:</strong> ${summaryText}</p>
            <p><strong>Report Generated On:</strong> ${formattedTimestamp}</p>
            <p><strong>Report File Name:</strong> ${reportFileName}</p>
            <p><strong>Input File 1:</strong> ${fileInput1}</p>
            <p><strong>Input File 2:</strong> ${fileInput2}</p>
            <h2>Data Mismatches</h2>
            ${mismatchTable}
            <h2>Missing Rows</h2>
            ${missingTable}
        </body>
        </html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = reportFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addNotification("Comparison Report Downloaded !");
}


function loadFile(fileNumber) {
    const fileInput = document.getElementById(`fileInput${fileNumber}`);
    const reader = new FileReader();

    reader.onload = function (event) {
        let content = event.target.result.trim();
        const isXML = fileInput.files[0]?.name.endsWith('.xml');
        const isPSV = fileInput.files[0]?.name.endsWith('.psv');

        if (isPSV) {
            // Convert PSV to CSV by replacing "|" with ","
            content = content.replace(/\|/g, ',');
        }

        if (isXML) {
            // Convert XML to CSV
            const csvContent = convertXMLToCSV(content);
            content = csvContent; // Use the converted CSV content
        }

        const lines = content.split('\n'); // Split into rows
        const headers = lines[0].split(',').map(header => header.trim());
        const parsedData = lines.slice(1).map(row => {
            const values = row.split(',').map(value => value.trim());
            while (values.length < headers.length) {
                values.push("");
            }
            return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
        });

        // Display the content in the text area
        const formattedContent = lines.join('\n');

        if (fileNumber === 1) {
            fileContent1 = lines;
            headers1 = headers;
            parsedFile1 = parsedData;
            document.getElementById('file1').innerText = formattedContent;
        } else {
            fileContent2 = lines;
            headers2 = headers;
            parsedFile2 = parsedData;
            document.getElementById('file2').innerText = formattedContent;
        }
        console.log("***********************************");
        console.log(headers1);
        console.log(headers2);
        console.log("***********************************");
        populateKeyColumnDropdown(); // Populate the dropdown with headers
    };

    if (fileInput.files.length > 0) {
        reader.readAsText(fileInput.files[0]); // Read the file content
    }
}

function convertXMLToCSV(xmlContent) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, "application/xml");
    const rows = Array.from(xmlDoc.getElementsByTagName('row')); // Assuming "row" is the XML row tag
    const headers = new Set();

    // Extract all unique headers
    rows.forEach(row => {
        Array.from(row.children).forEach(child => {
            headers.add(child.tagName);
        });
    });

    const headerArray = Array.from(headers);
    const csvRows = [];

    // Add headers to CSV
    csvRows.push(headerArray.join(','));

    // Add row data
    rows.forEach(row => {
        const rowData = headerArray.map(header => {
            const element = row.getElementsByTagName(header)[0];
            return element ? element.textContent.trim() : ''; // Extract text or leave blank
        });
        csvRows.push(rowData.join(','));
    });

    return csvRows.join('\n');
}


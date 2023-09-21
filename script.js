function compareFiles() {
    const xmlFileInput = document.getElementById('xmlFileInput');
    const excelFileInput = document.getElementById('excelFileInput');
    const resultDiv = document.getElementById('result');

    const xmlFile = xmlFileInput.files[0];
    const excelFile = excelFileInput.files[0];

    if (!xmlFile || !excelFile) {
        resultDiv.innerHTML = 'Please select both XML and Excel files.';
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
        const xmlText = event.target.result;

        // Here, you can use JavaScript libraries like 'xlsx' for Excel parsing
        // and 'DOMParser' for XML parsing to replicate the functionality of the Java code.
        // Due to the complexity of Excel parsing, using a library like 'xlsx' is recommended.

        // Sample code for parsing XML using DOMParser:
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

        // Sample code for comparing data from Excel and XML
        const xmlData = xmlDoc.getElementsByTagName('your_element_name');
        const excelData = ['Data1', 'Data2', 'Data3']; // Example Excel data

        let assertionFailed = false;

        for (let i = 0; i < excelData.length; i++) {
            if (excelData[i] !== xmlData[i].textContent) {
                assertionFailed = true;
                break;
            }
        }

        if (assertionFailed) {
            resultDiv.innerHTML = 'Assertion failed: Data does not match.';
        } else {
            resultDiv.innerHTML = 'Data matches!';
        }
    };

    reader.readAsText(xmlFile);
}

document.getElementById('compareButton').addEventListener('click', compareFiles);
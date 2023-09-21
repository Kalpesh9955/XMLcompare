document.getElementById('compareButton').addEventListener('click', function () {
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

    reader.onload = function (event) {
        const xmlText = event.target.result;

        // Parse Excel file using xlsx library
        const excelData = XLSX.read(event.target.result, { type: 'binary' });

        // Access data from the first sheet (assuming it's the only sheet)
        const sheetName = excelData.SheetNames[0];
        const sheet = excelData.Sheets[sheetName];

        // Sample code for comparing data from Excel and XML
        const xmlData = xmlDoc.getElementsByTagName('your_element_name');
        const excelDataFromSheet = XLSX.utils.sheet_to_json(sheet);

        let assertionFailed = false;

        for (let i = 0; i < excelDataFromSheet.length; i++) {
            if (excelDataFromSheet[i]['ColumnHeader'] !== xmlData[i].textContent) {
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

    reader.readAsBinaryString(excelFile); // Read Excel file as binary
});

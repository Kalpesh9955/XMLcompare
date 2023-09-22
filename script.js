let xmlData;
let excelData;

function parseXML(file) {
    const reader = new FileReader();

    reader.onload = function(e) {
        const xmlString = e.target.result;
        const parser = new DOMParser();
        xmlData = parser.parseFromString(xmlString, "text/xml");
    };

    reader.readAsText(file);
}

function parseExcel(file) {
    const reader = new FileReader();

    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        excelData = XLSX.utils.sheet_to_json(sheet);
    };

    reader.readAsArrayBuffer(file);
}

function compareFiles() {
    const xmlFile = document.getElementById('xmlFile').files[0];
    const excelFile = document.getElementById('excelFile').files[0];

    if (!xmlFile || !excelFile) {
        alert("Both files are required for comparison.");
        return;
    }

    parseXML(xmlFile);
    parseExcel(excelFile);

    setTimeout(() => {  // Simple way to wait for async operations, better to use Promise
        let result = 'Comparison Results:<br>';

        const foodFromXml = xmlData.getElementsByTagName('food')[0];
        const foodFromExcel = excelData[0];

        if (foodFromExcel.name !== foodFromXml.getElementsByTagName('name')[0].textContent) {
            result += 'Name does not match!<br>';
        }
        if (foodFromExcel.price !== foodFromXml.getElementsByTagName('price')[0].textContent) {
            result += 'Price does not match!<br>';
        }
        // Continue with other comparisons...

        document.getElementById('results').innerHTML = result;
    }, 1000);  // Assuming it won't take more than 1 second to parse files
}

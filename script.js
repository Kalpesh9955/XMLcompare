function parseXML(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function(e) {
            const xmlString = e.target.result;
            const parser = new DOMParser();
            const data = parser.parseFromString(xmlString, "text/xml");
            resolve(data);
        };

        reader.onerror = function(e) {
            reject("Error reading XML file.");
        };

        reader.readAsText(file);
    });
}

function parseExcel(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            resolve(jsonData);
        };

        reader.onerror = function(e) {
            reject("Error reading Excel file.");
        };

        reader.readAsArrayBuffer(file);
    });
}

function compareFiles() {
    const xmlFile = document.getElementById('xmlFile').files[0];
    const excelFile = document.getElementById('excelFile').files[0];

    if (!xmlFile || !excelFile) {
        alert("Both files are required for comparison.");
        return;
    }

    Promise.all([parseXML(xmlFile), parseExcel(excelFile)])
    .then(([xml, excel]) => {
        let result = 'Comparison Results:<br>';

        const foodFromXml = xml.getElementsByTagName('food')[0];
        const foodFromExcel = excel[0];

        if (foodFromExcel.name !== foodFromXml.getElementsByTagName('name')[0].textContent) {
            result += 'Name does not match!<br>';
        }
        if (foodFromExcel.price !== foodFromXml.getElementsByTagName('price')[0].textContent) {
            result += 'Price does not match!<br>';
        }
        // Continue with other comparisons...

        document.getElementById('results').innerHTML = result;
    })
    .catch(error => {
        console.error("An error occurred:", error);
    });
}

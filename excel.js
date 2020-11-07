document.getElementById("input-excel-file").addEventListener("change", readExcel, false)
let root = document.getElementById("root");

function readExcel() {
    let input = event.target;
    let reader = new FileReader();
    reader.onload = function () {
        let data = reader.result;
        let workBook = XLSX.read(data, { type: 'binary' });
        workBook.SheetNames.forEach(function (sheetName) {
            console.log('SheetName: ' + sheetName);
            let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
            console.log(rows, typeof rows)
            // console.log(JSON.stringify(rows));
            // et excel = JSON.stringify(rows);
            parseUrl(rows);
        })
    };
    reader.readAsBinaryString(input.files[0]);
}

function parseUrl(rows) {
    console.log(rows)
    rows.forEach ((row) =>
        appendImageComponent(row["images"])
    );
}

function appendImageComponent(url) {
    let elem = document.createElement("img");
    elem.setAttribute("src", url);
    elem.setAttribute("style", "border: 1px; border-style: solid; border-color: black; height: auto; width: auto; max-width: 500px; max-height: 500px");
    root.appendChild(elem);
}
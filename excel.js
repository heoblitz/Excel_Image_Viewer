document.getElementById("input-excel-file").addEventListener("change", readExcel, false)
let root = document.getElementById("root");
let table = document.getElementsByClassName("item-table")[0];

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
    console.log(rows);

    rows.forEach (function(row) {
        img = prepareImageCell(row["images"])
        text1 = prepareTextCell(row["texts"])
        text2 = prepareTextCell(row["texts2"])
        
        table.appendChild(prepareTableRow([img, text1, text2]))
    })
}

function prepareTableRow(elems) {
    let tableRow = document.createElement("div");
    tableRow.setAttribute("class", "item-table-row");

    elems.forEach ((elem) =>
        tableRow.appendChild(elem)
    )

    return tableRow;
}

function prepareImageCell(url) {
    let imgElem = document.createElement("img");
    imgElem.setAttribute("src", url);
    imgElem.setAttribute("class", "item-image");
 
    let tableCell = document.createElement("div");
    tableCell.className = "item-cell";
    tableCell.appendChild(imgElem);

    return tableCell;
}

function prepareTextCell(text) {
    let textElem = document.createElement("p");
    textElem.setAttribute("class", "item-text");
    textElem.innerHTML = text

    let tableCell = document.createElement("div");
    tableCell.className = "item-cell";
    tableCell.appendChild(textElem);

    return tableCell;
}
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

    rows.every (function(row) {
        let imagesData = row["images"];
        let textsData = row["texts"];
        let texts2Data = row["texts2"];

        if (isTextNull(imagesData) || isTextNull(textsData) || isTextNull(texts2Data)) {
            alertWarning();
            return false;
        }

        img = prepareImageCell(imagesData);
        text1 = prepareTextCell(textsData);
        text2 = prepareTextCell(texts2Data);
        
        table.appendChild(prepareTableRow([img, text1, text2]));
        return true;
    })
}

function prepareTableRow(elems) {
    let tableRow = document.createElement("div");
    tableRow.setAttribute("class", "item-table-row");

    elems.forEach((elem) =>
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

function isTextNull(cellData) {
    if(typeof cellData == "undefined" || cellData == null || cellData == "") {
        return true
    }

    return false
}

function alertWarning() {
    alert("엑셀 파일을 확인해주세요.")
}
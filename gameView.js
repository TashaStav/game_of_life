export function renderField(field, container) {
    container.innerHTML = '';
    const rows = field.length;
    const cols = field[0].length;
    for (let i = 0; i < rows; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        for (let j = 0; j < cols; j++) {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.dataset.x = j.toString();
            cellDiv.dataset.y = i.toString();
            if (field[i][j] === 1) {
                cellDiv.classList.add('alive');
            }
            else {
                cellDiv.classList.add('dead');
            }
            rowDiv.appendChild(cellDiv);
        }
        container.appendChild(rowDiv);
    }
}
//# sourceMappingURL=gameView.js.map
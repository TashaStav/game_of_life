export function createEmptyField(rows, cols) {
    const field = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(0);
        }
        field.push(row);
    }
    return field;
}
//# sourceMappingURL=gameField.js.map
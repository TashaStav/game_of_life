import { countAliveNeighbors } from './game.js';
import { getNextGeneration } from './game.js';
describe('countAliveNeighbors', () => {
    const field = [
        [1, 0, 1],
        [0, 1, 0],
        [0, 0, 1],
        [0, 0, 0],
    ];
    it('should counts alive neighbors correctly for cell in the middle', () => {
        const res = countAliveNeighbors(field, 1, 1);
        expect(res).toBe(3);
    });
    it('should counts alive neighbors correctly for cell in corner', () => {
        const res = countAliveNeighbors(field, 0, 0);
        expect(res).toBe(1);
    });
    it('should counts alive neighbors correctly for cell with no alive neighbors', () => {
        const res = countAliveNeighbors(field, 3, 0);
        expect(res).toBe(0);
    });
});
describe('getNextGeneration', () => {
    it('calculate the next generation according to the given grid', () => {
        const field = [
            [1, 0, 1],
            [0, 1, 0],
            [0, 0, 1],
        ];
        const newField = [
            [0, 1, 0],
            [0, 1, 1],
            [0, 0, 0],
        ];
        const res = getNextGeneration(field);
        expect(res).toEqual(newField);
    });
    it('should return correct next generation for fully alive grid', () => {
        const field = [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
        ];
        const newField = [
            [1, 0, 1],
            [0, 0, 0],
            [1, 0, 1],
        ];
        const res = getNextGeneration(field);
        expect(res).toEqual(newField);
    });
    it('should handle single row grid correctly', () => {
        const field = [[1, 1, 1]];
        const newField = [[0, 1, 0]];
        const res = getNextGeneration(field);
        expect(res).toEqual(newField);
    });
});
//# sourceMappingURL=game.test.js.map
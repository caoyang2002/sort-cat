import { BASES } from "@/model/base";

export function calculateScore(matchResult: number[][]): number {
    let totalScore = 0;
    for (let row = 0; row < matchResult.length; row++) {
        let rowScore = 0;
        let fullMatch = true;
        for (let col = 0; col < matchResult[row].length; col++) {
            if (matchResult[row][col] === 1) {
                rowScore += 1;
            } else {
                fullMatch = false;
            }
        }
        if (fullMatch) {
            rowScore += 2;
        }
        totalScore += rowScore;
    }
    return totalScore;
}

export function matchBoard(board: string[][], targets: string[]): number[][] {
    const rows = board.length;
    const cols = board[0].length;
    const matchResult: number[][] = Array.from({ length: rows }, () =>
        Array(cols).fill(0)
    );

    const rowTargetMap = new Map<number, Set<string>>();
    targets.forEach((target) => {
        for (let i = 0; i < target.length; i++) {
            if (target[i] !== "#") {
                if (!rowTargetMap.has(i)) {
                    rowTargetMap.set(i, new Set());
                }
                rowTargetMap.get(i)!.add(target[i]);
            }
        }
    });

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const char = board[row][col];
            if (rowTargetMap.has(row) && rowTargetMap.get(row)!.has(char)) {
                matchResult[row][col] = 1;
            }
        }
    }

    return matchResult;
}

export function generateRandomTarget(rows: number): string {
    const bases = BASES.filter((base) => base !== " ");
    return Array.from(
        { length: rows },
        () => bases[Math.floor(Math.random() * bases.length)]
    ).join("");
}

export function generateRandomBoard(rows: number, cols: number): string[][] {
    return Array.from({ length: rows }, () =>
        Array.from(
            { length: cols },
            () => BASES[Math.floor(Math.random() * BASES.length)]
        )
    );
}
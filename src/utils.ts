/**
 * Generates a direct Chess.com analysis link from a FEN string.
 *
 * @param fen - The raw FEN string (e.g., "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1")
 * @returns The formatted Chess.com URL
 */
export const getChessComAnalysisUrl = (fen: string): string => {
    if (!fen) {
        return "https://www.chess.com/analysis";
    }

    return `https://www.chess.com/analysis?fen=${encodeURI(fen)}`;
};
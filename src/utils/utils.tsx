export const mostPlayedPosition = (positions: any) => {
    if (positions == undefined) return { position: null, count: 0 };
    if (!positions.length) return { position: null, count: 0 };
    
    return positions.reduce((acc: any, position: any) => {
        const count = positions.filter((p: any) => p === position).length;
        return count > acc.count ? { position, count } : acc;
    }, { position: null, count: 0 });
}

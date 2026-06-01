const fs = require('fs');
const svg = fs.readFileSync('public/signature.svg', 'utf8');
const paths = [...svg.matchAll(/d="([^"]+)"/g)].map(m => m[1]);
const transforms = [...svg.matchAll(/transform="translate\(([^,]+),([^)]+)\)"/g)];

let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

for (let j = 0; j < paths.length; j++) {
    const pathStr = paths[j];
    const transMatch = transforms[j];
    let tx = 0, ty = 0;
    if (transMatch) {
        tx = parseFloat(transMatch[1]);
        ty = parseFloat(transMatch[2]);
    }

    const coords = [...pathStr.matchAll(/(-?\d+(\.\d+)?)/g)].map(m => parseFloat(m[0]));
    for (let i = 0; i < coords.length; i += 2) {
        const x = coords[i] + tx;
        const y = coords[i+1] + ty;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
    }
}
console.log(`BBOX: ${minX} ${minY} ${maxX - minX} ${maxY - minY}`);

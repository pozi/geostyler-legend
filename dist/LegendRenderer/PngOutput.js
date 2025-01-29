import AbstractOutput from './AbstractOutput';
const ROOT_CLASS = 'geostyler-legend-renderer';
function cssDimensionToPx(dimension) {
    if (typeof dimension === 'number') {
        return dimension;
    }
    const div = document.createElement('div');
    document.body.append(div);
    div.style.height = dimension;
    const height = parseFloat(getComputedStyle(div).height.replace(/px$/, ''));
    div.remove();
    return height;
}
export default class PngOutput extends AbstractOutput {
    target;
    canvas;
    context;
    constructor(size, maxColumnWidth, maxColumnHeight, target) {
        super(size, maxColumnWidth, maxColumnHeight);
        this.target = target;
        this.createCanvas(...size);
    }
    useContainer(title) { }
    useRoot() { }
    addTitle(text, x, y) {
        this.context.fillText(text, cssDimensionToPx(x), cssDimensionToPx(y));
    }
    addLabel(text, x, y) {
        this.context.fillText(text, cssDimensionToPx(x), cssDimensionToPx(y));
    }
    async addImage(dataUrl, imgWidth, imgHeight, x, y, drawRect) {
        const xPx = cssDimensionToPx(x);
        const yPx = cssDimensionToPx(y);
        this.expandHeight(yPx + imgHeight);
        const image = new Image();
        const imageLoaded = new Promise(resolve => image.onload = resolve);
        image.src = dataUrl;
        await imageLoaded;
        this.context.drawImage(image, xPx, yPx, imgWidth, imgHeight);
        if (drawRect) {
            this.context.strokeStyle = '1px solid black';
            this.context.strokeRect(xPx, yPx, imgWidth, imgHeight);
        }
    }
    generate(finalHeight) {
        return this.canvas;
    }
    createCanvas(width, height) {
        this.canvas = document.createElement('canvas');
        this.canvas.className = ROOT_CLASS;
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d');
        this.context.font = '14px sans-serif';
        if (this.target) {
            this.target.querySelectorAll(`.${ROOT_CLASS}`).forEach(e => e.remove());
            this.target.append(this.canvas);
        }
    }
    expandHeight(newHeight) {
        if (this.canvas.height >= newHeight) {
            return;
        }
        const oldCanvas = this.canvas;
        this.createCanvas(this.canvas.width, newHeight);
        this.context.drawImage(oldCanvas, 0, 0);
    }
}
//# sourceMappingURL=PngOutput.js.map
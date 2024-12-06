import AbstractOutput from './AbstractOutput';
export default class PngOutput extends AbstractOutput {
    private target?;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    constructor(size: [number, number], maxColumnWidth: number | null, maxColumnHeight: number | null, target?: HTMLElement | undefined);
    useContainer(title: string): void;
    useRoot(): void;
    addTitle(text: string, x: number | string, y: number | string): void;
    addLabel(text: string, x: number | string, y: number | string): void;
    addImage(dataUrl: string, imgWidth: number, imgHeight: number, x: number | string, y: number | string, drawRect: boolean): Promise<void>;
    generate(finalHeight: number): HTMLCanvasElement;
    private createCanvas;
    private expandHeight;
}

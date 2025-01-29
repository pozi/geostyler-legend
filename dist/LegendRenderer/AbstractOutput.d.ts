declare abstract class AbstractOutput {
    protected size: [number, number];
    protected maxColumnWidth: number | null;
    protected maxColumnHeight: number | null;
    protected constructor(size: [number, number], maxColumnWidth: number | null, maxColumnHeight: number | null);
    abstract useContainer(title: string): void;
    abstract useRoot(): void;
    abstract addTitle(text: string, x: number | string, y: number | string): void;
    abstract addLabel(text: string, x: number | string, y: number | string): void;
    abstract addImage(dataUrl: string, imgWidth: number, imgHeight: number, x: number | string, y: number | string, drawRect: boolean): Promise<void>;
    abstract generate(finalHeight: number): Element;
}
export default AbstractOutput;

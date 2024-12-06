import { Selection } from 'd3-selection';
import AbstractOutput from './AbstractOutput';
export default class SvgOutput extends AbstractOutput {
    root: Selection<SVGSVGElement, unknown, null, undefined> | null | undefined;
    currentContainer: Selection<SVGGElement, unknown, null, undefined> | null | undefined;
    constructor(size: [number, number], maxColumnWidth: number | undefined, maxColumnHeight: number | undefined, target?: HTMLElement);
    useContainer(title: string): void;
    useRoot(): void;
    addTitle(text: string, x: number | string, y: number | string): void;
    addLabel(text: string, x: number | string, y: number | string): void;
    addImage(dataUrl: string, imgWidth: number, imgHeight: number, x: number | string, y: number | string, drawRect: boolean): Promise<void>;
    generate(finalHeight: number): SVGElement;
    /**
     * Shortens the labels if they overflow.
     * @param {Selection} nodes the legend item group nodes
     * @param {number} maxWidth the maximum column width
     */
    private shortenLabels;
}

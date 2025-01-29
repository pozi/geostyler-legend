import OlGeometry from 'ol/geom/Geometry';
import { Style, Symbolizer, Rule } from 'geostyler-style/dist/style';
import AbstractOutput from './AbstractOutput';
interface LegendItemConfiguration {
    rule?: Rule;
    title: string;
}
interface LegendConfiguration {
    items: LegendItemConfiguration[];
    title: string;
}
interface RemoteLegend {
    url: string;
    title: string;
}
interface LegendsConfiguration {
    styles?: Style[];
    configs?: LegendItemConfiguration[];
    remoteLegends?: RemoteLegend[];
    size: [number, number];
    maxColumnHeight?: number;
    maxColumnWidth?: number;
    overflow?: 'auto' | 'group';
    hideRect?: boolean;
}
/**
 * A class that can be used to render legends as images.
 */
export declare class LegendRenderer {
    config: LegendsConfiguration | null;
    /**
     * Constructs a new legend renderer.
     * @param {LegendsConfiguration} config the legend configuration
     */
    constructor(config: LegendsConfiguration);
    /**
     * Constructs a legend configuration from a geostyler style object.
     * @param {Style} style a geostyler style
     */
    extractConfigFromStyle(style: Style): LegendConfiguration;
    /**
     * Renders a single legend item.
     * @param {AbstractOutput} output
     * @param {LegendItemConfiguration} item configuration of the legend item
     * @param {[number, number]} position the current position
     */
    renderLegendItem(output: AbstractOutput, item: LegendItemConfiguration, position: [number, number]): Promise<void | undefined> | undefined;
    /**
     * Constructs a geometry for rendering a specific symbolizer.
     * @param {Symbolizer} symbolizer the symbolizer object
     */
    getGeometryForSymbolizer(symbolizer: Symbolizer): OlGeometry;
    /**
     * Returns a promise resolving to a data uri with the appropriate rule icon.
     * @param {Object} rule the geostyler rule
     */
    getRuleIcon(rule: Rule): Promise<string>;
    /**
     * Render a single legend.
     * @param {LegendConfiguration} config the legend config
     * @param {AbstractOutput} output
     * @param {[number, number]} position the current position
     */
    renderLegend(config: LegendConfiguration, output: AbstractOutput, position: [number, number]): Promise<void> | undefined;
    /**
     * Render all images given by URL and append them to the legend
     * @param {RemoteLegend[]} remoteLegends the array of remote legend objects
     * @param {AbstractOutput} output
     * @param {[number, number]} position the current position
     */
    renderImages(remoteLegends: RemoteLegend[], output: AbstractOutput, position: [number, number]): Promise<void>;
    renderAsImage(format?: 'svg' | 'png', target?: HTMLElement): Promise<Element>;
    /**
     * Renders the configured legend as an SVG or PNG image in the given target container. All pre-existing legends
     * will be removed.
     * @param {HTMLElement} target a node to append the svg to
     * @param format
     * @return {SVGSVGElement} The final SVG legend
     */
    render(target: HTMLElement, format?: 'svg' | 'png'): Promise<void>;
}
export default LegendRenderer;

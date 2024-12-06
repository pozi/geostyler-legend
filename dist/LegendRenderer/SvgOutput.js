import { select } from 'd3-selection';
import AbstractOutput from './AbstractOutput';
const ROOT_CLASS = 'geostyler-legend-renderer';
export default class SvgOutput extends AbstractOutput {
    root = null;
    currentContainer = null;
    constructor(size, maxColumnWidth, maxColumnHeight, target) {
        super(size, maxColumnWidth || 0, maxColumnHeight || 0);
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.root = select(svg)
            .attr('class', ROOT_CLASS)
            .attr('viewBox', `0 0 ${size[0]} ${size[1]}`)
            .attr('top', 0)
            .attr('left', 0)
            .attr('width', size[0])
            .attr('height', size[1]);
        this.currentContainer = this.root;
        if (target) {
            select(target).select(`.${ROOT_CLASS}`).remove();
            target.append(this.root.node());
        }
    }
    useContainer(title) {
        this.currentContainer = this.root?.append('g')
            .attr('class', 'legend-item')
            .attr('title', title);
    }
    ;
    useRoot() {
        this.currentContainer = this.root;
    }
    addTitle(text, x, y) {
        this.currentContainer?.append('g').append('text')
            .text(text)
            .attr('class', 'legend-title')
            .attr('text-anchor', 'start')
            .attr('dx', x)
            .attr('dy', y);
    }
    ;
    addLabel(text, x, y) {
        this.currentContainer?.append('text')
            .text(text)
            .attr('x', x)
            .attr('y', y);
    }
    ;
    addImage(dataUrl, imgWidth, imgHeight, x, y, drawRect) {
        if (drawRect) {
            this.currentContainer?.append('rect')
                .attr('x', x)
                .attr('y', y)
                .attr('width', imgWidth)
                .attr('height', imgHeight)
                .style('fill-opacity', 0)
                .style('stroke', 'black');
        }
        this.currentContainer?.append('svg:image')
            .attr('x', x)
            .attr('y', y)
            .attr('width', imgWidth)
            .attr('height', imgHeight)
            .attr('href', dataUrl);
        this.root?.attr('xmlns', 'http://www.w3.org/2000/svg');
        return Promise.resolve();
    }
    ;
    generate(finalHeight) {
        const nodes = this.root?.selectAll('g.legend-item');
        this.shortenLabels(nodes, this.maxColumnWidth || 0);
        if (!this.maxColumnHeight) {
            this.root
                ?.attr('viewBox', `0 0 ${this.size[0]} ${finalHeight}`)
                .attr('height', finalHeight);
        }
        return this.root?.node();
    }
    /**
     * Shortens the labels if they overflow.
     * @param {Selection} nodes the legend item group nodes
     * @param {number} maxWidth the maximum column width
     */
    shortenLabels(nodes, maxWidth) {
        nodes?.each(function () {
            const node = select(this);
            const text = node.select('text');
            if (!(node.node() instanceof SVGElement) || !text.size()) {
                return;
            }
            const elem = (text.node());
            let width = elem.getBoundingClientRect().width;
            let adapted = false;
            while (width > maxWidth) {
                let str = text.text();
                str = str.substring(0, str.length - 1);
                text.text(str);
                width = elem.getBoundingClientRect().width;
                adapted = true;
            }
            if (adapted) {
                let str = text.text();
                str = str.substring(0, str.length - 3);
                text.text(str + '...');
            }
        });
    }
}
//# sourceMappingURL=SvgOutput.js.map
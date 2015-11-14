/* ng-FitText.js v3.3.3
 * https://github.com/patrickmarabeas/ng-FitText.js
 *
 * Original jQuery project: https://github.com/davatron5000/FitText.js
 *
 * Copyright 2015, Patrick Marabeas http://marabeas.io
 * Released under the MIT license
 * http://opensource.org/licenses/mit-license.php
 *
 * Date: 06/05/2015
 */

import {Component, View, Directive, Inject, Input, Attribute, AfterViewInit, ElementRef, bootstrap} from 'angular2/angular2';


@Directive({
    selector: '[fittext]',
    properties: ['compressor: fittext'],
    host: {
        '(window:resize)': 'onResize($event)'
    },
})
export class FitText implements AfterViewInit {
    element: HTMLElement;
    parent: HTMLElement;

    compressor: number;
    @Input('fittext-load-delay')loadDelay: number;
    @Input('fittext-min')minFontSize: string;
    @Input('fittext-max')maxFontSize: string;
    nl: number;

    fittextMax: string;

    constructor(
        @Inject(ElementRef) elementRef: ElementRef
    ) {
        this.element = elementRef.nativeElement;

        //scope.$watch(attrs.ngModel, function () { resizer() });

        //config.debounce
        //    ? angular.element(window).bind('resize', config.debounce(function () { scope.$apply(resizer) }, config.delay))
        //    : angular.element(window).bind('resize', function () { scope.$apply(resizer) });

    }

    afterViewInit() {
        var config = {
            'debounce': false,
            'delay': 250,
            'loadDelay': 10,
            'min': <any>undefined,
            'max': <any>undefined
        };


        this.element.style.display = 'inline-block';
        this.element.style.lineHeight = '1';
        
        this.parent = this.element.parentElement;
        this.compressor = this.compressor || 1;
        this.loadDelay = this.loadDelay || config.loadDelay;
        this.nl = this.element.querySelectorAll('[fittext-nl],[data-fittext-nl]').length || 1;
        this.minFontSize = this.minFontSize || config.min || Number.NEGATIVE_INFINITY;
        this.maxFontSize = this.maxFontSize || config.max || Number.POSITIVE_INFINITY;

        var self = this;
        setTimeout(function () { self.onResize(null) }, this.loadDelay);    }

    onResize(event: Event) {
        console.log("resize");
        this.element.style.fontSize = '10px';
        var ratio = this.element.offsetHeight / this.element.offsetWidth / this.nl;
        this.element.style.fontSize = Math.max(
            Math.min((this.parent.offsetWidth - 6) * ratio * this.compressor,
                parseFloat(this.maxFontSize)
            ),
            parseFloat(this.minFontSize)
        ) + 'px';
    }
}



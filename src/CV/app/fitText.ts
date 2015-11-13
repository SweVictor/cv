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

import {Component, View, Directive, Inject, Input, Attribute, ElementRef, bootstrap} from 'angular2/angular2';


@Directive({
    selector: '[fittext]',
    host: {
        '(window:resize)': 'onResize($event)'
    }
})
export class FitText {
    element: HTMLElement;
    parent: HTMLElement;

    compressor: number;
    loadDelay: number;
    minFontSize: string;
    maxFontSize: string;
    nl: number;

    @Input('fittextMax') fittextMax: string;

    constructor(
        @Inject(ElementRef) elementRef: ElementRef,
        @Attribute('fittext') fittext: number,
        @Attribute('fittextLoadDelay') fittextLoadDelay: number,
        @Attribute('fittextMin') fittextMin: string,
        @Attribute('fittextMax') fittextMax: string
    ) {
        console.log(this.fittextMax, fittextMax);
        this.element = elementRef.nativeElement;

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
        this.compressor = fittext || 1;
        this.loadDelay = fittextLoadDelay || config.loadDelay;
        this.nl = this.element.querySelectorAll('[fittext-nl],[data-fittext-nl]').length || 1;
        this.minFontSize = fittextMin || config.min || Number.NEGATIVE_INFINITY;
        this.maxFontSize = fittextMax || config.max || Number.POSITIVE_INFINITY;

        var self = this;
        setTimeout(function () { self.onResize(null) }, this.loadDelay);

        //scope.$watch(attrs.ngModel, function () { resizer() });

        //config.debounce
        //    ? angular.element(window).bind('resize', config.debounce(function () { scope.$apply(resizer) }, config.delay))
        //    : angular.element(window).bind('resize', function () { scope.$apply(resizer) });

    }

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



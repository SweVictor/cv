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

import {Component, View, Directive, Inject, Attribute, ElementRef, bootstrap} from 'angular2/angular2';


@Directive({
    selector: '[fittext]',

})
export class FitText {
    constructor(
        @Inject(ElementRef) elementRef: ElementRef,
        @Attribute('fittext') fittext: number,
        @Attribute('fittextLoadDelay') fittextLoadDelay: string,
        @Attribute('fittextMin') fittextMin: string,
        @Attribute('fittextMax') fittextMax: string
    ) {
        console.log(elementRef);
        var element: HTMLElement = elementRef.nativeElement;

        var config = {
            'debounce': false,
            'delay': 250,
            'loadDelay': 10,
            'min': <any>undefined,
            'max': <any>undefined
        };


        element.style.display = 'inline-block';
        element.style.lineHeight = '1';

        var parent = element.parentElement;
        var compressor = fittext || 1;
        var loadDelay = fittextLoadDelay || config.loadDelay;
        var nl = element.querySelectorAll('[fittext-nl],[data-fittext-nl]').length || 1;
        var minFontSize = fittextMin || config.min || Number.NEGATIVE_INFINITY;
        var maxFontSize = fittextMax || config.max || Number.POSITIVE_INFINITY;

        var resizer = function () {
            element.style.fontSize = '10px';
            var ratio = element.offsetHeight / element.offsetWidth / nl;
            element.style.fontSize = Math.max(
                Math.min((parent.offsetWidth - 6) * ratio * compressor,
                    parseFloat(maxFontSize)
                ),
                parseFloat(minFontSize)
            ) + 'px';
        };

        setTimeout(function () { resizer() }, loadDelay);

        //scope.$watch(attrs.ngModel, function () { resizer() });

        //config.debounce
        //    ? angular.element(window).bind('resize', config.debounce(function () { scope.$apply(resizer) }, config.delay))
        //    : angular.element(window).bind('resize', function () { scope.$apply(resizer) });

    }
}



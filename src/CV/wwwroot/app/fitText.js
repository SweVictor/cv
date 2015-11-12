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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var angular2_1 = require('angular2/angular2');
var FitText = (function () {
    function FitText(elementRef, fittext, fittextLoadDelay, fittextMin, fittextMax) {
        console.log(elementRef);
        var element = elementRef.nativeElement;
        var config = {
            'debounce': false,
            'delay': 250,
            'loadDelay': 10,
            'min': undefined,
            'max': undefined
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
            element.style.fontSize = Math.max(Math.min((parent.offsetWidth - 6) * ratio * compressor, parseFloat(maxFontSize)), parseFloat(minFontSize)) + 'px';
        };
        setTimeout(function () { resizer(); }, loadDelay);
    }
    FitText = __decorate([
        angular2_1.Directive({
            selector: '[fittext]',
        }),
        __param(0, angular2_1.Inject(angular2_1.ElementRef)),
        __param(1, angular2_1.Attribute('fittext')),
        __param(2, angular2_1.Attribute('fittextLoadDelay')),
        __param(3, angular2_1.Attribute('fittextMin')),
        __param(4, angular2_1.Attribute('fittextMax')), 
        __metadata('design:paramtypes', [angular2_1.ElementRef, Number, String, String, String])
    ], FitText);
    return FitText;
})();
exports.FitText = FitText;

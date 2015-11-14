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
    function FitText(elementRef) {
        this.element = elementRef.nativeElement;
    }
    FitText.prototype.afterViewInit = function () {
        var config = {
            'debounce': false,
            'delay': 250,
            'loadDelay': 10,
            'min': undefined,
            'max': undefined
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
        setTimeout(function () { self.onResize(null); }, this.loadDelay);
    };
    FitText.prototype.onResize = function (event) {
        console.log("resize");
        this.element.style.fontSize = '10px';
        var ratio = this.element.offsetHeight / this.element.offsetWidth / this.nl;
        this.element.style.fontSize = Math.max(Math.min((this.parent.offsetWidth - 6) * ratio * this.compressor, parseFloat(this.maxFontSize)), parseFloat(this.minFontSize)) + 'px';
    };
    __decorate([
        angular2_1.Input('fittext-load-delay'), 
        __metadata('design:type', Number)
    ], FitText.prototype, "loadDelay");
    __decorate([
        angular2_1.Input('fittext-min'), 
        __metadata('design:type', String)
    ], FitText.prototype, "minFontSize");
    __decorate([
        angular2_1.Input('fittext-max'), 
        __metadata('design:type', String)
    ], FitText.prototype, "maxFontSize");
    FitText = __decorate([
        angular2_1.Directive({
            selector: '[fittext]',
            properties: ['compressor: fittext'],
            host: {
                '(window:resize)': 'onResize($event)'
            },
        }),
        __param(0, angular2_1.Inject(angular2_1.ElementRef)), 
        __metadata('design:paramtypes', [angular2_1.ElementRef])
    ], FitText);
    return FitText;
})();
exports.FitText = FitText;

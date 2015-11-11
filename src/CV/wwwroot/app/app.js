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
var angular2_1 = require('angular2/angular2');
var CV = (function () {
    function CV() {
        this.title = "CV";
    }
    CV = __decorate([
        angular2_1.Component({
            selector: 'vh-cv'
        }),
        angular2_1.View({
            template: '<h1>{{title}}</h1>'
        }), 
        __metadata('design:paramtypes', [])
    ], CV);
    return CV;
})();
exports.CV = CV;
angular2_1.bootstrap(CV)
    .then(function (app) {
    console.log('Bootstrap Successful');
}, function (err) {
    console.error(err);
});
//# sourceMappingURL=app.js.map
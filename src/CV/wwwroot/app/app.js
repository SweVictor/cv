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
var sidebar_1 = require('../app/sidebar/sidebar');
var main_1 = require('../app/main/main');
var CV = (function () {
    function CV(title) {
        title.setTitle("Testietitle");
        this.title = "Victor's CV";
    }
    CV = __decorate([
        angular2_1.Component({
            selector: 'vh-cv',
            bindings: [angular2_1.Title]
        }),
        angular2_1.View({
            templateUrl: '../app/app.html',
            directives: [sidebar_1.Sidebar, main_1.Main]
        }), 
        __metadata('design:paramtypes', [angular2_1.Title])
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

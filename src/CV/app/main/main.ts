import {Component, View, Directive, ElementRef, bootstrap} from 'angular2/angular2';

@Component({
    selector: 'vh-main',
    templateUrl: '/app/main/main.html'
})
export class Main {

    constructor() {
        console.log("Bootstrapped main");
    }
}
import {Component, View, Directive, ElementRef, bootstrap} from 'angular2/angular2';
import {FitText} from '../../app/fitText';

@Component({
    selector: 'vh-sidebar',
    templateUrl: '/app/sidebar/sidebar.html',
    directives: [FitText]
})
export class Sidebar {

    constructor() {
        console.log("Bootstrapped sidebar");
    }
}
import {Component, View, Directive, ElementRef, bootstrap} from 'angular2/angular2';
import {FitText} from '../app/fitText';

@Component({
    selector:'vh-cv'
})
@View({
        template: '<h1 fittext>{{title}}</h1>',
        directives: [FitText]
})

export class CV {
    title:string;

    constructor(){ 
        this.title = "Victor's CV";
    }
}

bootstrap(CV)
    .then(app => {
        console.log('Bootstrap Successful');
    }, err => {
        console.error(err);
    });
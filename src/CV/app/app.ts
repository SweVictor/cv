import {Component, View, Directive, Title, ElementRef, bootstrap} from 'angular2/angular2';
import {FitText} from '../app/fitText';
import {Sidebar} from '../app/sidebar/sidebar';
import {Main} from '../app/main/main';

@Component({
    selector: 'vh-cv',
    bindings: [Title]
})
@View({
    templateUrl: '../app/app.html',
    directives: [Sidebar, Main]
})

export class CV {
    title:string;

    constructor(title: Title) { 
        title.setTitle("Testietitle");
        this.title = "Victor's CV";
    }
}

bootstrap(CV)
    .then(app => {
        console.log('Bootstrap Successful');
    }, err => {
        console.error(err);
    });
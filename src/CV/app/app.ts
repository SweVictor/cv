import {Component, View, Directive, Title, ElementRef, bootstrap} from 'angular2/angular2';
import {FitText} from '../app/fitText';
import {Sidebar} from '../app/sidebar/sidebar';

@Component({
    selector: 'vh-cv',
    bindings: [Title]
})
@View({
        template: '<vh-sidebar class="sidebar pure-u-1 pure-u-md-1-4"></vh-sidebar>',//'<h1 fittext>{{title}}</h1>',
        directives: [Sidebar, FitText]
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
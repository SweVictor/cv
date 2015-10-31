import {Component, View, bootstrap} from 'angular2/angular2';

@Component({
    selector:'vh-cv'
})
@View({
    template:'<h1>{{title}}</h1>'
})

export class CV {
    title:string;

    constructor(){
        this.title = "CV";
    }
}

bootstrap(CV)
    .then(app => {
        console.log('Bootstrap Successful');
    }, err => {
        console.error(err);
    });
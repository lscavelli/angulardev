import {Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RestApiProvider } from '../providers/rest-api';


@Component({
    selector: 'category-component',
    templateUrl: 'category.component.html',
    encapsulation: ViewEncapsulation.None
})

export class CategoryComponent implements OnInit {

    vocabolaries: any[] = [];

    constructor(private rest: RestApiProvider) {}

    ngOnInit() {
        this.listVocabularies();
    }

    listVocabularies() {
        this.rest.listVocabularies().subscribe((data) => this.vocabolaries = data ); // console.log(data)
    }

    barraVal(c) {
        let barraVal = (100/c.tasks.length)*c.tasks_closed.length;
        if (isNaN(barraVal)) barraVal = 0;
        return barraVal;
    }

    barraStyle(c) {
        return {'width':this.barraVal(c)+'%', 'background-color': c.color};
    }




}

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
        this.rest.listVocabularies().subscribe((data) => this.vocabolaries = data);
    }




}

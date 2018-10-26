import {Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'category-component',
    templateUrl: 'category.component.html',
    encapsulation: ViewEncapsulation.None
})

export class CategoryComponent {

    @Input() vocabolaries: any[] = [];

    constructor() {}

    barraVal(c) {
        let numTasks = (c.tasks != undefined) ? c.tasks.length : 0;
        let numTasksClosed = (c.tasksClosed != undefined) ? c.tasksClosed.length : 0;
        let barraVal = Math.ceil((100/numTasks)*numTasksClosed);
        if (isNaN(barraVal)) barraVal = 0;
        return barraVal;
    }

    barraStyle(c) {
        return {'width':this.barraVal(c)+'%', 'background-color': c.color};
    }




}

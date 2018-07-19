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
        let barraVal = (100/c.tasks.length)*c.tasks_closed.length;
        if (isNaN(barraVal)) barraVal = 0;
        return barraVal;
    }

    barraStyle(c) {
        return {'width':this.barraVal(c)+'%', 'background-color': c.color};
    }




}

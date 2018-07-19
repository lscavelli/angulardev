import {Component, EventEmitter, Output, Input, ViewEncapsulation} from '@angular/core';
import { RestApiProvider } from '../../providers/rest-api';
import { Task } from "../model/task.model";

@Component({
    selector: 'tasks-component',
    templateUrl: 'tasks.component.html',
    encapsulation: ViewEncapsulation.None
})

export class TasksComponent {

    @Input() tasks: Task[];
    @Output() onUpdateTask = new EventEmitter<number>();

    constructor(private rest: RestApiProvider) {}

    changeState(event) {

        var status = 1; var classN = 'done';
        if(event.target.parentElement.className=='done') {
            classN = ''; status = 0;
        }
        event.target.parentElement.className = classN;
        this.rest.changeState(event.target.getAttribute('data-id'),status).subscribe();
        this.onUpdateTask.emit(event.target.getAttribute('data-id'));

        // var target = event.target || event.srcElement || event.currentTarget;
        // var idAttr = target.attributes.id; // type ...
        // var value = idAttr.nodeValue;
        // this.elRef.nativeElement.style.backgroundColor = 'red';
        // this.elRef.nativeElement.children[2].style.backgroundColor = 'red';
        // el.nativeElement.children
        // el.nativeElement.parent
        // el.nativeElement.host
    }

    summary(e, maxLengh: number = 40,) {
        let newTxt = e;
        if (e.length > maxLengh) {
            newTxt = e.substring(0, maxLengh);
            let nsb = newTxt.lastIndexOf(' ');
            newTxt = newTxt.substring(0,nsb);
        }
        return newTxt;
    }


}

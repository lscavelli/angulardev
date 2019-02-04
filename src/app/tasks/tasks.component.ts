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
    @Output() onDeleteTask = new EventEmitter<number>();

    constructor(private rest: RestApiProvider) {}

    changeState(event) {

        var status = 2; var classN = 'done';
        if(event.target.parentElement.className=='done') {
            classN = ''; status = 1;
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

    createTask() {
        window.location.href="/admin/tasks/create";
    }

    deleteTask(id:number, name: string) {
        if(confirm("Sei sicuro di voler cancellare il task n. "+id+" - "+name)) {
            this.rest.delete(id).subscribe(
              () => {},
              () => {},
              () =>{this.onDeleteTask.emit(id)}
            );
        }
    }

}

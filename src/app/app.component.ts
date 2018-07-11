import {Component, OnInit } from '@angular/core';
import { CalendarDate } from './calendar.component';
import * as moment from 'moment';
import 'moment/locale/it';
import { RestApiProvider } from '../providers/rest-api';
import { Task } from "./model/task.model";


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html' //``,
})

export class AppComponent implements OnInit {

    errorMessage = '';

    constructor(private rest: RestApiProvider) {}

    tasks: Task[];
    listDate: CalendarDate[] = [
        //{'mDate': moment(new Date('2018-07-4'))},
        //{'mDate': moment(new Date('2018-07-5'))},
    ]

    ngOnInit() {
        this.getTasks2();
    }

    getTasks() {
        let cm = this.makeDateCurrentmonth();
        this.rest.getByDate(cm[0],cm[1])
            .subscribe(
                (tasks: Task[]) => {
                    this.listDate = this.extractDate(tasks['data']),
                    error =>  this.errorMessage = <any>error;
                },
                () => {},
                () => {}
            );
    }

    getTasks2() {
        let cm = this.makeDateCurrentmonth();
        this.rest.getByDateMode2(cm[0],cm[1])
            .subscribe(
                (tasks: Task[]) => {
                    this.listDate = this.extractDate(tasks);
                    this.tasks = tasks,   // { ...tasks }
                    error =>  this.errorMessage = <any>error;
                },
                () => {},
                () => {}
            );
    }

    checkEvent(date) {
        let dal = moment(new Date(date.mDate)).format("YYYY-MM-DD").toString();
        this.rest.getByDateMode2(dal)
            .subscribe(
                (tasks: Task[]) => {
                    this.tasks = tasks,
                    error =>  this.errorMessage = <any>error;
                },
                () => {},
                () => {}
            );
    }

    makeDateCurrentmonth() {
        let date = new Date(), y = date.getFullYear(), m = date.getMonth();
        let firstDay = moment(new Date(y, m, 1)).format("YYYY-MM-DD").toString();
        let lastDay = moment(new Date(y, m + 1, 0)).format("YYYY-MM-DD").toString();
        return [firstDay,lastDay];
    }

    extractDate(tasks: Task[]) : CalendarDate[] {
        let listDate: CalendarDate[] = [];
        for (let i = 0; i < tasks.length; i++) {
            listDate.push({'mDate':moment(tasks[i].date)})
        }
        // manual addition
        // listDate.push({'mDate': moment(new Date('2018-07-4'))});
        return listDate;
        //console.log(this.listDate);
    }

    onClick(event) {
        // var target = event.target || event.srcElement || event.currentTarget;
        // var idAttr = target.attributes.id; // type ...
        // var value = idAttr.nodeValue;

        var status = 1; var classN = 'done';
        if(event.target.parentElement.className=='done') {
            classN = ''; status = 0;
        }
        event.target.parentElement.className = classN;
        this.rest.changeState(event.target.getAttribute('data-id'),status).subscribe();

        // this.elRef.nativeElement.style.backgroundColor = 'red';
        // this.elRef.nativeElement.children[2].style.backgroundColor = 'red';
        // el.nativeElement.children
        // el.nativeElement.parent
        // el.nativeElement.host
    }




}

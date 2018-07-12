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
        let cm = this.makeFLOfMonth(moment());
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

    getTasks2(date: moment.Moment = moment()) {
        let cm = this.makeFLOfMonth(date);
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

    makeFLOfMonth(date: moment.Moment) {

        const startOfMonth = date.startOf('month').format('YYYY-MM-DD').toString();
        const endOfMonth   = date.endOf('month').format('YYYY-MM-DD').toString();

        //let y = date.getFullYear(), m = date.getMonth();
        //let firstDay = moment(new Date(y, m, 1)).format("YYYY-MM-DD").toString();
        //let lastDay = moment(new Date(y, m + 1, 0)).format("YYYY-MM-DD").toString();
        return [startOfMonth,endOfMonth];
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

        var status = 1; var classN = 'done';
        if(event.target.parentElement.className=='done') {
            classN = ''; status = 0;
        }
        event.target.parentElement.className = classN;
        this.rest.changeState(event.target.getAttribute('data-id'),status).subscribe();

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

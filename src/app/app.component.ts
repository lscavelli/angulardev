import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { CalendarDate } from './calendar/calendar.component';
import * as moment from 'moment';
import 'moment/locale/it';
import { RestApiProvider } from '../providers/rest-api';
import { Task } from "./model/task.model";

@Component({
    selector: 'app-component',
    templateUrl: 'app.component.html', //``,
    encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {

    errorMessage = '';
    tasks: Task[];
    listDate: CalendarDate[] = [
        //{'mDate': moment(new Date('2018-07-4'))},
        //{'mDate': moment(new Date('2018-07-5'))},
    ];
    vocabolaries: any[] = [];

    constructor(private rest: RestApiProvider) {}

    ngOnInit() {
        this.getTasks2();
        this.listVocabularies();
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
        // console.log(tasks);
        for (let i = 0; i < tasks.length; i++) {
            listDate.push({'mDate':moment(tasks[i].date)})
        }
        // manual addition
        // listDate.push({'mDate': moment(new Date('2018-07-4'))});
        return listDate;
        //console.log(this.listDate);
    }

    listVocabularies() {
        this.rest.listVocabularies().subscribe((data) => this.vocabolaries = data ); // console.log(data)
    }


}

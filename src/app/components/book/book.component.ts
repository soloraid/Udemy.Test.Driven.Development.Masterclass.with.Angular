import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import * as moment from 'moment';
import {DataService} from '../services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.less']
})
export class BookComponent implements OnInit {
    checkIn: any;
    checkOut: any;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private dataService: DataService,
                private dialogRef: MatDialogRef<BookComponent>,
                private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
    }

    calculateTotal(checkIn: any, checkOut: any) {
        // find the difference between the dates which will give the number of nights.
        const checkInDate = moment(checkIn, 'MM-DD_YY');
        const checkOutDate = moment(checkOut, 'MM-DD_YY');
        const nights = checkOutDate.diff(checkInDate, 'days');

        if (isNaN(nights) || nights < 0) {
            return '--';
        }
        return '$' + nights * this.data.home.price;
    }

    bookHome(home: any): void {
        this.dataService.bookHome$().subscribe(() => {
            this.dialogRef.close();
            this.snackBar.open(home.title + ' booked', undefined, {
                duration: 2000,
            })
        });
    }
}

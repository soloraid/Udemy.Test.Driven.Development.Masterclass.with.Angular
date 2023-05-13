import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BookComponent} from './book.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {DataService} from '../services/data.service';
import {spyOnClass} from 'jasmine-es6-spies/dist';
import {of} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


describe('BookComponent', () => {
    let component: BookComponent;
    let fixture: ComponentFixture<BookComponent>;
    let dataService: jasmine.SpyObj<DataService>;
    let dialogData;
    let dialogService: jasmine.SpyObj<MatDialogRef<BookComponent>>;
    let notificationService: jasmine.SpyObj<MatSnackBar>;
    const element = (selector: string) => fixture.nativeElement.querySelector(selector);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BookComponent],
            imports: [
                FormsModule,
                BrowserAnimationsModule,
                MatDatepickerModule,
                MatNativeDateModule,
                MatFormFieldModule,
                MatInputModule,
            ],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: DataService, useFactory: () => spyOnClass(DataService)},
                {provide: MatDialogRef, useFactory: () => spyOnClass(MatDialogRef)},
                {provide: MatSnackBar, useFactory: () => spyOnClass(MatSnackBar)},
            ],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BookComponent);
        dialogData = TestBed.inject(MAT_DIALOG_DATA);
        component = fixture.componentInstance;
        dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
        dialogService = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<BookComponent>>;
        notificationService = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

        const homes = require('../../../assets/homes.json');
        dialogData.home = homes[0];
        fixture.detectChanges();
    });

    it('should show title', () => {
        expect(element('[data-test="title"]').textContent).toContain('Book Home 1');
    });

    it('should show price', () => {
        expect(element('[data-test="price"]').textContent).toContain('$125 per night');
    });

    it('should show check in date field', () => {
        expect(element('[data-test="check-in"]')).toBeTruthy();
    });

    it('should show check out date field', () => {
        expect(element('[data-test="check-out"]')).toBeTruthy();
    });

    it('should show total', () => {
        // user enters check in date: 12/20/19
        let checkIn = element('[data-test="check-in"] input');
        checkIn.value = '12/20/19'
        checkIn.dispatchEvent(new Event('input'));
        // user enters check out date: 12/23/19
        let checkOut = element('[data-test="check-out"] input');
        checkOut.value = '12/23/19'
        checkOut.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        // asset that the total shows 3x125=375
        expect(element('[data-test="total"]').textContent).toContain('Total: $375');
    });

    it('should show -- for total when dates are invalid', () => {
        let checkIn = element('[data-test="check-in"] input');
        checkIn.value = ''
        checkIn.dispatchEvent(new Event('input'));
        let checkOut = element('[data-test="check-out"] input');
        checkOut.value = ''
        checkOut.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(element('[data-test="total"]').textContent).toContain('Total: --');

        checkIn.value = '12/20/19'
        checkIn.dispatchEvent(new Event('input'));
        checkOut.value = ''
        checkOut.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(element('[data-test="total"]').textContent).toContain('Total: --');

        checkIn.value = ''
        checkIn.dispatchEvent(new Event('input'));
        checkOut.value = '12/23/19'
        checkOut.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(element('[data-test="total"]').textContent).toContain('Total: --');

        checkIn.value = '12/23/19'
        checkIn.dispatchEvent(new Event('input'));
        checkOut.value = '12/20/19'
        checkOut.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(element('[data-test="total"]').textContent).toContain('Total: --');
    });

    it('should book home after clicking the book button', () => {
        dataService.bookHome$.and.returnValue(of(null));
        // user enters check in date: 12/20/19
        let checkIn = element('[data-test="check-in"] input');
        checkIn.value = '12/20/19'
        checkIn.dispatchEvent(new Event('input'));
        // user enters check out date: 12/23/19
        let checkOut = element('[data-test="check-out"] input');
        checkOut.value = '12/23/19'
        checkOut.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        // click in the book button
        const bookBtn = element('[data-test="book-btn"] button');
        bookBtn.click();
        // asset that data service was used to book the home
        expect(dataService.bookHome$).toHaveBeenCalled();

    });

    it('should close the dialog and show notification after clicking the Book button', () => {
        dataService.bookHome$.and.returnValue(of(null));
        // user enters check in date: 12/20/19
        let checkIn = element('[data-test="check-in"] input');
        checkIn.value = '12/20/19'
        checkIn.dispatchEvent(new Event('input'));
        // user enters check out date: 12/23/19
        let checkOut = element('[data-test="check-out"] input');
        checkOut.value = '12/23/19'
        checkOut.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        // click in the book button
        const bookBtn = element('[data-test="book-btn"] button');
        bookBtn.click();
        // asset that data service was used to book the home
        expect(dialogService.close).toHaveBeenCalled();
        expect(notificationService.open).toHaveBeenCalled();

    });
});

import {TestBed} from '@angular/core/testing';

import {DataService} from './data.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

describe('DataServiceService', () => {
    let dataService: DataService;
    let httpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
    });

    it('should return the list of homes', () => {

        // Spy on and mock the HttpClient.
        httpClient = TestBed.inject(HttpClient);
        const homesMock = [
            {title: 'Home 1', image: 'assets/listing.jpg', location: 'new york'},
            {title: 'Home 2', image: 'assets/listing.jpg', location: 'boston'},
            {title: 'Home 3', image: 'assets/listing.jpg', location: 'chicago'},
        ];
        spyOn(httpClient, 'get').and.returnValue(of(homesMock));

        // Use our service to get homes.
        dataService = TestBed.inject(DataService);
        const spy = jasmine.createSpy('spy');
        dataService.getHomes$().subscribe(spy);

        // Verify that the service returned mocked data.
        expect(spy).toHaveBeenCalledWith(homesMock);

        // Verify that the service called the proper HTTP endpoint
        expect(httpClient.get).toHaveBeenCalledWith('assets/homes.json');

    });
});

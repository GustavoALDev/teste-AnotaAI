import { TestBed } from '@angular/core/testing';

import { CoreService } from './core.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Card } from '../models/cards.model';
import { API_KEY_URL } from '../../environments/apiKey';

describe('CoreService', () => {
  let service: CoreService;
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers:[
        CoreService
      ]
    });

    service = TestBed.inject(CoreService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  afterEach(()=>{
    httpTestingController.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCards', ()=> {

    it('Check if the request response is correct. ',()=>{

      const mockTestResponse: Card[] = [{
        id: 1,
        title: 'test',
        description: 'test',
        img: 'test',
        type: 'test',
      }];


      service.getCards().subscribe((cards)=>{
        expect(cards).toEqual(mockTestResponse);
      });

      const request = httpTestingController.expectOne(API_KEY_URL);

      expect(request.request.method).toBe('GET')

      request.flush(mockTestResponse)

    })

  })

});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListComponent } from './card-list.component';
import { Card } from '../../shared/models/cards.model';
import { CoreService } from '../../shared/services/core.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CardComponent } from '../card/card.component';
import { of } from 'rxjs';

describe('CardListComponent', () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;
  let coreServiceMock: { getCards: jest.Mock };
  let service: CoreService;

  const mockCardList: Card[] = [
    { id: 1, title: 'Test1', type: 'test', img: 'test', description: 'describe test' },
    { id: 2, title: 'Test2', type: 'test', img: 'test', description: 'describe test' },
    { id: 3, title: 'Test3', type: 'test', img: 'test', description: 'describe test' },
  ];

  beforeEach(async () => {
    coreServiceMock = {
      getCards: jest.fn().mockReturnValue(of(mockCardList)),
    };

    await TestBed.configureTestingModule({
      declarations: [
        CardListComponent,
        SearchBarComponent,
        CardComponent,
      ],
      providers: [
        {
          provide: CoreService,
          useValue: coreServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(CoreService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize cardList on ngOnInit', (done) => {
    component.ngOnInit();
    component.cardList.subscribe(cards => {
      expect(cards).toEqual(mockCardList);
      done();
    });
  });

  it('should filter cardList based on search term', (done) => {
    const searchTerm = 'Test1';
    component.serchCard(searchTerm);
    component.cardList.subscribe(cards => {
      expect(cards.length).toBe(1);
      expect(cards[0].title).toContain(searchTerm);
      done();
    });
  });

  it('should filter out deleted cards', (done) => {
    const deleteId = 1;
    component.deleteCard(deleteId);
    component.cardList.subscribe(cards => {
      expect(cards.length).toBe(2);
      expect(component.deletedItems.length).toBe(1)
      expect(cards[0].title).toEqual('Test2')
      expect(cards.find(card => card.id === deleteId)).toBeUndefined();
      done();
    });
  });

  it('should filter out deleted cards and apply search filter', (done) => {
    const searchTerm = 'Test';
    const deleteId = 1;
    component.deleteCard(deleteId);
    component.serchCard(searchTerm);
    component.cardList.subscribe(cards => {
      expect(cards.length).toBe(2);
      expect(cards.find(card => card.id === deleteId)).toBeUndefined();
      expect(cards[0].title).toContain(searchTerm);
      done();
    });
  });

});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { Card } from '../../shared/models/cards.model';
import { By } from '@angular/platform-browser';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  const mockCard: Card = {
    id: 1,
    title: 'test title',
    type: '1',
    img: 'testImg',
    description: 'test description',
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should bind @Input card correctly', () => {

    it('Check the title', () => {
      component.card = mockCard;
      fixture.detectChanges();
      const cardElement = fixture.debugElement.query(By.css('#card-title')).nativeElement;
      expect(cardElement.textContent).toContain(mockCard.title);
    });

    it('Check the description', () => {
      component.card = mockCard;
      fixture.detectChanges();
      const cardElement = fixture.debugElement.query(By.css('#card-description')).nativeElement;
      expect(cardElement.textContent).toContain(mockCard.description);
    });

    it('Check the type', () => {
      component.card = mockCard;
      fixture.detectChanges();
      const cardElement = fixture.debugElement.query(By.css('#card-type')).nativeElement;
      expect(cardElement.textContent).toContain(component.type[mockCard.type]);
    });

    it('Check the img', () => {
      component.card = mockCard;
      fixture.detectChanges();
      const cardElement = fixture.debugElement.query(By.css('#card-img')).nativeElement;
      expect(cardElement.src).toBeTruthy();
    });

  })

  describe('Should check if the @Output is emitting the event correctly', () => {

    it('should call idCardEmitter method when delete button is clicked', () => {
      const idCardEmitterSpy = jest.spyOn(component, 'idCardEmitter');
      const deleteCardButton = jest.spyOn(component.deleteCardButton, 'emit')
      const deleteButton = fixture.debugElement.query(By.css('.delete-button'));

      deleteButton.triggerEventHandler('click');

      expect(idCardEmitterSpy).toHaveBeenCalled();
      expect(deleteCardButton).toHaveBeenCalled()

    });

    it('should emit deleteCardButton event on idCardEmitter call', () => {
      jest.spyOn(component.deleteCardButton, 'emit');
      component.idCardEmitter(mockCard.id)
      expect(component.deleteCardButton.emit).toHaveBeenCalledWith(mockCard.id);
    })

  })


});

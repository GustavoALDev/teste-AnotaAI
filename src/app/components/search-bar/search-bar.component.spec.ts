import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { By } from '@angular/platform-browser';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit value event with input value', () => {
    const inputValue = 'test value';
    const valueEmitterSpy = jest.spyOn(component.value, 'emit');

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = inputValue;
    inputElement.dispatchEvent(new Event('input'));

    expect(valueEmitterSpy).toHaveBeenCalledWith(inputValue);
  });


});

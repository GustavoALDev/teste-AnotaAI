import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})

export class SearchBarComponent {
  @Output() value = new EventEmitter<string>();

  isFocus:boolean = false

  getInputValue(inputValue:string ){
    this.value.emit(inputValue)
  }

}

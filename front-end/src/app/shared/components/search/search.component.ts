import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input()
  public title!: string;
  public searchForm!: FormGroup;
  public searchIsEmpty = true;
  constructor() { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(null),
    });
  }

  @Output()
  search = new EventEmitter<string> ();
  
  onSubmit() {
    this.searchIsEmpty = false;
    this.search.emit(this.searchForm.value.search);
  }

  cancel() {
    this.searchForm.setValue({search: ''});
    this.search.emit(this.searchForm.value.search);
    this.searchIsEmpty = true;
  }
}




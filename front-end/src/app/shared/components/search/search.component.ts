import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
  // @Input()
  // public clearSearch: boolean | undefined;

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(null),
    });

  }

  @Output()
  search = new EventEmitter<string> ();

  @Output()
  stopSearching = new EventEmitter<void> ();
  
  onSubmit() {
    this.searchIsEmpty = false;
    this.search.emit(this.searchForm.value.search);
    // this.clearSearch = false;
  }

  cancel() {
    // this.searchForm.setValue({search: ''});
    this.stopSearching.emit();
    // this.searchIsEmpty = true;
    this.clearSearchForm();
  }

  public clearSearchForm() {
    this.searchForm.setValue({search: ''});
    this.searchIsEmpty = true;
  }
  // , OnChanges
  // ngOnChanges(changes: SimpleChanges) {
  //   console.log('_changes_', changes)
  //   console.log('changes.clearSearch.currentValue', changes.clearSearch.currentValue)
  //   for (let propName in changes) {
  //     let chng = changes[propName];
  //     let cur  = JSON.stringify(chng.currentValue);
  //     let prev = JSON.stringify(chng.previousValue);
  //     console.log(`Search: ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
  //   }
  //   if (changes.clearSearch.currentValue) {
  //     this.clearSearchForm();
  //   }
  // }
}




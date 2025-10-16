import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
@Component({
  selector: 'app-input-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './input-filter.html',
  styleUrl: './input-filter.scss',
})
export class InputFilter implements OnInit {
  searchControl = new FormControl('');
  filteredData: unknown[] = [];
  @Input() data!: unknown[];
  @Output() filtered = new EventEmitter();

  ngOnInit(): void {
    try {
      this.searchControl.valueChanges
        .pipe(debounceTime(300), distinctUntilChanged())
        .subscribe((query) => {
          this.filteredData = this.data.filter((p: any) =>
            p.product_name
              .toLowerCase()
              .includes(query?.toLocaleLowerCase() || '')
          );
          this.filtered.emit(this.filteredData);
        });
    } catch (e) {
      console.log('Error', e);
    }
  }
}

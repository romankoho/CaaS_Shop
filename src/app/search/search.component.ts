import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from "../shared/product.service";

@Component({
  selector: 'wea5-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  constructor() { }

  @Output() searchTriggered = new EventEmitter<string>();

  ngOnInit() {
  }


}

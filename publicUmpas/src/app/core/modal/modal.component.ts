import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() modalId:string;

  @Output() save = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClose() {
    
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/user';

@Component({
  selector: 'app-dumb',
  templateUrl: './dumb.component.html',
  styleUrls: ['./dumb.component.css']
})
export class DumbComponent implements OnInit {
  @Input() users: User[];
  @Output() add = new EventEmitter();
  @Output() delete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  addUser(firstName: string, lastName: string): void {
    this.add.emit({ firstName, lastName } as User);
  }

  deleteUser(user: User): void {
    this.delete.emit(user);
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TestGaskar';

  constructor() {
    localStorage.setItem('users', JSON.stringify([
      { id: 1, firstName: 'Leanne', lastName: 'Graham' },
      { id: 2, firstName: 'Ervin', lastName: 'Howell' },
      { id: 3, firstName: 'Clementine', lastName: 'Bauch' },
      { id: 4, firstName: 'Patricia', lastName: 'Lebsack' },
      { id: 5, firstName: 'Chelsey', lastName: 'Dietrich' },
      { id: 6, firstName: 'Dennis', lastName: 'Schulist' },
      { id: 7, firstName: 'Kurtis', lastName: 'Weissnat' },
      { id: 8, firstName: 'Nicholas', lastName: 'Runolfsdottir' },
      { id: 9, firstName: 'Glenna', lastName: 'Reichert' },
      { id: 10, firstName: 'Clementina', lastName: 'DuBuque' },
    ]))
  }
}
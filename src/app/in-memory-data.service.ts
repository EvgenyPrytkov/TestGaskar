import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const users = [
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
    ];
    return { users };
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  addInLocalStorage(item)
  {
    localStorage.setItem(`${item}`, item);
  }

  getFromLocalStorage(item)
  {
    localStorage.getItem(`${item}`);
  }

  removeFromLocalStorage(item)
  {
    localStorage.removeItem(item);
  }

  freeLocalStorage()
  {
    localStorage.clear();
  }
}



import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import { MatTabChangeEvent } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class CarouselHandlerService {

  selectedIndex: number = 1;
  public tabChanges: BehaviorSubject<number> = new BehaviorSubject<number>(this.selectedIndex);
  
  setSelectedTabIndex(tabIndex: number): void {
    this.selectedIndex = tabIndex;
    this.tabChanges.next(tabIndex);
    
  }
  
  goNext(){
      
    if(this.selectedIndex < 2){
      this.setSelectedTabIndex(this.selectedIndex += 1);
    }
    
  }

  goPrev(){
        
    if(this.selectedIndex > 0){
      this.setSelectedTabIndex(this.selectedIndex -= 1);
    }
    
    
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    //console.log('index => ', tabChangeEvent.index);
    //set the changed index to be the selectedIndex value
    //in order for the arrows to know the index
    this.setSelectedTabIndex(tabChangeEvent.index);
  }

}

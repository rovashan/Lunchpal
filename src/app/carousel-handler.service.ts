import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CarouselHandlerService {

 
  goNext($event: Event){
    console.log("next");
    let icon = $event.srcElement.parentElement;
    let tabControls= icon.parentElement;
    let matTabBody = tabControls.parentElement;
    let scrollElement = matTabBody.children[1];
    scrollElement.scrollBy({
      top: 0,
      left: 600,
     behavior: "smooth"
    });
   
    
  }

  goPrev($event: Event){  
    console.log("prev");
    let icon = $event.srcElement.parentElement;
    let tabControls= icon.parentElement;
    let matTabBody = tabControls.parentElement;
    let scrollElement = matTabBody.children[1];
    scrollElement.scrollBy({
      top: 0,
      left: -600,
     behavior: "smooth"
    });
    
  }

}

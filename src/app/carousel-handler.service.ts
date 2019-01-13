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




  /*
  //Plan One Images
  public menuOne = [
    "../assets/images/joseph-gonzalez-228027-unsplash.png",
    "../assets/images/cel-lisboa-60315-unsplash.png",
    "../assets/images/taylor-kiser-373479-unsplash.png"
  ]
 
  //Plan Two Images
  public menuTwo = [
    "../assets/images/jannis-brandt-107231-unsplash.png",
    "../assets/images/edgar-castrejon-459822-unsplash.png",
    "../assets/images/brooke-lark-194252-unsplash.png"
  ]

  //Plan Three Images
  public menuThree = [
    "../assets/images/erik-dungan-1079095-unsplash.png",
    "../assets/images/ting-tian-789620-unsplash.png",
    "../assets/images/brooke-lark-158019-unsplash.png"
    
  ]

    imageSources: string[]= this.menuOne;
    label: string = "Menu One";
    
    public menuOneLabel = "Menu One";
    public menuTwoLabel = "Menu Two";
    public menuThreeLabel = "Menu Three";

    public sourcesChange: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.imageSources);
    public labelsChange: BehaviorSubject<string> = new BehaviorSubject<string>(this.label);

    //set sources array for the images
    setSources(imagesArray: string[]): void {
      this.imageSources = imagesArray;
      this.sourcesChange.next(imagesArray);
      
    }
    
    //set label for the images
    setlabels(label: string):void{
      this.label = label
      this.labelsChange.next(label);
    }

    menuHandler($event: Event){
      $event.preventDefault();
      
      let currentID = $event.target["id"];
      //check the ID of the plan selected
      if(currentID === "menuOne"){
        //set the images array to be the array of images for the menu
        console.log("menu one is selected");
        this.setSources(this.menuOne);
        this.setlabels(this.menuOneLabel);
        
        }
      else if (currentID === "menuTwo"){
        console.log("menu two is selected");
        this.setSources(this.menuTwo);
        this.setlabels(this.menuTwoLabel);
      
      }
      else if (currentID === "menuThree"){
        console.log("menu three is selected");
        this.setSources(this.menuThree);
        this.setlabels(this.menuThreeLabel);
       
        
      }
    
    }
*/
}

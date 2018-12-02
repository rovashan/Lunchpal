import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CarouselHandlerService {

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


    setSources(imagesArray: string[]): void {
      this.imageSources = imagesArray;
      this.sourcesChange.next(imagesArray);
      
    }
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

}

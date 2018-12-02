import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarouselHandlerService {

  constructor() {  
  }

  //--- this service is just handling the images for the carousel
  //--- the carousel was not receiving the changes from the service
  //--- to the component


  public menuOneString = "Menu One";
  public menuTwoString = "Menu Two";
  public menuThreeString = "Menu One";

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


}

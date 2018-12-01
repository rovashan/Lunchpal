import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {

  constructor() { }

  planSelected:string = "Plan One";

  //Plan One Images
  menuOne = [
    "../../assets/images/joseph-gonzalez-228027-unsplash.png",
    "../../assets/images/cel-lisboa-60315-unsplash.png",
    "../../assets/images/taylor-kiser-373479-unsplash.png"
  ]
 
  //Plan Two Images
  menuTwo = [
    "../../assets/images/jannis-brandt-107231-unsplash.png",
    "../../assets/images/edgar-castrejon-459822-unsplash.png",
    "../../assets/images/brooke-lark-194252-unsplash.png"
  ]

  //Plan Three Images
  menuThree = [
    "../../assets/images/erik-dungan-1079095-unsplash.png",
    "../../assets/images/ting-tian-789620-unsplash.png",
    "../../assets/images/brooke-lark-158019-unsplash.png"
    
  ]

  //for the carousel to deliver a set of images (local or through Http)
  imageSources:any[] = this.menuOne;
  //width can be changed  by changing the containers width
  //the other controls are on the HTML




  menuHandler($event: Event){
   
    
    let currentID = $event.target["id"];
    //check the ID of the plan selected
    if(currentID === "menuOne"){
      //set the images array to be the array of images for the menu
      this.imageSources = this.menuOne;
      this.planSelected = "Plan One";
      }
    else if (currentID === "menuTwo"){
      console.log("menu two is selected");
      this.imageSources = this.menuTwo; 
      this.planSelected = "Plan Two";
     
    }
    else if (currentID === "menuThree"){
      console.log("menu three is selected");
      this.imageSources = this.menuThree;
      this.planSelected = "Plan Three";
    }
  
  }



  ngOnInit() {
  }

}

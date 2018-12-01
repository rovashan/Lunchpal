import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'app';

  constructor() { }

  
  //for the carousel deliver a set of images (local or through Http)
  //width can be changed  by changing the containers width
  //the other controls are on the HTML


  imageSources:any[] = [
    "../../assets/images/cel-lisboa-60315-unsplash.png",
    "../../assets/images/joseph-gonzalez-228027-unsplash.png",
    "../../assets/images/taylor-kiser-373479-unsplash.png"
  ]


  ngOnInit() {
  }

}
import { Component, OnInit } from '@angular/core';
import { GeofirestoreService } from "../geofirestore.service";
import { GeoQuerySnapshot } from 'geofirestore';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(private geofirestore: GeofirestoreService, private route: ActivatedRoute) { }
  result;
  caterers: any[];
  lat: number = parseInt(this.route.snapshot.paramMap.get("lat"));
  lng: number = parseInt(this.route.snapshot.paramMap.get("lng"));
  defaultBounds;
  minDate = new Date();

  public eventsForm = new FormGroup({
    address: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    delivery: new FormControl('', Validators.required),
  });

  checkDate($event: any) {
    console.log($event);
  }
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day == 1;
  }


  public handleAddressChange(address: string) {
    // Do some stuff
    //console.log('handleAddressChange: ', address);
   //console.log(address);
  
    let lat = address["geometry"]["location"].lat();
    let lng = address["geometry"]["location"].lng();
  
    this.geofirestore.getNearbyCaterers(lat, lng).get().then( value =>  {
      this.result = value.docs;
      this.caterers = [];
      this.result.map(res => {
        this.caterers.push(
          {
           id:  res.id,
           data: res.data()
          })
        
      })
    });

  }

  public filterCaterers(formData: FormData){
    console.log(formData);
  
  }

  
  

  ngOnInit() {
    this.geofirestore.getNearbyCaterers(this.lat, this.lng).get().then( value =>  {
      this.result = value.docs;
      this.caterers = [];
      this.result.map(res => {
        this.caterers.push(
          {
           id:  res.id,
           data: res.data()
          })
        
      })
    });
    


    /*
    let data = {
      address: "15 Anvil Rd, Isando, Kempton Park",
      name: "Catering Intuition"
    }
    
    this.geofirestore.setLocation( -26.1075663, 28.056700699999965, data);
  */
  }
}

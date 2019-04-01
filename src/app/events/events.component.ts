import { Component, OnInit } from '@angular/core';
import { GeofirestoreService } from "../geofirestore.service";
import { GeoQuerySnapshot } from 'geofirestore';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(private geofirestore: GeofirestoreService, private route: ActivatedRoute) { }
  result;
  caterers: any[] = [];
  lat: number = parseInt(this.route.snapshot.paramMap.get("lat"));
  lng: number = parseInt(this.route.snapshot.paramMap.get("lng"));



  ngOnInit() {
    this.geofirestore.getNearbyCaterers(this.lat, this.lng).get().then( value =>  {
      this.result = value.docs;
      this.result.map(res => {
        this.caterers.push(res.data())
        
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

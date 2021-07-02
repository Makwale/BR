import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Slot } from 'src/app/modells/slot.model';
import { DatabaseService } from 'src/app/services/database.service';
import { TrackingService } from 'src/app/services/tracking.service';


declare var mapboxgl: any;
declare var MapboxDirections; 

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, OnDestroy {
  @Input() selectedSlot: Slot;
  map;
	direction;
  slot;
  fromCoordinates = [];
  toCoordinates = [];
  campusesLocations = [
    {name: "Sosh South",
     geo:[28.09707, -25.53942]
    },
    {name: "Sosh North",
     geo:[28.11295, -25.52039]
    },
    {
      name: "Pta Main",
      geo: [28.16242, -25.73176]
    },
    {
      name: "Arcadia",
      geo: [28.20040, -25.74477]
    },
    {
      name: "Garankuwa",
      geo: [28.00317, -25.61617]
    },
    {
      name: "Art",
      geo: [28.19671, -25.74003]
    }
    
  ]
  constructor(private ts: TrackingService, private dbs: DatabaseService) { }

  ngOnInit() {

  }

  ionViewDidEnter(){
  
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFudWVsbWFrd2FsZSIsImEiOiJja2hsc3lmYWUyZzRnMnRsNnY2NWIyeGR6In0.1MGnfpXj_dV2QBO3SchfqA';

    this.map = new mapboxgl.Map({
      container: 'map',
      countries: 'za',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [28.162400726, -25.731898523],
      zoom: 8,
      
    });

     this.direction =  new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      profile: "mapbox/driving",
      alternatives: true,
      congestion: true,
      unit: "metric",
      controls: {instructions: false},
    
    })

    this.map.addControl(this.direction, 'bottom-left')
    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.addControl(new mapboxgl.FullscreenControl());

    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }));



    new mapboxgl.Popup({ 
      closeButton: false,
      anchor: 'bottom',
      closeOnClick: false}).setText(
      'TUT Sosh South Campus'
    ).setLngLat(this.campusesLocations[0].geo).addTo(this.map);
    
    new mapboxgl.Popup({ 
      closeButton: false,
      anchor: 'bottom',
      closeOnClick: false}).setText(
        'TUT Sosh North Campus'
      ).setLngLat(this.campusesLocations[1].geo).addTo(this.map);
      

      new mapboxgl.Popup({ 
        closeButton: false,
        anchor: 'bottom',
        closeOnClick: false}).setText(
          'TUT Pretoria Campus'
        ).setLngLat(this.campusesLocations[2].geo).addTo(this.map);
      
    new mapboxgl.Popup({ 
      closeButton: false,
      anchor: 'bottom',
      closeOnClick: false}).setText(
        'TUT Arcadia Campus'
      ).setLngLat(this.campusesLocations[3].geo).addTo(this.map);
    

    new mapboxgl.Popup({ 
      closeButton: false,
      anchor: 'bottom',
      closeOnClick: false}).setText(
        'TUT Garankuwa Campus'
      ).setLngLat(this.campusesLocations[4].geo).addTo(this.map);
  
    new mapboxgl.Popup({ 
      closeButton: false,
      anchor: 'bottom',
      closeOnClick: false}).setText(
        'TUT Arts Campus'
      ).setLngLat(this.campusesLocations[5].geo).addTo(this.map);
      
    
    setTimeout(()=> {
      if(this.ts.slot != undefined){
        for(let camp of this.campusesLocations){
          if(camp.name == this.ts.slot.from)
          {
            this.direction.setOrigin(camp.geo)
            this.fromCoordinates = camp.geo;
          }
    
          if(camp.name == this.ts.slot.to){
            this.direction.setDestination(camp.geo)
            this.toCoordinates = camp.geo
          }
        }
        this.map.jumpTo({center: this.fromCoordinates})
        this.map.zoomTo(12.5, {
          duration: 5000
          });
        
        setTimeout(()=> {
          this.map.setPitch(70,{
            duration: 5000
          })
        },2000)
      }
  
    },3000)
    
   
    this.ts.track();

  }

  ngOnDestroy(){
    this.ts.slot = null;
  }

  track(){

    let temp = 0;
    let destination = new mapboxgl.LngLat(this.toCoordinates[0], this.toCoordinates[1]);
    var busMarker = new mapboxgl.Marker({
      color: "#0a4694"
    }).setLngLat([0, 0]).addTo(this.map)
    
    this.ts.getBusCoordinates().subscribe(data =>{
      
      if(data.payload.data()["gps"] == undefined || !data.payload.data()["gps"]){
        
        if(this.ts.slot != null){
          alert("Bus GPS is currently disabled")
        }
      }else{

        let busdata = data.payload.data();
        let geo = busdata["geo"];
        
        busMarker.setLngLat([geo[0], geo[1]])
    
      }
        
    })
    
    
   
  }

  

  

}

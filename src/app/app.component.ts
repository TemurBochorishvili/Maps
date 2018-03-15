import { Component, OnInit, ChangeDetectorRef, OnChanges } from '@angular/core';
import { tileLayer, latLng, circle, polygon, marker, Map, LeafletMouseEvent, icon } from 'leaflet';
import { delay } from 'q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  map: Map;
  checkPin: boolean = false;
  removeLayers: boolean = false;

  checkPinText: string = 'Enable putting pins';
  removeLayersText: string = 'Allow to remove ';

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 10,
    center: latLng(41.716667, 44.783333),
  };

  layersControl = {
    // baseLayers: {
    //   'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    //   'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    // },
    overlays: {
      'Big Circle': circle([41.8, 44.8], { radius: 5000 }),
      'Big Square': polygon([[41.765, 44.745], [41.7, 44.789], [41.656, 44.545], [41.5, 44.5]])
    }
  }

  layers = [
    circle([41.716667, 44.783333], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 5000
    }),
    polygon([[41.765, 44.745], [41.7, 44.789], [41.656, 44.545]]),
    marker([46.879966, -121.726909])
  ];

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
  }

  onCheckPin() {
    this.checkPin = !this.checkPin;
    this.checkPinText = this.checkPin ? 'Disable putting pins' : 'Enable putting pins';
  }

  onRemoveLayerClick() {
    this.removeLayers = !this.removeLayers;
    this.removeLayersText = this.removeLayers ? 'Disable to remove' : 'Enable to remove';
  }

  onMapReady(map: Map) {
    this.map = map;
  }

  onMapClick() {
    if (this.checkPin) {
      this.map.once('click', (event: LeafletMouseEvent) => {
        console.log(event);
        this.layers.push(marker([event.latlng.lat, event.latlng.lng], { //map.addlayer
          draggable: true,
          icon: icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'assets/marker-icon.png',
            shadowUrl: 'assets/marker-shadow.png',
          })
        }).bindPopup("as " + event.latlng.lng)
        );
      });

      setTimeout(() => {

      },
        100);
    }

    if (this.removeLayers) {
      this.layers.forEach(ass => {
        ass.once('click', (event: LeafletMouseEvent) => {
          this.map.removeLayer(ass);
        })
      })
    }
  }
  // 

}

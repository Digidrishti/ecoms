// import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
// import * as L from 'leaflet';

// @Component({
//   selector: 'app-live-location-tracker',
//   templateUrl: './live-location-tracker.component.html',
//   styleUrls: ['./live-location-tracker.component.scss']
// })
// export class LiveLocationTrackerComponent implements OnInit, OnDestroy, AfterViewInit {
//   private map!: L.Map;
//   private userMarker: L.Marker | undefined;
//   private destinationMarker: L.Marker | undefined;
//   private locationWatchId: number | undefined;

//   private readonly DESTINATION_LAT = 37.7749; // Example destination latitude
//   private readonly DESTINATION_LNG = -122.4194; // Example destination longitude
//   private readonly LOCATION_UPDATE_INTERVAL_MS = 5000; // 5 seconds

//   constructor() {}

//   ngOnInit(): void {}

//   ngAfterViewInit(): void {
//     this.initMap();
//     this.trackLocation();
//   }

//   ngOnDestroy(): void {
//     if (this.locationWatchId) {
//       navigator.geolocation.clearWatch(this.locationWatchId);
//     }
//   }

//   private initMap(): void {
//     this.map = L.map('map').setView([37.7749, -122.4194], 12); // Default to San Francisco

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       maxZoom: 19,
//     }).addTo(this.map);

//     this.destinationMarker = L.marker([this.DESTINATION_LAT, this.DESTINATION_LNG]).addTo(this.map)
//       .bindPopup('Destination')
//       .openPopup();
//   }

//   private trackLocation(): void {
//     if (navigator.geolocation) {
//       this.locationWatchId = navigator.geolocation.watchPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;

//           if (this.userMarker) {
//             this.userMarker.setLatLng([latitude, longitude]);
//           } else {
//             this.userMarker = L.marker([latitude, longitude]).addTo(this.map)
//               .bindPopup('You are here')
//               .openPopup();
//           }

//           this.map.setView([latitude, longitude], 15); // Center the map on the new location
//         },
//         (error) => {
//           console.error('Error getting location:', error);
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 5000,
//           maximumAge: 0
//         }
//       );
//     } else {
//       alert('Geolocation is not supported by this browser.');
//     }
//   }
// }


// ????????????????????????????  phase: 2   ???????????????????????????????????????????????????????????


// import { Component, OnInit } from '@angular/core';
// import * as L from 'leaflet';

// @Component({
//   selector: 'app-live-location-tracker',
//   templateUrl: './live-location-tracker.component.html',
//   styleUrls: ['./live-location-tracker.component.scss']
// })
// export class LiveLocationTrackerComponent implements OnInit {
//   map!: L.Map;
//   marker!: L.Marker;
//   routeCoordinates: L.LatLng[] = [];

//   customIcon = L.divIcon({
//     className: 'custom-div-icon',
//     html: `<div style="font-size: 2rem; color: #ff5722;"><i class="bi bi-bicycle"></i></div>`,
//     iconSize: [30, 42], // Adjust the size as needed
//     iconAnchor: [15, 21] // Anchor point to place it at the location
//   });

//   constructor() {}

//   ngOnInit(): void {
//     this.initializeMap();
//     this.trackLocation();
//   }

//   initializeMap(): void {
//     this.map = L.map('map').setView([51.505, -0.09], 13);

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '© OpenStreetMap contributors'
//     }).addTo(this.map);
//   }

//   trackLocation(): void {
//     if (navigator.geolocation) {
//       navigator.geolocation.watchPosition(position => {
//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;

//         if (this.marker) {
//           this.marker.setLatLng([lat, lng]);
//         } else {
//           this.marker = L.marker([lat, lng], { icon: this.customIcon }).addTo(this.map);
//         }

//         this.map.setView([lat, lng], 13);

//         this.routeCoordinates.push(L.latLng(lat, lng));
//         L.polyline(this.routeCoordinates, { color: 'blue' }).addTo(this.map);
//       }, error => {
//         console.error('Geolocation error:', error);
//       });
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   }
// }

// ????????????????????????????  phase: 3   ???????????????????????????????????????????????????????????



import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-live-location-tracker',
  templateUrl: './live-location-tracker.component.html',
  styleUrls: ['./live-location-tracker.component.scss']
})
export class LiveLocationTrackerComponent implements OnInit, OnDestroy {
  map!: L.Map;
  marker!: L.Marker;
  routeCoordinates: L.LatLng[] = [];
  movementInterval: any;

  destination = L.latLng(18.5165, 73.8366); 
  speed = 100; 
  customIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="font-size: 2rem; color: #ff5722; transform: rotate(180deg);">
    <svg width="50" height="50" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <!-- Airplane Shape -->
    <path d="M100 10L90 40H70L50 90L90 80L80 120L100 110L120 120L110 80L150 90L130 40H110L100 10Z" fill="#333" />

    <!-- Flame -->
    <g>
        <path d="M100 110L90 130L100 150L110 130L100 110Z" fill="orange">
            <animate
                attributeName="d"
                values="M100 110L90 130L100 150L110 130L100 110Z;
                        M100 110L85 140L100 160L115 140L100 110Z;
                        M100 110L90 130L100 150L110 130L100 110Z"
                dur="0.5s"
                repeatCount="indefinite"
            />
        </path>
        <path d="M100 115L92 135L100 150L108 135L100 115Z" fill="red">
            <animate
                attributeName="d"
                values="M100 115L92 135L100 150L108 135L100 115Z;
                        M100 115L87 145L100 155L113 145L100 115Z;
                        M100 115L92 135L100 150L108 135L100 115Z"
                dur="0.5s"
                repeatCount="indefinite"
            />
        </path>
    </g>

    <!-- Smoke -->
    <g fill="rgba(0,0,0,0.3)">
        <circle cx="100" cy="160" r="10">
            <animate
                attributeName="r"
                values="10; 15; 20; 10"
                dur="2s"
                repeatCount="indefinite"
            />
        </circle>
        <circle cx="110" cy="170" r="12">
            <animate
                attributeName="r"
                values="12; 18; 24; 12"
                dur="2s"
                repeatCount="indefinite"
            />
        </circle>
        <circle cx="90" cy="170" r="8">
            <animate
                attributeName="r"
                values="8; 12; 16; 8"
                dur="2s"
                repeatCount="indefinite"
            />
        </circle>
    </g>
</svg>
 <div class="flame"></div>
    <div class="smoke"></div></div>`,
    iconSize: [30, 42],
    iconAnchor: [15, 21]
  });

  constructor() {}

  ngOnInit(): void {
    this.initializeMap();
    this.trackAndMove();
  }

  ngOnDestroy(): void {
    if (this.movementInterval) {
      clearInterval(this.movementInterval);
    }
  }

  initializeMap(): void {
    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    }).addTo(this.map);
  }

  trackAndMove(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const startLatLng = L.latLng(position.coords.latitude, position.coords.longitude);

        this.marker = L.marker(startLatLng, { icon: this.customIcon }).addTo(this.map);
        this.map.setView(startLatLng, 13);

        this.moveplane(startLatLng);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  moveplane(currentLatLng: L.LatLng): void {
    const destinationLatLng = this.destination;

    this.movementInterval = setInterval(() => {
      const distanceToDestination = currentLatLng.distanceTo(destinationLatLng);

      if (distanceToDestination < this.speed) {
        this.marker.setLatLng(destinationLatLng);
        clearInterval(this.movementInterval);
      } else {
        const angle = Math.atan2(
          destinationLatLng.lat - currentLatLng.lat,
          destinationLatLng.lng - currentLatLng.lng
        );

        const newLat = currentLatLng.lat + (this.speed / 111320) * Math.cos(angle); 
        const newLng = currentLatLng.lng + (this.speed / (111320 * Math.cos(currentLatLng.lat * (Math.PI / 180)))) * Math.sin(angle);

        currentLatLng = L.latLng(newLat, newLng);
        this.marker.setLatLng(currentLatLng);
        this.map.setView(currentLatLng, 13);

        this.routeCoordinates.push(currentLatLng);
        L.polyline(this.routeCoordinates, { color: 'blue' }).addTo(this.map);
      }
    }, 1000);
  }
}



// ????????????????????????????  phase: 4   ???????????????????????????????????????????????????????????


// import { Component, OnInit, OnDestroy } from '@angular/core';
// import * as L from 'leaflet';
// import * as ors from 'openrouteservice-js';
// // declare module 'openrouteservice-js'

// @Component({
//   selector: 'app-live-location-tracker',
//   templateUrl: './live-location-tracker.component.html',
//   styleUrls: ['./live-location-tracker.component.css']
// })
// export class LiveLocationTrackerComponent implements OnInit, OnDestroy {
//   map!: L.Map;
//   marker!: L.Marker;
//   shortestRouteCoordinates: L.LatLng[] = [];
//   alternativeRouteCoordinates: L.LatLng[] = [];
//   movementInterval: any;

//   destination = L.latLng(18.5165, 73.8366); // Destination coordinates
//   speed = 100; // Movement speed in meters per second
//   routes: { coordinates: L.LatLng[], distance: number }[] = [];

//   customIcon = L.divIcon({
//     className: 'custom-div-icon',
//     html: `<div style="font-size: 2rem; color: #ff5722;"><i class="bi bi-bicycle"></i></div>`,
//     iconSize: [30, 42],
//     iconAnchor: [15, 21]
//   });

//   constructor() {}

//   ngOnInit(): void {
//     this.initializeMap();
//     this.trackAndMove();
//   }

//   ngOnDestroy(): void {
//     if (this.movementInterval) {
//       clearInterval(this.movementInterval);
//     }
//   }

//   initializeMap(): void {
//     this.map = L.map('map').setView([51.505, -0.09], 13);

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '© OpenStreetMap contributors'
//     }).addTo(this.map);
//   }

//   trackAndMove(): void {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(position => {
//         const startLatLng = L.latLng(position.coords.latitude, position.coords.longitude);

//         this.marker = L.marker(startLatLng, { icon: this.customIcon }).addTo(this.map);
//         this.map.setView(startLatLng, 13);

//         this.getRoutes(startLatLng, this.destination);
//       });
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   }

//   getRoutes(startLatLng: L.LatLng, destinationLatLng: L.LatLng): void {
//     const Directions = new ors.Directions({
//       api_key: 'your-api-key-here' // Replace with your OpenRouteService API key
//     });

//     Directions.calculate({
//       coordinates: [[startLatLng.lng, startLatLng.lat], [destinationLatLng.lng, destinationLatLng.lat]],
//       profile: 'cycling-regular', // Profile for cycling
//       format: 'geojson',
//       alternative_routes: {
//         share_factor: 0.6,
//         target_count: 2
//       }
//     })
//     .then((response: any) => {
//       this.routes = response.features.map((feature: any) => {
//         const coordinates = feature.geometry.coordinates.map((point: number[]) => L.latLng(point[1], point[0]));
//         const distance = feature.properties.segments.reduce((total: number, segment: any) => total + segment.distance, 0);
//         return { coordinates, distance };
//       });

//       this.showRoutes();
//     })
//     .catch((error: any) => {
//       console.error('Error fetching routes:', error);
//     });
//   }

//   showRoutes(): void {
//     // Sort routes by distance to identify the shortest route
//     this.routes.sort((a, b) => a.distance - b.distance);

//     // Shortest route (in blue)
//     this.shortestRouteCoordinates = this.routes[0].coordinates;
//     L.polyline(this.shortestRouteCoordinates, { color: 'blue', weight: 5 }).addTo(this.map);

//     // Alternative route(s) (in yellow)
//     for (let i = 1; i < this.routes.length; i++) {
//       this.alternativeRouteCoordinates = this.routes[i].coordinates;
//       L.polyline(this.alternativeRouteCoordinates, { color: 'yellow', weight: 3 }).addTo(this.map);
//     }

//     // Start moving along the shortest route
//     this.moveBicycleAlongRoute(this.shortestRouteCoordinates);
//   }

//   moveBicycleAlongRoute(route: L.LatLng[]): void {
//     let currentIndex = 0;

//     this.movementInterval = setInterval(() => {
//       if (currentIndex < route.length - 1) {
//         const currentLatLng = route[currentIndex];
//         const nextLatLng = route[currentIndex + 1];

//         this.marker.setLatLng(currentLatLng);
//         this.map.setView(currentLatLng, 13);

//         const distanceToNext = currentLatLng.distanceTo(nextLatLng);

//         if (distanceToNext < this.speed) {
//           currentIndex++;
//         } else {
//           // Move partially towards the next point
//           const angle = Math.atan2(
//             nextLatLng.lat - currentLatLng.lat,
//             nextLatLng.lng - currentLatLng.lng
//           );

//           const newLat = currentLatLng.lat + (this.speed / 111320) * Math.cos(angle);
//           const newLng = currentLatLng.lng + (this.speed / (111320 * Math.cos(currentLatLng.lat * (Math.PI / 180)))) * Math.sin(angle);

//           route[currentIndex] = L.latLng(newLat, newLng);
//         }
//       } else {
//         // Stop moving when reaching the destination
//         this.marker.setLatLng(route[route.length - 1]);
//         clearInterval(this.movementInterval);
//       }
//     }, 1000);
//   }
// }


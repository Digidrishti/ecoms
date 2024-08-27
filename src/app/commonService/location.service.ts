// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, interval } from 'rxjs';
// import { switchMap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class LocationService {

//   private serverUrl = 'http://localhost:3000'; // Replace with your Node.js server URL

//   constructor(private http: HttpClient) { }

//   startTrackingLocation(destination: { latitude: number, longitude: number }): Observable<any> {
//     return interval(5000)  // Update every 5 seconds
//       .pipe(
//         switchMap(() => this.getCurrentPosition()),
//         switchMap(position => this.sendLocation(position.latitude, position.longitude)),
//         switchMap(() => this.checkIfReachedDestination(destination))
//       );
//   }

//   getCurrentPosition(): Observable<any> {
//     return new Observable(observer => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             observer.next(position);
//             observer.complete();
//           },
//           (error) => observer.error(error)
//         );
//       } else {
//         observer.error('Geolocation is not supported by this browser.');
//       }
//     });
//   }

//   sendLocation(latitude: number, longitude: number): Observable<any> {
//     const url = `${this.serverUrl}/location`;
//     return this.http.post(url, { latitude, longitude });
//   }

//   checkIfReachedDestination(destination: { latitude: number, longitude: number }): Observable<any> {
//     // Implement logic to check if current position is close to destination
//     const distanceThreshold = 0.01; // Adjust as needed (in degrees)
//     return this.getCurrentPosition().pipe(
//       switchMap(position => {
//         const currentLat = position.coords.latitude;
//         const currentLng = position.coords.longitude;
//         const distance = this.calculateDistance(currentLat, currentLng, destination.latitude, destination.longitude);
//         if (distance <= distanceThreshold) {
//           return new Observable(observer => {
//             observer.next('Reached destination');
//             observer.complete();
//           });
//         } else {
//           return new Observable(observer => {
//             observer.next('Not reached yet');
//             observer.complete();
//           });
//         }
//       })
//     );
//   }

//   private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
//     // Simplified calculation for small distances (not suitable for large distances)
//     const R = 6371; // Radius of the earth in km
//     const dLat = this.deg2rad(lat2 - lat1);
//     const dLon = this.deg2rad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const d = R * c; // Distance in km
//     return d;
//   }

//   private deg2rad(deg: number): number {
//     return deg * (Math.PI / 180);
//   }
// }



import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  public socket: Socket;
  private updateInterval: any; // Store interval reference

  constructor() {
    this.socket = io('http://localhost:3000'); // Replace with your server URL
    this.startLocationUpdates(30); // Start updates every 30 seconds upon service initialization
  }

  sendLocation(location: { latitude: number, longitude: number }) {
    this.socket.emit('updateLocation', location);
  }

  getLocationUpdates() {
    return new Observable<{ id: string, location: { latitude: number, longitude: number } }>(observer => {
      this.socket.on('locationUpdate', (data) => {
        observer.next(data);
      });
    });
  }

  startLocationUpdates(intervalSeconds: number) {
    this.updateInterval = setInterval(() => {
      this.sendCurrentLocation();
    }, intervalSeconds * 1000); // Convert seconds to milliseconds
  }

  stopLocationUpdates() {
    clearInterval(this.updateInterval);
  }

  public sendCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        this.sendLocation(location);
      }, (error) => {
        console.error('Error getting location:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
}


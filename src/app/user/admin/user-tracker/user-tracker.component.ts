import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocationService } from 'src/app/commonService/location.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-tracker',
  templateUrl: './user-tracker.component.html',
  styleUrls: ['./user-tracker.component.scss']
})
export class UserTrackerComponent implements OnInit, OnDestroy {
  currentLocation!: { latitude: number, longitude: number };
  private locationUpdateSubscription!: Subscription;

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.requestLocationPermission();
    this.getLocationUpdates();
  }

  ngOnDestroy(): void {
    // Clean up subscriptions and interval
    this.locationUpdateSubscription.unsubscribe();
    this.locationService.stopLocationUpdates();
  }

  getLocationUpdates() {

    this.locationUpdateSubscription = this.locationService.getLocationUpdates().subscribe(data => {
      // Update current location when receiving updates
      if (data.id === this.locationService.socket.id) {
        this.currentLocation = data.location;
      }
    });
  }

  private requestLocationPermission() {
    debugger
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
        if (permissionStatus.state === 'granted') {
          console.log('Location permission granted.');
          // Permission already granted, start location updates
          this.locationService.startLocationUpdates(30);
        } else if (permissionStatus.state === 'prompt') {
          console.log('Location permission prompt.');
          // Ask user for permission
          navigator.geolocation.getCurrentPosition(() => {
            console.log('Location permission granted.');
            this.locationService.startLocationUpdates(30);
          }, (error) => {
            console.error('Error getting location:', error);
          });
        } else {
          console.log('Location permission denied.');
        }
      });
    } else {
      console.log('Geolocation permissions API not supported.');
    }
  }
}

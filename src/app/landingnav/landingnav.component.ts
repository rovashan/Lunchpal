import { Component, OnInit, ElementRef, ViewChild, HostListener  } from '@angular/core';
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-landingnav',
  templateUrl: './landingnav.component.html',
  styleUrls: ['./landingnav.component.scss']
})
export class LandingnavComponent implements OnInit {

  constructor( public authService: AuthService) { }
  @ViewChild('sidenav') sidenav: ElementRef;
  hideNavbarLogin = false;

  //check for click event to close the sidenav
  @HostListener("document:click", ["$event"])
  onClick(event) {
    if (event.target.closest(".sidenav") || event.target.closest(".icon")) {
      //console.log('event: ', event);
      return;
    } else {
      //console.log('close sidenav');
      this.sidenav.nativeElement.style.width = "0px";
    }

  }

  //check for resize event to hide the sidenav
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth > 599) {
      this.sidenav.nativeElement.style.width = "0px";
      this.hideNavbarLogin = false;
    } else {
      this.hideNavbarLogin = true;
    }
  }

  showMenu() {
    this.sidenav.nativeElement.style.width = "250px";
  }

  closeMenu() {
    this.sidenav.nativeElement.style.width = "";
  }
  
  userStatus = this.authService.userStatus;

  logout(event: Event) {
    event.preventDefault();
    this.authService.logOut();
  }
  ngOnInit() {
    this.authService.userStatusChanges.subscribe(x => this.userStatus = x);
  }

}

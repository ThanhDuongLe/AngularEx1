import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() featureSelected = new EventEmitter<string>();
  private userSub: Subscription;
  isAuthenticated = false;

  onSelect(feature: string){
    this.featureSelected.emit(feature);
  }

  constructor(private dataStorageService: DataStorageService, 
      private authService: AuthService,
      private router: Router) { }

  onSaveData(){
    console.log('Saving now...')
    this.dataStorageService.storeRecipes();
  }
  onFetchData(){
    console.log('Fetching now...')
    this.dataStorageService.fetchRecipes().subscribe();
  }
  onLogout(){
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user =>{
      this.isAuthenticated = !!user; // return true if not user and false if has user
      console.log(!user)
      console.log(!!user);
    })
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}

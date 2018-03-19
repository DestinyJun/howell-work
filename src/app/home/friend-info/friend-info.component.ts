import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';

@Component({
  selector: 'app-friend-info',
  templateUrl: './friend-info.component.html',
  styleUrls: ['./friend-info.component.css']
})
export class FriendInfoComponent implements OnInit {
  public title: string;
  constructor(
    private routeInfo: ActivatedRoute,
    private location: LocationStrategy
  ) {
    this.title = this.routeInfo.snapshot.params['title'];
  }

  ngOnInit() {
  }
  public goBack(): void {
    this.location.back();
  }
}

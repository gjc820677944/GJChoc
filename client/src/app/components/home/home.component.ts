import { Component, OnInit } from '@angular/core'
import { fadeInAnimation } from './../../animations/routerFader.component'

import { Fader } from './../../animations/fader.animation'

import { DataService } from './../../services/data.service'

@Component ({
	selector: 'my-accueil',
	templateUrl: 'home.component.html',
    animations: [
		fadeInAnimation,
		Fader()
	],
    host: { '[@fadeInAnimation]': '' }
})

export class HomeComponent {

	data;
	error: string = ''
	private visibility = "false"
	private loader = "true"

	constructor(
		private dataService: DataService
		) {

		this.dataService.getDataSubscribed().subscribe(data => {
        this.data = data;
        if (this.data) {
          this.visibility = "true";
          this.loader = "false";
        }
      }, err => console.log(err));

		this.dataService.initData();
	}

		ngOnInit() {

		}

}

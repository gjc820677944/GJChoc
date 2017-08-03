import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import { Response } from '@angular/http'
import { AuthHttp } from 'angular2-jwt'

import { Observable } from 'rxjs/Rx'
//import 'rxjs/add/observable/throw';

// Import RxJs required methods
//import 'rxjs/add/operator/map'
//import 'rxjs/add/operator/catch'

import { Subject } from 'rxjs/Subject'


import { Type } from './../objects/type'
//import { Product } from './../objects/product'
/*import 'rxjs/add/operator/toPromise'
*/
@Injectable()

export class DataService {

	private headers = new Headers({'Content-Type': 'application/json'});
  private baseUrl = "http://localhost/gjchoc/server/web/app_dev.php/api/"
  private urldatatypes = "types"
  private data : Type[];
  private subject = new Subject<any>();
  private category$ = new Subject<any>();



  constructor(private http: Http/*, private authHttp: AuthHttp => A activer pour l'authentification Client pour accéder aux url server protégés*/) { }

  loadData() : Observable<Type[]> {
		/*Au moment du chargement le l'App on recherche les données soit sur
		le serveur soit dans le service si elles sont déjà téléchargées */
		if (this.data) {
			return Observable.of(this.data);

		} else {
			return this.http.get(this.baseUrl+this.urldatatypes)
			.map((res: Response) =>
				res.json())
			.do(data => {
				//On enregistre sur une variable localle toutes les données chargées
				this.data = data
				//On envoit les données à tous les subscribes de l'observer "subject"
				this.sendData(data)
			})
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
		}
	}

	//Permet à tous les components d'appeler le subscribe sur les data une fois le sendData lancé
  getDataSubscribed(): Observable<any> {
    return this.subject.asObservable();
  }

  initData() {
    this.subject.next(this.data);
  }

  //On envoit les données à tous les subscribes de l'observer "subject"
  sendData(data) {
    this.subject.next(data);
  }

  getCategorySubscribed(): Observable<any> {
    return this.category$.asObservable();
  }

  sendCategory(category) {
    this.category$.next(category);
  }

  getType()
  {
    return this.data;
  }

/*
//---------------------------Exemples à conserver -------------------------//
  // Récupérer les Types seulement (sans les catégories et produits)
  getTypesOnly() {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      // ...using get request
      return this.http.get(this.baseUrl+'typesOnly')
      .map(res => res.json())
      //.do(data => this.data = data)
      .do(data => {this.data = data; console.log(data);})
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
  }

  // Récupérer les Types complet en passant vérifiant l'authentification token (dans le cas ou l'accès est sécurisé)
  getTypesAuth() {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      // ...using get request
      return this.authHttp.get(this.baseUrl+ 'types')
      .map(res => res.json())
      //.do(data => this.data = data)
      .do(data => {this.data = data; console.log(data);}) //ACTIVATION Console.log de data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
  }
  */

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}

}

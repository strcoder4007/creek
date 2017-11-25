import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

//import { LastfmAPI } from 'lastfmapi';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    authUrl: string = "http://www.last.fm/api/auth/?api_key=61e21b6df4d0b37c1d620cd3aeb4b261";

    constructor(private http: HttpClient) {

    }


    ngOnInit(): void {

        
        this.http.get(this.authUrl).subscribe(data => {
            console.log(data);
          });


        /*
        var lfm = new LastfmAPI({
            'api_key': '61e21b6df4d0b37c1d620cd3aeb4b261',
            'secret': '0f939f86d1ddf1ed8478273ba8576799'
        });

        lfm.track.getInfo({
            'artist' : 'Katatonia',
            'track' : 'criminals'
        }, function (err, track) {
            if (err) { throw err; }
            console.log(track);
        });
        */

    }

}

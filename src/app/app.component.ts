import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { lastfmapi } from 'lastfmapi';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    authUrl: string = "http://www.last.fm/api/auth/?api_key=1f762625bdaaa40a83a4cadaadb7bb0b";

    constructor(private http: HttpClient) {

    }


    ngOnInit(): void {


        this.http.get(this.authUrl).subscribe(data => {
            console.log(data);
        });


        
        var lfm = new lastfmapi({
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

    }

}


/*

Application name 	creek
API key 	1f762625bdaaa40a83a4cadaadb7bb0b
Shared secret 	afda92b2b83636322f4d637fe6c60580
Registered to 	strgamer4007


*/

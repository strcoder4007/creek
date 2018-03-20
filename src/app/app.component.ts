import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Md5 } from '../../node_modules/ts-md5/dist/md5.js';
import 'rxjs/Rx';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    sessionKey: String = "";
    getTracks: any;
    getArtists: any;
    getAlbums: any;
    myAlbums = [];

    constructor(private http: HttpClient) {
    }

    getposts(data) {
        return this.http.get(data);
    }

    ngOnInit(): void {
        var baseUrl = "http://localhost:4200/";
        //var baseUrl = "http://18.221.40.67/creek/";
        var apiKey = "bfbcadbcde949bde7890892ea8d9d698";
        var secret = "de862f563a00b72ee91db21269100cc7";
        //var tokenUrl = http://localhost:4200/?token=eWBfekFEsbSsI9x5JyuzL0NWReZcyWRB
        var curUrl = window.location.href;
        var apiSign = "";
        if (curUrl == baseUrl) {
            window.location.replace("http://www.last.fm/api/auth/?api_key=" + apiKey + "&cb=" + baseUrl);
        }
        else {
            var tokenUrl = window.location.href;
            var token = tokenUrl.split('=')[1];
            var authString = "api_key" + apiKey + "methodauth.getSessiontoken"+token+secret;
            var apiSig = Md5.hashStr(authString);
            let data = "http://ws.audioscrobbler.com/2.0/?method=auth.getSession&token=" + token + "&api_key=" + apiKey + "&api_sig=" + apiSig + "&format=json";
            this.getposts(data).subscribe((res) => {
                this.sessionKey = res['session']['key'];
            })

            let getArtistsUrl = "http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=strgamer4007&api_key=" + apiKey + "&format=json";
            this.getposts(getArtistsUrl).subscribe((res) => {
                this.getArtists = res['topartists']['artist'];
                for(let i = 0; i < this.getArtists.length; i++) {
                    let getAlbumsUrl = "http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + this.getArtists[i].name + "&api_key=" + apiKey + "&format=json";
                    this.getposts(getAlbumsUrl).subscribe((albumRes) => {
                        if(albumRes != undefined) {
                            this.getAlbums = albumRes['topalbums']['album'];
                            for(let j = 0; j < this.getAlbums.length; j++) {
                                let getAlbumInfoUrl = "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=" + apiKey + "&artist=" + this.getArtists[i].name + "&album=" + this.getAlbums[j].name + "&format=json";
                                this.getposts(getAlbumInfoUrl).subscribe((albumInfoRes) => {
                                    if(albumInfoRes['album'] != undefined) {
                                        if(albumInfoRes['album'].wiki != undefined) {
                                            let junk = albumInfoRes['album'].wiki.published;
                                            if(parseInt(junk.split(' ')[2]) >= 2017) {
                                                this.myAlbums.push(albumInfoRes['album']);
                                                console.log("selected album: ", albumInfoRes['album']);
                                            }
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
                
            })

        }

    }

}

/*
Application name 	creek
API key 	bfbcadbcde949bde7890892ea8d9d698
Shared secret 	de862f563a00b72ee91db21269100cc7
Registered to 	strgamer4007
*/

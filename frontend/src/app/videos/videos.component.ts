import { Component, OnInit } from '@angular/core';
// calls jquery
declare var jquery:any;

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
   var channelId = 'UCZmfiBEb2jFXskunSBqsjGA';
    var vidResults = 10;
    var googleKey = '';
    $(document).ready(function() {
        $.get (
            "https://www.googleapis.com/youtube/v3/channels",{
                part: 'contentDetails',
                id: channelId,
                key: googleKey
            },
            function(data) {
                $.each(data.items, function(i, item) {
                    console.log(item);
                    var pid = item.contentDetails.relatedPlaylists.uploads;
                    getVids(pid)
                })
            }
        );
       function getVids(pid) {
            $.get (
                "https://www.googleapis.com/youtube/v3/playlistItems",{
                    part: 'snippet',
                    maxResults: vidResults,
                    playlistId: pid,
                    key: googleKey
                },
                function(data) {
                    var output;
                    $.each(data.items, function(i, item) {
                        var videoTitle = item.snippet.title;
                        var videoId = item.snippet.resourceId.videoId;
                        output = '<li class="col-lg-5" style="display: inline-block; height: 450px; width: 100%; float:left; margin-bottom:20px;"><iframe height="350pc" width="100%" src=\"//www.youtube.com/embed/'+videoId+'?showinfo=0" allowfullscreen></iframe><p style="color:goldenrod;font-family: Aldrich";">'+videoTitle+'</p></li>';
                        $('#results').append(output);
                    })
                }
            );
        }
    });
  }
}
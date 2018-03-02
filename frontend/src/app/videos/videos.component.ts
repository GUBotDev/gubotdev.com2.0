import { Component, OnInit } from '@angular/core';
// calls jquery
declare var $:any;

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var channelName = 'destinws2';
    var vidResults = 10;
    var googleKey = '';
    $(document).ready(function() {
        $.get (
            "https://www.googleapis.com/youtube/v3/channels",{
                part: 'contentDetails',
                forUsername: channelName,
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
                        output = '<li class="list-inline-item col-lg-5"><iframe height="350pc" width="100%" src=\"//www.youtube.com/embed/'+videoId+'?showinfo=0" allowfullscreen></iframe><p style="color:goldenrod;font-family: Aldrich";">'+videoTitle+'</p></li>';
                        $('#results').append(output);
                    })
                }
            );
        }
    });
  }
}

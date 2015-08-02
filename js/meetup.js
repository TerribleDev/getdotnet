//requires two variables to be set externally:
//var meetupCount = [10];
//var showMeetupSource = true;

$(document).ready(function () {

    var meetupCount = 10;
    var showMeetupSource = false;
    var cmLogo =  "http://dotnetsocialweb.azurewebsites.net/assets/cm_logo.png";
    var mLogo = "http://dotnetsocialweb.azurewebsites.net/assets/meetup_logo.png";
    var dLogo = "http://dotnetsocialweb.azurewebsites.net/assets/net_logo.png"
    var defaultUrl ="https://twitter.com/DotNet/dotnet-user-groups";
    var cmBaseUrl ="http://www.communitymegaphone.com";
    var meetupBaseUrl="http://www.meetup.com/";
    var host = "http://dotnetsocial.cloudapp.net";
    //host = "http://localhost:63238/";
    var requestUrl = host + "/api/meetup?count=" + meetupCount + "&expiry=60";
    //requestUrl = "http://api.meetup.com/2/events?key=24657261295c237904a6b334343c50&member_id=self&page=" + meetupCount;

    var table ="<div class=table-responsive><table id=meetup-table-table></table></div>";
    var header ="<thead><th id=event-date>Date</th><th>Event</th><th>Group</th></thead>";
    var body="<tbody id=meetups><tr id=meetup-loading><td>Loading list of events ...</td></tbody>";

    $("#meetup-table").append(table);
    $("#meetup-table-table").addClass("table table-hover");
    $("#meetup-table-table").append(header).append(body);

    $.support.cors = true;
    $.getJSON(requestUrl, function (data) {
        var events;
        if (data.results == null)
            events = data;
        else
            events = data.results;

            if (showMeetupSource)
            {
                $("#event-date").after("<th></th>");
            }

            var renderLink = function (link, text) {
                var linkString = "<a href=\"" + link + "\">" + text + "</a>";
                return linkString;
                            };

            var startsWith = function (a, b) {
                return a.indexOf(b) == 0;
                            };

        $.each(events, function (key, event) {
            var groupUrl;
            var groupName;
            var eventImage;
            var imageRow = "";

            if (event.group == null) {
                groupUrl = event.group_url;
                groupName = event.group_name;
            }
            else {
                groupUrl = meetupBaseUrl + event.group.urlname;
                groupName = event.group.name;
            }
            
            if (showMeetupSource)
            {
                if (startsWith(event.event_url,meetupBaseUrl))
                    eventImage = mLogo;
                else if (startsWith(event.event_url, cmBaseUrl))
                    eventImage = cmLogo;
                else
                    eventImage = dLogo;

                if (event.event_url == null || event.event_url =="")
                {
                    event.event_url = defaultUrl;
                }

                imageRow = $("<td><a href=\""+ groupUrl +"\"><img width=40 src="+ eventImage + "></a></td>");
            }

            var date = $("<td>" + moment(event.time).format('dddd, MMMM Do YYYY') +"</td>");
            var eventDesc = $("<td>" + renderLink(event.event_url, event.name)  +"</td>");
            var group = $("<td>" + renderLink(groupUrl, groupName) +"</td>");
            var row = $("<tr></tr>").append(date).append(imageRow).append(eventDesc).append(group);

            $("#meetups").append(row);
        });
        $("#meetup-loading").remove();
    });
});

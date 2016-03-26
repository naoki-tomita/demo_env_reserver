( function( root ) {
  var $, ko, DemoEnvReserver, viewmodels, services;

  $ = root.$;
  ko = root.ko;
  DemoEnvReserver = root.DemoEnvReserver = root.DemoEnvReserver || {};
  viewmodels = DemoEnvReserver.viewmodels = DemoEnvReserver.viewmodels || {};
  services = DemoEnvReserver.services = DemoEnvReserver.services || {};

  viewmodels.CalendarManager = function( model ) {
    this.model = model;
    this.initializeCalendar();
    this.initializeEvents();
  };

  var p = viewmodels.CalendarManager.prototype;

  p.initializeEvents = function() {
    var that = this;
    this.model.on( "update", function() {
      var events = that.model.getSelectedEnv().reserves;
      that.removeAllEvents();
      for( var i = 0; i < events.length; i++ ) {
        that.setEvent( events[ i ].owner, events[ i ].start_time, events[ i ].end_time, events[ i ].description );
      }
    } );
  };

  p.removeAllEvents = function() {
    this.calendar.fullCalendar( "removeEvents" );
  };

  p.addEvent = function( owner, start, end, description ) {
    this.model.addEvent( owner, start, end, description );
  };

  p.setEvent = function( owner, start, end, description ) {
    console.log( [ owner, start, end, description ] );
    var eventData = {
      title: owner + ":" + description,
      start: start,
      end: end,
      allDay: false
    };
    this.calendar.fullCalendar( "renderEvent", eventData, true );
  };

  p.initializeCalendar = function() {
    var that = this;
    this.calendar = $("#calendar").fullCalendar({
      firstDay: 1,
      height: 400,
      header: {
        left: "prev,next today",
        center: "title",
        right: "month agendaWeek"
      },
      timezone: "local",
      defaultView: "agendaWeek",
      selectable: true,
      selectHelper: true,
      snapDuration: "00:15:00",
      slotDuration: "00:15:00",
      minTime: "09:00:00",
      maxTime: "18:00:00",
      select: function(start, end) {
        var title = prompt("Event Title:");
        if ( title ) {
          that.addEvent( title, start, end );
        }
        that.calendar.fullCalendar("unselect");
      },
      editable: true,
      eventLimit: true,
    });
    this.calendar.fullCalendar("today");
  };

} )( window );

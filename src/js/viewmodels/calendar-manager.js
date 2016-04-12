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
    this.initializeDialog();
  };

  var p = viewmodels.CalendarManager.prototype;

  p.initializeEvents = function() {
    var that = this;
    this.model.on( "update", function() {
      var events = that.model.getSelectedEnv().reserves;
      that.removeAllEvents();
      for( var i = 0; i < events.length; i++ ) {
        that.setEvent( events[ i ].id, events[ i ].owner, events[ i ].start_time, events[ i ].end_time, events[ i ].description );
      }
    } );
  };

  p.removeAllEvents = function() {
    this.calendar.fullCalendar( "removeEvents" );
  };

  p.addEvent = function( start, end ) {
    var that = this;
    $( "#js-txt-owner" ).val( "" );
    $( "#js-txt-description" ).val( "" );
    $( "#event_dialog" ).modal( "show" );
    $( "#js-lbl-time" ).html( calendarDateToString( start ) + " - " + calendarDateToString( end ) );
    $( "#js-btn-reserve" ).click( function() {
      var owner, description;
      owner = $( "#js-txt-owner" ).val();
      description = $( "#js-txt-description" ).val();
      that.model.addEvent( owner, start, end, description );
      that.calendar.fullCalendar( "unselect" );
      $( "#event_dialog" ).modal( "hide" );
      $( "#js-btn-reserve" ).unbind();
    } );
  };

  var calendarDateToString = function( calendarDate ) {
    return calendarDate.year() + "/" +
           fillByZero( calendarDate.month() + 1 ) + "/" +
           fillByZero( calendarDate.date() ) + " " +
           fillByZero( calendarDate.hour() ) + ":" +
           fillByZero( calendarDate.minute() );
  };

  var fillByZero = function( string ) {
    return fillIn( "0", 2, string )
  };

  var fillIn = function( fill, count, string ) {
    var fillStr = "";

    for( var i = 0; i < count; i++ ) {
      fillStr += fill;
    }

    return ( fillStr + string ).substr( -count );
  };

  p.setEvent = function( id, owner, start, end, description ) {
    console.log();
    var eventData = {
      id: id,
      title: owner + ":" + description,
      start: start,
      end: end,
      allDay: false
    };
    this.calendar.fullCalendar( "renderEvent", eventData, true );
  };

  p.updateEvent = function( event, revert ) {
    // どのイベントかを探し出す。たぶん、idとかかな。event名をパースして、idを取りだそう。
    var id = event.id;
    // ほんでupdateしよう
    this.model.updateEvent( id, event.start, event.end )
    .fail( revert );
  };

  p.initializeCalendar = function() {
    var that = this;
    this.calendar = $("#calendar").fullCalendar({
      firstDay: 1,
      height: 520,
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
      slotDuration: "00:30:00",
      minTime: "09:00:00",
      maxTime: "18:00:00",
      timeFormat: "H:mm",
      allDaySlot: false,
      select: function( start, end ) {
        that.addEvent( start, end );
      },
      editable: true,
      eventLimit: true,
      eventDrop: function( event, delta, revertFunc ) {
        that.updateEvent( event, revertFunc );
      },
      eventResize: function( event, delta, revertFunc ) {
        that.updateEvent( event, revertFunc );
      }
    });
    this.calendar.fullCalendar( "today" );
  };

  p.initializeDialog = function() {
    $( "#js-btn-close" ).click( function() {
      $( "#js-btn-reserve" ).unbind();
    } );
  };

} )( window );

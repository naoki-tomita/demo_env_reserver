( function( root ) {
  var $, ko, DemoEnvReserver, viewmodels, services;

  $ = root.$;
  ko = root.ko;
  DemoEnvReserver = root.DemoEnvReserver = root.DemoEnvReserver || {};
  viewmodels = DemoEnvReserver.viewmodels = DemoEnvReserver.viewmodels || {};
  services = DemoEnvReserver.services = DemoEnvReserver.services || {};

  // コンストラクタ
  viewmodels.DemoEnvReserver = function( model ) {
    this.model = model;
    this.koEnvList = ko.observable( { reserves: [] } );
    this.koSelectedEnv = ko.observable( null );
    this.koEnvName = ko.observable( null );
    this.koEnvDescription = ko.observable( null );
    this.koStartTime = ko.observable( null );
    this.koEndTime = ko.observable( null );
    this.koReserveDescription = ko.observable( null );
    this.koReserveOwner = ko.observable( null );
    this.koLastSelected = ko.observable( null );

    this.initializeEvents();
    this.model.update();
  };

  var p = viewmodels.DemoEnvReserver.prototype;

  p.update = function() {

  };

  // 以下、メソッド定義
  p.initializeEvents = function() {
    var that = this,
        addEnvDialog = document.getElementById( "addEnvDialog" ),
        addReserveDialog = document.getElementById( "addReserveDialog" ),
        envDlg = new root.DialogFx( addEnvDialog ),
        reserveDlg = new root.DialogFx( addReserveDialog );

    this.koSelectReserve = function( item ) {
      console.log( "koSelectReserve" );
    };

    this.koAddEnv = function() {
      console.log( "koAddEnv" );
      services.DemoDataClient.registerEnv( that.koEnvName(), that.koEnvDescription() )
      .then( function() {
        that.model.update();
        envDlg.toggle();
      } );

    };

    this.koAddReserve = function() {
      console.log( "koAddReserve" );
      var environment = this.koSelectedEnv().name,
          startTime = this.koStartTime(),
          endTime = this.koEndTime(),
          owner = this.koReserveOwner(),
          description = this.koReserveDescription();
      services.DemoDataClient.reserve( environment, startTime, endTime, owner, description )
      .then( function() {
        that.model.update();
        reserveDlg.toggle();
      } );
    };

    this.koOpenEnvDialog = function() {
      console.log( "koOpenEnvDialog" );
      envDlg.toggle(); // open!!
    };

    this.koDeleteReserve = function( reserve ) {
      services.DemoDataClient.cancel( reserve.env_name, reserve.start_time )
      .then( function() {
        that.model.update();
      } )
    };

    this.koOpenReserveDialog = function() {
      console.log( "koOpenReserveDialog" );
      reserveDlg.toggle(); // open!!
    };

    this.model.on( "update", function( obj ) {
      console.log( "updated!!" );
      for( var i = 0; i < obj.environments.length; i++ ) {
        obj.environments[ i ].reserves = [];
        for( var j = 0; j < obj.reserves.length; j++ ) {
          if( obj.environments[ i ].name === obj.reserves[ j ].env_name ) {
            obj.environments[ i ].reserves.push( obj.reserves[ j ] );
          }
        }
      }
      that.koEnvList( obj.environments );
      that.update();
    } );
  };

} )( window );
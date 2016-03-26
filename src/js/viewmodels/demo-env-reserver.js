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
    this.koEnvList = ko.observable( model.getReserves() );
    this.koSelectedEnv = ko.observable( model.getReserves()[ 0 ] );
    this.model.setSelectedEnv( this.koSelectedEnv() );
    this.koEnvName = ko.observable( null );
    this.koEnvDescription = ko.observable( null );

    this.initializeEvents();
    this.model.update();
  };

  var p = viewmodels.DemoEnvReserver.prototype;

  p.update = function() {

  };

  // 以下、メソッド定義
  p.initializeEvents = function() {
    var that = this;

    this.koSelectReserve = function( item ) {
      
    };

    this.koAddEnv = function() {

    };

    this.koAddReserve = function() {

    };

    this.koSelectEnv = function( item ) {
      that.model.setSelectedEnv( item );
      that.koSelectedEnv( item );
    };

    this.model.on( "update", function() {
      that.koEnvList( that.model.getReserves() );
      that.update();
    } );
  };

} )( window );

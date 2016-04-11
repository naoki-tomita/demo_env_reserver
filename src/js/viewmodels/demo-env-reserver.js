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
    this.model.setSelectedEnv( this.koSelectedEnv() ? this.koSelectedEnv().name : "" );
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
      // 予約をクリックしたら、その週を表示するとか？
    };

    this.koAddEnv = function() {

    };

    this.koAddReserve = function() {

    };

    this.koDeleteReserve = function( item ) {
      that.model.cancelEvent( item.start_time );
    };

    this.koSelectEnv = function( item ) {
      that.koSelectedEnv( item );
      that.model.setSelectedEnv( that.koSelectedEnv().name );
    };

    this.model.on( "update", function() {
      that.koSelectedEnv( that.model.getSelectedEnv() );
    } );
  };

} )( window );

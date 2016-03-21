( function( root ) {
  var $, ko, DemoEnvReserver, models, services;

  $ = root.$;
  ko = root.ko;
  DemoEnvReserver = root.DemoEnvReserver = root.DemoEnvReserver || {};
  models = DemoEnvReserver.models = DemoEnvReserver.models || {};
  services = DemoEnvReserver.services = DemoEnvReserver.services || {};

  // コンストラクタ
  models.DemoEnvReserver = function( reservedDatas ) {
    this.reservedDatas = reservedDatas;
  };

  var p = models.DemoEnvReserver.prototype;

  // 以下、メソッド定義

  p.getReservedDatas = function() {
    return this.reservedDatas;
  };

  p.update = function() {
    var that = this;
    services.DemoDataClient.environments()
    .then( function( result ) {
      that.environments = result;
      return services.DemoDataClient.show();
    } )
    .done( function( result ) {
      that.reserves = result;
      that.trigger( "update", {
        environments: that.environments,
        reserves: that.reserves
      } );
    } );
  };

  p.convert = function( reserves ) {

  }

  p.on = function( event, callback ) {
    this.events = this.events || {};
    this.events[ event ] = callback;
  };

  p.trigger = function( event, args ) {
    var callback = this.events[ event ];
    if ( !callback ) {
      return;
    }

    callback( args );
  };

} )( window );
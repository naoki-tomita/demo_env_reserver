( function( root ) {
  var $, ko, DemoEnvReserver, models, services, DemoDataClient;

  $ = root.$;
  ko = root.ko;
  DemoEnvReserver = root.DemoEnvReserver = root.DemoEnvReserver || {};
  models = DemoEnvReserver.models = DemoEnvReserver.models || {};
  services = DemoEnvReserver.services = DemoEnvReserver.services || {};
  DemoDataClient = services.DemoDataClient;

  // コンストラクタ
  models.DemoEnvReserver = function() {
  };

  var p = models.DemoEnvReserver.prototype;

  // 以下、メソッド定義

  p.setSelectedEnv = function( env ) {
    this.selectedEnv = env;
    this.trigger( "update" );
  };

  p.getSelectedEnv = function() {
    return this.selectedEnv;
  };

  p.addEvent = function( owner, start, end, description ) {
    var that = this;
    DemoDataClient.reserve( this.selectedEnv.name, owner, start, end, description )
    .then( function() {
      that.trigger( "update" );
    } );
  };

  p.addEnv = function( name, description ) {

  };

  p.initialize = function() {
    var that = this;
    this._fetchAll()
    .then( function() {
      that.trigger( "initialize" );
    } )
  };

  p.update = function() {
    var that = this;
    this._fetchAll()
    .then( function() {
      that.trigger( "update" );
    } )
  };

  p._fetchAll = function() {
    var that = this;
    return DemoDataClient.environments()
    .then( function( result ) {
      that.environments = result;
      return DemoDataClient.show();
    } )
    .then( function( result ) {
      that.reserves = result;
      that._convert();
    } );
  };

  p._convert = function() {
    for( var i = 0; i < this.environments.length; i++ ) {
      this.environments[ i ].reserves = [];
      for( var j = 0; j < this.reserves.length; j++ ) {
        if( this.environments[ i ].name === this.reserves[ j ].env_name ) {
          this.environments[ i ].reserves.push( this.reserves[ j ] );
        }
      }
    }
  };

  p.getReserves = function() {
    return this.environments;
  };

  p.on = function( event, callback ) {
    this.events = this.events || {};
    this.events[ event ] = this.events[ event ] || [];
    this.events[ event ].push( callback );
  };

  p.trigger = function( event, args ) {
    var callbacks = this.events[ event ];
    if ( !callbacks ) {
      return;
    }
    for( var i = 0; i < callbacks.length; i++ ) {
      callbacks[ i ]( args );
    }
  };

} )( window );

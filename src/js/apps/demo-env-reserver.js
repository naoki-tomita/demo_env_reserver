( function( root ) {
  var $, ko, DemoEnvReserver, apps, models, viewmodels, services;

  $ = root.$;
  ko = root.ko;
  DemoEnvReserver = root.DemoEnvReserver = root.DemoEnvReserver || {};
  apps = DemoEnvReserver.apps = DemoEnvReserver.apps || {};
  models = DemoEnvReserver.models = DemoEnvReserver.models || {};
  viewmodels = DemoEnvReserver.viewmodels = DemoEnvReserver.viewmodels || {};
  services = DemoEnvReserver.services = DemoEnvReserver.services || {};

  // コンストラクタ
  apps.App = function() {

  };

  var p = apps.App.prototype;

  // 以下、メソッド定義

  /**
   * 初期化を行います。
   */
  p.initialize = function() {
    this._initizlizeModelsAndViewModels();
  };

  p._initizlizeModelsAndViewModels = function() {
    var vm, model, calendar;
    model = new models.DemoEnvReserver();
    model.on( "initialize", function() {
      vm = new viewmodels.DemoEnvReserver( model );
      calendar = new viewmodels.CalendarManager( model );
      ko.applyBindings( vm );
    } );
    model.initialize();
  };

} )( window );

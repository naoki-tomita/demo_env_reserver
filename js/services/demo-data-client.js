( function( root ) {
  var $, ko, DemoEnvReserver, apps, models, viewmodels, services;

  $ = root.$;
  DemoEnvReserver = root.DemoEnvReserver = root.DemoEnvReserver || {};
  services = DemoEnvReserver.services = DemoEnvReserver.services || {};

  // 特にコンストラクトする必要性を感じないので、適当なオブジェクトでいいや。
  services.DemoDataClient = {
    // 定数定義
    constants: {
      environments: {
        all: "/environments",
        register: "/environments/register",
        update: "/environments",
        delete: "/environments/unregister"
      },
      reservations: {
        show: "/reservations/show",
        cancel: "/reservations/cancel",
        reserve: "/reservations/reserve"
      }
    },

    _get: function( path, header, body ) {

    },

    _post: function( path, header, body ) {

    },

    environments: function() {

    },

    registerEnv: function( name, description ) {

    },

    updateEnv: function( name, description ) {

    },

    deleteEnv: function( name, description ) {

    },

    reserve: function( environment, startTime, endTime, owner, description ) {

    },

    cancel: function( name, startTime ) {

    },

    show: function() {

    }
  };

  if ( true ) {
    services.DemoDataClient = {
      resolver: function( dfd, data ) {
        setTimeout( function() {
          dfd.resolve( data );
        }, 1000 );

      },
      environments: function() {
        var dfd = $.Deferred();
        this.resolver( dfd, [ {
          "name":"si_dev",
          "description":null
        }, {
          "name":"si_demo",
          "description":"test"
        }, {
          "name":"si_hoge",
          "description":"test"
        }, {
          "name":"si_hog",
          "description":"test"
        } ] );
        return dfd.promise();
      },

      registerEnv: function( name, description ) {
        return $.Deferred().resolve().promise();
      },

      updateEnv: function( name, description ) {
        return $.Deferred().resolve().promise();
      },

      deleteEnv: function( name, description ) {
        return $.Deferred().resolve().promise();
      },

      reserve: function( environment, startTime, endTime, owner, description ) {
        return $.Deferred().resolve().promise();
      },

      cancel: function( name, startTime ) {
        return $.Deferred().resolve().promise();
      },

      show: function() {
        var dfd = $.Deferred();
        this.resolver( dfd, [ {
            "id":12,
            "env_name":"si_hoge",
            "start_time":"2016-03-04T00:30:00.000Z",
            "end_time":"2016-03-05T00:15:00.000Z",
            "description":"hoge",
            "owner": null
          }, {
            "id":14,
            "env_name":"si_hog",
            "start_time":"2016-03-04T00:30:00.000Z",
            "end_time":"2016-03-05T00:15:00.000Z",
            "description":"fuga!!!!!",
            "owner": "上田二郎"
          } ] );
        return dfd.promise();
      }
    };
  }

} )( window );
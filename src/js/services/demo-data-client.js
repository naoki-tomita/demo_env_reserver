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
        all: "/",
        register: "/environments/register",
        update: "/environments",
        delete: "/environments/unregister"
      },
      reservations: {
        show: "/environments/reservations/show",
        cancel: "/environments/reservations/cancel",
        reserve: "/environments/reservations/reserve",
        update: "/environments/reservations/update"
      }
    },

    baseUrl: "http://mut-slave.nsp.ricoh.co.jp/env_manager",

    _get: function( path, header, body ) {
      return $.ajax( {
        type: "GET",
        url: this.baseUrl + path,
        headers: header,
        data: JSON.stringify( body )
      } );
    },

    _post: function( path, header, body ) {
      return $.ajax( {
        type: "POST",
        url: this.baseUrl + path,
        headers: header,
        data: JSON.stringify( body )
      } );
    },

    _delete: function( path, header, body ) {
      return $.ajax( {
        type: "DELETE",
        url: this.baseUrl + path,
        headers: header,
        data: JSON.stringify( body )
      } );
    },

    _put: function( path, header, body ) {
      return $.ajax( {
        type: "PUT",
        url: this.baseUrl + path,
        headers: header,
        data: JSON.stringify( body )
      } );
    },

    environments: function() {
      return this._get( this.constants.environments.all );
    },

    registerEnv: function( name, description ) {
      return this._post( this.constants.environments.register,
                         {
                           "Content-Type": "application/json"
                         }, {
                           name: name,
                           description: description
                         } );
    },

    updateEnv: function( name, description ) {
      return this._post( this.constants.environments.update + "/" + name,
                         {
                           "Content-Type": "application/json"
                         }, {
                           name: name,
                           description: description
                         } );
    },

    deleteEnv: function( name, description ) {
      return this._delete( this.constants.environments.delete,
                           {
                             "Content-Type": "application/json"
                           }, {
                             name: name,
                             description: description
                           } );
    },

    reserve: function( environment, startTime, endTime, owner, description ) {
      return this._post( this.constants.reservations.reserve,
                         {
                           "Content-Type": "application/json"
                         },
                         {
                           env_name: environment,
                           start_time: startTime,
                           end_time: endTime,
                           owner: owner,
                           description: description
                         } );
    },

    update: function( environment, id, startTime, endTime, owner, description ) {
      return this._put( this.constants.reservations.update,
                         {
                           "Content-Type": "application/json"
                         },
                         {
                           id: id,
                           env_name: environment,
                           start_time: startTime,
                           end_time: endTime,
                           owner: owner,
                           description: description
                         } );
    },

    cancel: function( name, startTime ) {
      return this._delete( this.constants.reservations.cancel,
                           {
                             "Content-Type": "application/json"
                           }, {
                             env_name: name,
                             start_time: startTime
                           } );
    },

    show: function() {
      return this._get( this.constants.reservations.show );
    }
  };

  if ( false ) {
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

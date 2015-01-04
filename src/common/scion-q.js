define(['q', 'scion'], function(q, scion){

  return function(scxmlPath){

    var d = q.defer();

    requirejs(['text!' + scxmlPath], function(scxml){

      scion.documentStringToModel(scxml,function(err, model){
        if(err){
          d.reject(err);
        }else{

          var interpreter = new scion.SCXML(model);
          interpreter.start();

          d.resolve(interpreter);

        }
      });

    });

    return d.promise;

  };

});
define(['q', 'jquery'], function(q, $){

    var d = q.defer();

    $(d.resolve);

    return d.promise;

});
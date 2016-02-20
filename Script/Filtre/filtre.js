var app = angular.module('myApp');

app.filter('toArray', function () {
    'use strict';

    return function (obj) {
        if (!(obj instanceof Object)) {
            return obj;
        }

        return Object.keys(obj).map(function (key) {
			var objTemp = obj[key];
			objTemp.$id = key;
			return objTemp;
        });
    }
});

app.filter('tel', function () {
    return function (tel) {
        var telephone = tel;
        if(tel.length==10) {
            var telephone = tel.slice(0, 3) + '-' + tel.slice(3,6) + '-' + tel.slice(6);
        } else {
            var telephone = tel.slice(0, 3) + '-' + tel.slice(3);
        }
        return telephone.trim();
    };
});
'use strict';

var app = angular.module('eatz', ['ngRoute', 'store-products', 'navbarapp'])
    .config(['$routeProvider',
        function($routeProvider){
            $routeProvider.when('/', {
                templateUrl: 'tpl/home.html'
            })
                .when('/products', {
                    templateUrl:'tpl/product-list.html'
                })
                .otherwise({
                    templateUrl:'tpl/404.html'
                });
        }])
    .controller('StoreController', ['$http', '$scope', function($http, $scope){
        $http.get('/public/js/models/products.json').success(function(data){
            //console.log($scope);
            $scope.store.products = data;
        });
        $scope.orderProp = 'price';
    }])
    .controller('ReviewController', function(){
        this.review = {};
        this.addReview = function(product){
            this.review.createdOn = Date.now();
            product.reviews.push(this.review);
            this.review = {};
        };
    });



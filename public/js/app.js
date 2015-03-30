'use strict';

var app = angular.module('eatz', ['ngRoute', 'store-products'])
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
    .controller('StoreController', ['$http',function($http){
        var store = this;
        store.products = [];
        $http.get('/public/js/models/products.json').success(function(data){
            store.products = data;
            store.products.orderProp = 'price';
        });
    }])
    .controller('ReviewController', function(){
        this.review = {};
        this.addReview = function(product){
            this.review.createdOn = Date.now();
            product.reviews.push(this.review);
            this.review = {};
        };
    });



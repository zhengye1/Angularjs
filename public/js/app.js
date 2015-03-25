var app = angular.module('eatz', ['store-products'])
				 .controller('StoreController', ['$http', function($http){
					var store = this;
                    store.products = [];
                    $http.get('/public/js/models/products.json').success(function(data){
                        store.products = data;
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



/**
 * Created by zhenye1 on 24/03/15.
 */
angular.module('store-products', [])
    .directive('productTitle', function(){
        return {
            restrict:'E', //E for element
            templateUrl:'tpl/product-title.html'
        };
    })
    .directive('productPanels', function(){
        return{
            restrict:'E',
            templateUrl:'tpl/product-panels.html',
            controller:function(){
                this.tab = 1;
                this.selectTab = function(setTab){
                    this.tab = setTab;
                };
                this.isSelected = function(checkTab){
                    return this.tab === checkTab;
                };
            },
            controllerAs: 'panels'
        };
    });
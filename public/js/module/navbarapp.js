/**
 * Created by zhengye1 on 30/03/15.
 */
angular.module('navbarapp', [])
    .directive("bootstrapNavbar", function() { // (1)
        return {
            restrict: "E",         // (2)
            replace: true,         // (3)
            transclude: true,      // (4)
            templateUrl: "tpl/header.html",    // (5)
            compile: function(element, attrs) {
                var li, liElements, links, index, length;
                liElements = $(element).find("#bs-example-navbar-collapse-1 li");
                for (index = 0, length = liElements.length; index < length; index++) {
                    li = liElements[index];
                    links = $(li).find("a");
                    if ($(links[0]).textContent === attrs.currentTab)
                        $(li).addClass("active");
                }
            }
        }})
    .controller("HomeController", ['$scope', function($scope){$scope.pageName="Home";}])
    .controller("ProductController", ['$scope', function($scope){$scope.pageName="Products";}]);
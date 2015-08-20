var $controller;
var ngModule;

describe("FromController", function () {
    beforeEach(
        angular.mock.module('app')
    );
    beforeEach( angular.mock.inject( function(_$controller_){
        $controller = _$controller_;
    }));

    it("should default full name", function () {
        var $scope = {};
        var formController = $controller('FormController', { $scope: $scope });
        $scope.setFullName();
        expect($scope.fullName).to.equal("Marty McFly");
    });
    it("changing names should update fullName", function () {
        var $scope = {};
        var formController = $controller('FormController', { $scope: $scope });
        $scope.formData.firstName = "Biff";
        $scope.formData.lastName = "Tannen";
        $scope.setFullName();
        expect($scope.fullName).to.equal("Biff Tannen");
    });
});
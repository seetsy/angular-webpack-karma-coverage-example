module.exports = function(ngModule) {
    ngModule.controller('FormController', function($scope) {
        $scope.formData = {
            firstName: "Marty",
            lastName : "McFly"
        };

        $scope.setFullName = function() {
            $scope.fullName = $scope.formData.firstName + " " + $scope.formData.lastName;
            console.log("FullName: " + $scope.fullName);
        };

        $scope.onInputChange = function() {
            $scope.setFullName();
        };
        $scope.setFullName();
    });

};
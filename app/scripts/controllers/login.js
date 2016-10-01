'use strict';

angular.module('bodegaUninorteApp')
	.controller('LoginCtrl', function ($scope, loginService, $location, $rootScope) {

		$scope.user = {
			email: '',
			password: ''
		};

		$scope.login = function(data){			
			loginService.login(data).then(
				function successCallBack (response) {
					var token = response.data.token;
					var type = response.data.type;					
					loginService.setToken(token, type ,data.remember_me);
					$location.path('/dashboard');
					if (!$rootScope.$$phase){
					 	$rootScope.$apply();
					}
				},
				function errorCallBack (response) {
					console.log(response);
				}
			);
		};

		$scope.disableLoginButton = function (user) {
			var checkEmail = false 
			if (user.email == undefined){
				checkEmail = true;				
			}else{
				if(user.email == ''){
					checkEmail = true;
				}
			}			

			var checkPassword = false; 
			if (user.password == undefined){
				checkPassword = true;				
			}else{
				if(user.password == ''){
					checkPassword = true;
				}
			}
			 
		 	return checkEmail || checkPassword;
		}

	});

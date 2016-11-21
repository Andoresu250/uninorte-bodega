'use strict';

angular.module('bodegaUninorteApp')
	.controller('LoginCtrl', function ($scope, loginService, toastService, $state) {

		$scope.user = {
			email: '',
			password: ''
		};

		$scope.login = function(data){
			$scope.loading = true;
			loginService.login(data).then(
				function successCallBack (response) {
					//$scope.loading = false;
					var token = response.data.token;
					var type = response.data.type;
					loginService.setToken(token, type ,data.remember_me);
					switch (type) {
						case "admin":
							$state.go('dashboard.users');
							break;
						default:
							$state.go('dashboard.orders');
							break;
					}
				},
				function errorCallBack (response) {
					$scope.loading = false;
					if(response.status == 400){
							toastService.show("Contraseña o email incorrectos");
					}
					if(response.status == -1){
						toastService.show("Error en la conexion con el servidor. verifique su conexion de internet y refresque la pagina, si el error persiste comuniquese con el administrador del sistema");
					}
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

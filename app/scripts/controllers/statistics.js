'use strict';

angular.module('bodegaUninorteApp')
	.controller('StatisticsCtrl', function ($scope, statisticsService, toastService) {

		$scope.initTable = function () {
			$scope.selected = [];
			$scope.limitOptions = [15];

			$scope.options = {
				rowSelection: false,
				multiSelect: false,
				autoSelect: false,
				decapitate: false,
				largeEditDialog: true,
				boundaryLinks: true,
				limitSelect: false,
				pageSelect: false
			};

			$scope.query = {
				order: 'name',
				limit: 5,
				page: 1
			};

			$scope.toggleLimitOptions = function () {
				$scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
			};
		}

		$scope.search = function (data) {
			var d = {};
			var initDate = moment(data.date_in);
			var endDate = moment(data.date_end);
			d.date_in = dateToString(initDate);
			d.date_end = dateToString(endDate);
			d.item_name = data.item_name;
			d.item_id = data.item_id;
			$scope.loading = true;
			$scope.ready = false;
			$scope.historics = [];
			$scope.charts = [];
			$scope.globalChart = {
				data: [0,0,0,0],
				//labels : ["aprobado", "cancelado", "entregado", "rechazado"]
				labels : ["aprobado", "cancelado"],
				color : ['#4CAF50', '#C62828', '#2196F3', '#FF5722']
			};
			statisticsService.get(d).
				then(
					function successfullCallback(response) {
						$scope.loading = false;
						$scope.ready = true;
						$scope.historics = response.data.data.historic_all;
						console.log($scope.historics);
						for(var his of $scope.historics){
							$scope.globalChart.data[0] += parseInt(his.aprobado);
							$scope.globalChart.data[1] += parseInt(his.cancelado);
							//$scope.globalChart.data[0] += his.entregado;
							//$scope.globalChart.data[0] += his.rechazado;
							$scope.charts.push({
								name: his.name_item,
								//data: [his.aprobado, his.cancelado, his.entregado, his.rechazado],
								//labels : ["aprobado", "cancelado", "entregado", "rechazado"]
								data: [his.aprobado, his.cancelado],
								labels : ["aprobado", "cancelado"],
								color : ['#4CAF50', '#C62828', '#2196F3', '#FF5722']
							});
						}
					},
					function errorCallback(response) {
						$scope.historics = [];
						$scope.loading = false;
						$scope.ready = false;
						if(response.data != null){
							var msg = "";
							for(var error of response.data){
								msg += error + " ";
							}
							toastService.show(msg);
						}
						if(response.status == -1){
							toastService.show("Error en la conexion con el servidor. verifique su conexion de internet y refresque la pagina, si el error persiste comuniquese con el administrador del sistema");
						}
					}
				);
		}

		$scope.loadAllData = function () {
			$scope.loading = true;
			$scope.ready = false;
			$scope.historics = [];
			$scope.charts = [];
			$scope.globalChart = {
				data: [0,0,0,0],
				//labels : ["aprobado", "cancelado", "entregado", "rechazado"]
				labels : ["aprobado", "cancelado"],
				color : ['#4CAF50', '#C62828', '#2196F3', '#FF5722']
			};
			statisticsService.all().
				then(
					function successfullCallback(response) {
						$scope.loading = false;
						$scope.ready = true;
						$scope.historics = response.data.data.historic_all;
						for(var his of $scope.historics){
							$scope.globalChart.data[0] += parseInt(his.aprobado);
							$scope.globalChart.data[1] += parseInt(his.cancelado);
							//$scope.globalChart.data[0] += his.entregado;
							//$scope.globalChart.data[0] += his.rechazado;
							$scope.charts.push({
								name: his.name_item,
								//data: [his.aprobado, his.cancelado, his.entregado, his.rechazado],
								//labels : ["aprobado", "cancelado", "entregado", "rechazado"]
								data: [his.aprobado, his.cancelado],
								labels : ["aprobado", "cancelado"],
								color : ['#4CAF50', '#C62828', '#2196F3', '#FF5722']
							});
						}
					},
					function errorCallback(response) {
						$scope.historics = [];
						$scope.loading = false;
						$scope.ready = false;
						if(response.data != null){
							var msg = "";
							for(var error of response.data){
								msg += error + " ";
							}
							toastService.show(msg);
						}
						if(response.status == -1){
							toastService.show("Error en la conexion con el servidor. verifique su conexion de internet y refresque la pagina, si el error persiste comuniquese con el administrador del sistema");
						}
					}
				);
		}

		function dateToString(date) {
			var day = (date.date() <= 9) ? ("0" + date.date()) : date.date();
			var month = (date.month() + 1 <= 9) ? ("0" + (date.month() + 1)) : (date.month() + 1);
			return date.year() + "-" + month + "-" + day;
		}

	});

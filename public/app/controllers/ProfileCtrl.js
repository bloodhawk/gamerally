app.controller('ProfileCtrl', function($scope, userSvc, userData, ModalService){
	$scope.user = userData;
	$scope.gameTitle = '';
	$scope.searchGame = function(){
		if(!$scope.gameTitle) return;
		userSvc.getGameByTitle($scope.gameTitle).then(function(games){
			$scope.sGames = games;
		}, function(err){
			//swal that there was an error, or no results.
		})
	};
	$scope.addGame = function(game){
		userSvc.setCurGame(game.title);
		ModalService.showModal({
          templateUrl: "app/modaltemplates/gameTime.html",
          controller: "gameTime"
        }).then(function(modal) {
          modal.close.then(function(times) {
             if(!times){
             	return;
             } else {
             	game.avail = times;
             	userSvc.postGame(game).then(function(updated){
             		console.log(typeof updated);
             		if(updated === 'false'){
             			swal("Oops...", "You've already added this game before", "error");
             		} else {
             			swal("Woot!", "Your game has been added!", "success")
             		}
             	});
             }
          });
        });
	};
});
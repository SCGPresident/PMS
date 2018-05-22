
(function () {
  angular
    .module('pms')    
    .controller('MainController', MainController);

  // 로그인 컨트롤러
  function MainController($log, $rootScope, $scope, $http, $state, $location, $sessionStorage, $document, $window, SHA256) {
    const vm = this;
    vm.log = $log.log;

    vm.log('Main controller loaded');

    vm.scope = $scope.scope;

          vm.query = {
          order: -1 * 'id',
          limit: 7,
          page: 1
      };

    // 더미 데이터베이스
    vm.datas = 
    [
    {
        p_name : "AngularJs",
        td_name : "AngularJs 독서",
        u_name : "이창원",
        startdate : "5/21",
        duedate : "6/11",
        done : true,
    },
    {
        p_name : "AngularJs",
        td_name : "AngularJs 공부하기",
        u_name : "김윤지",
        startdate : "5/23",
        duedate : "6/14",
        done : true,
    },
    {
        p_name : "AngularJs",
        td_name : "AngularJs 게시판 만들기",
        u_name : "조건희",
        startdate : "5/28",
        duedate : "6/2",
        done : false,
    },
    {
        p_name : "project A",
        td_name : "REST DOCUMENT 작성하기",
        u_name : "고현수",
        startdate : "5/29",
        duedate : "6/12",
        done : false,
    },
    {
        p_name : "project A",
        td_name : "DB 스키마 만들기",
        u_name : "김병남",
        startdate : "5/21",
        duedate : "6/11",
        done : true,
    },
    {
        p_name : "project B",
        td_name : "레이아웃 작업하기",
        u_name : "류민재",
        startdate : "5/21",
        duedate : "6/11",
        done : true,
    },
    {
        p_name : "project B",
        td_name : "Config 파일 작성",
        u_name : "오영환",
        startdate : "5/21",
        duedate : "6/11",
        done : false,
    },
	];

    vm.delete = function(p_id, id){
      let cf = confirm("삭제하시겠습니까?");
      if (cf) {
        $http.post('/main'+board_id+'/postDelete/'+id);
        $http.post('/main/filedelete/'+id);
        alert('게시글이 삭제되었습니다.');
        location.reload();
      }
    };


    // 사용자 구분
    $http.get('/session').then(successCallback, errorCallback);
    function successCallback(response){
      //vm.$log.log(response);
      if(response.data.auth==10) vm.state = "admin";
      else if(response.data.auth<10 && response.data.auth >= 0) vm.state = "user";
    }
    function errorCallback(error) {
      vm.$log.log(error, 'can not get data.');
    }

    // 글 목록 가져오기
    $http.get('/main/1/main_post').then(function(response) {
      for(var i=0; i<response.data.length; i++) {
        response.data[i].updatedAt = response.data[i].updatedAt.split("T")[0];
      }
      vm.datas = response.data;
    });

    vm.remain = function () {
    	let remainCount = 0;
    	angular.forEach(vm.datas, function(value, key) {
    		if (value.done === false) {
    			remainCount++
    		}
    	})
    	return remainCount
    };

  };

}());

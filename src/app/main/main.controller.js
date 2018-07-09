(function () {
  angular
    .module('pms')
    .controller('MainController', MainController);

  // 메인 컨트롤러
  function MainController($log, $http, $location, $sessionStorage) {
    const vm = this;
    vm.lists = [];

    // /////// 소속 프로젝트 불러오기 //////////


    $http.get('/rest/session').then((result) => {
      vm.uid = result.data.uid;
      $http.get(`/rest/project/${vm.uid}`).then((res) => {
        vm.datas = res.data;
      });
    });

    vm.log = $log.log;
    vm.session = $sessionStorage.getObject('session');
    vm.query = {
      order: 'pid',
      limit: 7,
      page: 1
    };

    vm.delete = (pid) => {
      const cf = window.confirm('Delete?');
      if (cf) {
        $http.delete(`/${vm.session.uid}/project/${pid}`);
        alert('Article has been deleted.');
        $location.reload();
      }
    };


    // 사용자 구분
    /* $http.get('/session').then(successCallback, errorCallback);
    function successCallback(response){
      //vm.$log.log(response);
      if(response.data.auth===10) vm.state = "admin";
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
    }); */

    vm.remainingTodos = () => {
      const count = vm.lists.reduce((accumulator, currentValue) => {
        if (currentValue.done === null) return accumulator + 1;
        return accumulator;
      }, 0);

      return count;
    };


    vm.initView = () => {
      vm.pid = vm.stateParams.pid;
      $http.get(`/rest/admin/project/${vm.stateParams.pid}`).then((result) => {
        vm.project = result.data;
      });
      $http.get(`/rest/project/pmpid/${vm.stateParams.pid}`).then((result) => {
        vm.todoes = result.data;
        console.log(result.data);
      });
      $http.get(`/rest/project/pmuid/${vm.stateParams.pid}`).then((result) => {
        vm.users = result.data;
      });
    };

    vm.strconvert = (strdate) => {
      const date = new Date(strdate);
      return date.format();
    };

    Date.prototype.format = function () {
      const mm = this.getMonth() + 1; // getMonth() is zero-based
      const dd = this.getDate();
      const hh = this.getHours();
      const m = this.getMinutes();
      const ss = this.getSeconds();
      return `${[this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
      ].join('-')}/${[
        (hh > 9 ? '' : '0') + hh,
        (m > 9 ? '' : '0') + m,
        (ss > 9 ? '' : '0') + ss
      ].join(':')}`;
    };
    $http.get('/rest/session').then(successCallback, errorCallback);

    function successCallback(response) {
      // vm.$log.log(response);
      if (response.data.auth === 1) vm.state = 'admin';
      else if (response.data.auth === 0 && response.data.auth > 1) vm.state = 'user';
    }

    function errorCallback(error) {
      vm.log(error, 'can not get data.');
    }
  }
}());

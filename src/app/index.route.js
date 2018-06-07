(function () {
  angular
    .module('pms')
    .config(routeConfig);

  function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
      .state('pms', {
        views: {
          header: { templateUrl: 'app/layout/header.html' },
          sidebar: { templateUrl: 'app/layout/sidebar/sidebar.html' },
          content: { template: '<ui-view />' },
          footer: { templateUrl: 'app/layout/footer.html' }
        }
      })
      .state('pm', {
        parent: 'pms',
        params: { user: 'pm' }
      })
      .state('admin', {
        parent: 'pms',
        params: { user: 'admin' }
      })
      .state('main', {
        parent: 'pms',
        url: '/main',
        templateUrl: 'app/main/main.html',
        controllerAs: 'MainController',
        params: { title: 'Main Page'} 
        //메인 페이지
      })
      .state('login', {
        url: '/login',
        views: {
          content: { templateUrl: 'app/layout/login.html' },
          footer: { templateUrl: 'app/layout/footer.html' }
        }
      })
      .state('loginRegister', {
        url: '/loginRegister',
        views: {
          content: { templateUrl: 'app/layout/loginRegister.html' },
          footer: { templateUrl: 'app/layout/footer.html' }
        }
      })
      .state('adminProject', {
        parent: 'pms',
        url: '/admin/project',
        templateUrl: 'app/admin/project/admin.project.html',
        controllerAs: 'AdminProjectController',
        params: { title: 'Admin : Main Page' }
        // 관리자 페이지
      })
      .state('adminProjectView', {
        parent: 'pms',
        url: '/admin/project/:pid',
        templateUrl: 'app/admin/project/admin.project.view.html',
        controllerAs: 'AdminProjectController',
        params: { title: 'Admin : Main Page' }
        // 프로젝트 페이지
      })
      .state('adminProjectWrite', {
        parent: 'pms',
        url: '/admin/project/write',
        templateUrl: 'app/admin/project/admin.project.write.html',
        controllerAs: 'AdminProjectController',
        params: { title: 'Admin : Add Project' }
        // 프로젝트 추가
      })
      .state('adminProjectModify', {
        parent: 'pms',
        url: '/admin/project/modify/:pid',
        templateUrl: 'app/admin/project/admin.project.modify.html',
        controllerAs: 'AdminProjectController',
        params: { title: 'Admin : Modify Project' }
      })
      //프로젝트 수정
      .state('adminUsers', {
        parent: 'pms',
        url: '/admin/users',
        templateUrl: 'app/admin/account/admin.users.html',
        controllerAs: 'AdminUsersController',
        params: { title: 'Admin : User List' }
      // 유저 목록
      })
      .state('adminUserModify', {
        parent: 'pms',
        url: '/admin/user/modify/:modify_id',
        templateUrl: 'app/admin/account/admin.users.modify.html',
        controllerAs: 'AdminUsersModifyController',
        params: { title: 'Admin : User Information' }
      // 유저 상세 정보
      })
      .state('adminUsersTodo', {
        parent: 'pms',
        url: '/admin/user/todo/:todo_id/:todo_pid/:todo_proj',
        templateUrl: 'app/admin/account/admin.users.todo.html',
        controllerAs: 'AdminUsersTodoController',
        params: { title: 'User Todo Information' }
      // 유저 투두 상세 정보
      })
      .state('/project', {
        parent: 'pms',
        url: '/main',
        templateUrl: 'app/main/main.html',
        controllerAs: 'MainController',
        params: { title: 'Main Page' }
      // 메인 페이지
      })
      .state('pmProject', {
        parent: 'pms',
        url: '/pm/project',
        templateUrl: 'app/PM/project/pm.project.html',
        controllerAs: 'PMController',
        params: { title: 'PM : Main Page' }
      // PM 페이지
      })
      .state('pmProjectView', {
        parent: 'pms',
        url: '/pm/project/:pid',
        templateUrl: 'app/PM/project/pm.project.view.html',
        controllerAs: 'PMController',
        params: { title: 'PM : Main Page' }
      })
      // 프로젝트 페이지
      .state('pmProjectWrite', {
        parent: 'pms',
        url: '/pm/project/write',
        templateUrl: 'app/PM/project/pm.project.write.html',
        controllerAs: 'PMController',
        params: { title: 'PM : Add Project' }
      // 프로젝트 추가
      })
      .state('pmProjectModify', {
        parent: 'pms',
        url: '/pm/project/modify/:pid',
        templateUrl: 'app/PM/project/pm.project.modify.html',
        controllerAs: 'PMController',
        params: { title: 'PM : Modify Project' }
      // 프로젝트 수정
      });

    // $urlRouterProvider.otherwise('/login');
  }
}());

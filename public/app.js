var app = angular.module('StarterApp', ['ngMaterial']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .accentPalette('blue-grey');
});

app.controller('NavCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
 
}]);

app.controller('AppCtrl', function($scope) {
    $scope.todos = [
      {
        face : '60.jpeg',
        what: 'Min Li Chan',
        who: 27,
        when: '3:08PM',
        notes: "PHP, MySQL, Laravel Developer"
      },
	  {
        face : 'avatar.jpg',
        what: 'John Fentworth',
        who: 'N/E',
        when: '3:08PM',
        notes: "Manual Labor, Construction, Yard-Work, Odd-Jobs"
      },
	  {
        face : 'avatar2.jpg',
        what: 'Tim Smith',
        who: 4,
        when: '3:08PM',
        notes: " Design, Social Media, Big Ideas"
      },
	  {
        face : 'avatar3.jpg',
        what: 'Chris Keyes',
        who: 11,
        when: '3:08PM',
        notes: "Clerk, Cashier, Accountant"
      },
	  {
        face : 'avatar4.jpg',
        what: 'Elizabeth Plosh',
        who: 'N/E',
        when: '3:08PM',
        notes: "Secretary, Basic Math, Computers"
      },
	  {
        face : 'avatar5.jpg',
        what: 'Ellie Lee',
        who: 15,
        when: '3:08PM',
        notes: "Fashion, Self-Sufficient, Manager"
      },
	  {
        face : 'avatar6.jpg',
        what: 'Dan Kings',
        who: 9,
        when: '3:08PM',
        notes: " Marketing, Research, Proofreading"
      },
	  {
        face : 'avatar7.jpg',
        what: 'Ajith Patel',
        who: 12,
        when: '3:08PM',
        notes: " Tutoring, Teaching, Math"
      },
      {
        face : 'avatar8.jpg',
        what: 'J.T. Trainor',
        who: 67,
        when: '3:08PM',
        notes: "Electrical Engineering, Tutoring, Labor"
      },
      {
        face : 'avatar9.jpg',
        what: 'Chris Gates',
        who: 46,
        when: '3:08PM',
        notes: "IT, Computer Security, Research"
      },
      {
        face : 'avatar10.jpg',
        what: 'Muhammad Al-Khar',
        who: 5.50,
        when: '3:08PM',
        notes: "Personal Assistant, Cooking, Odd-Jobs"
      },
      {
        face : 'avatar11.jpg',
        what: 'Sarah Longat',
        who: 12.30,
        when: '3:08PM',
        notes: "Errands, Teaching, Babysitting"
      },
    ];
});

app.controller("DemoController", function($scope){ });
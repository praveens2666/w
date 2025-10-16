var app = angular.module("ticketApp", []);

app.controller("MainCtrl", function($scope, $http) {
    $scope.seats = [];
    $scope.selectedSeats = [];

    // Load seats from server
    function loadSeats() {
        $http.get("http://localhost:5000/seats")
            .then(res => $scope.seats = res.data);
    }

    loadSeats();

    // Toggle seat selection
    $scope.toggleSeat = function(seat) {
        if (seat.booked) return; // Prevent selecting booked seats
        const idx = $scope.selectedSeats.indexOf(seat.seatNumber);
        if (idx === -1) {
            $scope.selectedSeats.push(seat.seatNumber);
        } else {
            $scope.selectedSeats.splice(idx, 1);
        }
    }

    // Book selected seats
    $scope.bookSeats = function() {
        if($scope.selectedSeats.length === 0) {
            alert("Select at least one seat");
            return;
        }
        $http.post("http://localhost:5000/book", { selectedSeats: $scope.selectedSeats })
            .then(res => {
                alert(res.data);
                $scope.selectedSeats = [];
                loadSeats();
            });
    }
});

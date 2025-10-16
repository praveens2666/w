var app = angular.module("foodApp", []);

app.controller("MainCtrl", function($scope, $http) {
    $scope.foodList = [
        { name: "Pizza", price: 10, image: "https://via.placeholder.com/100?text=Pizza", quantity: 0 },
        { name: "Burger", price: 7, image: "https://via.placeholder.com/100?text=Burger", quantity: 0 },
        { name: "Pasta", price: 8, image: "https://via.placeholder.com/100?text=Pasta", quantity: 0 },
        { name: "Sushi", price: 12, image: "https://via.placeholder.com/100?text=Sushi", quantity: 0 }
    ];

    $scope.orderList = [];

    $scope.changeQty = function(food, delta) {
        food.quantity = Math.max(0, (food.quantity || 0) + delta);
    };

    $scope.getTotal = function() {
        return $scope.foodList.reduce((sum, food) => sum + (food.price * (food.quantity || 0)), 0);
    };

    function loadOrders() {
        $http.get("http://localhost:5000/orders")
            .then(res => {
                $scope.orderList = res.data;
            });
    }

    loadOrders();

    $scope.placeOrder = function() {
        var orderItems = $scope.foodList.filter(f => f.quantity > 0);
        if(orderItems.length === 0) {
            alert("Please select at least one item!");
        } else {
            var orderData = {
                items: orderItems,
                total: $scope.getTotal()
            };
            $http.post("http://localhost:5000/order", orderData)
                .then(() => {
                    alert("Order placed!");
                    $scope.foodList.forEach(f => f.quantity = 0);
                    loadOrders();
                }, () => {
                    alert("Order failed!");
                });
        }
    };
});


var app = angular.module("myApp", ['ngAnimate']);


app.service("cancelStudents",function(){
    this.cancelStudent = function(a){
        a.student={};
        a.editmode = false;
    }
})


app.factory("editStudents",function(){
    var students ={
        student:{}, //student :{"praveen","6604","date"}
        editmode : false // true
    }
    return{
        setStudent : function(a){
            students.student = angular.copy(a);
            students.student.date = new Date(a.date);
            students.editmode = true;
        },
        getStudent : function(){
            return students;
        } 
    }
})

app.controller("myController",function($scope,$http,cancelStudents,editStudents){
    $scope.student={};
    $scope.editmode =false;
    $scope.attendanceList = [];
    $scope.load = function(){
        $http.get("http://localhost:3000/list",$scope.student).then(res=>{
            $scope.attendanceList = res.data;
        })
    }
    $scope.load();
        $scope.saveStudent = function(){
            if($scope.editmode){
                var id = $scope.student.id || $scope.student._id;
                if(!id){
                    alert("No Id found for update");
                    return;
                }
                $http.put("http://localhost:3000/update/" + id, $scope.student).then(res => {
                alert(res.data);
                $scope.student = {}
                $scope.editMode = false
                $scope.load();
                $scope.cancelStudent();
            })
            }else{
                $http.post("http://localhost:3000/add", $scope.student).then(res => {
                alert(res.data);
                $scope.student = {}
                $scope.load();
            })
                
            }
        }

        // $scope.editStudent = function(a){
        //     $scope.student = angular.copy(a);
        //     $scope.student.date = new Date(a.date);
        //     $scope.editmode = true;
        // }

        $scope.editStudent = function(a){
            editStudents.setStudent(a);
            $scope.student = editStudents.getStudent().student;
            $scope.editmode = editStudents.getStudent().editmode;
        }

        $scope.cancelStudent = function(){
            // $scope.student={};
            // $scope.editmode = false;
            cancelStudents.cancelStudent($scope);
        }
        $scope.deleteStudent = function(id){
            $http.delete("http://localhost:3000/delete/"+id).then(res=>{
                alert("record deleted");
                $scope.load();
            })
        }
        $scope.deleteAll = function(){
            $http.delete("http://localhost:3000/deleteAll").then(res=>{
                alert(res.data);
                $scope.load();
            })
        }
})
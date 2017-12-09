$(document).ready(function () {
    $("#col_one").hover(function () {
        $(this).css("background-color", "#B22222")}, 
        function() {$(this).css("background-color", "red")})

    $("#Help").click(function () {
        $(this).css("color", "green")})
    
    $("#col_two").hover(function () {
        $(this).css("background-color", "#00FF00")}, 
        function() {$(this).css("background-color", "green")})
        
    $("#col_three").hover(function () {
        $(this).css("background-color", "#FFD700")}, 
        function() {$(this).css("background-color", "yellow")})
        
    $("#col_four").hover(function () {
        $(this).css("background-color", "#000080")}, 
        function() {$(this).css("background-color", "blue")})

    $("#col_five").hover(function () {
        $(this).css("background-color", "black")}, 
        function() {$(this).css("background-color", "white")})
    $(document).html("See")

})
    

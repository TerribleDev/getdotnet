(function ($) {
    var Menu = function() {
        this.openClass = "nav-menu-expanded";
        this.closedClass = "nav-menu-collapsed";
       $("#menuControl").click(this.openMenu);
    }

    Menu.prototype.openMenu = function() {
        var openClass = "nav-menu-expanded";
        var closedClass = "nav-menu-collapsed";
        console.log("In the open menu function");
        var currentState = $("#navigationMenu").hasClass(openClass);
        console.log("State of the menu: " + currentState);
        if (currentState) {
            $("#navigationMenu").removeClass(openClass).addClass(closedClass);
            $(".main-content").removeClass("main-content-slide");
        }else {
            $("#navigationMenu").removeClass(closedClass).addClass(openClass);
            $(".main-content").addClass("main-content-slide");
        }
    }

    new Menu();
})($);

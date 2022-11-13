//
$(function () {
  //
  //
  // VARIABLES:
  //
  var hour_information_9am = document.querySelector("#hour_information_9am");
  hour_information_9am = "";
  var save_button_test = document.querySelector("#save_button_9am");
  var save_buttons = document.querySelectorAll("i", ".fas fa-save");
  var save_status_text_div = document.querySelector(".save_status");
  save_status_text_div.style.height = "11px";
  //
  //
  // EVENT LISTENERS:
  //
  save_button_test.addEventListener("click", function() {
    // window.alert("SAVE DATA");
    save_status_text_div.style.height = "auto";
    document.documentElement.scrollTop = 0;  /* Scroll to the top of the webpage to the save status text display area. */
    var timer_countdown_value = 5;
    var save_status_countdown_timer = setInterval(function() {
      timer_countdown_value--;
      if (timer_countdown_value < 0) {
        clearInterval(save_status_countdown_timer);
        save_status_text_div.style.height = "11px";
      }
    }, 1000);
    window.alert(save_buttons[0].className + " " + save_buttons[0].id);
  });
  //
  //
  // FUNCTIONS: 
  //
  //
  });
  //

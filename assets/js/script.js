
$(function () {
// Note: All of the application code that interacts with the DOM is contained in a call to jQuery to ensure that
// the code is not run until after when the browser has finished rendering all of the HTML elements of the webpage.
  

  ///////////////////////////////////////
  // GLOBAL VARIABLES:
  //


  var scheduler_hour_list = document.querySelector("#scheduler_hour_list");
  var hour_information_text_areas = document.querySelectorAll("textarea"); // , "hour_information_");
  //var save_button_test = document.querySelector("#save_button_9am");
  var save_buttons = document.querySelectorAll("button"); //, "save_button_");
  var save_status_text_div = document.querySelector(".save_status");
  save_status_text_div.style.height = "11px";
  var saving_is_requested = [false, false, false, false, false, false, false, false, false];
  var saving_is_necessary = [false, false, false, false, false, false, false, false, false];
  var involved_save_record_row_index = null;
  var hour_change_countdown_timer = null;
  
  
  ///////////////////////////////////////
  // EVENT LISTENERS:
  //


  scheduler_hour_list.addEventListener("click", function(event) {
    //window.alert("Event target element ID: " + event.target.id);
    if ((event.target.id.toUpperCase()).includes("SAVE")) {
      // A save process is requested because a Save button was clicked...and the process might be necessary.
      var save_record_hour = event.target.id.toUpperCase();
      save_record_hour = save_record_hour.substring(12);
      //window.alert("A save process is requested (for element \"" + event.target.id.toUpperCase() + "\").");
      if (((save_record_hour.includes("AM")) || (save_record_hour.includes("PM"))) && ((parseInt(save_record_hour)) > 0)) {
        // The blue non-disk-icon area (but not the disk) of a Save button was clicked.
        // Extract the common ID text "save_button_" to have only the hour text be remaining.
        involved_save_record_row_index = save_record_hour;
        //window.alert(involved_save_record_row_index);
        involved_save_record_row_index = (parseInt(involved_save_record_row_index) - 9);
        if (involved_save_record_row_index < 0) {
          involved_save_record_row_index = involved_save_record_row_index + 12;
        }
        saving_is_requested[involved_save_record_row_index] = true;
      }
      else if (save_record_hour == "") {
        save_record_hour = event.target.id.toUpperCase();
        save_record_hour = save_record_hour.substring(5);
        if (((save_record_hour.includes("AM")) || (save_record_hour.includes("PM"))) && ((parseInt(save_record_hour)) > 0)) {
          // A disk icon area (but not the blue non-disk area) of a Save button was clicked. 
          // Extract the common ID text "save_" to have only the hour text be remaining.
          involved_save_record_row_index = save_record_hour;
          //window.alert(involved_save_record_row_index);
          involved_save_record_row_index = (parseInt(involved_save_record_row_index) - 9);
          if (involved_save_record_row_index < 0) {
            involved_save_record_row_index = involved_save_record_row_index + 12;
          }
          saving_is_requested[involved_save_record_row_index] = true;
        }
      }
      if ((saving_is_requested[involved_save_record_row_index] == true) && 
        (saving_is_necessary[involved_save_record_row_index] == true)) {
        //window.alert("save_record_hour: " + save_record_hour);
        determine_and_save_hour_information(save_record_hour);
        save_status_text_div.style.height = "auto";
        document.documentElement.scrollTop = 0;
          /* Scroll to the top of the webpage to the save status text display area for a couple of seconds for user viewing. */
        var timer_countdown_value = 1;
        var save_status_countdown_timer = setInterval(function() {
          timer_countdown_value--;
          if (timer_countdown_value < 0) {
            clearInterval(save_status_countdown_timer);
            save_status_text_div.style.height = "11px";
          }
        }, 1000);
      }
      else {
        window.alert("An information save process is not necessary at the moment for the selected *hour/row* information because " + 
        "the current displayed information has not been changed.");
        //window.alert("saving_is_requested: " + saving_is_requested + "; saving_is_necessary: " + saving_is_necessary);
        saving_is_requested[involved_save_record_row_index] = false;
      }
    }
  });


  scheduler_hour_list.addEventListener("input", function(event) {
    if ((event.target.id.toUpperCase()).includes("HOUR_INFORMATION_")) {
      // A save process is necessary because a data change occurred in an hour-information text area.
      //window.alert("A data change occurred in an hour-information text area.");
      // Extract the involved hour/row index number (per text area ID "hour_information_<hour>").
      involved_save_record_row_index = event.target.id.substring(17);
      //window.alert(involved_save_record_row_index);
      involved_save_record_row_index = (parseInt(involved_save_record_row_index) - 9);
      if (involved_save_record_row_index < 0) {
        involved_save_record_row_index = involved_save_record_row_index + 12;
      }
      if ((involved_save_record_row_index >= 0 ) && (involved_save_record_row_index <= 8)) {
        //window.alert(involved_save_record_row_index);
        //window.alert("record_index: " + involved_save_record_row_index + "; " + save_buttons[involved_save_record_row_index].id);
        save_buttons[involved_save_record_row_index].style.backgroundColor = "purple";
        saving_is_necessary[involved_save_record_row_index] = true;
      }
      else {
        window.alert("ERROR: A determination about a save process could not be made. Try to re-start the application.");
      }
    }  
  });
  

  // FUTURE ENHANCEMENT -- NOT YET FUNCTIONAL.
  // window.addEventListener("beforeunload", function() {  // for the beforeunload/ended/close event
  //   clearInterval(hour_change_countdown_timer);
  //   // Determine about if there are any changed hour/row text areas that are not yet saved.
  //   var save_before_close_necessity = false;
  //   for (index_loop_index_loop = 0; index_loop_index_loop < 9; index_loop_index_loop++) {
  //     if (saving_is_necessary[index_loop_index_loop] == true) {
  //       save_before_close_necessity = true;
  //     }
  //   if (save_before_close_necessity == true) {
  //     var user_prompt_response = prompt("There continue to be some hour information record[s] that is/are not saved. " + 
  //       "Do you want to return to the application to save the record[s]? Click the \"OK\" button to go to the save; " + 
  //       "Otherwise click the \"Cancel\" button to discard the changes and then close the application.");
  //   }
  //   if (user_prompt_response != null) {
  //     document.documentElement.scrollTop = 50;
  //       // Scroll the application window to the bottom so the user can see all of the Save buttons for their statuses.
  //   };
  //   }
  // });


  ///////////////////////////////////////
  // INITIALIZATION/INTRODUCTION:
  //


  format_and_display_current_date();

  window.alert("Enter as-needed any activity-plan information that is for some hour[s] of the workday " + 
  "and then click the Save (disk) button[s] of the hour record row[s]. The entered updated information " + 
  "will be saved (per row) to the localStorage memory of the application for later access." + "\n" + 
  "\n" + 
  "** IMPORTANT **" + "\n" + 
  "\n" + 
  "To ensure the proper complete saving of the hour information data...do NOT start a next data-save " +
  "process -- i.e., do not click a next Save button -- until AFTER when the previous save process (if any) " + 
  "has completed its process and the check-mark status indicator at the top of the window has disappeared.");
  
  load_hour_information(); // (if any) from local storage

  determine_and_display_hour_record_status_colors();
  // Then...
  // Set a display refresh cycle for the duration of when the application window is open.
  var dayjs_second = dayjs().get('second');
  //window.alert("dayjs_second: " + dayjs_second);
  var seconds_until_next_minute = (60 - dayjs_second);
  //window.alert("seconds_until_next_minute: " + seconds_until_next_minute);
  // Count-down to the next minute.
  var seconds_timer_countdown_value = seconds_until_next_minute;
  var minute_change_countdown_timer = setInterval(function() {
    seconds_timer_countdown_value--;
    //console.log(seconds_timer_countdown_value);
    if (seconds_timer_countdown_value == 0) {
      clearInterval(minute_change_countdown_timer);
      //count_down_to_next_hour();  // FUTURE ENHANCEMENT; POSSIBLY BUGGY AT THE MOMENT.
      }
    }, 1000);
  // Count-down to the next hour and then refresh the display again...and then continue to repeat the countdown cycle.
  var dayjs_minute = dayjs().get('minute');
  var dayjs_hour = dayjs().format('H');
  //window.alert("dayjs_minute: " + dayjs_minute); 
  var minutes_timer_countdown_value = 0;
  var minutes_until_next_hour = (60 - dayjs_minute);
  //window.alert("minutes_until_next_hour: " + minutes_until_next_hour);
  minutes_timer_countdown_value = minutes_until_next_hour;
  hour_change_countdown_timer = setInterval(function() {
    minutes_timer_countdown_value--;
    //console.log(minutes_timer_countdown_value);
    if ((minutes_timer_countdown_value == 0) || ((minutes_timer_countdown_value < 0))) {
        minutes_timer_countdown_value = 60;
        //seconds_until_next_minute = (60 - dayjs().get('second'));  // FUTURE ENHANCEMENT; POSSIBLY BUGGY AT THE MOMENT.
        //if (seconds_until_next_minute < 45) {
        //  timer_countdown_value = seconds_until_next_minute;
          // Re-synchronize the minute countdown clock so it is (hopefully) within 1 minute of hour-change accuracy.
        //}
        dayjs_hour = dayjs().format('H');
        //console.log("SCHEDULER HOUR CHANGE AND RELATED FUNCTION CALL: " + dayjs_hour);
        determine_and_display_hour_record_status_colors();
      }
    }, 60000);

  //function count_down_to_next_hour() {  // FUTURE ENHANCEMENT; POSSIBLY BUGGY AT THE MOMENT.
    // var minutes_until_next_hour = (60 - dayjs_minute);
    // var timer_countdown_value = minutes_until_next_hour;
    // var hour_change_countdown_timer = setInterval(function() {
    //   timer_countdown_value--;
    //   if (timer_countdown_value == 0) {
    //       timer_countdown_value = 60;
    //       seconds_until_next_minute = (60 - dayjs().get('second'));
    //       if (seconds_until_next_minute < 45) {
    //         timer_countdown_value = seconds_until_next_minute;
    //         // Re-synchronize the minute countdown clock so it is (hopefully) within 1 minute of hour-change accuracy.
    //       }
    //       determine_and_display_hour_record_status_colors();
    //     }
    //   }, 60000);
  //}
  
  
  ///////////////////////////////////////
  // FUNCTIONS: 
  //


  function format_and_display_current_date() {
    // Use the Day.js API system for the date formatting.
    // HTML : <p id="current_day" class="lead">Day.js output</p>
    var current_day_text_line = document.querySelector("#current_day");
    //var current_date = new Date();
    //window.alert(current_date);
    var dayjs_date = dayjs().format('dddd MMMM D');
    //window.alert(dayjs_date);
      // for Day.js date format that has the Day Name and then a Month Name and then an ordinal-format Day Number
      // (such as "Monday November 14th")
    //window.alert((dayjs().get('date')) + (ordinal_text((dayjs().get('date')))))
    current_day_text_line.innerHTML = ((dayjs_date) + (ordinal_text((dayjs().get('date')))));  // for ordinal-ending day numbers
    //
    function ordinal_text(passed_date_number) {
      // This custom ordinal-text function was written because the ordinal-day-text (Do) format feature of the Day.js system did
      // not work and it had bad/partial documentation; and it required additional import files that were not available.
      if (passed_date_number > 3 && passed_date_number < 21) {
        return "th";
      }
      else {
        switch (n % 10) {
          case 1:  return "st";
          case 2:  return "nd";
          case 3:  return "rd";
          case 21: return "st";
          case 22: return "nd";
          case 23: return "rd";
          case 31: return "st";
          default: return "th";
        };
      }
    }
  }


  function determine_and_display_hour_record_status_colors() {
    // Use the Day.js system functions to determine and continue to know the current hour and then display hour-specific
    // color codes in the hour-information text area rows of the application.
    //
    // dayjs().get('hour')
    // dayjs().get('minute')
    // dayjs().get('second')
    //
    //var current_time = new Date();
    //window.alert("hour: " + dayjs().get('hour'));
    //var dayjs_hour = prompt("Hour?");
    var dayjs_hour = dayjs().format('H');
    //window.alert(dayjs_hour);
    //
    if ((dayjs_hour > 8) && (dayjs_hour < 18)) {  // The current hour is during the standard 9-to-5 workday hours.
      // Color-Code the past/gray hour text area[s].
      for (hour_loop_index = 0; hour_loop_index < (dayjs_hour - 9); hour_loop_index = hour_loop_index + 1) {
        //hour_information_text_areas[hour_loop_index].style.backgroundColor = "lightgray";
        hour_information_text_areas[hour_loop_index].parentElement.className = "row time-block past";
      }
      // Color-Code the current/red hour text area.
        //hour_information_text_areas[(dayjs_hour - 9)].style.backgroundColor = "red";
        hour_information_text_areas[hour_loop_index].parentElement.className = "row time-block present";
      // Color-Code the future/green hour text area[s].
      for (hour_loop_index = ((dayjs_hour - 9) + 1); hour_loop_index < 9; hour_loop_index = hour_loop_index + 1) {
        //hour_information_text_areas[hour_loop_index].style.backgroundColor = "lightgreen";
        hour_information_text_areas[hour_loop_index].parentElement.className = "row time-block future";
      }
    }
    else if (dayjs_hour <= 8) {  // Every workday hour of the current day is in the future.
        for (hour_loop_index = 0; hour_loop_index < 9; hour_loop_index = hour_loop_index + 1) {
          //hour_information_text_areas[hour_loop_index].style.backgroundColor = "lightgreen";
          hour_information_text_areas[hour_loop_index].parentElement.className = "row time-block future";
        }
    }
    else if (dayjs_hour >= 18) {  // Every workday hour of the current day is in the past.
      for (hour_loop_index = 0; hour_loop_index < 9; hour_loop_index = hour_loop_index + 1) {
        //hour_information_text_areas[hour_loop_index].style.backgroundColor = "lightgray";
        hour_information_text_areas[hour_loop_index].parentElement.className = "row time-block past";
      }
    }
  }
  
  
  function determine_and_save_hour_information(passed_saved_record_hour) {
    // Save hour information records from localStorage keys ("TKDS_hour_information_" + 
    // saved-record-hour indicator (which starts at array index 22)). This function process is run at each time at which a Save
    // button is clicked application.
    // ENHANCEMENT: TEST AND RUN ONLY IF THE HOUR INFORMATION HAS CHANGED; DISABLE/ENABLE THE SAVE BUTTONS AS-NEEDED.
    var hour_number = parseInt(passed_saved_record_hour);
    var hour_number_text_area_index = (hour_number - 9);
    if (hour_number_text_area_index < 0) {
      (hour_number_text_area_index = hour_number_text_area_index + 12); 
    };
    //window.alert("hour_number: " + hour_number);
    //window.alert("hour_number_index: " + hour_number_text_area_index);
    var involved_changed_hour_information = hour_information_text_areas[hour_number_text_area_index].value;
    //window.alert("updated hour text to save: " + involved_changed_hour_information);
    var localStorage_key = "TKDS_hour_information_" + passed_saved_record_hour;
    //window.alert("localStorage key: " + localStorage_key);
    var involved_hour_information_text_area_ID = ("#hour_information_" + passed_saved_record_hour);  // #ID
    //window.alert("Save changed hour data to localStorage key \"" + localStorage_key + "\"." + "\n" + 
    //  "changed hour information: " + involved_changed_hour_information);
    localStorage.setItem(localStorage_key, involved_changed_hour_information);
    // Reset the highlight color and status codes of the current involved Save button.
    save_buttons[involved_save_record_row_index].style.backgroundColor = "#06aed5";
    saving_is_requested[involved_save_record_row_index] = false;
    saving_is_necessary[involved_save_record_row_index] = false;
    //  
  }
  
  
  function load_hour_information() {
    // Load saved hour information records from localStorage keys "TKDS_hour_information_" + 
    // saved-record-hour indicator (which starts at array index 22). This function process is run at 1 time at the beginning
    // of the usage of the application.
    //
    //window.alert("load-data processing");
    var local_storage_record_amount = localStorage.length;
    //window.alert("local_storage_record_amount: " + local_storage_record_amount);
    if (local_storage_record_amount != null) {
      // Search through all of the current local storage data records (if any) and load only the ones that are saved scheduler hour records.
      for (load_data_loop_index = 0; load_data_loop_index < local_storage_record_amount; 
        load_data_loop_index = load_data_loop_index + 1) {
        //window.alert(localStorage.key(load_data_loop_index));
        if (localStorage.key(load_data_loop_index).indexOf("TKDS_hour_information_") == 0) {
          // a unique key-indexing value that can be removed but it excludes all other local storage data that is not scheduler-related.
          var loaded_storage_data_record_key = (localStorage.key(load_data_loop_index).substring(22));
            // 22 is the 1st index that is at after the to-be-removed unique key-indexing exclusion value.
          var hour_number = parseInt(loaded_storage_data_record_key);
          var hour_number_text_area_index = (hour_number - 9);
          if (hour_number_text_area_index < 0) {
            (hour_number_text_area_index = hour_number_text_area_index + 12);
          }
          var loaded_storage_data_record_value = localStorage.getItem(localStorage.key(load_data_loop_index));
          hour_information_text_areas[hour_number_text_area_index].value = loaded_storage_data_record_value;
        // else: next record (if any)
        }
      }
    }
    else {
      local_storage_record_amount = 0;
    }
  }

  
  // end of the jQuery function component call
  });
  

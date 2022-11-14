//
$(function () {
  
  
  // VARIABLES:
  //
  var scheduler_hour_list = document.querySelector("#scheduler_hour_list");
  var current_date = null;
  var current_time = null;
  var hour_information_text_areas = document.querySelectorAll("textarea"); // , "hour_information_");
  //var save_button_test = document.querySelector("#save_button_9am");
  var save_buttons = document.querySelectorAll("button"); //, "save_button_");
  var save_status_text_div = document.querySelector(".save_status");
  save_status_text_div.style.height = "11px";
  
  
  // INIT/INTRODUCTION:
  //
  format_and_display_current_date();
  window.alert("Enter as-needed any activity-plan information that is for an hour of the workday " + 
    "and then click the Save (disk) button of that hour record row. The entered updated information " + 
    "will be saved to the localStorage memory of the application for later access.");
  load_hour_information();
  determine_and_display_hour_record_status_colors();
  
  
  // EVENT LISTENERS:
  //
  scheduler_hour_list.addEventListener("click", function(event) {
    //window.alert("SAVE DATA");
    //window.alert("Event element ID: " + event.target.id);
    var save_record_hour = event.target.id.substring(12);
      // Extract the common ID text "save_button_" to have only the hour text be remaining.
    //window.alert(save_record_hour);
    determine_and_save_hour_information(save_record_hour);
    save_status_text_div.style.height = "auto";
    document.documentElement.scrollTop = 0;  /* Scroll to the top of the webpage to the save status text display area. */
    var timer_countdown_value = 2;
    var save_status_countdown_timer = setInterval(function() {
      timer_countdown_value--;
      if (timer_countdown_value < 0) {
        clearInterval(save_status_countdown_timer);
        save_status_text_div.style.height = "11px";
      }
    }, 1000);
  });
  
  
  // FUNCTIONS: 
  //
  //
  function format_and_display_current_date() {
    // Use the Day.js API system for the date formatting.
    // HTML : <p id="current_day" class="lead">Day.js output</p>
    window.alert("format_and_display_current_date() -- by using Day.js");
    current_date = "Day.js output";
  }


  function determine_and_display_hour_record_status_colors() {
    window.alert("determine_and_display_hour_record_status_colors()")
    current_time = "current time output from system"
  }
  
  
  function determine_and_save_hour_information(passed_saved_record_hour) {
    // Save hour information records from localStorage keys ("BCDS_hour_information_" + 
    // saved-record-hour indicator (which starts at array index 22)). This function process is run at each time at which a Save
    // button is clicked application.
    // FUTURE ENHANCEMENT: TEST AND RUN ONLY IF THE DATA HAS CHANGED; DISABLE/ENABLE THE SAVE BUTTONS AS-NEEDED.
    var hour_number = parseInt(passed_saved_record_hour);
    var hour_number_text_area_index = (hour_number - 9);
    if (hour_number_text_area_index < 0) {
      (hour_number_text_area_index = hour_number_text_area_index + 12); 
    };
    //window.alert("hour_number: " + hour_number);
    //window.alert("hour_number_index: " + hour_number_text_area_index);
    var involved_changed_hour_information = hour_information_text_areas[hour_number_text_area_index].value;
    //window.alert("updated hour text to save: " + involved_changed_hour_information);
    var localStorage_key = "BCDS_hour_information_" + passed_saved_record_hour;
    //window.alert("localStorage key: " + localStorage_key);
    var involved_hour_information_text_area_ID = ("#hour_information_" + passed_saved_record_hour);  // #ID
    //window.alert("Save changed hour data to localStorage key \"" + localStorage_key + "\"." + "\n" + 
    //  "changed hour information: " + involved_changed_hour_information);
    localStorage.setItem(localStorage_key, involved_changed_hour_information);
    //  
  }
  
  
  function load_hour_information() {
    // Load saved hour information records from localStorage keys "BCDS_hour_information_" + 
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
        if (localStorage.key(load_data_loop_index).indexOf("BCDS_hour_information_") == 0) {
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


  });
  //

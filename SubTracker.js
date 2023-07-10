/*
Version 1
- user enters sub number and is able to see what step the card is on
*/
function trackSubmissionV1(subNumber) {
  var paragraph = document.getElementById("trackResult");

  paragraph.innerHTML = "Searching...";
  
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.psacard.com/publicapi/order/GetSubmissionProgress/" + subNumber,
    "method": "GET",
    "headers": {
          "authorization": "bearer <access token>"
    }
  }
  $.ajax(settings).done(function (response) {

      var steps = ["Accepted", "Order Prep", "Research & ID", "Grading", "Assembly", "QA Check 1", "QA Check 2", "Shipped"];
  
      var working_on = response["orderProgressSteps"];
      paragraph.innerHTML = "";
    
      for (let index = 0; index < Object.keys(working_on).length - 1; index++) {
        var step = working_on[index];

        if (!step["completed"]) {
          paragraph.appendChild(document.createTextNode("Currently in: " + steps[step["index"] - 1] + " (Stage " + (index+1) + "/8)"));
          return;
        }
      }
    
      paragraph.appendChild(document.createTextNode("Submission completed!"));

  }).fail(function (jqXHR, textStatus) {
      paragraph.innerHTML = "";
      paragraph.appendChild(document.createTextNode("Error: Unable to find " + subNumber));
  });
}

/*
Version 2
- user enters sub number and is able to see what step the card is on.
- if the order is complete, the user is able to see the grades
*/
function trackSubmissionV2(subNumber) {
  var paragraph = document.getElementById("trackResult");

  paragraph.innerHTML = "Searching...";

  var table = document.getElementById("grades");
  table.innerHTML = "";
  
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.psacard.com/publicapi/order/GetSubmissionProgress/" + subNumber,
    "method": "GET",
    "headers": {
          "authorization": "bearer <access token>"
    }
  }
  $.ajax(settings).done(function (response) {

      var steps = ["Accepted", "Order Prep", "Research & ID", "Grading", "Assembly", "QA Check 1", "QA Check 2", "Shipped"];
  
      var working_on = response["orderProgressSteps"];
      paragraph.innerHTML = "";
    
      for (let index = 0; index < Object.keys(working_on).length - 1; index++) {
        var step = working_on[index];

        if (!step["completed"]) {
          paragraph.appendChild(document.createTextNode("Currently in: " + steps[step["index"] - 1] + " (Stage " + (index+1) + "/8)"));
          return;
        }
      }
    
      paragraph.appendChild(document.createTextNode("Submission completed!"));

      /* appened the data */
      table.innerHTML = "Finding Grades..."

      getTextFileContent(subNumber + ".txt")
      .then(content => {
        if (content !== null) {
          table.innerHTML = content;
        }
        else {
          table.innerHTML = "Unable to find grades. Please check again later."
        }
  });
      
      
  }).fail(function (jqXHR, textStatus) {
      paragraph.innerHTML = "";
      paragraph.appendChild(document.createTextNode("Error: Unable to find " + subNumber));
  });
}

async function getTextFileContent(fileName) {
  const url = `https://raw.githubusercontent.com/Level-Up-Subs/grade-fetcher/main/Submissions/${fileName}`;

  console.log(url);
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch file content');
    }
    
    const text = await response.text();
    return text;
  } catch (error) {
    console.error(error);
    return null;
  }
}

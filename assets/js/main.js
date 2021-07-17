$( document ).ready(function($) {

  // latest confirmed cases

  var confirmed_cases = {
    "url": "https://covid-19-greece.herokuapp.com/confirmed",
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(confirmed_cases).done(function (response) {
    cases = response.cases;
    length_of_cases = cases.length;
    today = length_of_cases - 1;
    todays_cases = cases[today];
    confirmed = todays_cases['confirmed'];
    last_cases_update = todays_cases['date'];

    function confirmedWithCommas(confirmed) {
      return confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    var confirmed = confirmedWithCommas(confirmed);

    $('.statistics-cases').text(confirmed);
  });

  // latest confirmed deaths
  var deaths = {
    "url": "https://covid-19-greece.herokuapp.com/deaths",
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(deaths).done(function (response) {
    deaths = response.cases
    length_of_cases = deaths.length;
    today = length_of_cases - 1;
    todays_cases = deaths[today];
    today_deaths = todays_cases['deaths'];
    last_deaths_update = todays_cases['date'];

    function confirmedWithCommas(today_deaths) {
      return today_deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    var today_deaths = confirmedWithCommas(today_deaths);

    $('.statistics-deaths').text(today_deaths);


  });

    // latest Μ.Ε.Θ.

  var intensive_care = {
    "url": "https://covid-19-greece.herokuapp.com/intensive-care",
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(intensive_care).done(function (response) {
    ic = response.cases
    length_of_cases = ic.length;
    today = length_of_cases - 1;
    todays_cases = ic[today];
    today_ics = todays_cases['intensive_care'];
    last_ic_update = todays_cases['date'];

    function careWithCommas(today_ics) {
      return today_ics.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    var today_ics = careWithCommas(today_ics);

    $('.statistics-care').text(today_ics);
  });

    // latest confirmed tests

  var tests = {
    "url": "https://covid-19-greece.herokuapp.com/total-tests",
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(tests).done(function (response) {
    tests = response.total_tests
    length_of_tests = tests.length;
    today = length_of_tests - 1;
    todays_cases = tests[today];
    rapid = todays_cases['rapid-tests'];
    the_tests = todays_cases['tests'];
    total_tests = rapid + the_tests;
    last_test_update = todays_cases['date'];

    function rapidWithCommas(rapid) {
      return rapid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    var rapids = rapidWithCommas(rapid);

    function testsWithCommas(the_tests) {
      return the_tests.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    var testss = testsWithCommas(the_tests);

    function totalWithCommas(total_tests) {
      return total_tests.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    var total = totalWithCommas(total_tests);

    $('.statistics-tests-mor').text(testss);
    $('.statistics-tests-rapid').text(rapids);
    $('.statistics-tests-total').text(total);
    

  });
  //age distribution in covid

  var age = {
    "url": "https://covid-19-greece.herokuapp.com/age-distribution",
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(age).done(function (response) {
    age_dist = response["age_distribution"];
    age_average_case = age_dist["age_average"];
    age_average_death = age_dist["average_death_age"];
    age_groups = age_dist["total_age_groups"].cases;
    group_017 = age_groups["0-17"];
    group_1839 = age_groups["18-39"];
    group_4064 = age_groups["40-64"];
    group_65 = age_groups["65+"];

    function ageWithCommas(ages) {
      return ages.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    var group_017 = ageWithCommas(group_017);
    var group_1839 = ageWithCommas(group_1839);
    var group_4064 = ageWithCommas(group_4064);
    var group_65 = ageWithCommas(group_65);

    $('.017').text(': ' + group_017 + ' Κρούσματα');
    $('.1839').text(': ' + group_1839 + ' Κρούσματα');
    $('.4064').text(': ' + group_4064 + ' Κρούσματα');
    $('.65').text(': ' + group_65 + ' Κρούσματα');
  });

  //total vaccinations

  var vaccinations = {
    "url": "https://covid-19-greece.herokuapp.com/total-vaccinations",
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(vaccinations).done(function (response) {
    totalvac = response["total-vaccinations"];
    totalvac = totalvac.totalvaccinations
    date_updated = totalvac.updated;

    function totalWithCommas(totalvac) {
      return totalvac.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    var totalvac = totalWithCommas(totalvac);

    $('.statistics-vaccines').text(totalvac)
  });

    const RSS_URL = `https://www.newsit.gr/tags/koronoios/feed/`;

    fetch(RSS_URL)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
      const items = data.querySelectorAll("item");
      i = 0;
      for (i=0; i<3; i++){
        var random_item = items[Math.floor(Math.random()*items.length)];
        title_item = random_item.querySelector("title").innerHTML;
        link_item = random_item.querySelector("link").innerHTML;
        feedhtml = '<div class="col-md-4 news-box"><a target="_blank" href="'+link_item+'"><h4>'+title_item+'</h4></a></div>';
        $('.feedrow').append(feedhtml);
      }
    })
    .catch((error) => {
      $('.feedrow').append('<h4 class="text-center"> Παρουσιάστηκε κάποιο πρόβλημα με την ανάκτηση των δεδομένων. Μας συγχωρείτε για την αναστάτωση</h4>')
  })

});
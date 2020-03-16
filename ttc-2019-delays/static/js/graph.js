// Define url
var url = "/delay";

// Print data
d3.json(url).then(function(data){
	console.log(data);	
	});

// Define function to calculate average
function average(arr){
    //Find the sum
    var sum = 0;
    for(var i in arr) {
        sum += arr[i];
    }
    //Get the length of the array
	var numbersCnt = arr.length;
	
    //Return the average / mean
	if (numbersCnt != 0) {
		return (sum / numbersCnt);
	}
	else {
		return 0;
	}
};

// Save dropdown menu text in variable
var subway_lines = ['All','Yonge University Spadina','Bloor Danforth','Scarborough Rail Transit','Sheppard'];
var years = ['All','2018','2019']
var months = ['All','January','February','March','April','May','June','July','August','September','October','November','December'];

// Save x-axis labels in variable
var hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
var days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

	/* Select dropdown menu and add options to dropdown */

// Select subway_filter dropdown
// Add options to dropdown
var subway_filter = d3.select("#subway_filter");
subway_lines.forEach(subway_line=>subway_filter.append("option").text(subway_line));

// Select year_filter dropdown
// Add options to dropdown
var year_filter = d3.select("#year_filter");
years.forEach(year=>year_filter.append("option").text(year)); 

// Select month_filter dropdown
// Add options to dropdown
var month_filter = d3.select("#month_filter");
months.forEach(month=>month_filter.append("option").text(month));	

// Define svg width and height;
var svgWidth = 960;
var svgHeight = 500;

// Define svg margin;
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define chart width and height
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#graph")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
  .classed("chart",true);

// Initial Params
var chosenXAxis = "time";
var chosenYAxis = "num_delays";

// Create function init
function init(){
	
	// Get data from json file
	d3.json(url).then(function(data){
		
		// Define init dropdown values 
		var init_subway_value = subway_lines[0];
		var init_year_value = years[0];
		var init_month_value = months[0];
		
		// Print data
		// console.log(init_subway_value);
		// console.log(init_year_value);
		// console.log(init_month_value);

		// Set init_data = data
		init_data = data

		// 	/* Filter data for the graph based on init dropdown values */
			
		// if (init_subway_value == 'All'){
		// 	var init_data_temp1 = data;
		// }
		// else {
		// 	var init_data_temp1 = data.filter(data=>data.line_name == init_subway_value);
		// }

		// if (init_year_value == 'All'){
        //  var init_data_temp2 = init_data_temp1;
        // }
        // else {
        //  var init_data_temp2 = init_data_temp1.filter(data=>data.year == init_year_value);
        // }

		// if (init_month_value == 'All'){
		// 	var init_data = init_data_temp2;
		// }
		// else {
		// 	var init_data = init_data_temp2.filter(data=>data.month == init_month_value);
		// }
	
			/* Calculate total number of delays and average min delay by hour and day */	

		// Calculate total number of delays by hour
		var init_num_delays_by_hour = [];    
		for (i = 0; i < hours.length; i++) {
			init_num_delays_by_hour.push(init_data.filter(data=>parseFloat(data.hour) == hours[i]).length);
		}

		// Calculate average min delay by hour
		var init_avg_delay_by_hour = []; 
		for (i = 0; i < hours.length; i++) {
			init_avg_delay_by_hour.push(average(init_data.filter(data=>parseFloat(data.hour) == hours[i]).map(data=>parseFloat(data.min_delay))));
		}
		
		// Calculate total number of delays by day
		var init_num_delays_by_day = [];	
		for (i = 0; i < days.length; i++) {
			init_num_delays_by_day.push(init_data.filter(data=>data.day == days[i]).length);
		}

		// Calculate average min delay by day
		var init_avg_delay_by_day = [];	
		for (i = 0; i < days.length; i++) {
			init_avg_delay_by_day.push(average(init_data.filter(data=>data.day == days[i]).map(data=>parseFloat(data.min_delay))));
		}

		console.log(init_num_delays_by_hour);
		console.log(init_avg_delay_by_hour);
		console.log(init_num_delays_by_day);
		console.log(init_avg_delay_by_day);


// 		

// 			/* Create line graph */
		
// 		// Define trace 1
// 		var time_trace1 = {
// 		  x: time_groups.slice(1),
// 		  y: init_time_graph_num_delays,
// 		  name: 'Number of Delays',
// 		  type: 'scatter',
// 		  hoverinfo: 'y'
// 		};

// 		// Define trace 2
// 		var time_trace2 = {
// 		  x: time_groups.slice(1),
// 		  y: init_time_graph_avg_delay,
// 		  name: 'Average Delay In Minutes',
// 		  yaxis: 'y2',
// 		  type: 'scatter',
// 		  hoverinfo: 'y'
// 		};

// 		// Define data
// 		var time_data = [time_trace1, time_trace2];
			
// 		// Define layout
// 		var time_layout = {
// 		  title: 'Number of Delays and Average Minimum Delay By Time of Day',
// 		  xaxis: {title: 'Time of Day'},
// 		  yaxis: {
// 			title: 'Total Number of Subway Delays',
// 			titlefont: {color: '#1f77b4'},
// 			tickfont: {color: '#1f77b4'},
// 			hoverformat: '.2f'
// 		  },
// 		  yaxis2: {
// 			title: 'Average Delay To Subway Service (Minutes)',
// 			titlefont: {color: '#ff7f0e'},
// 			tickfont: {color: '#ff7f0e'},
// 			hoverformat: '.2f',
// 			overlaying: 'y',
// 			side: 'right'
// 		  },
// 		  legend: {"orientation":"h",xanchor:'center',y:1.1,x:0.5}
// 		};
				
// 		// Plot graph
// 		Plotly.newPlot("time",time_data,time_layout);
		
// 			/* Create day bar chart */
		
// 		// Define trace 1
// 		var day_trace1 = {
// 		  x: days.slice(1),
// 		  y: init_day_graph_num_delays,
// 		  name: 'Number of Delays',
// 		  type: 'scatter',
// 		  hoverinfo: 'y'
// 		};

// 		// Define trace 2
// 		var day_trace2 = {
// 		  x: days.slice(1),
// 		  y: init_day_graph_avg_delay,
// 		  name: 'Average Delay In Minutes',
// 		  yaxis: 'y2',
// 		  type: 'scatter',
// 		  hoverinfo: 'y'
// 		};

// 		// Define data
// 		var day_data = [day_trace1, day_trace2];
			
// 		// Define layout
// 		var day_layout = {
// 		  title: 'Number of Delays and Average Minimum Delay By Day of Week',
// 		  xaxis: {title: 'Day of Week'},
// 		  yaxis: {
// 			title: 'Total Number of Subway Delays',
// 			titlefont: {color: '#1f77b4'},
// 			tickfont: {color: '#1f77b4'},
// 			hoverformat: '.2f'
// 		  },
// 		  yaxis2: {
// 			title: 'Average Delay To Subway Service (Minutes)',
// 			titlefont: {color: '#ff7f0e'},
// 			tickfont: {color: '#ff7f0e'},
// 			hoverformat: '.2f',
// 			overlaying: 'y',
// 			side: 'right'
// 		  },
// 		  legend: {"orientation":"h",yanchor:'top',xanchor:'center',y:1.1,x:0.5}
// 		};
				
// 		// Plot graph
// 		Plotly.newPlot("day",day_data,day_layout);
		
	});
		
};

// Call function init
init();

// // Create optionChanged function - Referenced in HTML file
// function optionChanged(){
	
// 	// Define data
// 	d3.json(url).then(function(data){
	
// 		// Save current dropdown values 
// 		var current_time_subway_value = d3.select("#time_subway_filter").property("value");
// 		var current_time_month_value = d3.select("#time_month_filter").property("value");
// 		var current_time_day_value = d3.select("#time_day_filter").property("value");
// 		var current_day_subway_value = d3.select("#day_subway_filter").property("value");
// 		var current_day_month_value = d3.select("#day_month_filter").property("value");
// 		var current_day_time_value = d3.select("#day_time_filter").property("value");
		
// 		// Print data
// 		// console.log(current_time_subway_value);
// 		// console.log(current_time_month_value);
// 		// console.log(current_time_day_value);
// 		// console.log(current_day_subway_value);
// 		// console.log(current_day_month_value);
// 		// console.log(current_day_time_value);
		
// 			  /* Filter data for the time graph based on current dropdown values */

//         if (current_time_subway_value == 'All'){
//             var current_time_data_temp1 = data;
//         }
//         else {
//             var current_time_data_temp1 = data.filter(data=>data.line_name == current_time_subway_value);
//         }

//         if (current_time_month_value == 'All'){
//             var current_time_data_temp2 = current_time_data_temp1;
//         }
//         else {
//             var current_time_data_temp2 = current_time_data_temp1.filter(data=>data.month == current_time_month_value);
//         }

//         if (current_time_day_value == 'All'){
//             var current_time_data = current_time_data_temp2;
//         }
//         else {
//             var current_time_data = current_time_data_temp2.filter(data=>data.day == current_time_day_value);
//         }
        
// 	   		/* Filter data for the day graph based on current dropdown values */
	   
//         if (current_day_subway_value == 'All'){
//             var current_day_data_temp1 = data;
//         }
//         else {
//             var current_day_data_temp1 = data.filter(data=>data.line_name == current_day_subway_value);
//         }

//         if (current_day_month_value == 'All'){
//             var current_day_data_temp2 = current_day_data_temp1;
//         }
//         else {
//             var current_day_data_temp2 = current_day_data_temp1.filter(data=>data.month == current_day_month_value);
//         }

//         if (current_day_time_value == 'All'){
//             var current_day_data = current_day_data_temp2;
//         }
//         else {
//             var current_day_data = current_day_data_temp2.filter(data=>data.time_range == current_day_time_value);
//         }
       
// 			/* Group data by time and date groups */

// 		// Group data by time groups
// 		var current_time_data_group1 = current_time_data.filter(data=>data.time_range == time_groups[1]);
// 		var current_time_data_group2 = current_time_data.filter(data=>data.time_range == time_groups[2]);
// 		var current_time_data_group3 = current_time_data.filter(data=>data.time_range == time_groups[3]);
// 		var current_time_data_group4 = current_time_data.filter(data=>data.time_range == time_groups[4]);
// 		var current_time_data_group5 = current_time_data.filter(data=>data.time_range == time_groups[5]);
// 		var current_time_data_group6 = current_time_data.filter(data=>data.time_range == time_groups[6]);
		
// 		// Group data by day groups
// 		var current_day_data_group1 = current_day_data.filter(data=>data.day == days[1]);
// 		var current_day_data_group2 = current_day_data.filter(data=>data.day == days[2]);
// 		var current_day_data_group3 = current_day_data.filter(data=>data.day == days[3]);
// 		var current_day_data_group4 = current_day_data.filter(data=>data.day == days[4]);
// 		var current_day_data_group5 = current_day_data.filter(data=>data.day == days[5]);
// 		var current_day_data_group6 = current_day_data.filter(data=>data.day == days[6]);
// 		var current_day_data_group7 = current_day_data.filter(data=>data.day == days[7]);
		
// 			/* Calculate total number of delays and average min delay by time and day groups */
		
// 		// Calculate total number of delays for the time graph
// 		var current_time_graph_num_delays = [];
// 		current_time_graph_num_delays.push(current_time_data_group1.length);
// 		current_time_graph_num_delays.push(current_time_data_group2.length);
// 		current_time_graph_num_delays.push(current_time_data_group3.length);
// 		current_time_graph_num_delays.push(current_time_data_group4.length);
// 		current_time_graph_num_delays.push(current_time_data_group5.length);
// 		current_time_graph_num_delays.push(current_time_data_group6.length);
		
// 		// Calculate total number of delays for the day graph
// 		var current_day_graph_num_delays = [];		
// 		current_day_graph_num_delays.push(current_day_data_group1.length);
// 		current_day_graph_num_delays.push(current_day_data_group2.length);
// 		current_day_graph_num_delays.push(current_day_data_group3.length);
// 		current_day_graph_num_delays.push(current_day_data_group4.length);
// 		current_day_graph_num_delays.push(current_day_data_group5.length);
// 		current_day_graph_num_delays.push(current_day_data_group6.length);
// 		current_day_graph_num_delays.push(current_day_data_group7.length);
		
// 		// Calculate average min delay for the time graph
// 		var current_time_graph_avg_delay = [];	
// 		current_time_graph_avg_delay.push(average(current_time_data_group1.map(data=>parseFloat(data.min_delay))));
// 		current_time_graph_avg_delay.push(average(current_time_data_group2.map(data=>parseFloat(data.min_delay))));
// 		current_time_graph_avg_delay.push(average(current_time_data_group3.map(data=>parseFloat(data.min_delay))));
// 		current_time_graph_avg_delay.push(average(current_time_data_group4.map(data=>parseFloat(data.min_delay))));
// 		current_time_graph_avg_delay.push(average(current_time_data_group5.map(data=>parseFloat(data.min_delay))));
// 		current_time_graph_avg_delay.push(average(current_time_data_group6.map(data=>parseFloat(data.min_delay))));
		
// 		// Calculate average min delay for the day graph
// 		var current_day_graph_avg_delay = [];	
// 		current_day_graph_avg_delay.push(average(current_day_data_group1.map(data=>parseFloat(data.min_delay))));
// 		current_day_graph_avg_delay.push(average(current_day_data_group2.map(data=>parseFloat(data.min_delay))));
// 		current_day_graph_avg_delay.push(average(current_day_data_group3.map(data=>parseFloat(data.min_delay))));
// 		current_day_graph_avg_delay.push(average(current_day_data_group4.map(data=>parseFloat(data.min_delay))));
// 		current_day_graph_avg_delay.push(average(current_day_data_group5.map(data=>parseFloat(data.min_delay))));
// 		current_day_graph_avg_delay.push(average(current_day_data_group6.map(data=>parseFloat(data.min_delay))));
// 		current_day_graph_avg_delay.push(average(current_day_data_group7.map(data=>parseFloat(data.min_delay))));

// 			/* Update time bar graph */
		
// 		// Define data
// 		var time_update = {
// 		  y: [current_time_graph_num_delays,
// 			  current_time_graph_avg_delay]
// 		};
		
// 		// Retyle graph
// 		Plotly.restyle("time",time_update,[0,1]);
		
// 			/* Update day bar graph */ 
		
// 		// Define data
// 		var day_update = {
// 		  y: [current_day_graph_num_delays,
// 			  current_day_graph_avg_delay]
// 		};
		
// 		// Retyle graph
// 		Plotly.restyle("day",day_update,[0,1]);

// 	});
	
// };
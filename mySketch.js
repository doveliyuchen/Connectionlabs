let weatherreport, mapData, mapDataa, weather2report,method,weatherreport1;
let weatherreport2;
let array2=[];
let array3=[];
let array4=[];
let array5=[];
let array6=[];
let array7=[];

d3.csv('NA.csv')
.then(function(WeatherDataset) {
  weatherreport = WeatherDataset;
  for (let i=0; i< weatherreport.length; i++){
    array2.splice(i,0,weatherreport[i])
  }
  console.log(array2);
  isDataReady();
});
d3.csv('Asia.csv')
.then(function(WeatherDataset) {
  weather2report = WeatherDataset;
  for (let i=0; i< weather2report.length; i++){
    array3.splice(i,0,weather2report[i])
  }
  console.log(array3);
  isDataReady();
});

d3.json('Asia.geo.json')

.then(function(mapDataset) {
  mapData = mapDataset.features; 
  isDataReady();
});

d3.json('NA.geo.json')

.then(function(mapDataset) {
  mapDataa = mapDataset.features; 
  isDataReady();
});


function isDataReady() {
	if (mapData && weatherreport && mapDataa &&weather2report) {

		console.log('Datasets are ready');
   drawAll()
   
 }

}

function drawAll(){

  d3.select('#clear').on('click', function(d){
    d3.select('svg').remove()
    
  })
  d3.select('#comp').on('mouseover',function(d){

   if (document.getElementById('Asia').checked){


     d3.select('#comp').on('click', function(d){


      drawout1()
    })


   }
   if (document.getElementById('NA').checked){

    d3.select('#comp').on('click', function(d){



      drawout()
    })

  }
  
})
  function drawMap() {



  //d3.select('body').append('h1').text('WeatherDataset');

  


  drawout1()
}

function drawout1(){


	let projection = d3.geoMercator();


	projection.scale(230)

  .center([140, 57]);
  let pathGenerator = d3.geoPath(projection);
  


  let svg = d3.select('body').append('svg').attr('width', '35vw').attr('height', '100vh').style('margin-left', '20vw').style('display', 'block').style('justify-content', 'center').style('background-color','rgba(0,0,0,0.7)').style('margin-top', '5vw');
  let width = 565;
  let height = 220;
  
  let array=[]

  let margin = { top: 169,right: 50, bottom: 50, left: 40 };

  let array1=[]
  for (i=0;i<weatherreport.length;i++){

    array.splice(i,array.length,weather2report[i].Year)
    array1.splice(i,array1.length,weather2report[i].Value)
  }
  let a=d3.min(array.map(Number))
  let b=d3.max(array.map(Number))+1

  let dataYearyear=d3.range(a,b).map(d => ({
    year: d,
    value: array1[d-a]

  }));
  console.log(a)
  let map=	svg.selectAll('path')
  .data(mapData)
  .enter()
  .append('path')
  .attr('d', pathGenerator)

  

  let g = d3
  .select('div#slider')
  .append('svg')
  .append('g')
  .attr('width', width)
  .attr('height', height*5);

  let padding = 0.1;

  let xBand = d3
  .scaleBand()
  .domain(dataYearyear.map(d => d.year))
  .range([margin.left, width - margin.right])
  .padding(padding);

  let xLinear = d3
  .scaleLinear()
  .domain([
    d3.min(dataYearyear, d => d.year),
    d3.max(dataYearyear, d => d.year),
    ])
  .range([
    margin.left + xBand.bandwidth() / 2 + xBand.step() * padding - 0.5,
    width -
    margin.right -
    xBand.bandwidth() / 2 -
    xBand.step() * padding -
    0.5,
    ]);

  let y = d3
  .scaleLinear()
  .domain([0, d3.max(dataYearyear, d => d.value)])
  .nice()
  .range([height - margin.bottom, margin.top]);

  let yAxis = g =>
  g
  .attr('transform', `translate(${width - margin.right},0)`)
  .call(
    d3
    .axisRight(y)
    .tickValues([1e4])
    .tickFormat(d3.format(''))
    )
  .call(g => g.select('.domain').remove());

  let slider = g =>
  g.attr('transform', `translate(0,${height - margin.bottom})`).call(
    d3
    .sliderBottom(xLinear)
    .step(1)
    .ticks(5)
    .default(a)
    .on('onchange', value => draw(value))
    );

  let bars = svg
  .append('g')
  .selectAll('rect')
  .data(dataYearyear);

  let barsEnter = bars
  .enter()
  .append('rect')
  .attr('x', d => xBand(d.year))
  .attr('y', d => y(d.value))
  .attr('height', d => (y(0) - y(d.value))*20)
  .attr('width', xBand.bandwidth());

  svg.append('g').call(yAxis);
  svg.append('g').call(slider);
  let output1=0
  let draw = selected => {
    barsEnter
    .merge(bars)
    .attr('fill', d => (d.year === selected ? '#bad80a' : '#e0e0e0'));
    output1=dataYearyear[selected -a].value/100
    d3.select('p#value-week').text(
     "There are "+
     d3.format('')(dataYearyear[selected-a].value) +"  ℃ changes compared to the average temperature in Asia at the selected time!"
     );
    map.attr('fill', d3.interpolateReds(output1*20))


  };

  draw(a);





}
function drawMap1() {



  //d3.select('body').append('h1').text('WeatherDataset');


  drawout()
}
function drawout(){


	let projection = d3.geoMercator();


	projection.scale(200)

  .center([-45, 82]);
  let pathGenerator = d3.geoPath(projection);
  


  let svg = d3.select('body').append('svg').attr('width', '35vw').attr('height', '100vh').style('margin-left', '20vw').style('display', 'block').style('justify-content', 'center').style('background-color','rgba(0,0,0,0.7)').style('margin-top', '5vw');

  let width = 565;
  let height = 220;
  
  let array=[]

  let margin = { top: 165,right: 50, bottom: 50, left: 40 };

  let array1=[]
  for (i=0;i<weatherreport.length;i++){

    array.splice(i,array.length,weatherreport[i].Year)
    array1.splice(i,array1.length,weatherreport[i].Value)
  }
  let a=d3.min(array.map(Number))
  let b=d3.max(array.map(Number))+1

  let dataYearyear=d3.range(a,b).map(d => ({
    year: d,
    value: array1[d-a]

  }));
  console.log(a)
  let map=	svg.selectAll('path')
  .data(mapDataa)
  .enter()
  .append('path')
  .attr('d', pathGenerator)

  

  let g = d3
  .select('div#slider')
  .append('svg')
  .append('g')
  .attr('width', width)
  .attr('height', height);

  let padding = 0.1;

  let xBand = d3
  .scaleBand()
  .domain(dataYearyear.map(d => d.year))
  .range([margin.left, width - margin.right])
  .padding(padding);

  let xLinear = d3
  .scaleLinear()
  .domain([
    d3.min(dataYearyear, d => d.year),
    d3.max(dataYearyear, d => d.year),
    ])
  .range([
    margin.left + xBand.bandwidth() / 2 + xBand.step() * padding - 0.5,
    width -
    margin.right -
    xBand.bandwidth() / 2 -
    xBand.step() * padding -
    0.5,
    ]);

  let y = d3
  .scaleLinear()
  .domain([0, d3.max(dataYearyear, d => d.value)])
  .nice()
  .range([height - margin.bottom, margin.top]);

  let yAxis = g =>
  g
  .attr('transform', `translate(${width - margin.right},0)`)
  .call(
    d3
    .axisRight(y)
    .tickValues([1e4])
    .tickFormat(d3.format(''))
    )
  .call(g => g.select('.domain').remove());

  let slider = g =>
  g.attr('transform', `translate(0,${height - margin.bottom})`).call(
    d3
    .sliderBottom(xLinear)
    .step(1)
    .ticks(5)
    .default(a)
    .on('onchange', value => draw(value))
    );

  let bars = svg
  .append('g')
  .selectAll('rect')
  .data(dataYearyear);

  let barsEnter = bars
  .enter()
  .append('rect')
  .attr('x', d => xBand(d.year))
  .attr('y', d => y(d.value))
  .attr('height', d => (y(0) - y(d.value))*5)
  .attr('width', xBand.bandwidth());

  svg.append('g').call(yAxis);
  svg.append('g').call(slider);
  let output1=0
  let draw = selected => {
    barsEnter
    .merge(bars)
    .attr('fill', d => (d.year === selected ? '#bad80a' : '#e0e0e0'));
    output1=dataYearyear[selected -a].value/100
    d3.select('p#value-week').text("There are "+
      d3.format('')(dataYearyear[selected-a].value) +" ℃ changes compared to the average temperature in North America at the selected time!"
      );
    map.attr('fill', d3.interpolateReds(output1*20))


  };

  draw(a);




}
}
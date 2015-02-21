'use strict';

console.log('\'Allo \'Allo!');

// (function(){

  var svg = d3.select('svg');

  // var data = [1,2,3];
  var data = generateData(5);

  var color = d3.scale.category10();
  var colors = {
    enter: 'green',
    update: 'blue',
    exit: 'red'
  };
  var scale = d3.scale.linear()
    .domain([0, 70])
    .range([0, 70]);

  function generateData(count){
    var data = [];
    var keys = {};

    while(data.length < count){
      var k = Math.round(Math.random()*(count+2));
      var v = Math.round(Math.random()*50+20);
      if(!keys[k]){
        data.push({
          k: k,
          v: v
        });
        keys[k] = true;
      }
    }

    data.sort(function(a,b){ return a.k-b.k; });

    return data;
  }

  var container = svg.append('g')
    .attr("transform", "translate("+(170.5)+","+(0.5)+")");

  var container2 = svg.append('g')
    .attr("transform", "translate("+(30.5)+","+(50.5)+")");

  container.append('text')
    .attr('x', 35)
    .attr('y', 20)
    .style('text-anchor', 'middle')
    .style('font-weight', 'bold')
    .style('font-size', '12px')
    .text('myData')

  container.append('text')
    .attr('x', 90)
    .attr('y', 20)
    .style('text-anchor', 'middle')
    .style('font-weight', 'bold')
    .style('font-size', '12px')
    .text('Key')

  container.append('text')
    .attr('x', 150)
    .attr('y', 20)
    .style('text-anchor', 'middle')
    .style('font-weight', 'bold')
    .style('font-size', '12px')
    .text('DOM')

  svg.append('text')
    .attr('x', 30.5)
    .attr('y', 20.5)
    .text('Chart')
    .style('font-weight', 'bold')
    .style('font-size', '12px')

  container2.append('line')
    .attr('y1', -10)
    .attr('y2', 130)
    .style('stroke', '#bbb')

  function key(d){ return d.k; }

  var prevSelection = null;
  var prevSelection2 = null;

  function bind(data){
    updateVisual1();
    bind1(data);
    bind2(data);
  }

  function bind1(data){
    var selection = container.selectAll('g.unit')
      .data(data, key);

    var sEnter = selection.enter();
    var sExit = selection.exit();

    // update
    var sUpdateTrans = selection.transition()
      .attr("transform", function(d, i){return "translate("+(40)+","+(50 + i*30)+")";})

    sUpdateTrans.select('text.dom-text')
      .text('update')
      .style('fill', colors.update)

    sUpdateTrans.select('circle.k-circle')
      .style('fill', colors.update)
      .style('stroke', colors.update)

    sUpdateTrans.select('text.dom-code')
      .style('opacity', 1)
      .style('font-weight', 'normal')

    sUpdateTrans.select('text.data-text')
      .text(function(d){return '{k:'+d.k+', v:'+d.v+'}';})

    // enter
    var g = sEnter.append('g')
      .classed('unit', true)
      .attr("transform", function(d, i){return "translate("+(40)+","+(50 + i*30)+")";})

    g.append('line')
      .attr('x1', 30)
      .attr('x2', 40)
      .style('stroke', '#bbb')

    g.append('line')
      .attr('x1', 60)
      .attr('x2', 70)
      .style('stroke', '#bbb')

    g.append('circle')
      .classed('key-circle', true)
      .attr('cx', 50)
      .attr('r', 10)
      .style('fill-opacity', 0.2)
      .style('fill', color(1))
      .style('stroke', color(1))

    g.append('text')
      .text(key)
      .style('text-anchor', 'middle')
      .attr('x', 50)
      .attr('y', 5)

    g.append('rect')
      .attr('x', -35)
      .attr('y', -10)
      .attr('width', 65)
      .attr('height', 20)
      .style('stroke-width', '1px')
      .style('stroke-dasharray', '5, 5')
      .style('stroke', '#bbb')
      .style('fill', 'none')
      // .style('fill', '#00acee')

    g.append('rect')
      .attr('x', 70)
      .attr('y', -10)
      .attr('width', 80)
      .attr('height', 20)
      .style('stroke-width', '1px')
      .style('stroke-dasharray', '5, 5')
      .style('stroke', '#bbb')
      .style('fill', 'none')

    g.append('text')
      .classed('dom-code', true)
      .text('<rect>')
      .attr('x', 110)
      .style('text-anchor', 'middle')
      .style('opacity', 0)
      .attr('y', 5)

    g.append('text')
      .classed('dom-text', true)
      .text('enter')
      .attr('x', 160)
      .style('text-anchor', 'start')
      .style('fill', colors.enter)
      .attr('y', 5)

    g.append('text')
      .classed('data-text', true)
      .attr('x', 25)
      .attr('y', 4)
      .text(function(d){return '{k:'+d.k+', v:'+d.v+'}';})
      .style('font-size', '12px')
      .style('text-anchor', 'end')

    // exit
    var i = -1;
    var sExitTrans = sExit.transition()
      .attr("transform", function(d){
        i++;
        return "translate("+(270 + 40)+","+(50 + i*30)+")";
      })

    sExitTrans.select('circle.k-circle')
      .style('fill', colors.exit)
      .style('stroke', colors.exit)

    sExitTrans.select('text.dom-text')
      .text('exit')
      .style('fill', colors.exit)

    sExitTrans.select('text.data-text')
      .style('opacity', 0.2)

    sExitTrans.select('text.dom-code')
      .style('font-weight', 'normal')
      .style('opacity', 1)

    prevSelection = selection;
  }

  function bind2(data){
    var selection2 = container2.selectAll('g')
      .data(data, key);

    prevSelection2 = selection2;
  }

  function updateVisual(){
    updateVisual1();
    updateVisual2();
  }

  function updateVisual1(){
    if(prevSelection){
      var sUpdateTrans = prevSelection.transition();
      sUpdateTrans.select('text.dom-code')
        .style('font-weight', 'bold')
        .style('opacity', 1)
      // sUpdateTrans.select('text.data-text')
      //   .text(function(d){return '{k:'+d.k+', v:'+d.v+'}';})

      prevSelection.exit().remove();

      prevSelection = null;
    }
  }

  function updateVisual2(){
    if(prevSelection2){
      var sEnter = prevSelection2.enter()
        .append('g')
      sEnter.append('rect')
        .attr('y', function(d){return d.k * 15;})
        .attr('height', 14)
        .style('fill', color(1))
        .attr('width', 0);
      sEnter.append('text')
        .text(function(d){return d.k;})
        .attr('x', -4)
        .attr('y', function(d){return d.k * 15 + 12;})
        .style('text-anchor', 'end')
      prevSelection2.transition().select('rect')
        .attr('width', function(d){return scale(d.v);});
      prevSelection2.exit().remove();

      prevSelection2 = null;
    }
  }

  // bind(data);


// }());

import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import * as d3 from 'd3';

/**
 * This class represents the lazy loaded LineChartDoubleComponent.
 */
@Component({
  selector: 'app-sd-line-chart-double-bigger',
  templateUrl: 'line-chart-double-bigger.component.html',
  styleUrls: ['line-chart-double-bigger.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LineChartDoubleBiggerComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() itemData: any[];
  @Input() chartType = ''; // values: 'percentage'
  @Input() showAndriodFilter = true;
  @Input() showPaymentFilter = true;

  /**
   * Creates an instance of the LineChartDoubleComponent
   *
   */
  constructor(private el: ElementRef) {}

  /**
   * OnInit
   */
  ngOnInit() {
    this.createChart(this.itemData);
  }

  /**
   * OnChanges
   */
  ngOnChanges() {
    this.createChart(this.itemData);
  }

  /**
   * resize window
   */
  onResize(event) {
    this.createChart(this.itemData);
  }

  /**
   * create the chart
   */
  createChart(itemData) {
    console.log(itemData);
    const element = this.chartContainer.nativeElement;

    const data = [];
    itemData.data.forEach((item, index) => {
      data.push({
        date: createDate(item['date']),
        andriodNumber: item['andriodNumber'],
        paymentNumber: item['paymentNumber']
      });
    });

    data['columns'] = [
      'date',
      'Planned',
      'Actual'
    ];

    d3.select(element).selectAll('*').remove();

    const svg = d3.select(element);
    // set the dimensions and margins of the graph
    const margin = {top: 20, right: 20, bottom: 20, left: 40};
    const width: number = this.el.nativeElement.offsetWidth - margin.left - margin.right;
    const height: number = Number(svg.attr('height')) - margin.top - margin.bottom;

    // set the ranges
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    // define the line
    const valuelineAndriod = d3.line()
        .x((d) => x(d['date']))
        .y((d) => y(d['andriodNumber']));
    const valuelinePayment = d3.line()
        .x((d) => x(d['date']))
        .y((d) => y(d['paymentNumber']));

    const div = d3.select('body').append('div')
        .attr('class', 'tooltip-line-chart')
        .style('display', 'none');

    // add the Y gridlines
    svg.append('g')
        .attr('class', 'grid')
        .attr('transform', 'translate(40, 0)')
        .call(make_y_gridlines()
            .tickSize(-width)
            .tickFormat(() => '')
        );

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const g = svg.append('g')
        .attr('transform',
              'translate(' + margin.left + ',' + margin.top + ')');

    // Get the data

    // scale the range of the data
    x.domain(d3.extent(data, (d) => d.date));

    if (this.chartType === '') {
      y.domain([0, d3.max(data, (d) => d.andriodNumber)]);
    } else {
      y.domain([0.94, 1]);
    }

    // add the valueline path.
    if (this.showAndriodFilter) {
      g.append('path')
         .data([data])
         .attr('class', 'line')
         .attr('stroke', '#3b1a40')
         .attr('d', valuelineAndriod);
    }

    if (this.showPaymentFilter) {
      g.append('path')
         .data([data])
         .attr('class', 'line')
         .attr('stroke', '#3c6df0')
         .attr('d', valuelinePayment);
    }

    // add the X Axis
    g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + (height - 10) + ')')
        .call(d3.axisBottom(x).ticks(itemData['data'].length).tickFormat(d3.timeFormat('%b')));

    if (this.chartType === '') {
      g.append('g')
        .attr('class', 'axis axis--y')
        .attr('transform', 'translate(0, 0)')
        .call(d3.axisLeft(y).ticks(6));
    } else {
      g.append('g')
        .attr('class', 'axis axis--y')
        .attr('transform', 'translate(0, 0)')
        .call(d3.axisLeft(y).ticks(6, '%'));
    }

    // create date
    function createDate(str) {
      const strArray = str.split('/');
      return new Date(strArray[2], parseInt(strArray[0], 10) - 1, strArray[1]);
    }

    // gridlines in y axis function
    function make_y_gridlines() {
        return d3.axisLeft(y)
                 .ticks(5);
    }
  }
}

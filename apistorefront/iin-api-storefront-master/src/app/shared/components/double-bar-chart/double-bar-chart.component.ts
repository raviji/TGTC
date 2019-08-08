import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import * as d3 from 'd3';
import { formatDate } from '@angular/common';

/**
 * This class represents the lazy loaded BarChartComponent.
 */
@Component({
  selector: 'app-sd-double-bar-chart',
  templateUrl: 'double-bar-chart.component.html',
  styleUrls: ['double-bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DoubleBarChartComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() itemData: any[];
  @Input() showAndriodFilter = true;
  @Input() showPaymentFilter = true;

  /**
   * Creates an instance of the DoubleBarChartComponent
   *
   */
  constructor(private router: Router, private el: ElementRef) {}

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
   * render the chart
   */
  render() {
    this.createChart(this.itemData);
  }

  /**
   * create the chart
   */
  createChart(itemData) {
    console.log(itemData);
    const element = this.chartContainer.nativeElement;
    const offset = this.showAndriodFilter && this.showPaymentFilter ? 9 : 0;

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
      'percentage',
      'actualPercentage'
    ];
    console.log(data);

    d3.select(element).selectAll('*').remove();

    const div = d3.select('body').append('div')
                .attr('class', 'tooltip-bar-chart')
                .style('display', 'none');

    const svg = d3.select(element);
    const margin = {top: 10, right: 10, bottom: 30, left: 30};
    const width = +this.el.nativeElement.offsetWidth - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    const x = d3.scaleBand().rangeRound([0, width]).padding(1);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    // add the Y gridlines
    svg.append('g')
        .attr('class', 'grid')
        .attr('transform', 'translate(37, 10)')
        .call(make_y_gridlines()
            .tickSize(-width)
            .tickFormat(() => '')
        );

    const g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    x.domain(data.map((d) => d.date));
    y.domain([0, 20]);

    g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(y).ticks(5));

    if (this.showAndriodFilter) {
      g.selectAll('.andriodBar')
        .data(data)
        .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', (d) => x(d.date))
          .attr('y', (d) => y(d.andriodNumber))
          .attr('fill', '#3b1a40')
          .attr('width', 16)
          .attr('height', (d) => (height - y(d.andriodNumber)))
          .attr('transform', 'translate(-' + offset + ', 0)');
    }

    if (this.showPaymentFilter) {
      g.selectAll('.paymentBar')
        .data(data)
        .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', (d) => x(d.date))
          .attr('y', (d) => y(d.paymentNumber))
          .attr('fill', '#3c6df0')
          .attr('width', 16)
          .attr('height', (d) => (height - y(d.paymentNumber)))
          .attr('transform', 'translate(' + offset + ', 0)');
    }

    g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(5,' + (height - 0) + ')')
        .call(d3.axisBottom(x).ticks(itemData['data'].length).tickFormat((d) => d3.timeFormat('%b')(new Date(d))));

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

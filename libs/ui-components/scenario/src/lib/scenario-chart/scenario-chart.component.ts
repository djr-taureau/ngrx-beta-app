import {
	Component,
	OnInit,
	AfterViewInit,
	Renderer2,
	ViewChildren,
	ElementRef,
	QueryList,
	Directive,
	ViewChild,
	HostListener,
	Output,
	EventEmitter,
	Input,
	ChangeDetectionStrategy,
	OnChanges,
	SimpleChanges,
	ChangeDetectorRef
} from '@angular/core';
import { EChartOption } from 'echarts';
import { sort, findIndex, propEq, remove, filter } from 'ramda';
import { format } from 'date-fns';
import { icons } from '../data/data';
import { setCurrentDrag } from '../../../../core/src/lib/behaviors';
import { fromEvent, interval } from 'rxjs';
import { throttle } from 'rxjs/operators';

@Directive({
	// tslint:disable-next-line:directive-selector
	selector: '.drop-detector'
})
export class ChartSelectorDirective {}

@Directive({
	// tslint:disable-next-line:directive-selector
	selector: '.chart'
})
export class EChartSelectorDirective {}

@Directive({
	// tslint:disable-next-line:directive-selector
	selector: '.dragdetection'
})
export class DragDetectionDirective {}

@Component({
	selector: 'lw-scenario-chart',
	templateUrl: './scenario-chart.component.html',
	styleUrls: ['./scenario-chart.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScenarioChartComponent
	implements OnInit, AfterViewInit, OnChanges {
	@ViewChild(ChartSelectorDirective, { read: ElementRef })
	chartSelector: ElementRef;

	@ViewChild(EChartSelectorDirective, { read: ElementRef })
	eChart: ElementRef;

	//Emits object with goal type and date
	@Output() addGoal: EventEmitter<any> = new EventEmitter();

	//Emits number with goal ID
	@Output() removeGoal: EventEmitter<any> = new EventEmitter();

	//Emits goal ID
	@Output() clickGoal: EventEmitter<any> = new EventEmitter();

	//Emits goal ID
	@Output() hover: EventEmitter<any> = new EventEmitter();

	@Input() markers;

	@Input() startDate;

	@Input() endDate;

	gridOffsetTop = 10;
	gridOffsetRight = 50;
	minZoom = 12;
	canvasHeight;
	canvasWidth;
	chartDates = [];
	dataPoints = [];
	pastDataPoints = [];
	dataLength = 1000;
	initialZoomInYears = 5;
	maxZoomResolution = 12;
	minZoomValue;
	currentYear = new Date().getFullYear();
	currentMonth = new Date().getMonth();
	currentDateMonth = new Date(this.currentYear, this.currentMonth);
	chart;
	markPoints;
	hasInitiallyRendered;
	currentDraggedItemMove = null;
	isItemDraggedOff = false;
	dragRemoveTimer;
	tooltipContent;
	tooltipTop = '0px';
	tooltipLeft = '0px';
	tooltipOpacity = 1;
	showTooltip = false;
	tooltipEventX;
	tooltipEventY;
	isChartRendered = false;
	updateData = null;
	merge = null;
	seriesData;
	option;
	chartOption: EChartOption;
	chartStartYear;
	hasChartInitialized = false;
	isChartAnimated = true;
	hoverDate;
	chartMouseMove$;

	constructor(
		private renderer: Renderer2,
		private cdRef: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.generateDatapoints();

		const currentDateIndex = this.getDateIndex(this.currentDateMonth);

		const dataZoomStart = currentDateIndex / this.dataLength * 100;
		const dataZoomEnd =
			(currentDateIndex + this.initialZoomInYears * 12) /
			this.dataLength *
			100;

		this.minZoomValue = 12 / this.dataLength * 100;

		this.seriesData = this.getSeriesData();

		this.option = {
			grid: {
				left: 0,
				top: this.gridOffsetTop,
				right: this.gridOffsetRight
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'line',
					lineStyle: {
						color: '#000',
						width: 2,
						shadowColor: '#000',
						shadowBlur: 0,
						shadowOffsetY: 18
					},
					label: {
						show: true,
						margin: 25,
						color: '#000',
						backgroundColor: 'transparent',
						formatter: this.dateFormatter.bind(this)
					}
				},
				extraCssText: 'opacity: 0'
			},
			dataZoom: [
				{
					type: 'inside',
					start: dataZoomStart,
					end: dataZoomEnd,
					minSpan: this.minZoomValue
				}
			],
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: this.chartDates,
				axisLabel: {
					align: 'left',
					color: '#959595',
					padding: 3,
					margin: 5,
					formatter: this.dateFormatter.bind(this),
					showMaxLabel: false,
					fontFamily: "'Lato', sans-serif"
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: '#000',
						opacity: 0.1
					}
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: '#000',
						opacity: 0.1
					}
				},
				axisTick: {
					length: 17,
					lineStyle: {
						color: 'rgba(0,0,0,.1)'
					}
				}
			},
			yAxis: {
				type: 'value',
				position: 'right',
				axisLine: {
					show: true,
					lineStyle: {
						color: '#000',
						opacity: 0.1
					}
				},
				axisTick: {
					show: false
				},
				splitLine: {
					show: false
				},
				axisLabel: {
					color: '#959595',
					fontFamily: "'Lato', sans-serif",
					show: false
				}
			},
			series: this.seriesData
		};
		this.chartOption = this.option;
	}

	ngAfterViewInit() {
		this.renderer.listen(
			this.chartSelector.nativeElement,
			'dragover',
			function(event) {
				event.preventDefault();
			}
		);

		this.renderer.listen(
			this.chartSelector.nativeElement,
			'drop',
			this.dropEventListener.bind(this)
		);

		this.renderer.listen(
			this.chartSelector.nativeElement,
			'mouseup',
			() => {
				this.updateChartData();
			}
		);

		const chartDragover$ = fromEvent(
			this.chartSelector.nativeElement,
			'dragover'
		);

		// this.renderer.listen(
		// 	this.chartSelector.nativeElement,
		// 	'dragover',
		// 	this.tooltipController.bind(this)
		// );

		chartDragover$
			.pipe(throttle(val => interval(16.66666667)))
			.subscribe((e: any) => {
				this.tooltipController(e);
			});

		this.renderer.listen(
			this.chartSelector.nativeElement,
			'dragleave',
			this.handleChartDragExit.bind(this)
		);

		// const chartMouseMoveListener = (e) => {

		// }

		// this.chartMouseMove$ = new Observable();

		// const handleChartMouseMove = (e) => {

		// 	const hoverDateIndex = this.calculateDateIndex(e.layerX, e.layerX);
		// 	const currentHoverDate = this.getChartDateWithDateIndex(hoverDateIndex);
		// 	if (this.hoverDate !== currentHoverDate) {
		// 		this.hoverDate = currentHoverDate;
		// 		this.hover.emit(this.hoverDate);
		// 	}
		// }

		// this.renderer.listen(
		// 	this.chartSelector.nativeElement,
		// 	'mousemove',
		// 	subscriber.
		// 	// this.handleChartMouseMove.bind(this)
		// );

		const chartMouseMove$ = fromEvent(
			this.chartSelector.nativeElement,
			'mousemove'
		);

		chartMouseMove$
			.pipe(throttle(val => interval(16.66666667)))
			.subscribe((e: any) => {
				this.handleChartMouseMove(e);
			});

		this.renderer.listen(
			this.chartSelector.nativeElement,
			'dragenter',
			() => {
				this.showTooltip = true;
			}
		);

		this.renderer.listen(
			this.chartSelector.nativeElement,
			'mousedown',
			() => {
				this.setChartMouseMove(true);
			}
		);
	}

	ngOnChanges(changes: SimpleChanges) {
		if (this.hasChartInitialized) {
			this.updateChartData();
		}

		if (typeof changes.markers !== 'undefined') {
			if (typeof changes.markers.previousValue !== 'undefined') {
				if (
					changes.markers.previousValue.length <
					changes.markers.currentValue.length
				) {
					this.showTooltip = false;
					this.cdRef.detectChanges();
				}
			}
		}

		if (
			(typeof changes.endDate !== 'undefined' ||
				typeof changes.startDate !== 'undefined') &&
			this.hasChartInitialized
		) {
			const previousDataLength = this.dataLength;
			const prevStartZoom = this.chart.getOption().dataZoom[0].start;
			const prevEndZoom = this.chart.getOption().dataZoom[0].end;
			this.generateDatapoints();
			this.chart.setOption({
				xAxis: {
					data: this.chartDates
				}
			});
			const newDataLength = this.dataLength;
			const zoomRatio = previousDataLength / newDataLength;
			const newStartZoom = prevStartZoom * zoomRatio;
			const newEndZoom = prevEndZoom * zoomRatio;
			this.chart.setOption({
				dataZoom: {
					start: newStartZoom,
					end: newEndZoom
				}
			});
		}
	}

	onChartInit(event) {
		this.chart = event;
		this.canvasHeight = event.getHeight();
		this.canvasWidth = event.getWidth();

		this.hasInitiallyRendered = true;

		this.chart.on('datazoom', () => {
			this.updateChartData();
		});

		this.chart.on('click', this.handleChartClick.bind(this));

		this.hasChartInitialized = true;
	}

	generateDatapoints() {
		let chartStartDate;
		let chartEndDate;
		this.chartDates = [];
		this.dataPoints = [];
		this.pastDataPoints = [];

		if (!this.startDate) {
			const markersSortedByDate = this.getMarkersSortedByDate();
			chartStartDate = new Date(
				markersSortedByDate[0].date.getFullYear() - 1,
				0
			);
		} else {
			chartStartDate = this.startDate;
		}

		if (!this.endDate) {
			chartEndDate = new Date(this.currentYear + 50, 0);
		} else {
			chartEndDate = this.endDate;
		}

		for (
			let date = chartStartDate;
			date < chartEndDate;
			date = this.getNextMonth(date)
		) {
			this.chartDates.push(date);
			this.dataPoints.push(100);

			if (this.currentDateMonth >= date) {
				this.pastDataPoints.push(100);
			} else {
				this.pastDataPoints.push(null);
			}
		}

		this.dataLength = this.chartDates.length;
	}

	getNextMonth(date) {
		if (date.getMonth() === 11) {
			return new Date(date.getFullYear() + 1, 0);
		} else {
			return new Date(date.getFullYear(), date.getMonth() + 1);
		}
	}

	getFormattedDate(date) {
		return format(date, 'MMM YYYY');
	}

	dateFormatter(value, index) {
		let date;
		if (typeof value === 'object') {
			date = value.value;
		} else {
			date = value;
		}
		let formattedDate = this.getFormattedDate(date);
		if (formattedDate === this.getFormattedDate(new Date())) {
			formattedDate = 'This Month';
		}
		return formattedDate;
	}

	getMarkers() {
		return this.markers;
	}

	getSeriesData(markers: any = this.getMarkers(), addMarkers = true) {
		const debts = {
			name: 'Debts',
			type: 'line',
			showSymbol: false,
			lineStyle: { width: 0 },
			stack: false,
			smooth: 0.6,
			smoothMonotone: 'x',
			itemStyle: { color: 'rgba(0,0,0,0)' },
			areaStyle: {
				color: 'rgba(255, 255, 255, 0)',
				opacity: 0.8
			},
			data: this.dataPoints,
			markPoint: {
				data: this.generateMarkpoints(markers),
				animation: this.isChartAnimated
			}
		};
		const past = {
			name: 'Past',
			type: 'line',
			showSymbol: false,
			lineStyle: { width: 0 },
			stack: false,
			smooth: 0.6,
			smoothMonotone: 'x',
			itemStyle: { color: 'rgba(0,0,0,0)' },
			areaStyle: { color: 'rgba(0, 0, 0, 1)', opacity: 0.1 },
			data: this.pastDataPoints
		};
		return [debts, past]; // color at 0% position // color at 100% position
	}

	getChartResolution(
		startValue: any = 'undefined',
		endValue: any = 'undefined'
	) {
		if (typeof this.chart.getOption() === 'undefined') {
			return null;
		}

		startValue =
			startValue !== 'undefined'
				? startValue
				: this.chart.getOption().dataZoom[0].startValue;
		endValue =
			endValue !== 'undefined'
				? endValue
				: this.chart.getOption().dataZoom[0].endValue;
		const currentCanvasWidth = this.chart.getWidth();

		const range = endValue - startValue;
		return Math.round(currentCanvasWidth / range);
	}

	getRenderCadence(chartResolution: any = 'undefined') {
		const minChartResolution = 50;
		let renderCadence = 1;

		if ((chartResolution = 'undefined')) {
			chartResolution = this.getChartResolution();
		}

		if (chartResolution < minChartResolution) {
			renderCadence =
				Math.floor(minChartResolution / chartResolution) + 1;
		}

		return renderCadence;
	}

	generateMarkpoints(markers) {
		const chartXCount = {};
		const chartXCountWorking = {};
		const heightDistance = 13;
		const heightOffset = 8;
		const maxGoalVerticalAmount = 7;

		const markersSortedByDate = sort(this.dateSorter, markers);
		let renderCadence;
		if (this.hasInitiallyRendered) {
			renderCadence = this.getRenderCadence();
		} else {
			renderCadence = 1;
		}

		const getXAxis = date => {
			let xAxis = this.getDateIndex(date);

			const renderCadenceCompensation = xAxis % renderCadence;

			xAxis = xAxis - renderCadenceCompensation;

			return xAxis;
		};

		markersSortedByDate.map(marker => {
			const xAxis = getXAxis(marker.date);

			if (chartXCount[xAxis]) {
				chartXCount[xAxis] = chartXCount[xAxis] + 1;
			} else {
				chartXCount[xAxis] = 1;
			}
		});

		const markersToRender = markers.map(marker => {
			const xAxis = getXAxis(marker.date);
			let heightDistanceToUse = heightDistance;
			let markerSymbol;

			if (chartXCountWorking[xAxis]) {
				chartXCountWorking[xAxis] = chartXCountWorking[xAxis] + 1;
			} else {
				chartXCountWorking[xAxis] = 1;
			}

			if (chartXCount[xAxis] > maxGoalVerticalAmount) {
				heightDistanceToUse =
					heightDistance * maxGoalVerticalAmount / chartXCount[xAxis];
			}

			const yPosition =
				(chartXCountWorking[xAxis] - 1) * heightDistanceToUse +
				heightOffset;

			if (marker.selected) {
				markerSymbol = icons[marker.type].selectedImage;
			} else {
				markerSymbol = icons[marker.type].image;
			}

			return {
				name: marker.id,
				xAxis: xAxis,
				yAxis: yPosition,
				symbolSize: 35,
				symbol: `image://${markerSymbol}`
			};
		});

		return markersToRender;
	}

	isFutureDate(date) {
		return date > this.currentDateMonth;
	}

	getDateWithItemIndex(index) {
		return this.markers[index].date;
	}

	isItemInFutureWithIndex(index) {
		return this.isFutureDate(this.getDateWithItemIndex(index));
	}

	isItemInFutureWithId(id) {
		return this.isItemInFutureWithIndex(this.findMarkerIndexWithId(id));
	}

	findMarkerIndexWithId(id) {
		return findIndex(propEq('id', id))(this.markers);
	}

	returnMarkersWithoutId(id) {
		const markerIndex = this.findMarkerIndexWithId(id);

		return remove(markerIndex, 1, this.markers);
	}

	removeMarkerWithId(id) {
		const markerIndex = this.findMarkerIndexWithId(id);
		this.removeGoal.emit(id);
		this.markers = remove(markerIndex, 1, this.markers);
	}

	setChartMouseMove(bool) {
		this.chart.setOption({ dataZoom: { moveOnMouseMove: bool } });
	}

	updateMarkerDateWithDateIndex(id, dateIndex) {
		const markerIndex = this.findMarkerIndexWithId(id);
		this.markers[markerIndex].date = this.getChartDateWithDateIndex(
			dateIndex
		);
	}

	getChartDateWithDateIndex(markerPosition) {
		return this.chartDates[markerPosition];
	}

	addMarker = (x, y, type) => {
		const newMarkerPosition = this.calculateDateIndex(x, y);

		const markerToAddDate = this.getChartDateWithDateIndex(
			newMarkerPosition
		);

		const markerToAdd = { type: type, date: markerToAddDate };

		this.addGoal.emit(markerToAdd);
	};

	calculateDateIndex = (x, y) => {
		if (typeof this.chart.getOption() === 'undefined') {
			return null;
		}
		const currentCanvasWidth = this.chart.getWidth();
		const startValue = this.chart.getOption().dataZoom[0].startValue;
		const endValue = this.chart.getOption().dataZoom[0].endValue;
		const range = endValue - startValue;

		const newPosition = Math.round(
			startValue + x / (currentCanvasWidth - this.gridOffsetRight) * range
		);

		return newPosition;
	};

	getDateIndex(date) {
		return this.chartDates.findIndex(element => {
			return element.getTime() === date.getTime();
		});
	}

	dateSorter(a, b) {
		return a.date > b.date ? 1 : -1;
	}

	setZoomPosition(start = 0, end = 12) {
		const zoomCompensation = 0.05;

		const startPercentage = this.getGraphDistance(start);
		const endPercentage = this.getGraphDistance(end);

		const startPercentageWithCompensation =
			startPercentage - startPercentage * zoomCompensation;
		const endPercentageWithCompensation =
			endPercentage + endPercentage * zoomCompensation;

		this.chart.setOption({
			dataZoom: {
				start: startPercentageWithCompensation,
				end: endPercentageWithCompensation
			}
		});
		this.updateChartData();
	}

	getGraphDistance(numericalPosition) {
		const percentPosition = numericalPosition / this.dataLength * 100;

		return percentPosition;
	}

	updateChartData(markers: any = 'undefined', isAnimated = true) {
		this.isChartAnimated = isAnimated;
		markers = markers !== 'undefined' ? markers : this.markers;
		this.chart.setOption({ series: this.getSeriesData(markers) });
	}

	updateChartZoom(direction) {
		let newRange;
		const startValue = this.chart.getOption().dataZoom[0].startValue;
		const endValue = this.chart.getOption().dataZoom[0].endValue;
		const range = endValue - startValue;
		const multiplier = 1.5;
		if (direction === 'out') {
			newRange = range * multiplier;
		} else if (direction === 'in') {
			newRange = range / multiplier;
		} else if (direction === 'fit') {
			this.updateChartZoomFit();
		}

		newRange = newRange < this.minZoom ? this.minZoom : newRange;
		const newEndValue = newRange + startValue;
		this.setZoomPosition(startValue, newEndValue);
	}

	updateChartZoomFit() {
		const chartZoomPadding = 0;

		const markersSortedByDate = this.getMarkersSortedByDate();

		const beginningDate = markersSortedByDate[0].date;
		const endDate =
			markersSortedByDate[markersSortedByDate.length - 1].date;

		this.fitToDates(beginningDate, endDate, chartZoomPadding);
	}

	getMarkersSortedByDate() {
		return sort(this.dateSorter, this.markers);
	}

	fitToDates(beginningDate, endDate, padding = 0, minOn = true) {
		const beginningIndex = this.getDateIndex(beginningDate);
		let endIndex = this.getDateIndex(endDate);
		const range = endIndex - beginningIndex;
		if (minOn && range < this.minZoom) {
			endIndex = beginningIndex + this.minZoom;
		}

		const shift =
			this.dataLength %
			this.getRenderCadence(
				this.getChartResolution(beginningIndex, endIndex)
			);

		this.setZoomPosition(beginningIndex - shift, endIndex - shift);
	}

	//DRAGGING

	dropEventListener(event) {
		event.preventDefault();

		const markerKey = event.dataTransfer.getData('marker');

		const dateIndex = this.calculateDateIndex(event.layerX, event.layerY);
		const isDropDateFutureDate = this.isFutureDate(
			this.getChartDateWithDateIndex(dateIndex)
		);

		if (this.currentDraggedItemMove !== null) {
			this.removeDragDetection();
			if (isDropDateFutureDate) {
				this.updateMarkerDateWithDateIndex(
					this.currentDraggedItemMove,
					dateIndex
				);
			}
			this.currentDraggedItemMove = null;
			this.updateChartData();
			return false;
		}

		if (markerKey) {
			if (isDropDateFutureDate) {
				this.addMarker(event.layerX, event.layerY, markerKey);
			}
		}
	}

	chartMouseDown(e) {
		const currentDraggedItemIndex = this.findMarkerIndexWithId(e.data.name);

		this.isItemDraggedOff = null;
		if (this.isItemInFutureWithIndex(currentDraggedItemIndex)) {
			this.addDragDetection();
			this.currentDraggedItemMove = currentDraggedItemIndex;
		}
	}

	handleChartClick(e) {
		const markerId = e.data.name;

		if (this.isItemInFutureWithId(markerId)) {
			this.clickGoal.emit(markerId);
		}
	}

	addDragDetection() {
		// this.addedDragDetectionDiv = true;
	}

	removeDragDetection() {
		// this.addedDragDetectionDiv = false;
	}

	handleChartDragStart(e) {
		if (
			this.currentDraggedItemMove !== null &&
			this.isItemDraggedOff === null
		) {
			this.setChartMouseMove(false);
			const markersWithoutDraggedMarkers = this.returnMarkersWithoutId(
				this.currentDraggedItemMove
			);
			const hasId = propEq('id', this.currentDraggedItemMove);
			const currentDraggedItemMoveType = filter(hasId, this.markers)[0]
				.type;
			this.updateChartData(markersWithoutDraggedMarkers);
			setCurrentDrag(
				currentDraggedItemMoveType,
				e,
				icons[currentDraggedItemMoveType].dragImage
			);
		}
	}

	handleChartDragExit(e) {
		this.showTooltip = false;
		if (this.currentDraggedItemMove !== null) {
			this.isItemDraggedOff = true;
		}
		this.cdRef.detectChanges();
	}

	tooltipController(event) {
		if (
			this.tooltipEventX !== event.layerX ||
			this.tooltipEventY !== event.layerY
		) {
			this.tooltipEventX = event.layerX;
			this.tooltipEventY = event.layerY;

			const markerPosition = this.calculateDateIndex(
				event.layerX,
				event.layerY
			);
			const chartDate = this.getChartDateWithDateIndex(markerPosition);

			if (this.isFutureDate(chartDate)) {
				this.tooltipOpacity = 1;
				this.tooltipTop = event.layerY + 'px';
				this.tooltipContent = this.getFormattedDate(chartDate);
			} else {
				this.tooltipOpacity = 0.5;
				this.tooltipTop = event.layerY - 16 + 'px';
				this.tooltipContent = 'Goals may not be<br/>placed in the past';
			}

			this.tooltipLeft = event.layerX + 'px';
			this.showTooltip = true;
			this.cdRef.detectChanges();
		}
	}

	handleChartMouseMove = e => {
		const hoverDateIndex = this.calculateDateIndex(e.layerX, e.layerX);
		const currentHoverDate = this.getChartDateWithDateIndex(hoverDateIndex);
		if (this.hoverDate !== currentHoverDate) {
			this.hoverDate = currentHoverDate;
			this.hover.emit(this.hoverDate);
		}
	};

	zoomClickHandler(event) {
		const startValue = this.chart.getOption().dataZoom[0].startValue;
		if (typeof event.target.dataset.zoomAmount !== 'undefined') {
			const endValue =
				startValue + Number(event.target.dataset.zoomAmount) * 12;
			this.setZoomPosition(startValue, endValue);
		} else {
			switch (event.target.dataset.zoomKey) {
				case 'zoomin':
					this.updateChartZoom('in');
					break;
				case 'zoomout':
					this.updateChartZoom('out');
					break;
				case 'fit':
					this.updateChartZoomFit();
					break;
				default:
					break;
			}
		}
	}
}

import React from 'react'
import chart from 'chart.js/auto'
import DoughnutChart from './DoughnutChart'
import BarChart from './BarChart'

export default function Overview(props) {
	
	console.log(props)

	const data = {
		labels: ['Investment', 'Profit'],
		datasets: [{
			data: [props.total_investment, props.total_pnl],
			backgroundColor: [
				'rgb(255, 99, 132)',
				'rgb(121, 234, 134)'
			],
			hoverOffset: 4
		}]
	}


	

	const portfolio_allocation_data = {
		labels: props.portfolio_allocation_data.labels,
		datasets: [{
			data: props.portfolio_allocation_data.data,
			hoverOffset: 4
		}]
	}

	return (
		<div className="main--overview">
			<div className="main--overview--top">
				<DoughnutChart chartData={data} options={{plugins: {legend: {display: false}, title: {display: true, text: "Overview"}}}}/>
				<DoughnutChart chartData={portfolio_allocation_data} options={{plugins: {legend: {display: false}, title: {display: true, text: "Stocks Allocation"}}}}/>
			</div>
			<BarChart chartData={props.bar_chart_data} options={props.options} />
			<li>Total Investment: {props.total_investment.toFixed(2)}</li>
			<li>Total PNL: {props.total_pnl.toFixed(2)}</li>
			<li>Today's PNL: {props.total_daypnl.toFixed(2)}</li>
    </div>	
	)
}

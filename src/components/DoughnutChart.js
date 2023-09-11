import React from 'react'
import {Doughnut} from 'react-chartjs-2'

export default function DoughnutChart(props) {
	return (
		<div className="overview--doughnut">
			<Doughnut
				data={props.chartData}
				options={props.options}
			/>			
		</div>
	)
}

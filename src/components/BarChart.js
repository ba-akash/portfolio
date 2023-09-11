import React from 'react'
import {Bar} from 'react-chartjs-2'

export default function BarChart({chartData, options}) {
	return (
		<div className="overview--bar">
			<Bar
				data={chartData}
				options={options}
			/>			
		</div>
	)
}

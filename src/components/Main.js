import React from 'react'
import data from '../data.js'
import Stock from './Stock'
import Overview from './Overview'
import {Colors} from 'react-chartjs-2'

export default function Main() {
	
	let bar_chart_label = []
	let bar_chart_dataset = []
	let stock_pnl_dataset = []
	let bar_chart_pnl_color = []

	let pad_label = []
	let pad_data = []

	let stockData = data["stockdata"]
	const stocksList = stockData.map(eachStock => {
		bar_chart_label.push(eachStock.tradingsymbol)
		bar_chart_dataset.push(eachStock.currentvalue)
		stock_pnl_dataset.push(eachStock.profitandloss)
		bar_chart_pnl_color.push(eachStock.profitandloss > 0 ? "green" : "red")
		

		/* Data for Portfolio Allocation Pie Chart */
		pad_label.push(eachStock.tradingsymbol)
		pad_data.push(eachStock.currentvalue)

		return (
			<Stock
				key={eachStock.isin}
				{...eachStock}
			/>
		)
	})
	
	return (
		<div className="main--container">
			<Overview
				bar_chart_data={
				{
					"labels": bar_chart_label,
					"datasets": [
						{
							label: "Invested Amount",
							data: bar_chart_dataset,
							backgroundColor: "blue"
						}, {
							label: "PNL",
							data: stock_pnl_dataset,
							backgroundColor: bar_chart_pnl_color
						}
					]
				}} 

				options = {{
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
}}
			portfolio_allocation_data = {{
				"labels": pad_label,
				"data": pad_data,
			}}

				total_investment={data['total_investment']}
				total_daypnl={data['total_daypnl']}
				total_pnl={data['total_pnl']}
			/>
			<table className="portfolio--table">
				<tr><th>Stock Name</th><th>Quantity</th><th>Average Price</th><th>Current Price</th><th>Day PNL</th><th>Invested Amount</th><th>Current Value</th><th>Total PNL</th></tr>
				<tbody>
					{stocksList}
				</tbody>
			</table>
		</div>
	)
}

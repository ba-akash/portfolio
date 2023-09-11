import React from 'react'

export default function Stock(props) {
	return (
		<tr className="portfolio--row">
			<td className="portfolio--data">{props.tradingsymbol}</td>
			<td className="portfolio--data">{props.quantity}</td>
			<td className="portfolio--data">{props.averageprice}</td>
			<td className="portfolio--data">{props.close}</td>
			<td className="portfolio--data">{props.daypnl.toFixed(2)}</td>
			<td className="portfolio--data">{props.investment.toFixed(2)}</td>
			<td className="portfolio--data">{props.currentvalue.toFixed(2)}</td>
			<td className="portfolio--data">{props.profitandloss.toFixed(2)}</td>
		</tr>
	)
}

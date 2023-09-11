from apscheduler.schedulers.blocking import BlockingScheduler
import pdb

class Stock:
	def __init__(self, name, stock_data, profitandloss, investment, currentvalue, daypnl):
		self.name = name
		self.stock_data = stock_data
		self.profitandloss = profitandloss
		self.investment = investment
		self.currentvalue = currentvalue
		self.daypnl = daypnl

	def __repr__(self):
		return '{' +  + '}'
		
def fetch_stocks_data():
	print("Fetchin Data from API")
	from SmartApi import SmartConnect
	import pyotp
	api_key = 'YOUR_API_KEY'
	clientId = 'YOUR_CLIENT_ID'
	pwd = 'YOUR_PASSWORD'
	smartApi = SmartConnect(api_key)
	token = 'YOUR_TOKEN'
	totp=pyotp.TOTP(token).now()
	correlation_id = "YOUR_CORRELATION_ID"
	data = smartApi.generateSession(clientId, pwd, totp)
	authToken = data['data']['jwtToken']
	refreshToken = data['data']['refreshToken']
	fdata = smartApi.holding()

	processed_data = []
	total_investment = 0
	total_pnl = 0
	total_daypnl = 0

	for stock_data in fdata['data']:
		profitandloss = (stock_data['ltp']-stock_data['averageprice']) * stock_data['quantity']
		investment = stock_data['quantity']*stock_data['averageprice']
		currentvalue = stock_data['quantity']*stock_data['ltp']
		
		daypnl = (stock_data['averageprice'] - stock_data['close']) * stock_data['quantity']
		processed_data.append({'tradingsymbol': stock_data["tradingsymbol"], 'quantity': stock_data['quantity'], 'averageprice': stock_data['averageprice'], 'ltp': stock_data['ltp'], 'close': stock_data['close'], 'daypnl': daypnl, 'investment': investment, 'currentvalue': currentvalue, 'profitandloss': profitandloss})
		total_investment += investment
		total_daypnl += daypnl
		total_pnl += profitandloss
		print (total_daypnl)

	returndata = {'stockdata': processed_data, 'total_investment': total_investment,  'total_daypnl': total_daypnl, 'total_pnl': total_pnl}
	print("Writing data to file")
	f = open("/home/sky/portfolio/src/data.js", "w")
	f.write("export default " + str(returndata))
	f.close()

fetch_stocks_data()
#scheduler = BlockingScheduler()
#scheduler.add_job(fetch_stocks_data, 'interval', seconds=10000)
#scheduler.start()

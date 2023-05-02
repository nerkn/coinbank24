
let helpers ={
fetch:(url, data)=>fetch(url, {
    method:   'Post',
    headers:  { 'Content-Type': 'application/json'},
    body:     JSON.stringify(data)
    }),

FiatTranspose:(prices, from, to)=>{
  if(!prices)
    return false;
  if(!prices.length)
    return false;
  if(from == to)
    return 1
  console.log('FiatTranspose', from, to)

  let uto   = to.toUpperCase();
  let ufrom = from.toUpperCase();
  if(uto   == 'USD')    uto    += 'T'
  if(ufrom == 'USD')    ufrom  += 'T'

  let foundFrom = prices.find(e => (e.numeratorSymbol == ufrom))
  let foundTo;
  if(foundFrom){
    if(uto === 'USDT')
      return foundFrom.low
    foundTo = prices.find(e => (e.numeratorSymbol == uto))
    if(foundTo)
      return foundFrom.low/foundTo.low
      console.log(foundFrom, foundTo)
    return false
  }

  foundTo = prices.find(e => (e.numeratorSymbol == uto))
  if(foundTo){
    if(ufrom === 'USDT')
      return 1/foundTo.low
    foundFrom = prices.find(e => (e.numeratorSymbol == ufrom))
    if(foundFrom)
      return foundFrom.low/foundTo.low
    return false;
  }
  return false;
}
}
export default helpers;
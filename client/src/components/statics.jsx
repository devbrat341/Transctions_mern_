import React from 'react'

function statics({data, month}) {
    let totalCost = 0;
    let totalSold = 0;
    let totalUnSold = 0;
    let ans = data.map((product) =>{
        totalCost += product.price;
        if(product.sold){
            totalSold++;
        }
        else{
            totalUnSold++;
        }
    })

    const months = {
        all : "all Transaction",
        "1" : "January",
        "2" : "February",
        "3" : "March",
        "4" : "April",
        "5" : "May",
        "6" : "June",
        "7" : "July",
        "8" : "Augist",
        "9" : "September",
        "10" : "October",
        "11" : "November",
        "12" : "December"
    }
  return (
    <div className='continer'>
        <div className='sub-container'>
            <h3>
                <u>Starics - {month[month]}</u>
            </h3>
            <div className='card'>
                <div className='card-total'>
                    <h4>Totlal Sales</h4>
                    <h4>${totalCost}</h4>
                </div>
                <div className='card-sold'>
                    <h4>Totlal sold items</h4>
                    <h4>${totalSold}</h4>
                </div>
                <div className='card-unsold'>
                    <h4>Totlal unsold items</h4>
                    <h4>${totalUnSold}</h4>
                </div>
            </div>
        </div>

    </div>
  )

}

export default statics
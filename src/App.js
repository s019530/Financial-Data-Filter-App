import { useEffect, useState } from 'react';
import './App.css';
import TableElement from './Components/TableElement'
import FilterMenu from './Components/FilterMenu'

let previousValue = "n";
let AscendDescvendValue = -1;

function App() {
  

  const [TV, setTV] = useState(["0","0","0","0","0"]);
  const [originalTV, setoriginalTV] = useState(["0","0","0","0","0"]);  
  const[sortValues, setSortValues] = useState([0,0,0]);
  const [filterValues, setFilterValues] = useState([-1,-1,-1,-1,-1,-1]);
  const [filterMenuClass, setFilterMenuClass] = useState("hideFilterMenu");

  useEffect(() => {
    var values = []
    //Test Data
    /*values[0] = ["2024-01-01", "1234567", "56789", "12345", "6.6", "12345"];
    values[1] = ["2024-02-01", "222222", "55", "66", "6.6", "66"];
    values[2] = ["2024-07-02", "333333", "55", "66", "6.6", "66"];
    values[3] = ["2024-04-01", "11111", "55", "66", "6.6", "66"];
    values[4] = ["2024-07-01", "55555", "55", "66", "6.6", "66"];*/

    fetch("https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=GMwFClmiEMzjONoUeFyRnFhKL2ceTUhz").then(function (response){
      return response.json();
    }).then(function (data){
      for(let i = 0; i !== data.length; i++){
        values.push([data[i]['date'], data[i]['revenue'], data[i]['netIncome'], data[i]['grossProfit'],data[i]['eps'], data[i]['operatingExpenses']]);
      }
      setTV(values);
      setoriginalTV(values);
    })
    
    setTV(values);
    setoriginalTV(values);

  }, []);

  useEffect(() => {
    
    if(!(sortValues[0] === 0 && sortValues[1] === 0 && sortValues[2] === 0)){

      if(sortValues[0] === 1){
        previousValue === 0 ? AscendDescvendValue++ : AscendDescvendValue = 0;
        previousValue = 0;

        sortByDate(TV, setTV);

      }
      else if(sortValues[1] === 1){
        previousValue === 1 ? AscendDescvendValue++ : AscendDescvendValue = 0;
        previousValue = 1;
        sortByRevenue_or_income(TV, setTV, 0);
      }
      else{
        previousValue === 2 ? AscendDescvendValue++ : AscendDescvendValue = 0;
        previousValue = 2;
        sortByRevenue_or_income(TV, setTV, 1);
      }
    }
  },[sortValues]);

  useEffect(() => {
    let arr = [];

    if(filterValues[0] === -1 && filterValues[1] === -1 && filterValues[2] === -1 && filterValues[3] === -1 && filterValues[4] === -1 && filterValues[5] === -1){
      setTV(originalTV);
      return;
    }

    for(let i = 0; i !== originalTV.length; i++){
      let displayedRevenue = originalTV[i][1];
      let displayedIncome = originalTV[i][2];
      let year = originalTV[i][0].split('-')[0];
      /*  
        date from = 0
        date to = 1
        rev from = 2
        rev to = 3
        inc from = 4
        inc to = 5
      */

      if(filterValues[0] !== -1 && (parseFloat(year) < parseFloat(filterValues[[0]]))){
      }
      else if(filterValues[1] !== -1 && (parseFloat(year) > parseFloat(filterValues[[1]]))){
      }
      else if(filterValues[2] !== -1 && (parseFloat(displayedRevenue) < parseFloat(filterValues[[2]]))){
      }
      else if(filterValues[3] !== -1 && (parseFloat(displayedRevenue) > parseFloat(filterValues[[3]]))){
      } 
      else if(filterValues[4] !== -1 && (parseFloat(displayedIncome) < parseFloat(filterValues[[4]]))){
      } 
      else if(filterValues[5] !== -1 && (parseFloat(displayedIncome) > parseFloat(filterValues[[5]]))){
      } else{
        arr.push(originalTV[i]);
      }
    }
    let newArr = []

    for(let i = 0; i !== arr.length; i++){ //fixes the case of undefined in the array
      if(typeof arr[i] !== 'undefined'){
        newArr.push(arr[i]);
      }
    }
    

    setTV(originalTV);
    setTV(newArr);
  },[filterValues]);

  return (
    <>
      <FilterMenu currentClassName={filterMenuClass} changeClassName={setFilterMenuClass} setFilterValues={setFilterValues} setTV = {setTV} originalTV = {originalTV}/>
      <div className='bg-[rgb(220,220,220)] h-screen'>
        <TableElement tableValues = {TV} setSortValues = {setSortValues} sortValue = {sortValues}/>
      </div>
    </>
  );
}

export default App;

function sortByDate(TV, setTV){
  let arr = [...TV];
  
  if(AscendDescvendValue % 2 === 0){
    arr.sort((a,b) => Date.parse(a[0]) - Date.parse(b[0]));
  }else{
    arr.sort((a,b) => Date.parse(b[0]) - Date.parse(a[0]));
  }


  setTV(arr)

}


//type = 0 revenue, type = 1 income
function sortByRevenue_or_income(TV, setTV, RevOrInc){
  
  let arr = [...TV];

  
  if(RevOrInc === 0) {
    if(AscendDescvendValue % 2 === 0){
      arr.sort((a,b) => parseFloat(a[1]) - parseFloat(b[1]));
    }else{
      arr.sort((a,b) => parseFloat(b[1]) - parseFloat(a[1]));
    }
  }
  else if(RevOrInc === 1) {
    if(AscendDescvendValue % 2 === 0){
      arr.sort((a,b) => parseFloat(a[2]) - parseFloat(b[2]));
    }else{
      arr.sort((a,b) => parseFloat(b[2]) - parseFloat(a[2]));
    }
  }

  setTV(arr);
}





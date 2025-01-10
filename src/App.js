import { useEffect, useState, useRef } from 'react';
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
    //values[0] = ["0","0","0","0","0"];
    /*values[0] = ["1-7-25", "3", "7"];
    values[1] = ["2-13-25", "2", "8"];
    values[2] = ["3-1-25", "8", "11"];
    values[3] = ["7-13-22", "4", "32"];
    values[4] = ["12-1-23", "5", "12"];*/

    fetch("https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=GMwFClmiEMzjONoUeFyRnFhKL2ceTUhz").then(function (response){
      return response.json();
    }).then(function (data){
      for(let i = 0; i != data.length; i++){
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

  const firstUpdate = useRef(0);

  useEffect(() => {
    let arr = [];

    if(firstUpdate.current != 2){
      firstUpdate.current++;
      return;
    }


    if(filterValues[0] == -1 && filterValues[1] == -1 && filterValues[2] == -1 && filterValues[3] == -1 && filterValues[4] == -1 && filterValues[5] == -1){
      setTV(originalTV);
      return;
    }

    for(let i = 0; i != originalTV.length; i++){
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
      if(filterValues[0] != -1 && (parseFloat(year) < parseFloat(filterValues[[0]]))){
      }
      else if(filterValues[1] != -1 && (parseFloat(year) > parseFloat(filterValues[[1]]))){
      }
      else if(filterValues[2] != -1 && (parseFloat(displayedRevenue) < parseFloat(filterValues[[2]]))){
      }
      else if(filterValues[3] != -1 && (parseFloat(displayedRevenue) > parseFloat(filterValues[[3]]))){
      } 
      else if(filterValues[4] != -1 && (parseFloat(displayedIncome) < parseFloat(filterValues[[4]]))){
      } 
      else if(filterValues[5] != -1 && (parseFloat(displayedIncome) > parseFloat(filterValues[[5]]))){
      } else{
        arr.push(TV[i]);
      }
    }

    let newArr = []

    for(let i = 0; i!= arr.length; i++){ //fixes the case of undefined in the array
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
      <div className='tableDiv'>
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





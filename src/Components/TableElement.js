import './TableElement.css'

function TableElement(props){

  let theValues = props.tableValues;


  let tableValues = [...theValues];

  //tableValues = addComas(tableValues);


  const tableButtonHandler = (arr) => {
  var dateElement = document.getElementById('dateHeader');
  var revenueHeader = document.getElementById('revenueHeader');
  var netIncomeHeader = document.getElementById('netIncomeHeader');

    if(arr[0] === 1){
      dateElement.classList = "bolded";
      revenueHeader.classList = 'custom-th';
      netIncomeHeader.classList = 'custom-th';
    }
    else if(arr[1] === 1){
      dateElement.classList = "custom-th";
      revenueHeader.classList = 'bolded';
      netIncomeHeader.classList = 'custom-th';
      }
      else if(arr[2] === 1){
        dateElement.classList = "custom-th";
        revenueHeader.classList = 'custom-th';
        netIncomeHeader.classList = 'bolded';
      }
  }

  return (
    <div className='flex justify-center items-start h-[100vh] md:m-0 md:text-[18px] text-[6px]'>
      <table className='custom-table'>
        <tr className="border-2 border-black border-t-0 border-l-0 border-r-0">
          <th id = 'dateHeader' className="clickable custom-th" key="date" onClick={() => {
            props.setSortValues([1,0,0]);
            tableButtonHandler([1,0,0]);
            }}>Date</th>
          <th id='revenueHeader' className="custom-th" key="revenue" onClick={() => {
            props.setSortValues([0,1,0]);
            tableButtonHandler([0,1,0]);
            }}>Revenue</th>
          <th id='netIncomeHeader' className="custom-th" key="netincome" onClick={() => {
            props.setSortValues([0,0,1]);
            tableButtonHandler([0,0,1]);
            }}>Net Income</th>
          <th className="custom-th cursor-none">Gross Profit</th>
          <th className="custom-th cursor-none">EPS</th>
          <th className="custom-th cursor-none">Operating Income</th>
        </tr>
        {tableValues.map(tableValues => 
        <tr>
          <th className='data-th'>
            {tableValues[0]}
          </th>
          <th className='data-th'>
            {addComasHelper(tableValues[1])}
          </th>
          <th className='data-th'>
            {addComasHelper(tableValues[2])}
          </th>
          <th className='data-th'>
            {addComasHelper(tableValues[3])}
          </th>
          <th className='data-th'>
            {tableValues[4]}
          </th>
          <th className='data-th'>
            {addComasHelper(tableValues[5])}
          </th>
        </tr>
        )}
      </table>
    </div>
  );
}

export default TableElement;

function addComasHelper(input){
  let newString = '';

  if(typeof input === 'undefined'){
    return input;
  }

  input = input.toString().split('').reverse().join('');

  for(var i = input.length-1; i !== -1; i--){
    newString += input[i];
    if(i%3 === 0){
      newString += ',';
    }
  }
  if(newString[newString.length-1] === ','){
    newString = newString.substring(0, newString.length-1);
  }
  if(newString[0] === ','){
    newString = newString.substring(1, newString.length);
  }
  return newString;
}
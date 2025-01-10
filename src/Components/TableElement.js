import { tab } from '@testing-library/user-event/dist/tab';
import './TableElement.css'

function TableElement(props){

  let tableValues = props.tableValues;

  const tableButtonHandler = (arr) => {
    var dateElement = document.getElementById('dateHeader');
    var revenueHeader = document.getElementById('revenueHeader');
    var netIncomeHeader = document.getElementById('netIncomeHeader');

    if(arr[0] === 1){
      dateElement.classList = "clickable bolded";
      revenueHeader.classList = 'clickable';
      netIncomeHeader.classList = 'clickable';
    }
    else if(arr[1] === 1){
      dateElement.classList = "clickable";
      revenueHeader.classList = 'clickable bolded';
      netIncomeHeader.classList = 'clickable';
      }
      else if(arr[2] === 1){
        dateElement.classList = "clickable";
        revenueHeader.classList = 'clickable';
        netIncomeHeader.classList = 'clickable bolded';
      }
  }

  return (
    <div className='theTable'>
      <table>
        <tr className="headerRow">
          <th id = 'dateHeader' className="clickable" key="date" onClick={() => {
            props.setSortValues([1,0,0]);
            tableButtonHandler([1,0,0]);
            }}>Date</th>
          <th id='revenueHeader' className="clickable" key="revenue" onClick={() => {
            props.setSortValues([0,1,0]);
            tableButtonHandler([0,1,0]);
            }}>Revenue</th>
          <th id='netIncomeHeader' className="clickable" key="netincome" onClick={() => {
            props.setSortValues([0,0,1]);
            tableButtonHandler([0,0,1]);
            }}>Net Income</th>
          <th>Gross Profit</th>
          <th>EPS</th>
          <th>Operating Income</th>
        </tr>
        {tableValues.map(tableValues => 
        <tr>
          <th>
            {tableValues[0]}
          </th>
          <th>
            {tableValues[1]}
          </th>
          <th>
            {tableValues[2]}
          </th>
          <th>
            {tableValues[3]}
          </th>
          <th>
            {tableValues[4]}
          </th>
          <th>
            {tableValues[5]}
          </th>
        </tr>
        )}
      </table>
    </div>
  );
}

export default TableElement;

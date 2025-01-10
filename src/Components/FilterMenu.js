import "./FilterMenu.css"
/* 
Props Formatting
0 - Start Date
1 - End Date

2 - Start Revenue

3 - End Revenue

4 - Start Net Income

5 - End Net Income

*/


function FilterMenu(props){




    const saveButton = () =>{
        const revFrom = document.getElementById('revFrom').value;
        const revTo = document.getElementById('revTo').value;
        const incFrom = document.getElementById('incFrom').value;
        const incTo = document.getElementById('incTo').value;

        let newFilters = [-1,-1,-1,-1,-1,-1];

        let toYear = document.getElementById('toYear').value;
        let fromYear = document.getElementById('fromYear').value;

        if(fromYear !== ""){
            fromYear = fromYear.split('-')[0];
            newFilters[0] = fromYear;
        }

        if(toYear !== ""){
            toYear = toYear.split('-')[0];
            newFilters[1] = toYear;
        } 
        if(revFrom !== ""){
            if(isNaN(parseFloat(revFrom))){
                alert("Error In Revenue Filter");
                return;
            }
            else{
                newFilters[2] = parseFloat(revFrom);
            }
        }
        if(revTo !== ""){
            if(isNaN(parseFloat(revTo))){
                alert("Error In Revenue Filter");
                return;
            }
            else{
                newFilters[3] = parseFloat(revTo);
            }
        }
        if(incFrom !== ""){
            if(isNaN(parseFloat(incFrom))){
                alert("Error In Revenue Filter");
                return;
            }
            else{
                newFilters[4] = parseFloat(incFrom);
            }
        }
        if(incTo !== ""){
            if(isNaN(parseFloat(incTo))){
                alert("Error In Revenue Filter");
                return;
            }
            else{
                newFilters[5] = parseFloat(incTo);
            }
        }

        
        props.setFilterValues(newFilters);
    }

    const resetButton = () => {
        props.setTV(props.originalTV);
    }

    return(

        <div className = {props.currentClassName}>
            <div className="box">
                <div className="dateFilter">
                    <p>Date</p>
                    <div>
                        <input id="fromYear" type="month"/>
                        <input id="toYear" type ="month" />
                    </div>
                </div>

                <div className = "revenueFilter">
                    <p>Revenue</p>
                    <div>
                        <input id='revFrom' type="text" placeholder="from"></input>
                        <input id='revTo' type="text" placeholder="to"></input>
                    </div>
                </div>

                <div className = "netIncomeFilter">
                    <p>Net Income</p>
                    <div>
                        <input id='incFrom' type="text" placeholder="from"></input>
                        <input id='incTo' type="text" placeholder="to"></input>       
                    </div>
                </div>
                <div className="buttomDiv">
                    <button onClick={resetButton}>Reset</button>
                    <button className="savebutton" onClick={saveButton}>Save</button>
                </div>
            </div>
        </div>
    );


}

export default FilterMenu;

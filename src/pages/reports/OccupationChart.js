import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// import Chart from 'react-apexcharts'
import Api from "../../api/api";
import { useMenu } from "../../context/MenuContext";
import { Chart } from "react-google-charts";


const ReportDailyBilling = () => {
  const {register, handleSubmit} = useForm();
  const [list, setList] = useState();
  const [cashierData, setcashierData] = useState();
  const [cashierList, setcashierList] = useState();
  const [employees, setEmployees] = useState();
  const [chart, setChart] = useState("dailyBilling");
  const [dataList, setDataList] = useState();
  const { state, setState } = useMenu();


  const renderPG = (state) => {
    let type = {
      OccupationChart: changeState(state),
      dailyBilling: dailyBilling(),
      NonPayment: nonPaymentList()
    };
    return type[state] || dailyBilling()
  };
  

  const changeState = (state) => {
    if (state === "dailyBilling") {
      setState("dailyBilling")
    } else if (state === "OccupationChart") {
      setState("reports")
    }
  }

  function nonPaymentList() {
    return (
      <div className="col-sm-12 mt-4">
        <table className="table">
          <thead>
            <tr>
              <th className="col-sm-6">Cliente</th>
              <th className="col-sm-4">Data</th>
              <th className="col-sm-2">Valor</th>
            </tr>
          </thead>
          {/* {makeList()} */}
        </table>
      </div>
    )
  }


  const getList = async () => {
    try {      
      const employeesList = await Api.get("/employee");
      
      console.log("EMPLOYEEE LIST ", employeesList.data)
      setEmployees(employeesList.data) 

    } catch (err) {
      console.error(err);
    }
  };


console.log("LIST ", list)
    let array = [["Dia", "Caixa"]]
  if (list) {
    list.forEach(el => {
        array.push(el)
    })
  } else {
    array.push(["Dia", "Caixa"],)
  }

  const data = array
//   const data = [
//     ["Dia", "Caixa"],
//     list,
//     // ["2014", 100],
//     // ["2015", 1170],
//     // ["2016", 660],
//     // ["2017", 1030],
//   ];
  
  const options = {
    chart: {
      title: "Relatório de Caixa",
    //   subtitle: "Sales, Expenses, and Profit: 2014-2017",
    },
  };


  const onSubmit = async (data, event) => {
    console.log("Onsubmit")
    try {
        const employeeData = await Api.get(`/cashier/getCashierFormattedByEmployeeId/${data.employeeId}`)
        setList(employeeData.data)
    } catch (error) {
        console.log("error gettting cashier ", error.message)
        
    }
     
  }




  function dailyBilling() {
    return (
    //   <div>
    //     <h4>Faturamento diário Por Usuário</h4>
    //     <Chart options={dailyBillingChart.options} series={dailyBillingChart.series} type="bar" height={350} />

        
    //   </div>
    <div>
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
      />
      </div>
    )
  }




  useEffect(() => {
    getList();    
  }, []);


  return (
    <div className="container col-sm-12">
      <div className="tollbar mt-1">
        <h2>Relatórios</h2>
      </div>
      <div className="row">

      <div className="buttons mt-5 col-sm-12">
        <button 
        className="button-form mr-2 rounded col-sm-3" 
        type="submit" 
        onClick={() => {renderPG("OccupationChart")}}>
          Ocupação
        </button>        
          <button 
          className="button-form mr-2 rounded col-sm-3" 
          type="submit"
          onClick={() => {setChart("dailyBilling")}}
          >
            Faturamento
          </button>
        <button 
        className="button-form mr-2 rounded col-sm-3" 
        type="submit"
        onClick={() => {setChart("NonPayment")}}
        >
          Inadimplência
        </button>        
          </div>
      </div>

        <div className="mt-5 mb-5">
          <h3>Filtros</h3>
          <div>
            <h2>Selecione o caixa</h2>
            <form onSubmit={handleSubmit(onSubmit, window.event)}>
            <select
              className="col-sm-2 rounded border mr-1"
              {...register("employeeId")}
            >
              <option value="">Selecione o Usuário</option>
              {employees && employees.map(employee => 
              <option key={employee.id} value={employee.id}>{employee.name}</option>
            )}             
            </select>
            
          
          
          <label className="rounded"></label>
          {/* <input
            id="date" 
            type="date"
            placeholder="Data Inicial"
            className="rounded border"
            {...register("initialDate")}
            />
          <label className=""></label>
          <input
            id="date" 
            type="date"
            placeholder="Data Final"
            className="rounded border"
            {...register("endDate")}
            /> */}
          <input type="submit" value="Ok" />
            </form>
            </div>
        </div>
        
        {renderPG(chart)}
    </div>
  );
};

export default ReportDailyBilling;

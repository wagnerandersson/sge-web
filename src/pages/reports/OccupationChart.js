import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Chart from 'react-apexcharts'
import Api from "../../api/api";
import { useMenu } from "../../context/MenuContext";

const ReportDailyBilling = () => {
  const {register, handleSubmit} = useForm();
  const [list, setList] = useState();
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



  function dailyBilling() {
    return (
      <div>
        <h4>Faturamento diário Por Usuário</h4>
        <Chart options={dailyBillingChart.options} series={dailyBillingChart.series} type="bar" height={350} />

        
      </div>
    )
  }


  // PRECISA ORGANIZAR OS VALORES DE ACORDO COM O MES PARA IMPRIMIR CERTO NO CHART
  // function formatToChart() {
  //   const usersData = separetesByDayAndUser()
  //   let valueByUser = []
  //   let calendarByUser = []

  //   usersData.forEach(el => {
  //     const haveUser = valueByUser.find(userEl => userEl.name === el.name)
  //     if (valueByUser.length == 0 || haveUser == undefined) {
  //       valueByUser.push({name: el.name, data: [el.cashierValue]})
  //       calendarByUser.push({name: el.name, data: [el.calendar]})
  //     } else {
  //       const index = (valueByUser.findIndex(findEl => findEl.name == el.name))
  //       const calendarIndex = (calendarByUser.findIndex(findEl => findEl.name == el.name))

  //       valueByUser[index].data.push(el.cashierValue)
  //       calendarByUser[calendarIndex].data.push(el.calendar)

  //     }
  //   })




  //   return {valueByUser, calendarByUser}
  // }

  
// const { valueByUser, calendarByUser } = formatToChart()
  const dailyBillingChart = {
// {nome: "agdgdas" , {dia: 12312 valor:  123312}}
      //  series: valueByUser,   
    series: [{
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }, {
      name: 'Revenue',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    }, {
      name: 'Free Cash Flow',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Jun', 'Jul', 'Ag', 'Set', 'Out', 'Nov', 'Dez'],
      },
      yaxis: {
        title: {
          text: '$ (thousands)'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val 
          }
        }
      }
    },
  
  
  };

  function formatDateToMonthAndYear(date) {
    if (date.length == 24) {
    let formatedDate = date.split('T')[0].split("-")
    formatedDate = formatedDate[0] + "-" + formatedDate[1]  
    return formatedDate  
    }
  }

  function separetesByDayAndUser() {
    let data = []

    if (dataList) {
      dataList.forEach(el => {        
        const elementDate = formatDateToMonthAndYear(el.startDate)
        if (data.find(findEl => findEl.name == el.employeeId.name) &&
        data.find(findEl => findEl.calendar == elementDate)
         && el.countAmount != null) {
          const index = (data.findIndex(findEl => findEl.name == el.employeeId.name))
          data[index].cashierValue += el.countAmount
        } else {          
          data.push({name: el.employeeId.name, calendar: elementDate, cashierValue: el.countAmount})
        }
      })      
    } 
    return data
  }

  // const usersData = separetesByDayAndUser()
  // console.log("LISTAGEM ", usersData)


 
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
      const cashierList = await Api.get("/cashier");
      const employeesList = await Api.get("/employee");
      setEmployees(employeesList.data)  
      setDataList(cashierList.data)    
      setList(cashierList.data);      
    } catch (err) {
      console.error(err);
    }
  };

  console.log("EMPREGADOS ", employees)

  function converteData(DataDDMMYY) {
    const convertedData = `${DataDDMMYY.split("-")[2]}-${DataDDMMYY.split("-")[1]}-${DataDDMMYY.split("-")[0]}`
    const dataSplit = convertedData.split("-");
    const novaData = new Date(parseInt(dataSplit[2], 10),
                  parseInt(dataSplit[1], 10) - 1,
                  parseInt(dataSplit[0], 10));
    return novaData;
}



  const onSubmit = (data, event) => {
    console.log("data ", data)
    event.preventDefault();
    setDataList("")
    if (list) {
      let dataInicial = converteData(data.initialDate);
      let dataFinal = converteData(data.endDate);
      console.log("DATA Inicial ", dataInicial, "final ", dataFinal)
      let objetosFiltrados = list.filter(result => {
         return converteData(result.startDate.split('T')[0]) >= dataInicial && converteData(result.startDate.split('T')[0]) <= dataFinal;
      })
      setDataList(objetosFiltrados)
      return objetosFiltrados
    }
    
  }
  useEffect(() => {
    getList();
  }, []);


  return (
    <div className="container">
      <div className="tollbar mt-1">
        <h2>Relatórios</h2>
      </div>
      <div className="row">

      <div className="buttons mt-5 col-sm-12">
        <button 
        className="button-form mr-2 rounded btn-sm" 
        type="submit" 
        onClick={() => {renderPG("OccupationChart")}}>
          Ocupação Diária
        </button>        
          <button 
          className="button-form mr-2 rounded btn-sm" 
          type="submit"
          onClick={() => {setChart("dailyBilling")}}
          >
            Faturamento Diário
          </button>
        <button 
        className="button-form mr-2 rounded btn-sm" 
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
              className="col-sm-3 rounded border"
              {...register("employeeId")}
            >
              <option value="">Selecione o Usuário</option>
              {employees && employees.map(employee => 
              <option value={employee.id}>{employee.name}</option>
            )}             
            </select>
            <br />
          
          
          <label className="rounded"></label>
          <input
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
            />
          <input type="submit" value="Ok" />
            </form>
            </div>
        </div>
        
        {renderPG(chart)}
    </div>
  );
};

export default ReportDailyBilling;

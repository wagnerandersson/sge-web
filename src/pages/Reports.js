import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Chart from 'react-apexcharts'
import Api from "../api/api";
import { useMenu } from "../context/MenuContext";

const Report = () => {
  const {register, handleSubmit} = useForm();
  const [list, setList] = useState();
  const [chart, setChart] = useState("OccupationChart");
  const [dataList, setDataList] = useState();
  const { state, setState } = useMenu();
  

  const renderPG = (state) => {
    let type = {
      OccupationChart: occupationChart(),
      dailyBilling: changeState(state),
      NonPayment: nonPaymentList()
    };
    return type[state] || occupationChart();
  };

  const changeState = (state) => {
    if (state === "dailyBilling") {
      setState("dailyBilling")
    }
  }

  // function dailyBilling() {
  //   return (
  //     <div>
  //       <h4>Faturamento diário</h4>
  //       <Chart options={dailyBillingChart.options} series={dailyBillingChart.series} type="bar" height={350} />

        
  //     </div>
  //   )
  // }

  // const dailyBillingChart = {

    
          
  //   series: [{
  //     name: 'Net Profit',
  //     data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  //   }, {
  //     name: 'Revenue',
  //     data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
  //   }, {
  //     name: 'Free Cash Flow',
  //     data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
  //   }],
  //   options: {
  //     chart: {
  //       type: 'bar',
  //       height: 350
  //     },
  //     plotOptions: {
  //       bar: {
  //         horizontal: false,
  //         columnWidth: '55%',
  //         endingShape: 'rounded'
  //       },
  //     },
  //     dataLabels: {
  //       enabled: false
  //     },
  //     stroke: {
  //       show: true,
  //       width: 2,
  //       colors: ['transparent']
  //     },
  //     xaxis: {
  //       categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  //     },
  //     yaxis: {
  //       title: {
  //         text: '$ (thousands)'
  //       }
  //     },
  //     fill: {
  //       opacity: 1
  //     },
  //     tooltip: {
  //       y: {
  //         formatter: function (val) {
  //           return "$ " + val + " thousands"
  //         }
  //       }
  //     }
  //   },
  
  
  // };
 
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


  function occupationChart() {
    if (chart === "OccupationChart") {
      return (
        <div className="d-flex justify-content-center mt-5 ">  
        <h4 className="justify-content-center mt-2 mb-4 ">Ocupação por dia</h4>      
        <Chart
        type="pie"
        width={600}
        height={600}
        series={ocupation.series}
        options={ocupation.options}
        >
        </Chart>
        </div>
      )
    }
  }



  const getList = async () => {
    try {
      const vehicleList = await Api.get("parkingSpotHasVehicle/listAll");  
      setDataList(vehicleList.data)    
      setList(vehicleList.data);      
    } catch (err) {
      console.error(err);
    }
  };

  const separetesByDay = () => {
    console.log("datalist ", dataList)
    let days = new Set();
    let dates = 
    {
      "01": 0, "02": 0, "03": 0, "04": 0, "05": 0, "06": 0, "07": 0, "08": 0, "09": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, "24": 0, "25": 0, "26": 0, "27": 0, "28": 0, "29": 0, "30": 0,"31": 0,
    }   
    
    
    if (dataList) {
      dataList.forEach(el => {
      const position = el.createdAt.split("T")[0].split("-")[2]
        if (dates[position] >= 0 )  {
          days.add(position)
          dates[position] += 1
        }
      })
    }
    const allDays = Array.from(days)
    return { dates, allDays}
  }

  const { dates, allDays} = separetesByDay()
  console.log("DATAS ", dates)
console.log("dias ", allDays)


  

  const ocupation = {
          
    series: [dates["01"], dates["02"], dates["03"], dates["04"], dates["05"], dates["06"], dates["07"], dates["08"], dates["09"], dates["10"], dates["11"], dates["12"], dates["13"], dates["14"], dates["15"], dates["16"], dates["17"], dates["18"], dates["19"], dates["20"], dates["21"], dates["22"], dates["23"], dates["24"], dates["25"], dates["26"], dates["27"], dates["28"], dates["29"], dates["30"], dates["31"]],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ["Dia 01", "Dia 02", "Dia 03", "Dia 04", "Dia 05", "Dia 06", "Dia 07", "Dia 08", "Dia 09", "Dia 10", "Dia 11", "Dia 12", "Dia 13", "Dia 14", "Dia 15", "Dia 16", "Dia 17", "Dia 18", "Dia 19", "Dia 20", "Dia 21", "Dia 22", "Dia 23", "Dia 24", "Dia 25", "Dia 26", "Dia 27", "Dia 28", "Dia 29", "Dia 30", "Dia 31"],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  
  
  };

  function converteData(DataDDMMYY) {
    console.log("CONVERTED ", DataDDMMYY)
    const convertedData = `${DataDDMMYY.split("-")[2]}-${DataDDMMYY.split("-")[1]}-${DataDDMMYY.split("-")[0]}`
    const dataSplit = convertedData.split("-");
    const novaData = new Date(parseInt(dataSplit[2], 10),
                  parseInt(dataSplit[1], 10) - 1,
                  parseInt(dataSplit[0], 10));
    console.log("NOVA DATA: " + novaData)
    return novaData;
}



  const onSubmit = (data, event) => {
    event.preventDefault();
    setDataList("")
    console.log("INPUTS ", data)
    if (list) {
      let dataInicial = converteData(data.initialDate);
      let dataFinal = converteData(data.endDate);
      console.log("DATA Inicial ", dataInicial, "final ", dataFinal)
      let objetosFiltrados = list.filter(result => {
         return converteData(result.createdAt.split('T')[0]) >= dataInicial && converteData(result.createdAt.split('T')[0]) <= dataFinal;
      })
      console.log("OBJETOS FILTRADOS", objetosFiltrados)
      setDataList(objetosFiltrados)
      return objetosFiltrados
    }
    
  }

  useEffect(() => {
    getList();
    renderPG()
  }, []);


  return (
    <div className="container col-sm-12">
      <div className="tollbar mt-1">
        <h2>Relatórios</h2>
      </div>
      <div className="row">

      <div className="buttons mt-5 col-sm-12">
        <button 
        className="button-form mr-2 rounded col-sm-2" 
        type="submit" 
        onClick={() => {setChart("OccupationChart")}}>
          Ocupação Diária
        </button>        
          <button 
          className="button-form mr-2 rounded col-sm-2" 
          type="submit"
          onClick={() => {renderPG("dailyBilling")}}
          >
            Faturamento Diário
          </button>
        <button 
        className="button-form mr-2 rounded col-sm-2" 
        type="submit"
        onClick={() => {setChart("NonPayment")}}
        >
          Inadimplência
        </button>        
          </div>
      </div>

        <div className="mt-5 mb-5">
          <h3>Filtros</h3>
          <form onSubmit={handleSubmit(onSubmit, window.event)}>

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
        {renderPG(chart)}
    </div>
  );
};

export default Report;

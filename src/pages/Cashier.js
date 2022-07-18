import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Api from "../api/api";

const Cashier = () => {
  const { register, handleSubmit } = useForm();
  const [list, setList] = useState([]);
  const [CashierId, setCashierId] = useState([]);
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  
  

  const onSubmit = async (data, event) => {
    event.preventDefault();
    
    if (CashierId.length == 0) {

      const { init } = data;
    
      const insertData = {
        startingAmount: init,
        employeeId: userId,
      };
      
      const response = await Api.post("/cashier", insertData);
      
      window.alert(
        `Caixa Aberto, Valor inicial R$ ${response.data.startingAmount}`
        );
        
      } else {  
        const endValue = {
          finalRealValue: parseInt(data.end),
        }
        console.log("TOKEN END CASHIER ",typeof endValue)
        const endCashier = await Api.put(`/cashier/closeCashier/${userId}`, endValue );
        console.log("END CASHIER ", endCashier)
        return endCashier

      }
      event.target.reset();
  };

  const getCashierId = async () => {
    
    const idCashier = await Api.get(`/cashier/getCashierByEmployeeId/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    setCashierId(idCashier.data)
    return idCashier
    
  }

  const getInputsAndOutputs = async () => {
    const cashierId = await getCashierId()
    const inputsAndOutputs = await Api.get(`/outputCashier/getInputAndOutputsByCashierId/${cashierId.data[0]}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setList(inputsAndOutputs.data)
  };



  const updateInputsAndOutputs = async (data, event) => {
    event.preventDefault();
    let { inputDescription, inputValue, outputDescription, outputValue} = data;

    if (inputDescription && inputValue) { 
      inputValue = parseInt(inputValue)
      console.log(typeof inputValue, "INPUT VALUE")
      const instertData = {
        description: inputDescription,
        value: inputValue
      }
      await Api.post(`/inputCashier/${userId}`, instertData);
      // event.target.reset();
      window.location.reload()

    } else if (outputDescription && outputValue) {
      outputValue = parseInt(outputValue)
      console.log(typeof outputValue, "OUTPUT VALUE")
      const instertData = {
        description: outputDescription,
        value: outputValue
      }
      try {
        await Api.post(`/outputCashier/${userId}`, instertData);
        window.location.reload()  
      } catch (error) {
        console.log("ERROR OUTPUT CASHIER => ", error)
      }
      
    } else {
      window.alert("Valores Incorretos")
    }

  };


  const makeList = () => {    
    console.log("LIST ", list)
    console.log("LIST Length", list.length)
    if (list.Inputs) {
      return (
        <>        
        <tbody>
          {list && list.Inputs.map((elem) => (            
            <tr key={elem.id}>
            <td className="text-primary">{elem.description}</td>
            <td className="text-primary">{elem.value}</td>
            </tr>
            ))}
          {list && list.Outputs.map((elem) => (            
            <tr key={elem.id}>
            <td className="text-danger">{elem.description}</td>
            <td className="text-danger">{elem.value}</td>
            </tr>
            ))}
        </tbody>        
        </>
      )
    } else {
      return <tbody><tr><td>Sem Entradas ou Saídas</td></tr></tbody>;
    }
  }

  console.log("userId ", userId)
  console.log("LIST ", list)
  console.log("LIST ", list.length)
  console.log("ID CAIXA ", CashierId)


  useEffect(() => {
    getInputsAndOutputs({});
    getCashierId(userId)
  }, []);

  return (
    <div className="container col-sm-12">
      <h1 className="mt-1">Caixa</h1>
      <div className="container-fluid mt-1 col-sm-12">
        <h3>Abertura - Fechamento</h3>
        <form onSubmit={handleSubmit(onSubmit, window.event)}>
          <div className="col-sm-6 d-flex align-items-center">
            <label className="col-sm-4">Valor Inicial:</label>
            <input
              placeholder="Valor Inicial"
              className="col-sm-3 ml-5"
              {...register("init")}
            />
            {CashierId.length > 0? (
              <button className="button-form rounded ml-5 mt-3 btn-danger" type="submit">
              Fechar
            </button>) :(
            <button className="button-form rounded ml-5 mt-5" type="submit">
            Abrir
          </button>)}            
          </div>
          <div className="col-sm-6 d-flex align-items-center">
            <label className="col-sm-4">Valor Final:</label>
            <input
              placeholder="Valor Final"
              className="col-sm-3 ml-5"
              {...register("end")}
            />
          </div>
        </form>
      </div>
      <div className="container-fluid mt-3">
        <h3>Entradas e Saídas</h3>
        <form onSubmit={handleSubmit(updateInputsAndOutputs, window.event)}>
          <div className="col-sm-6 mt-1 d-flex align-items-center">
            <label className="col-sm-4">Entradas:</label>
            <input
              placeholder="Descrição"
              className="col-sm-6 ml-5"
              {...register("inputDescription")}
            />
            <input
              placeholder="Valor"
              className="col-sm-3 ml-3"
              {...register("inputValue")}
            />
            <button
              className="button-form rounded mt-4 ml-5"
              type="submit"
            >
              Salvar
            </button>
          </div>
          <div className="col-sm-6 d-flex align-items-center">
            <label className="col-sm-4">Saidas:</label>
            <input
              placeholder="Descrição"
              className="col-sm-6 ml-5"
              {...register("outputDescription")}
            />
            <input
              placeholder="Valor"
              className="col-sm-3 ml-3"
              {...register("outputValue")}
            />
          </div>
        </form>
      </div>
      <div className="col-sm-12 mt-4">
        <table className="table">
          <thead>
            <tr>
              <th className="col-sm-9">Descrição</th>
              <th className="col-sm-3">Valor</th>
            </tr>
          </thead>
          {makeList()}
        </table>
      </div>
    </div>
  );
};

export default Cashier;

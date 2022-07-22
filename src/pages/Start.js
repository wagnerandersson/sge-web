import React, { useEffect, useState } from "react";
import "./start.css";
import moment from 'moment';
// import Select from 'react-select'
import AsyncSelect from 'react-select/async';
// import Async, { useAsync } from 'react-select/async'

// import ReactDOM from "react-dom";
import Modal from "react-modal";

import { useMenu } from "../context/MenuContext";

import Api from "../api/api";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "50%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ListVehicles = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [list, setList] = useState();
  const [spot, setSpot] = useState([]);
  const { listId, setListId } = useMenu();
  const [isValue, setIsValue] = useState(false);
  const [value, setValue] = useState();
  const { state, setState } = useMenu();
  const [inputValue, setInputValue] = useState("");

  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  console.log("USER ID ", userId);

  

  let options = []
  let options2 = []


  // options = [{"value": 'chocolate',"label": 'Chocolate'},
  // {value: 'strawberry',label: 'Strawberry'},
  // {value: 'vanilla',label: 'Vanilla'}]
  


  function openModal() {
    setIsOpen(true);
    setIsValue(true);
    makeSpots()
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
    setIsValue(false);
  }

  const makeSpots = () => {
      spot.forEach(el => {
        options.push({ value: el.id, label: el.name })
      })      
      return options
    
  }
  
    // handle input change event
    const handleInputChange = async (value) => {
      console.log("handleInputChange", value);
    //  const returnValue =  filterSpots(value)
    const selectetSpot = filterSpots(value)
    console.log("SELECIONADO FILTER ", selectetSpot)
    console.log("AQUI ",await filteredPromiseOptions(selectetSpot))
      // setInputValue(selectetSpot);
      options2.push(selectetSpot)
    };

    console.log("VALUE =>>>>>> ", options2)

  const filterSpots = (spotId) => {    
    makeSpots()
    console.log(spotId);
      const vehicleData = options.filter((item) => item.label.toLowerCase().startsWith(spotId.toLowerCase()));
      // const response = { value: vehicleData[0].value, label: vehicleData[0].label}   
      // console.log(vehicleData);
      return vehicleData
    
  };

  const filter = (spotId) => {    
    console.log(spotId);
      const vehicleData = options.filter((item) => item.label.toLowerCase().startsWith(spotId));
      // const response = { value: vehicleData[0].value, label: vehicleData[0].label}   
      console.log("******* ", vehicleData);
      return vehicleData
    
  };

  const filteredPromiseOptions = async (inputValue) =>
  await filter((resolve) => {
    console.log("FILTER ", inputValue);
    setTimeout(() => {
      resolve(filter(inputValue));
    }, 1000);
  });

  const promiseOptions = async (inputValue) =>
  await makeSpots((resolve) => {
     console.log("PROMISE OPTIONS VALUE ", inputValue);
    setTimeout(() => {
      resolve(filterSpots(inputValue));
    }, 1000);
  });

  const getList = async () => {
    try {
      const vehicleList = await Api.get("parkingSpotHasVehicle");
      const spotList = await Api.get("parkingSpot");
      console.log("VEHICLE LIST ===> ", vehicleList)
      console.log("SPOT LIST ===> ", spotList)
      setList(vehicleList.data);
      setSpot(spotList.data)
    } catch (err) {
      console.error(err);
    }
  };

  const formatTime = (time) => {
    let hour = new Date(time).getHours()
    let min = new Date(time).getMinutes()
    
    if (min <= 9) {
    min = "0"+min
    }
    return `${hour}:${min}`
    
  }

  const getAmountToPay = async (id) => {
    if (id !== 0) {
    console.log("AMOUNT TO PAY ID ", id);
    try {
      const data = await Api.get("parkingSpotHasVehicle/amountToPay/" + id);
      const times = {
        days: data.data.diffDays.toString(),
        hours: data.data.timehour.toString(),
        minutes: data.data.timemin.toString(),
        pryce: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(data.data.totalValue),
      };
      setValue(times);
    } catch (err) {
      console.error("AMOUNT TO PAY ERROR ", err);
    }
  }
  };

  const closure = async (id) => {
      try {
        console.log("TOKEN ", token)
        await Api.put(`/parkingSpotHasVehicle/checkout/${id}/${userId}`);
      
      window.location.reload()
      } catch (error) {
        window.alert("Abra o caixa para realizar essa operação")
        console.error(error)
      }

    
  }

  const filterList = (listId) => {
    if (listId !== 0) {
      
      const vehicleData = list.filter((item) => item.id === listId);
      
      return vehicleData[0];

    }
  };


  if (listId !== 0 && isValue) {
    console.log("LIST ID ", listId);
    setIsValue(false);
    getAmountToPay(listId);
  }
  // Modal.setAppElement('#yourAppElement');
  const makeList = () => {
    if (list !== undefined) {
      return (
        <>
          <tbody>
            {list !== undefined &&
              list.map((elem) => (
                elem.status === true? 
                <tr
                  onClick={() => {
                    setListId(elem.id);
                    openModal();
                  }}
                  key={elem.id}
                >
                  <td>{elem.parkingSpotId.name}</td>
                  <td>{elem.vehicleId.model}</td>
                  <td>{elem.vehicleId.color}</td>
                  <td>{elem.vehicleId.license}</td>
                  <td>{formatTime(new Date(elem.checkIn))}</td>
                </tr> : null
              ))}
          </tbody>

          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Price Model"
          >
            <div className="">
              <div className="row mb-3 mr-1">
                <h2
                  className="text-primary col-sm-9"
                  ref={(_subtitle) => (subtitle = _subtitle)}
                >
                  {filterList(listId) && filterList(listId).vehicleId.model}{" "}
                  {filterList(listId) && filterList(listId).vehicleId.license}{" "}
                </h2>
                <button
                  className="col-sm-3 button-form rounded"
                  type="reset"
                  onClick={closeModal}
                >
                  Fechar
                </button>
              </div>
              <div className="row mr-1">
                <h4 className="col-sm-9">
                  Entrada -{" "}
                  {filterList(listId) && formatTime(new Date(filterList(listId).checkIn))}
                </h4>
                {/* <button
                  className="col-sm-3 button-form rounded"
                  onClick={closeModal}
                >
                  Editar
                </button> */}
              </div>
              <div className="row mr-1 mt-3">
                {/* <form onSubmit={handleSubmit(clientSubmit, window.event)}> */}
                <div className="col-sm-6">


                  <AsyncSelect
                  value={{normalSelectOption: null}}
                  defaultOptions
                  defaultInputValue={inputValue && inputValue[0].label}
                  placeholder={"Selecione o Box"}
                  loadOptions={promiseOptions}
                  onInputChange={handleInputChange}
                   />
                         
                 
                </div>
                <div className="col-sm-3"></div>
                <button
                  className="col-sm-3 button-form rounded"
                  onClick={closeModal}
                >
                  Editar Box
                </button>
              </div>
              <div className="row">
                <h4 className="col-sm-12">
                  {`Permanencia - ${
                    value && value.days === "1"
                      ? "1 Dia"
                      : value && value.days + " dias"
                  }, ${
                    value && value.hours === "1"
                      ? "1 Hora"
                      : value && value.hours + " horas"
                  } e ${
                    value && value.minutes === "1"
                      ? "1 Minuto"
                      : value && value.minutes + " minutos"
                  }`}
                </h4>
              </div>
              <div className="row mr-1"></div>

              <div className="row mr-1 mt-4">
                <h2 className="col-sm-9 text-danger">
                  Valor - {value && value.pryce}
                </h2>
                <button
                  className="btn-danger col-sm-3 button-form rounded"
                  type="button"
                  onClick={() => {closure(listId)}}
                >
                  Encerrar
                </button>
              </div>
            </div>
          </Modal>
        </>
      );
    } else {
      return <tbody></tbody>;
    }
  };

  useEffect(() => {
    getList();
    // makeSpots();
    // getAmountToPay(listId);
  }, []);

  return (
    <div className="col-sm-12">
      <table className="table">
        <thead>
          <tr>
            <th>Box</th>
            <th>Modelo</th>
            <th>Cor</th>
            <th>Placa</th>
            <th>H.Entrada</th>
          </tr>
        </thead>
        {makeList()}
      </table>
    </div>
  );
};

export default ListVehicles

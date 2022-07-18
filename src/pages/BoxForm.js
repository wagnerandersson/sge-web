import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UsrContext } from "../UserContext";
import moment from "moment";

import { useMenu } from "../context/MenuContext";
import Api from "../api/api";

const BoxForms = () => {
  const { register, handleSubmit } = useForm();
  const dataId = useContext(UsrContext);
  const [list, setList] = useState();
  const [clientName, setClientName] = useState();
  const [data, setData] = useState();
  const [time, setTime] = useState();
  const idData = dataId.data;

  moment.locale("pt-br");

  const getList = async () => {
    try {
      const vehicleList = await Api.get(`parkingSpotHasVehicle/${idData}`);
      const fullData = moment(vehicleList.checkIn)
        .format("DD/MM/YYYY HH:mm")
        .split("T");
      setData(moment(fullData[0]).format("DD/MM/YYYY"));
      setTime(moment(fullData[1]).format("HH:mm"));

      if (vehicleList.data.clientId) {
        setClientName(vehicleList.data.clientId.name);
      } else {
        setClientName("Cliente não cadastrado");
      }

      setList(vehicleList.data);
    } catch (err) {
      console.error(err);
    }
  };

  const postCheckout = async (id) => {
    try {
      const result = await Api.put(`parkingSpotHasVehicle/checkout/${id}`);
      alert(`Valor Total R$${result.data.totalValue}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="container">
      <h3 className="mt-1">Box - {list && list.parkingSpotId.name}</h3>
      {/* <form
        onSubmit={handleSubmit(
          postCheckout(idData, window.event),
          window.event
        )}
      > */}
      <form>
        <div className="col-sm-12 mt-5 d-flex align-items-center">
          <label className="col-sm-2">Nome:</label>
          <input
            value={clientName}
            className="col-sm-3"
            placeholder="Nome"
            {...register("name")}
          />
        </div>
        <div className="col-sm-12 mt-2 d-flex align-items-center">
          <label className="col-sm-2">Modelo:</label>
          <input
            value={list && list.vehicleId.model}
            className="col-sm-3"
            placeholder="Modelo"
            {...register("model")}
          />
        </div>
        <div className="col-sm-12 mt-2 d-flex align-items-center">
          <label className="col-sm-2">Cor:</label>
          <input
            value={list && list.vehicleId.color}
            className="col-sm-3"
            placeholder="Cor"
            {...register("color")}
          />
        </div>
        <div className="col-sm-12 mt-2 d-flex align-items-center">
          <label className="col-sm-2">Categoria:</label>
          <input
            value={list && list.vehicleId.category}
            className="col-sm-3"
            placeholder="Categoria"
            {...register("category")}
          />
        </div>
        <div className="col-sm-12 mt-2 d-flex align-items-center">
          <label className="col-sm-2">Placa:</label>
          <input
            value={list && list.vehicleId.license}
            className="col-sm-2"
            placeholder="Placa"
            {...register("license")}
          />
        </div>
        <div className="col-sm-12 mt-2 d-flex align-items-center">
          <label className="col-sm-2">Data:</label>
          <input
            value={list && data}
            className="col-sm-2"
            placeholder="Data"
            {...register("date")}
          />
        </div>
        <div className="col-sm-12 mt-2 d-flex align-items-center">
          <label className="col-sm-2">H.entrada:</label>
          <input
            value={list && time}
            className="col-sm-2"
            placeholder="Hora de entrada"
            {...register("timeEntry")}
          />
        </div>
        {/* <button className="button-form rounded mt-5 mr-5" type="submit">
          Alterar
        </button> */}
      </form>
      <button
        className="button-form rounded mt-5 ml-5"
        onClick={() => postCheckout(idData)}
      >
        Finalizar
      </button>
    </div>
  );
};

export default BoxForms;

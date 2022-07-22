import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// const qz = require("qz-tray");
// import { websocket, printers, configs, print,  } from "qz-tray"
import * as qz from 'qz-tray';

import Api from "../api/api";
import "./clientData.css";

const ClientAdd = () => {
  const { register, handleSubmit } = useForm();

  const clientSubmit = async (data, event) => {
    event.preventDefault();
     
    const { model, color, license, category, typeVehicle } = data;

    const insertData = {
      model: model,
      color: color,
      license: license.toUpperCase(),
      category: category,
      typeVehicle: typeVehicle,
    };
    await printCupom(insertData, event)
    await Api.post("/vehicle", insertData);
    event.target.reset();
    // window.location.reload()
  };


const printCupom = async(data, event) => {
  event.preventDefault();
  console.log("PRINT CUPOM ", data);
  qz.websocket.connect().then(() => {
    return qz.printers.find();
}).then((printers) => {
    console.log(printers);
    let config = qz.configs.create('CUPS-BRF-Printer');
    return qz.print(config, [{
        type: 'pixel',
        format: 'html',
        flavor: 'plain',
        data: formatPrint(data)
    }]);
}).then(() => {
    return qz.websocket.disconnect();
}).then(() => {
    // process.exit(0);
    window.location.reload()
}).catch((err) => {
    console.error(err);
    // process.exit(1);
});
}

function formatPrint(data) {

  return `
          <h3>EStacionamento </h3> 
          <h3>SGE </h3> 
          <h4>Veículo: ${data.model} </h4>
          <h4> Placa: ${data.license} </h4>
          <h3>Entrada: ${new Date().toISOString().split('T')[1].split('.')[0]} </h3>
          <br>
          <h1>.  </h1>
          `
        }



  return (
    <>
      <div className="mt-1 text-center">
        <h3>Incluir Veículo</h3>
        <form onSubmit={handleSubmit(clientSubmit, window.event)}>
          <div className="col-sm-12 text-center">
            <label className="mr-3  ml-4 col-sm-1 font-weight-bold ">
              Modelo:
            </label>
            <input
              placeholder="Modelo"
              className="col-sm-3 rounded border"
              {...register("model")}
            />
            <label className="mr-3 ml-4 col-sm-1 font-weight-bold">Cor: </label>
            <input
              placeholder="Cor"
              className="col-sm-3 rounded border"
              {...register("color")}
            />
          </div>

          <div className="col-sm-12 text-center ml-3">
            <label className="mr-1 col-sm-1 font-weight-bold">Placa: </label>
            <input
              placeholder="Placa"
              className="col-sm-3 rounded border ml-1"
              {...register("license")}
            />
            <label className="mr-3 ml-4 col-sm-1 font-weight-bold">
              Categoria:
            </label>
            <select
              className="col-sm-3 rounded border"
              {...register("category")}
            >
              <option value="hora">Hora</option>
              <option value="diaria">Diária</option>
              <option value="pernoite">Pernoite</option>
            </select>
          </div>
          <div className="col-sm-6 mr-5 ">
            <label className="mr-2 ml-5 font-weight-bold ">Tipo Veic:</label>
            <select
              className="col-sm-3 rounded border ml-1"
              {...register("typeVehicle")}
            >
              <option value="carro">Carro</option>
              <option value="moto">Moto</option>
              <option value="camionete">Camionete</option>
            </select>
          </div>
          <button className="button-form mt-4 mb-5 rounded" type="submit">
            Incluir
          </button>
        </form>
      </div>
    </>
  );
};

export default ClientAdd;

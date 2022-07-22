import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { useMenu } from "../context/MenuContext";
import "./configurations.css";
import Api from "../api/api";

const Configurations = () => {
  const { setState } = useMenu();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [list, setList] = useState();
  let carro, moto, camionete;


  
  const getList = async () => {
    try {
      const spotValue = await Api.get(`/spotValue`);

      console.log("spotValue LIST ", spotValue.data);
      setList(spotValue.data);
    } catch (error) {
      console.log("Client List Error", error);
    }
  };

  console.log("LIST ", list)
  
  if (list) {
    list.forEach(el => {
      if (el.type === "moto") {
        console.log("moto")
        moto = el
      } else if (el.type === "carro") {
        console.log("carro")        
        carro = el
      } else if (el.type === "camionete") {
        console.log("camionete")
        camionete = el
      }
    })
  }

  console.log("MOTO ", moto)
  console.log("CARRO ", carro)
  console.log("camionete ", camionete? camionete.value : "nada")
  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="container col-sm-12">
      <div className="tollbar">
        <h2>Configurações</h2>
      </div>
      <div className="registrations mt-1">
        <h3>Cadastros</h3>
        <button
          className="button-form mr-3 rounded"
          type="submit"
          onClick={() => {
            setState("funcAdd");
          }}
        >
          Funcionários
        </button>
        <button
          className="button-form rounded"
          type="submit"
          onClick={() => {
            setState("lib");
          }}
        >
          Liberações
        </button>
      </div>
      <div className="col-sm-12 mt-5">
        <div className="row mb-1">
        <h3 className="col-sm-7">Hora</h3>
        <h3 className="mr-5">Fração</h3>
        </div>
        <div className="mr-5 row col-sm-12 mb-1">
        <label className="mr-2 col-sm-3">Motos: </label>
        <input
          placeholder={moto && (moto.value).toLocaleString('pt-BR', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2})}
          className="mr-3 rounded border col-sm-3"
          {...register("motorcycle")}
        />
        <input
          placeholder={moto && (moto.value/2).toLocaleString('pt-BR', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2})}
          className="mr-3 rounded border col-sm-3"
          {...register("motorcycle")}
        />
        </div>
        <div className="mr-5 row col-sm-12 mb-1">

        <label className="mr-2 col-sm-3">Carros: </label>
        <input
          placeholder={carro && (carro.value).toLocaleString('pt-BR', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2})}
          className="mr-3 rounded border col-sm-3"
          {...register("cars")}
          />
        <input
          placeholder={carro && (carro.value/2).toLocaleString('pt-BR', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2})}
          className="mr-3 rounded border col-sm-3"
          {...register("cars")}
          />
          </div>
          <div className="mr-5 row col-sm-12 mb-1">
        <label className="mr-2 col-sm-3">Camionetes: </label>
        <input
          placeholder={camionete && (camionete.value).toLocaleString('pt-BR', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2})}
          className="mr-3 rounded border col-sm-3"
          {...register("trucks")}
          />
        <input
          placeholder={camionete && (camionete.value/2).toLocaleString('pt-BR', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2})}
          className="mr-3 rounded border col-sm-3"
          {...register("trucks")}
          />
          </div>
          <div className="row mb-1">
        <h3 className="col-sm-7">Diária</h3>
        <h3 className="mr-5">Pernoite</h3>
        </div>
          <div className="mr-5 row col-sm-12 mb-1">
        <label className="mr-2 col-sm-3">Carros: </label>
        <input
          placeholder={carro && (carro.daily).toLocaleString('pt-BR', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2})}
          className="mr-3 rounded border col-sm-3"
          {...register("trucks")}
          />
        <input
          placeholder={carro && (carro.overnightStay).toLocaleString('pt-BR', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2})}
          className="mr-3 rounded border col-sm-3"
          {...register("trucks")}
          />
          </div>
          <div className="mr-5 row col-sm-12 mb-1">
        <label className="mr-2 col-sm-3">Motos: </label>
        <input
          placeholder={moto && (moto.daily).toLocaleString('pt-BR', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2})}
          className="mr-3 rounded border col-sm-3"
          {...register("trucks")}
          />
        <input
          placeholder={moto && (moto.overnightStay).toLocaleString('pt-BR', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2})}
          className="mr-3 rounded border col-sm-3"
          {...register("trucks")}
          />
          </div>
          <div className="mr-5 row col-sm-12 mb-1">
        <label className="mr-2 col-sm-3">Camionetes: </label>
        <input
          placeholder={camionete && camionete.daily && (camionete.daily).toLocaleString('pt-BR', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2})}
          className="mr-3 rounded border col-sm-3"
          {...register("trucks")}
          />
        <input
          placeholder={camionete && camionete.overnightStay && (camionete.overnightStay).toLocaleString('pt-BR', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2})}
          className="mr-3 rounded border col-sm-3"
          {...register("trucks")}
          />
          </div>
          </div>
        <div>
        </div>
      <div className="vacancy mt-5 col-sm-12">
        <h3 className="col-sm-6">Vagas</h3>
        <div className="row col-sm-">

        <label className="mr-2 col-sm-3">Quantidade de Box Disponível: </label>
        <input
          placeholder="Quantidade de box"
          className="rounded border"
          {...register("boxQtd")}
          />

        {/* <input type="submit" value="Ok" /> */}
          </div>
      </div>
          <button
            className="button-form mt-3 rounded"
            type="submit"
            onClick={() => {
              setState("lib");
            }}
          >
            Alterar
          </button>
    </div>
  );
};

export default Configurations;

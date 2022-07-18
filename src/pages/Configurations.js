import React, { useState } from "react";
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

  return (
    <div className="container">
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
          placeholder="Valor Hora"
          className="mr-3 rounded border col-sm-3"
          {...register("motorcycle")}
        />
        <input
          placeholder="Valor Fração de Hora"
          className="mr-3 rounded border col-sm-3"
          {...register("motorcycle")}
        />
        </div>
        <div className="mr-5 row col-sm-12 mb-1">

        <label className="mr-2 col-sm-3">Carros: </label>
        <input
          placeholder="Valor Hora"
          className="mr-3 rounded border col-sm-3"
          {...register("cars")}
          />
        <input
          placeholder="Valor Fração Hora"
          className="mr-3 rounded border col-sm-3"
          {...register("cars")}
          />
          </div>
          <div className="mr-5 row col-sm-12 mb-1">
        <label className="mr-2 col-sm-3">Camionetes: </label>
        <input
          placeholder="Valor Hora"
          className="mr-3 rounded border col-sm-3"
          {...register("trucks")}
          />
        <input
          placeholder="Valor Fração Hora"
          className="mr-3 rounded border col-sm-3"
          {...register("trucks")}
          />
          </div>
          <div className="mr-5 row col-sm-12 mb-1">
        <label className="mr-2 col-sm-3">Diária Carros: </label>
        <input
          placeholder="Valor Hora"
          className="mr-3 rounded border col-sm-3"
          {...register("trucks")}
          />
          </div>
          <div className="mr-5 row col-sm-12 mb-1">
        <label className="mr-2 col-sm-3">Diária Motos: </label>
        <input
          placeholder="Valor Hora"
          className="mr-3 rounded border col-sm-3"
          {...register("trucks")}
          />
          </div>
          <div className="mr-5 row col-sm-12 mb-1">
        <label className="mr-2 col-sm-3">Diária Camionetes: </label>
        <input
          placeholder="Valor Hora"
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
          placeholder="Quantidade de box col-sm-3"
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

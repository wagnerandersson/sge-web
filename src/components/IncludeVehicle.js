import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Api from "../api/api";
import "./includeVehicle.css";

const FormSizeDemo = () => {
  // const [componentSize, setComponentSize] = useState("small");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    Api.post("/vehicle", {
      model: "model",
      color: "caminho da color",
      license: "caminho",
      category: "caminho",
      typeVehicle: "tipo",
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Modelo:</label>
          <input
            {...register("model", {
              required: true,
              maxLength: 20,
              pattern: /^[A-Za-z]+$/i,
            })}
          />
          {errors?.firstName?.type === "required" && (
            <p>Este campo é obrigatório</p>
          )}
          {errors?.firstName?.type === "maxLength" && (
            <p>Não pode exceder 20 caracteres</p>
          )}
          {errors?.firstName?.type === "pattern" && (
            <p>Alphabetical characters only</p>
          )}
          <label>Cor:</label>
          <input {...register("color", { pattern: /^[A-Za-z]+$/i })} />
          {errors?.lastName?.type === "pattern" && (
            <p>Alphabetical characters only</p>
          )}
          <label>Placa:</label>
          <input {...register("license", { pattern: /^[A-Za-z]+$/i })} />
          {errors?.lastName?.type === "pattern" && (
            <p>Alphabetical characters only</p>
          )}
          <label>Vaga:</label>
          <input {...register("license", { pattern: /^[A-Za-z]+$/i })} />
          {errors?.lastName?.type === "pattern" && (
            <p>Alphabetical characters only</p>
          )}
          <label>Cat.:</label>
          <select>
            <select value="hora">Hora</select>
            <select value="pernoite">Pernoite</select>
            <select value="diaria">Diária</select>
          </select>
          <label>Tipo Veic.:</label>
          <select>
            <select value="carro">Carro</select>
            <select value="moto">Moto</select>
            <select value="camionete">Camionete</select>
          </select>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default FormSizeDemo;

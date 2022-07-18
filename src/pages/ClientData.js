import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UsrContext } from "../UserContext";
import moment from "moment";

import Api from "../api/api";
import "./clientData.css";

//TODO PRECISA INTEGRAR COM O SISTEMA DE UPDATE ASSIM QUE O BACKEND FOR CORRIGIDO

const ClientAdd = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const token = localStorage.getItem("token");
  const [list, setList] = useState();
  const dataId = useContext(UsrContext);

  const getList = async () => {
    try {
      const clientList = await Api.get(`client/${dataId.data}`);

      console.log("CLIENT LIST ", clientList.data);
      setList(clientList.data);
    } catch (error) {
      console.log("Client List Error", error);
    }
  };

  const onSubmit = async (data, event) => {
    event.preventDefault();
    let { name, phone, email, address, birth, cpf_cnpj, pay_day, status } =
      data;

    birth = birth.split("/");
    birth = birth[1] + "/" + birth[0] + "/" + birth[2];
    birth = moment(birth).format();

    pay_day = pay_day.split("/");
    pay_day = pay_day[1] + "/" + pay_day[0] + "/" + pay_day[2];
    pay_day = moment(pay_day).format();

    phone = phone
      .replace("(", "")
      .replace(")", "")
      .replace(" ", "")
      .replace("-", "");

    if (status === true) {
      status = true;
    } else {
      status = false;
    }

    const insertData = {
      name: name,
      phone: phone,
      email: email,
      address: address,
      birth: birth,
      cpf_cnpj: cpf_cnpj,
      pay_day: pay_day,
      status: status,
    };

    await Api.post("/client", insertData);

    event.target.reset();
  };

  const setDataId = () => {
    dataId.setData(0);
  };

  useEffect(() => {
    getList();
    setDataId();
  }, []);

  return (
    <div className="container client-form">
      <h3 className="mt-1">Dados do Cliente</h3>
      <form onSubmit={handleSubmit(onSubmit, window.event)}>
        <div className="col-sm-12 mt-5 d-flex align-items-center">
          <label className="col-sm-2">Nome:</label>
          <input
            value={list && list.name}
            className="col-sm-3"
            placeholder="name"
            {...register("name")}
          />
        </div>
        <div className="col-sm-12 mt-2 d-flex align-items-center">
          <label className="col-sm-2">Email:</label>
          <input
            value={list && list.email}
            className="col-sm-3"
            placeholder="email"
            {...register("email")}
          />
        </div>
        <div className="col-sm-12 mt-2 d-flex align-items-center">
          <label className="col-sm-2">Endereço:</label>
          <input
            value={list && list.address}
            className="col-sm-3"
            placeholder="address"
            {...register("address")}
          />
        </div>
        <div className="col-sm-12 mt-2 d-flex align-items-center">
          <label className="col-sm-2">Nascimento:</label>
          <input
            value={
              list &&
              `${list.birth.replace(/-/g, "/").split("T")[0].split("/")[2]}/${
                list.birth.replace(/-/g, "/").split("T")[0].split("/")[1]
              }/${list.birth.replace(/-/g, "/").split("T")[0].split("/")[0]}`
            }
            className="col-sm-2"
            placeholder="birth"
            {...register("birth")}
          />
        </div>
        <div className="col-sm-12 mt-2 d-flex align-items-center">
          <label className="col-sm-2">Telefone:</label>
          <input
            value={list && list.phone}
            className="col-sm-2"
            placeholder="phone"
            {...register("phone")}
          />
        </div>
        <div className="col-sm-12 mt-2 d-flex align-items-center">
          <label className="col-sm-2">CPF:</label>
          <input
            value={list && list.cpf_cnpj}
            className="col-sm-2"
            placeholder="cpf_cnpj"
            {...register("cpf_cnpj")}
          />
        </div>
        <div className="col-sm-12 mt-2 d-flex align-items-center">
          <label className="col-sm-2">Box</label>
          <input className="col-sm-1" placeholder="box" {...register("box")} />
        </div>
        <div className="col-sm-12 mt-2 d-flex align-items-center">
          <label className="col-sm-2">Pagamento</label>
          <input
            value={
              list &&
              `${list.pay_day.replace(/-/g, "/").split("T")[0].split("/")[2]}/${
                list.pay_day.replace(/-/g, "/").split("T")[0].split("/")[1]
              }/${list.pay_day.replace(/-/g, "/").split("T")[0].split("/")[0]}`
            }
            className="col-sm-2"
            placeholder="pay_day"
            {...register("pay_day")}
          />
        </div>
        <div className="col-sm-12 mt-2 d-flex align-items-center">
          <label className="col-sm-2">Status:</label>
          <select className="col-sm-2" {...register("status")}>
            <option value="true">Em Dia</option>
            <option value="false">Atraso</option>
          </select>
        </div>
        <button className="button-form rounded mt-5 mr-5" type="submit">
          Limpar
        </button>
        {list ? (
          <button className="button-form rounded mt-5 ml-5" type="submit">
            Alterar
          </button>
        ) : (
          <button className="button-form rounded mt-5 ml-5" type="submit">
            Incluir
          </button>
        )}
      </form>
    </div>
  );
};

export default ClientAdd;

import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UsrContext } from "../UserContext";
import moment from "moment";

import Api from "../api/api";

// TODO PRECISA INTEGRAR COM O SISTEMA DE UPDATE ASSIM QUE O BACKEND FOR CORRIGIDO

const AddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const token = localStorage.getItem("token");
  const [list, setList] = useState();
  const dataId = useContext(UsrContext);

  const getList = async () => {
    try {
      const userList = await Api.get(`employee/${dataId.data}`);

      setList(userList.data);
    } catch (error) {
      console.log("Error to get employee data ", error);
    }
  };

  const onSubmit = async (data, event) => {
    event.preventDefault();
    let { name, phone, email, birth, cpf, admin, password, address } = data;

    //    birth = birth.replace(/\//gi, "")
    birth = birth.split("/");
    birth = birth[1] + "/" + birth[0] + "/" + birth[2];
    birth = moment(birth).format();

    // phone = phone
    //   .replace("(", "")
    //   .replace(")", "")
    //   .replace(" ", "")
    //   .replace("-", "");

    if (admin === true) {
      admin = true;
    } else {
      admin = false;
    }

    const insertData = {
      name: name,
      password: password,
      address: address,
      phone: phone,
      email: email,
      birth: birth,
      cpf: cpf,
      admin: admin,
    };

    console.log(insertData);

    await Api.post("/employee", insertData);

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
      <h3 className="mt-1">Dados do Funcionário</h3>
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
          <label className="col-sm-2">Senha:</label>
          <input
            className="col-sm-2"
            placeholder="password"
            type="password"
            {...register("password")}
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
          <label className="col-sm-2">CPF:</label>
          <input
            value={list && list.cpf}
            className="col-sm-2"
            placeholder="cpf"
            {...register("cpf")}
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
          <label className="col-sm-2">Data Nasc:</label>
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
          <label className="col-sm-2">Status:</label>
          <select className="col-sm-2" {...register("status")}>
            <option value="false">Funcionário</option>
            <option value="true">Administrador</option>
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

export default AddUser;

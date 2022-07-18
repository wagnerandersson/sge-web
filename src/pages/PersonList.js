import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
// import { Link } from "react-router-dom";
import { UsrContext } from "../UserContext";
import Util from "../utils/Utils"

import Api from "../api/api";

import { useMenu } from "../context/MenuContext";
import { Icon, InlineIcon } from "@iconify/react";
import personFill from "@iconify-icons/bi/person-fill";
import personPlusFill from "@iconify-icons/bi/person-plus-fill";

import "./perslonList.css";

const PersonList = () => {
  const [list, setList] = useState([]);
  const { state, setState } = useMenu("");
  const [search, setSearch] = useState("");
  const dataId = useContext(UsrContext);

  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  // console.log("TOKEN ", token);

  moment.locale("pt-br");

  let clientOrEmployee = "";
  if (state === "funcAdd") {
    clientOrEmployee = "funcAddForm";
  } else {
    clientOrEmployee = "clientForm";
  }
  const setDataId = (id) => {
    dataId.setData(id);
  };

  const getList = async () => {
    if (state === "insertClient") {
      try {
        const personList = await Api.get("client");
        setList(personList.data);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const personList = await Api.get("employee");
        setList(personList.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const filterList = list.filter((list) =>
    list.name.toLowerCase().startsWith(search.toLowerCase())
  );


  useEffect(() => {
    getList({});
  }, []);

  return (
    <div className="container">
      <div className="head row col-sm-12 d-flex justify-content-between ">
        <div className="col-sm-3  mt-3">
          <Icon
            icon={personPlusFill}
            width="50"
            height="50"
            onClick={() => {
              setState(clientOrEmployee);
            }}
          />
        </div>
        <div className="col-sm-5  mt-3">
          <input
            type="text"
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
          ></input>
        </div>
      </div>
      <div className="col-sm-12 d-flex justify-content-start flex-wrap mt-5">
        {filterList &&
          filterList.map((el) => (
            <div
              className="card mt-2 d-flex justify-content-center mr-3"
              style={{ width: 160 }}
              key={el.id}
            >
              <div className="d-flex justify-content-center">
                <Icon icon={personFill} width="100" height="100" id={el.id} />
              </div>
              <div className="card-body d-flex justify-content-center">
                <a
                  href="#"
                  className="btn btn-secondary stretched-link"
                  key={el.id}
                  onClickCapture={() => {
                    setDataId(el.id);
                    setState(clientOrEmployee);
                  }}
                >
                  {el.name}
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PersonList;

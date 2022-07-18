import React, { useEffect, useState, useContext } from "react";
import { UsrContext } from "../UserContext";
import { useMenu } from "../context/MenuContext";
import "./boxScreen.css";
import Api from "../api/api";

const BoxButtons = () => {
  const { setState } = useMenu();
  const dataId = useContext(UsrContext);
  const [list, setList] = useState([]);

  const setDataId = (id) => {
    dataId.setData(id);
  };

  const getList = async () => {
    try {
      const vehicleList = await Api.get("parkingSpotHasVehicle");
      // const spotList = await Api.get("parkingSpot");
      
      // const newList = await makeList(vehicleList.data, spotList.data)

      // console.log("NEWLIST", newList);
      
      setList(vehicleList.data);
    } catch (err) {
      console.error(err);
    }
  };

  // const makeList = async (parkingSpotHasVehicleList, parkingSpotList) => {
  //   let arrayList = parkingSpotHasVehicleList
  //   let biggestList;

  //   if (parkingSpotHasVehicleList.length >= parkingSpotList) {
  //     biggestList = parkingSpotHasVehicleList.length
  //   } else {
  //     biggestList = parkingSpotList.length
  //   }
    

    // parkingSpotList.forEach(el => {
    //   console.log("el", el.name)
    //     const teste = findBoxName(arrayList, el.name)
    //     console.log("TESTE ", teste)
    //     if (!teste) {
    //       arrayList.push(el)
    //     }
    //   })


  //   return arrayList

  // }

  // function findBoxName(arrayList, boxName) {
  //   if (arrayList.parkingSpotId) {
  //     return arrayList.parkingSpotId.name.includes(boxName)
  //   } else {
  //     return false
  //   }

  // }


  // console.log(list);

  useEffect(() => {
    getList();
  });

  return (
    <div className="container">
      <div className="tollbar">
        <h2>Box</h2>
      </div>
      {list &&
        list.map((elem) => (
          <button
            className={
              elem.vehicleId.category === "pernoite"
                ? "btn btn-success btn-lg mt-2 ml-2 custom rounded"
                : "btn btn-dark btn-lg mt-2 ml-2 custom rounded" |
                  (elem.vehicleId.category === "hora")
                ? "btn btn-info btn-lg mt-2 ml-2 custom rounded"
                : "btn btn-dark btn-lg mt-2 ml-2 custom rounded"
            }
            key={elem.id}
            type="submit"
            onClick={() => {
              setDataId(elem.id);
              setState("boxForm");
            }}
          >
            {elem.parkingSpotId.name}
          </button>
        ))}
    </div>
  );
};

export default BoxButtons;

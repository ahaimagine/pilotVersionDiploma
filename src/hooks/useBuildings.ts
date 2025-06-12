import { Building, Department, Institute } from "@types";
import { useEffect, useState } from "react";
import axios from "axios";

function useBuildings() {
  const [institutes, setInstitutes] = useState<Institute[] | null>(null);
  const [departments, setDepartments] = useState<Department[] | null>(null);
  const [buildings, setBuildings] = useState<Building[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchAll = async () => {
    try {
      setIsLoading(true);
      const [bldgRes,instRes, deptRes] = await Promise.all([
        axios.get<Building[]>("http://knowwhereinnulpbackend-production.up.railway.app/buildings"),
        axios.get<Institute[]>("http://knowwhereinnulpbackend-production.up.railway.app/institutes"),
        axios.get<Department[]>("http://knowwhereinnulpbackend-production.up.railway.app/departments"),
      ]);

      setInstitutes(instRes.data);
      setDepartments(deptRes.data);
      setBuildings(bldgRes.data);
      setIsLoading(false);

      // // Додай ці логи
      console.log("Fetched institutes", instRes.data);
      console.log("Fetched departments", deptRes.data);
      console.log("Fetched buildings", bldgRes.data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      console.error("Fetch error:", err);
    }
  };

  fetchAll();
}, []);

  return { institutes, departments, buildings, isLoading  };
}

export default useBuildings;

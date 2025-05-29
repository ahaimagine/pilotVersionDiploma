import { Building, Department, Institute } from "@types";
import { useEffect, useState } from "react";
import axios from "axios";

function useBuildings() {
  const [institutes, setInstitutes] = useState<Institute[] | null>(null);
  const [departments, setDepartments] = useState<Department[] | null>(null);
  const [buildings, setBuildings] = useState<Building[] | null>(null);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchAll = async () => {
    try {
      const [instRes, deptRes, bldgRes] = await Promise.all([
        axios.get<Institute[]>("http://localhost:8000/institutes"),
        axios.get<Department[]>("http://localhost:8000/departments"),
        axios.get<Building[]>("http://localhost:8000/buildings"),
      ]);

      setInstitutes(instRes.data);
      setDepartments(deptRes.data);
      setBuildings(bldgRes.data);

      // Додай ці логи
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

  return { institutes, departments, buildings, error };
}

export default useBuildings;

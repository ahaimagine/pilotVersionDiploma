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
      const [bldgRes,instRes, deptRes] = await Promise.all([
        axios.get<Building[]>("https://backenddiplom4ik-production.up.railway.app/buildings"),
        axios.get<Institute[]>("https://backenddiplom4ik-production.up.railway.app/institutes"),
        axios.get<Department[]>("https://backenddiplom4ik-production.up.railway.app/departments"),
      ]);

      setInstitutes(instRes.data);
      setDepartments(deptRes.data);
      setBuildings(bldgRes.data);

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

  return { institutes, departments, buildings, error };
}

export default useBuildings;

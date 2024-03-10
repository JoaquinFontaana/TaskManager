import { useEffect, useState} from 'react';
import { Button } from "../../../components/Button";
import { IoSearchSharp } from "react-icons/io5";

export default function SearchBar({ searchTasks, tasks }) {
  const [terms, setTerms] = useState("");

  useEffect(() => {
    // Cuando tasks se actualice, ejecutar la búsqueda con el término actual
    searchTasks(terms);
  }, [tasks,terms]);

  function handleChange(e) {
    const newTerms = e.target.value;
    setTerms(newTerms);
  }
  const handleClick= (e)=>{
    e.preventDefault()
  }
  return (
    <form className="searchBar">
      <Button handleClick={handleClick}>{<IoSearchSharp />}</Button>
      <input placeholder="Search for title" onChange={handleChange} value={terms}></input>
    </form>
  );
}

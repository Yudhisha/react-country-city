import './App.css';
import React,{useEffect,useState} from "react"
import axios from "axios";

function App() {
   const[countries,setCountries] = useState([]);
   const[singleCountry, setSingleCountry] = useState("");
   const[cities,setCities]=useState(null);
   const[singleCity,setSingleCity] = useState("");
   const[check,setCheck]=useState(false);

   const fetchCountries=async()=>{
      try{
        const country = await axios.get("https://countriesnow.space/api/v0.1/countries");
        setCountries(country.data.data);
        console.log(country.data.data);
      }catch(error){
        console.log(error);
      }
   }

   const fetchCities=(country)=>{
     setSingleCity(null);
     setCheck(false);
     setSingleCountry(country);
     const singleCity = countries.find((c)=>c.country===country);
     setCities(singleCity.cities);
   }

   const handleSubmit=()=>{
     if(singleCity && singleCountry){
       setCheck(true)
     }
      
   }

  useEffect(() => {   
    fetchCountries();
  }, []);

  return (
    <div className="App">
      <div className='app-header'>
        <h1>Select You HomeTown</h1>
        <div>
          {countries && <select onChange={(e)=>fetchCities(e.target.value)} value={singleCountry}>
            <option disabled hidden selected>Select Country</option>
           {countries.map((country)=>(
              <option key={`${country.country}`} value={country.country}>{country.country}</option>
            ))}
          </select>
          }
          {cities &&
          <select onChange={(e)=>setSingleCity(e.target.value)} value={singleCity}>
            <option disabled hidden selected>Select city</option>
            {cities.map((city)=>(<option key={city} value={city}>{city}</option>))}
          </select>
          }
          <button onClick={handleSubmit}>Go</button>
        </div>
        {check && <h1>Your Country is {singleCountry} and Your City is {singleCity}.</h1>}
      </div>

    </div>
  );
}

export default App;

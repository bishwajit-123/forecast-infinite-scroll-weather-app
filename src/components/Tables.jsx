import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

const Tables = () => {
  const [cities, setCities] = useState([]);
  const [searchcities, setSearchcities] = useState('');
  const [filterCities, setFilterCities] = useState([]);
  const [hasMore, setHasMore] = useState(true); // State to track if there is more data to load

  // This is a useeffect function where a API is being fetch using axios react library
      useEffect(() => {
        const getCitiesData = async () => {
          try {
            const res = await axios.get("https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=10");
            setCities(res.data.results);
          } catch (err) {
            console.log("Error fetching data:", err);
          }
        };

        getCitiesData();
      }, []);

      //  This is onChange function for the search input box
        const handleonChange = (event) => {
          setSearchcities(event.target.value);
        };


      // This filters the cities from the table to show on search box when typed cities name
      useEffect(() => {
        const filterCity = cities.filter((city) =>
          city.name.toLowerCase().includes(searchcities.toLowerCase())
        );
        setFilterCities(filterCity);
      }, [cities, searchcities]);
 

      // This async function uses for infinite scroll so that data can be reload when scroll at the bottom of page
        const fetchMoreData = async () => {
          try {
            const res = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=10&offset=${cities.length}`);
            if (res.data.results.length === 0) {
              setHasMore(false); // No more data to load
            } else {
              setCities((prevCities) => [...prevCities, ...res.data.results]);
            }
          } catch (err) {
            console.log("Error fetching more data:", err);
          }
        };

      return (
           <>
              <div className="flex justify-center mt-10">
                <input
                  type="text"
                  placeholder="Search City...."
                  onChange={handleonChange}
                  value={searchcities}
                  className="h-[50px] w-[80vw] md:w-[500px] font-semibold rounded-full bg-[#b7ceeb] placeholder-black text-center"
                />
              </div>

              {/* This is infinite scroll section it allows the page to reload more data as it hits the bottom of the page*/}
                  <InfiniteScroll
                    dataLength={filterCities.length} // This is important to prevent loading same data again
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<h4 className='text-center'>Loading...</h4>}
                    endMessage={
                      <p style={{ textAlign: 'center' }}>
                        <b>No more data to load</b>
                      </p>
                    }
                  >
        <div className='container mx-auto items-center p-5'>
          <div className="relative overflow-x-auto shadow-md rounded-lg ">
            <table className="w-full text-sm text-left rtl:text-right ">
                  <thead className="text-[15px] md:text-xl text-black uppercase bg-[#8a9ccf] ">
                    <tr>
                      <th scope="col" className="px-6 py-3 ">
                        Geoname_ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Country
                      </th>
                      <th scope="col" className="px-6 py-3">
                        City Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Population
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Timezone
                      </th>
                    </tr>
                  </thead>
              <tbody>
                    {filterCities.map((city, index) => (
                      <tr className="font-semibold bg-[#FFEFEF] text-black" key={index}>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium whitespace-nowrap text-black"
                        >
                          {city.geoname_id}
                        </th>
                        <td className="px-6 py-4">{city.cou_name_en}</td>
                        <td className="px-6 py-4 hover:text-blue-500">
                          <Link to={`/weather/${city.name}`}>
                            {city.name}
                          </Link>
                        </td>
                        <td className="px-6 py-4">{city.population}</td>
                        <td className="px-6 py-4">{city.timezone}</td>
                      </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Tables;

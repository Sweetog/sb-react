import { useEffect, useState, useRef } from "react";
import DataRow from "./data-row";
import flatten from "./utils/flatten";

export default function RandomUser() {
  const api = "https://randomuser.me/api?results=2";
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const sortMapRef = useRef({});
  const allData = useRef();

  //didMount
  useEffect(() => {
    fetchRandomUser();
  }, []);

  const fetchRandomUser = async () => {
    const response = await fetch(api);
    const json = await response.json();
    setData([
      ...data,
      ...json.results.map((cur) => ({
        firstName: cur.name.first,
        imageUrl: cur.picture.medium,
        ...flatten(cur.location)
      }))
    ]);
  };

  const sort = (key) => {
    if (key === "imageUrl") return;
    const sortMap = sortMapRef.current;
    const sortBender = key in sortMap ? sortMap[key] : 1; //default ascending
    sortMap[key] = sortBender * -1;
    //toggle sort for next time for passed in key
    sortMapRef.current = sortMap;
    data.sort((a, b) => {
      if (a[key] < b[key]) return -1 * sortBender;
      if (a[key] > b[key]) return 1 * sortBender;
      return 0;
    });
    setData([...data]);
  };

  useEffect(() => {
    if (search && search.length <= 3) return;
    allData.current = data; //back up complete dataset
    const filtered = data.filter((cur) => {
      let found = false;
      for (const key in cur) {
        const value = `${cur[key]}`;
        if (value.toLowerCase().indexOf(search.toLowerCase()) >= 0) {
          found = true;
          break;
        }
      }
      return found;
    });
    if (filtered.length === 0) return; //nothing to do
    setData(filtered);
  }, [search]);

  const clearSearch = () => {
    console.log("clearing search", allData.current);
    if (!allData.current || !allData.current.length) return;
    setSearch("");
    setData([...allData.current]);
  };

  return data.length ? (
    <div>
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <button onClick={() => clearSearch()}>Clear Search</button>
      <table>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th
                style={{ cursor: "pointer" }}
                onClick={() => sort(key)}
                key={key}
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((cur, index) => (
            <DataRow key={index} data={cur}></DataRow>
          ))}
        </tbody>
      </table>
      <br />
      <button onClick={() => fetchRandomUser()}>Get More Users</button>
    </div>
  ) : null;
}

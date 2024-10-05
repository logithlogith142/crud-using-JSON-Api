import React, { useCallback } from "react";
import { useEffect, useState } from "react";

import axios from "axios";
export default function Fetch() {
  const [datas, setdatas] = useState([]);
  const [id, setid] = useState("");
  const [name, setname] = useState("");
  const [cname, setcname] = useState("");
  useEffect(() => {
    get();
  }, []);
  const get = async () => {
    const res = await axios.get("http://localhost:3003/datas");
    const resd = res.data;
    setdatas(resd);
  };

  const click = () => {
    const d = JSON.stringify(datas.length);
    console.log(d);

    axios
      .post("http://localhost:3003/datas", { name: name, id: d })
      .then((res) => setdatas([...datas, res.data]));
    setname(" ");
  };

  const del = (e) => {
    axios.delete(`http://localhost:3003/datas/${e}`);
    console.log(e);
    setTimeout(() => {
      get();
    }, 100);
  };
  const updated = () => {
    const a = document.querySelector("#name").value;

    axios.put(`http://localhost:3003/datas/${id}`, { id: id, name: a });
    setTimeout(() => {
      get();
    }, 100);
  };
  const edit = (n, k) => {
    setname(n);
    setid(k);
  };

  return (
    <>
      <div>
        {datas.map((d, i) => (
          <div key={i}>
            <h1>{d.name}</h1>
            <button onClick={() => del(d.id)}>delete</button>
            <button onClick={() => edit(d.name, d.id)}>edit</button>
          </div>
        ))}
        <input
          type=" text "
          id="name"
          placeholder="name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <button onClick={click}>click</button>
        <button onClick={updated}>updated</button>
      </div>
    </>
  );
}

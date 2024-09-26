import { useState, useEffect } from "react";
import { apiCallGet } from "../containers/components/Axios/Axios";

let listCache = [];

export function useCategoryOptions() {
  const [list, setList] = useState([]);
  useEffect(async () => {
    if (listCache?.length > 0) {
      setList(listCache);
    } else {
      try {
        const res = await apiCallGet("users/api/v1/allCatagory/catagory_list");
        //listCache = res.data;
        var newArray =res.data.filter(function (el)
        {
          return el.isCategory===true
        }
        );
              // {console.log("aaaa" , newArray)}
        // {console.log("aaaaaa" , res.data)}
        setList(newArray);
      } catch {}
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return list;
}

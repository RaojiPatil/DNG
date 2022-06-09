import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Cookies from "js-cookie";
import MyLoader from "./MyLoader";
import SingleSearchDiv from "./SingleSearchDiv";
import MySingleLoader from "./MySingleLoader";

//let timer;
const NewSearchSingeData = ({
  name,
  ext,
  gens,
  setGetCookie,
  singleComponentLoader,
  dataLoading,
}) => {
  const [items, setItems] = useState(gens.slice(0, 20));
  const [hasMore, setHasMore] = useState(true);
  const [fetchFirst, setFetchFirst] = useState(true);

  let allCookies = Cookies.get("cookie-dng")
    ? JSON.parse(Cookies.get("cookie-dng"))
    : "";
  if (allCookies) {
    allCookies = allCookies.map((item) => item.name);
  }

  const fetchMoreData = () => {
    // To update all the columns Synchronously
   setTimeout(() => {
      if (items.length >= gens.length) {
        setHasMore(false);
        //clearInterval(timer);
        return;
      }
      setItems(items.concat(gens.slice(items.length, items.length + 20)));
    }, 0);
  };

  const saveCookie = (name, availability) => {
    const newObj = { name, availability };
    const getAllCookie = Cookies.get("cookie-dng")
      ? JSON.parse(Cookies.get("cookie-dng"))
      : null;

    if (getAllCookie) {
      if (!getAllCookie.some((elem) => elem.name === name)) {
        getAllCookie.push(newObj);
        Cookies.set("cookie-dng", JSON.stringify(getAllCookie));
        setGetCookie(getAllCookie);
      }
    } else {
      const newArr = [];
      newArr.push(newObj);
      Cookies.set("cookie-dng", JSON.stringify(newArr));
      setGetCookie(newArr);
    }
  };

  const deleteCookie = (name) => {
    const prevCookie = Cookies.get("cookie-dng")
      ? JSON.parse(Cookies.get("cookie-dng"))
      : null;
    const curentCookie = prevCookie.filter((item) => item.name !== name);
    Cookies.set("cookie-dng", JSON.stringify(curentCookie));
    setGetCookie(curentCookie);
  };

  // when update a tag it will run it initially to get the gens
  const fetchFirstOnLoad = () => {
    fetchMoreData();
    setFetchFirst(false);
  };

  useEffect(() => {
    fetchMoreData();
  }, [items]);

  return (
    <>
      <div className="dng-search-result">
        {singleComponentLoader.status === false &&
        singleComponentLoader.name === name ? (
          <MySingleLoader />
        ) : (
          <div className="dng-search-result-innerWrapre">
            <div className="dng-suggestion-title">{name}</div>
            <div className="suggenssion-line">Extensions</div>

            {ext.map((data) => (
              <SingleSearchDiv
                key={data.name}
                data={data}
                allCookies={allCookies}
                saveCookie={saveCookie}
                deleteCookie={deleteCookie}
              />
            ))}

            <div className="suggenssion-line dng-suggenssion">
              <p style={{ marginTop: "0px" }}>Other Suggestions</p>
            </div>

            {gens.length >= 1 &&
              items.map((data) => {
                return (
                  <SingleSearchDiv
                    key={data.name}
                    data={data}
                    allCookies={allCookies}
                    saveCookie={saveCookie}
                    deleteCookie={deleteCookie}
                  />
                );
              })}

            {gens.length >= 1 && gens.length !== items.length && (
              <MySingleLoader />
            )}
            {gens.length >= 1 && gens.length === items.length && (
              <div style={{ textAlign: "center" }}>
                <br />
                <br />
                <hr />
              </div>
            )}

            {gens.length === 0 && "No suggestions, try new domain name."}
          </div>
        )}
      </div>
    </>
  );
};

export default NewSearchSingeData;

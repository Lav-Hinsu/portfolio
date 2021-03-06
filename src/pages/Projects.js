import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CardComponent from "../components/CardComponent";
import { CardColumns, ProgressBar } from "react-bootstrap";

const Project = (props) => {
  var read_token = "5a55435de68bfae82052d5ac30f2be0c2a04ec6f";
  var [loadingdata, setLoadingData] = useState(true);
  const content = useSelector((state) => state);
  const dispatch = useDispatch();

  function fetchData() {
    return (dispatch) => {
      axios({
        url: "https://api.github.com/users/LavHinsu/repos",
        headers: {
          Authorization: "Bearer " + read_token,
        },
      })
        .then((res) =>
          dispatch({
            type: "FETCH_DATA",
            data: res.data,
          })
        )
        .then(() => {
          setLoadingData(false);
        });
    };
  }
  useEffect(() => {
    dispatch(fetchData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getPortRepos() {
    var portRepos = [];
    for (var i = 0; i < content.data.length; i++) {
      var obj = content.data[i];

      if (obj.description != null) {
        if (obj.description.includes('(portfolio)')) {
          portRepos.push(obj);
        }
      }
    }
    return portRepos;
  }

  var port_repos = getPortRepos();
  return (
    <div>
      <div className="mx-5 mt-4 ">
        {loadingdata && (
          <ProgressBar stripped="true" animated="true" now={100} />
        )}
        <hr></hr>
        <CardColumns>
          {port_repos.map((item) => (
            <CardComponent
              key={item["id"]}
              name={item["name"]}
              url={item["html_url"]}
              description={item["description"]}
              technology={item["language"]}
            />
          ))}
        </CardColumns>
      </div>
    </div>
  );
};
export default Project;

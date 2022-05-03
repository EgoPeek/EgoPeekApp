import React, { useState } from "react";
import { TextInputStandard } from "../Misc/Input/TextFields";
import { GreenButton } from "../Misc/Input/Buttons";
import axios from "axios";
import Popup from "./Popup";
import UserPost from "../Misc/CustomComponents/UserPost";
import { GreenLoadingBar } from "../Misc/Input/LoadingBar";

const Search = () => {
  const [posts, setPosts] = useState([]);
  const [postPending, setPostPending] = useState(true);
  const [searchItem, setSearchItem] = useState("");
  const [emptySearch, setEmptySearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const authHeader =
    window.localStorage.getItem("token_type") +
    " " +
    window.localStorage.getItem("token");

  const searchDiscoverFeed = async () => {
    const payload = {
      hashtags: [searchItem],
    };
    try {
      const response = await axios.post(`/api/v1/discover/selected`, payload, {
        headers: { Authorization: authHeader },
      });
      console.log(response);
      console.log(response.data.length);
      {
        response.data.length === 0
          ? setEmptySearch(true)
          : setEmptySearch(false);
      }
      setPosts(response.data);
      setPostPending(false);
    } catch (e) {
      console.log(e);
    }
    togglePopup();
  };

  const updateSearch = (event) => {
    setSearchItem(event.currentTarget.value);
  };

  return (
    <div className="discover-search">
      <TextInputStandard
        size="small"
        autoComplete="off"
        onChange={updateSearch}
      />
      <GreenButton onClick={searchDiscoverFeed}>Search</GreenButton>
      {isOpen && (
        <Popup
          content={
            <>
              {!emptySearch ? (
                <div className="discover-all">
                  {postPending ? (
                    <GreenLoadingBar />
                  ) : (
                    posts.map((item, i) => <UserPost post={item} key={i} />)
                  )}
                </div>
              ) : (
                "No Posts Found"
              )}
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
};

export default Search;

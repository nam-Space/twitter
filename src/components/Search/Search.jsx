import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import React, { useEffect, useState } from "react";
import { Explore } from "../../assets/icons/Icon";

import "../../sass/search.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/thunk";
import User from "../User/User";

const Search = () => {
    const [searchValue, setSearchValue] = useState("");
    const users = useSelector((state) => state.users);

    const [results, setResults] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    const handleSearch = (e) => {
        setSearchValue(e.target.value);

        setTimeout(() => {
            const value = users.filter((user) =>
                user.user_name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            );
            setResults(value);
        }, 300);
    };

    return (
        <div className="tippy-wrapper-all">
            <Tippy
                theme="light"
                trigger="mouseenter click"
                content={
                    <div className="search-people">
                        {searchValue && results.length > 0 ? (
                            results.map((res, index) => (
                                <User key={index} res={res} />
                            ))
                        ) : (
                            <p className="seach-initial">
                                Try searching for people, topics, or keywords
                            </p>
                        )}
                    </div>
                }
                interactive={true}
            >
                <div className="search-container">
                    <div className="search-icon">
                        <Explore height={24} width={24} />
                    </div>

                    <input
                        className="search-input"
                        type="text"
                        placeholder="Search Twitter"
                        value={searchValue}
                        onChange={handleSearch}
                    ></input>
                </div>
            </Tippy>
        </div>
    );
};

export default Search;

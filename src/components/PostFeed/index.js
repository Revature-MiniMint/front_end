import axios from 'axios';
import React, { useState, useEffect } from 'react'
import FeedItem from './FeedItem';
import { URL_PREFIX } from '../../url_constants';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./style.css";

/* This component renders gruops of posts depending on user's filters
 ex: newest, oldest, most upmints, etc...
*/
const PostFeed = () => {

    const [posts, setPosts] = useState([]);
    const [searchText, setSearchText] = useState(""); //search string for flitering the posts
    const [filterDate, setFilterDate] = useState(Date.now()); //The actual date being compared to all the posts' creation dates
    const [filterMethod, setFilterMethod] = useState("ALL"); //ALL = No filter, BEFORE = Get all posts made before the date, AFTER = Get all posts made affter the date

    useEffect(() => {

        axios.get(`${URL_PREFIX}/postfeed`)
            .then((response) => {
                setPosts(response.data.reverse()); //Set the posts array to the filtered content
            })
            .catch((error) => {
                console.error(error); //Print error to console
            })
    }, [])


    /*
     * Sorts the current post array, oldest posts first.
     */
    const sortByTimeOldFirst = () => {

        let sortedPosts = [...posts]; //Make a shallow copy
        sortedPosts.sort((post1, post2) => {
            if (post1.creationDate < post2.creationDate) {
                return -1; //post1 should be second
            }
            else if (post1.creationDate > post2.creationDate) {
                return 1; //post1 should be first
            }
            else {
                return 0; //Are the same
            }
        });
        setPosts(sortedPosts);
    }

    /*
     * Sorts the current post array, newest posts first.
     */
    const sortByTimeNewFirst = () => {

        let sortedPosts = [...posts]; //Make a shallow copy
        sortedPosts.sort((post1, post2) => {
            if (post1.creationDate < post2.creationDate) {
                return 1; //post1 should be first
            }
            else if (post1.creationDate > post2.creationDate) {
                return -1; //post1 should be second
            }
            else {
                return 0; //Are the same
            }
        });
        setPosts(sortedPosts);
    }

    /*
     * Sorts the current post array, highest number of upmints
     */
    const sortByMostUpmints = () => { //METHOD FOR SORTING POSTS BY UPMINTS
        let sortedPosts = [...posts]; //Make a shallow copy
        sortedPosts.sort((post1, post2) => {
            if (post1.upmints > post2.upmints) {
                return -1; //post1 should be second
            }
            else if (post1.upmints < post2.upmints) {
                return 1; //post1 should be first
            }
            else {
                return 0; //Are the same
            }
        });
        setPosts(sortedPosts);
    }

    /*
     * Sorts the current post array, highest number of downmints first
     */
    const sortByMostDownmints = () => { //METHOD FOR SORTING POSTS BY  DOWNMINTS
        let sortedPosts = [...posts]; //Make a shallow copy
        sortedPosts.sort((post1, post2) => {
            if (post1.downmints > post2.downmints) {
                return -1; //post1 should be second
            }
            else if (post1.downmints < post2.downmints) {
                return 1; //post1 should be first
            }
            else {
                return 0; //Are the same
            }
        });
        setPosts(sortedPosts);
    }

    /*
     * Filters from all posts, displaying the posts created X days ago and later.
     */
    const filterByTimeAgo = (numDays) => {
        //Set up the date using today
        let pastDate = new Date(Date.now() - (numDays * 24 * 60 * 60 * 1000)); //Go from ms to days
        //Check days prior
        axios.get(`${URL_PREFIX}/postfeed/datesearch/after/${pastDate.toISOString()}`) //Get all the post occurring after this date.
            .then((resp) => {
                setPosts(resp.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    /*
     * Updates the state holding the search bar's contents
     */
    const searchChangeHandler = (event) => { //For posts search bar
        const { value } = event.target;
        setSearchText(value);
    }

    /*
     * Submits the search bar's contents, and sets the state to the posts made by the search.
     */
    const searchSubmitHandler = (event) => { //Change the posts array on submit
        event.preventDefault(); //No page refresh
        axios.get(`${URL_PREFIX}/postfeed/textsearch/${searchText}`)
            .then((response) => {
                setPosts(response.data); //Set the state to this new array (unsorted)
            })
            .catch((error) => {
                console.error(error)
            });
    }

    /*
     * Updates the state holding the filtering date input, and toggleable buttons.
     */
    const dateChangeHandler = (event) => {
        const { name, value } = event.target;
        if (name === "filter_method") {
            setFilterMethod(value);
        }
        else if (name === "filter_date") {
            setFilterDate(value);
        }
    }

    /*
     * Filters from all posts, displaying posts meething criteria based on button input
     */
    const dateSubmitHandler = (event) => { //Change the posts array on submit
        event.preventDefault();
        let benchmarkDate = new Date(filterDate);

        switch (filterMethod) {
            case "BEFORE":
                axios.get(`${URL_PREFIX}/postfeed/datesearch/before/${benchmarkDate.toISOString()}`)
                    .then((resp) => {
                        setPosts(resp.data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                break;
            case "AFTER":
                axios.get(`${URL_PREFIX}/postfeed/datesearch/after/${benchmarkDate.toISOString()}`)
                    .then((resp) => {
                        setPosts(resp.data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                break;
            case "ALL":
                axios.get(`${URL_PREFIX}/postfeed`)
                    .then((resp) => {
                        setPosts(resp.data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                break;
            default:

                break;
        }
    }

    /////Calculation for the default value (the current date/time) for the time input field
    const todayRaw = new Date(Date.now());
    const myTimeZoneOffset = todayRaw.getTimezoneOffset();
    const today = new Date(todayRaw.getTime() - (myTimeZoneOffset * 60 * 1000));
    ///////////////////////////
    return (
        <>
            <div className="container">
            <form className="text-center mb-4 search-post" onSubmit={searchSubmitHandler}>
                <input className="w-50" type="text" onChange={searchChangeHandler} placeholder="Search for a post..." name="searchbar" />
                <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>

            </form>
            </div>
            <div className="container">
            <form className="filter-form text-center mb-4" onSubmit={dateSubmitHandler}>
                <label className='form-label'>Filter previous posts</label> <br />
                <div className="btn-group " role="group"  onChange={dateChangeHandler}>
                    <input type="radio" style={{ display: "none" }} className="btn-check" name="filter_method" id="btnradio1" value="BEFORE" autoComplete="off" />
                    {
                        filterMethod === "BEFORE" ?
                            <label className="btn btn-danger" htmlFor="btnradio1">Before</label>
                            :
                            <label className="btn btn-info" htmlFor="btnradio1">Before</label>
                    }


                    <input type="radio" style={{ display: "none" }} className="btn-check" name="filter_method" id="btnradio2" value="AFTER" autoComplete="off" />
                    {
                        filterMethod === "AFTER" ?
                            <label className="btn btn-danger" htmlFor="btnradio2">After</label>
                            :
                            <label className="btn btn-info" htmlFor="btnradio2">After</label>
                    }

                    <input type="radio" style={{ display: "none" }} className="btn-check" name="filter_method" id="btnradio3" value="ALL" autoComplete="off" />
                    {
                        filterMethod === "ALL" ?
                            <label className="btn btn-danger" htmlFor="btnradio3">No Filter</label>
                            :
                            <label className="btn btn-info" htmlFor="btnradio3">No Filter</label>
                    }

                </div>
                <input className="w-75 text-center" step="any" type="datetime-local" onChange={dateChangeHandler} defaultValue={today.toISOString().split('.')[0]} name="filter_date" />
                <button type="submit"><FontAwesomeIcon icon={faSearch}/></button>

            </form>
            </div>
            <div className='filter-buttons'>
            <button onClick={sortByTimeOldFirst}>Oldest</button>
            <button onClick={sortByTimeNewFirst}>Newest</button>
            <button onClick={sortByMostUpmints}>Most Upminted</button>
            <button onClick={sortByMostDownmints}>Most Downminted</button>
            <button onClick={() => filterByTimeAgo(1)}>Yesterday</button>   
            <button onClick={() => filterByTimeAgo(7)}>Last Week</button>
            <button onClick={() => filterByTimeAgo(20)}>Last Month</button>
            <button onClick={() => filterByTimeAgo(365)}>Last Year</button>
            </div>
            <div className="container d-flex justify-content-center">
                {posts.length === 0 ?

                    <h1> It's quiet in here. Make a post!</h1>

                    :
                    <div className="">
                        <ul>
                        {
                            posts.map(post => {
                                return <li style={{ listStyleType: "none"}} key = {post.id}> <FeedItem data={post} /></li>
                            })
                        }
                        </ul>
                    </div>
                }
            </div>

        </>
    );

}

export default PostFeed;
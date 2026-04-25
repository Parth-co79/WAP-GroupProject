import React, { useState, useEffect, useRef } from "react";
import PopularCommunities from "./PopularCommunities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faListDots,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Main.module.css";
import {
  faThumbsUp,
  faThumbsDown,
  faCommentAlt,
  faBell,
  faBookmark,
  faEyeSlash,
  faFlag,
  faDotCircle,
  faCommentDots,
} from "@fortawesome/free-regular-svg-icons";

function HandleMenu() {
  const menulinks = [
    { icon: faBell, name: "Follow Post" },
    { icon: faBookmark, name: "Save" },
    { icon: faEyeSlash, name: "Hide" },
    { icon: faFlag, name: "Report" },
  ];
  return (
    <div className={styles.menufn}>
      {menulinks &&
        menulinks.map((item) => {
          return (
            <div className={styles.links}>
              <span>
                {/* {" "} */}
                <FontAwesomeIcon icon={item.icon} />
              </span>
              <a href="/">{item.name}</a>
            </div>
          );
        })}
    </div>
  );
}

function Main({ searchQuery }) {
  const API_URL_POSTS = "http://localhost:3700/posts";
  const API_URL_USERS = "http://localhost:3700/users";

  const [seeFullContent, setSeeFullContent] = useState(null);

  const [posts, setPosts] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  const [users, setUsers] = useState([]);
  const [fetchUserError, setFetchUserError] = useState(null);

  const [isJoinId, setIsJoinId] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  const [openSort, setOpenSort] = useState(false);
  const [sortType, setSortType] = useState("Best");

  const handleSort = (type) => {
    setSortType(type);
    setOpenSort(!openSort);
    if (type === "Top") {
      function getTopPost() {
        setPosts(posts.sort((item1, item2) => item2["votes"] - item1["votes"]));
      }
      getTopPost();
    } else if (type === "Best") {
      function getTopPost() {
        setPosts(
          posts.sort(
            (item1, item2) =>
              item2["votes"] +
              item2["comments"] -
              (item1["votes"] + item1["comments"]),
          ),
        );
      }
      getTopPost();
    } else if (type === "New") {
      function getTopPost() {
        setPosts(
          posts.sort(
            (item1, item2) =>
              new Date(item2["createdAt"]) - new Date(item1["createdAt"]),
          ),
        );
      }
      getTopPost();
    } else if (type === "Hot") {
      function getScore(postItem) {
        const age =
          (Date.now() - new Date(postItem.createdAt)) / (1000 * 60 * 60);
        const enagement = postItem.votes + postItem.comments * 2;
        const hotness = enagement / (age + 1);
        return hotness;
      }
      function getTopPost() {
        setPosts(
          posts.sort((item1, item2) => getScore(item1) - getScore(item2)),
        );
      }
      getTopPost();
    }
  };

  function getTimeAgo(createdAt) {
    const now = new Date();
    const postTime = new Date(createdAt);

    const diff = now - postTime;

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (minutes < 60) {
      return `${minutes} min ago`;
    }
    if (hours < 24) {
      return `${hours} hr ago`;
    }
    if (days < 30) {
      return `${days} days ago`;
    }
    if (months < 12) {
      return `${months} months ago`;
    }
    return `${years} years ago`;
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(API_URL_USERS);
        if (!response.ok) throw Error("Users data Not Recieved");
        const userItems = await response.json();
        // console.log(userItems);
        setUsers(userItems);
        setFetchUserError(null);
      } catch (err) {
        setFetchUserError(err.message);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchpost = async () => {
      try {
        const response = await fetch(API_URL_POSTS);
        if (!response.ok) throw Error("Posts data Not Recieved");
        const postItems = await response.json();
        // console.log(postItems);
        setPosts(postItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      }
    };
    fetchpost();
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (!e.target.closest(`.${styles.menuJoin}`)) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className={styles.mainBody}>
      <div className={styles.postsContainer}>
        <div className={styles.sortWrapper}>
          <button
            className={styles.sortBtn}
            onClick={() => {
              setOpenSort(!openSort);
            }}
          >
            {sortType}
            <span>
              <FontAwesomeIcon icon={faAngleDown} />
            </span>
          </button>
          {openSort && (
            <div className={styles.sortMenu}>
              {["Best", "Hot", "New", "Top"].map((item) => (
                <div
                  key={item}
                  className={styles.sortItem}
                  onClick={() => handleSort(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
        {(fetchError && <p>{`Error:${fetchError}`}</p>) ||
          (fetchUserError && <p>{`Error:${fetchUserError}`}</p>)}
        {!fetchError &&
          posts
            .filter((post) => post.subreddit.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((post) => {
              const userDetails = users.find(
                (user) => parseInt(user.id) === post.userId,
              );
              // console.log(userDetails)
              return (
                <div key={post.id}>
                  <div className={styles.postSeprator}></div>
                  <div className={styles.postItem}>
                    <div className={styles.postNav}>
                      <div className={styles.UserProfile}>
                        <img src={userDetails.avatar} alt="?" />
                        <span>r/{post.subreddit}</span>

                        {/* <a href="">r/{userDetails?.username || "Unknown User"}</a> */}
                        {/* <span>•</span> */}
                        <span>{`•${getTimeAgo(post.createdAt)}`}</span>
                      </div>
                      <div className={styles.menuJoin}>
                        <button
                          className={
                            isJoinId === post.id ? styles.joined : styles.join
                          }
                          onClick={() => {
                            setIsJoinId(isJoinId === post.id ? null : post.id);
                          }}
                        >
                          {isJoinId === post.id ? "Joined" : "Join"}
                        </button>
                        <button
                          onClick={() =>
                            setOpenMenuId(openMenuId === post.id ? null : post.id)
                          }
                        >
                          ...
                        </button>
                        {openMenuId === post.id && <HandleMenu />}
                      </div>
                    </div>
                    <h2>{post.title}</h2>
                    <p className={styles.post}>
                      {post.content.length > 150 ? (
                        <>
                          {seeFullContent === post.id
                            ? post.content
                            : `${post.content.slice(0, 150)}...`}
                          <span
                            style={{ cursor: "pointer", color: "blue" }}
                            onClick={() =>
                              setSeeFullContent(
                                seeFullContent === post.id ? null : post.id,
                              )
                            }
                          >
                            {seeFullContent === post.id
                              ? " Read less"
                              : " Read more"}
                          </span>
                        </>
                      ) : (
                        post.content
                      )}
                    </p>
                    {post.images && <img src={post.images[0]} alt="" />}

                    <div className={styles.postFooter}>
                      <span className={styles.votesSystem}>
                        <button>
                          <FontAwesomeIcon
                            className={styles.icon}
                            icon={faThumbsUp}
                          />
                        </button>
                        <span>
                          {post.votes < 1000
                            ? post.votes
                            : `${Number(post.votes / 1000)}k`}
                        </span>
                        <button>
                          <FontAwesomeIcon
                            className={styles.icon}
                            icon={faThumbsDown}
                          />
                        </button>
                      </span>

                      <a href="/" className={styles.comments}>
                        <button>
                          <FontAwesomeIcon
                            className={styles.icon}
                            icon={faCommentAlt}
                          />
                        </button>
                        <span className="span">
                          {post.comments < 1000
                            ? post.comments
                            : `${Number(post.comments / 1000)}k`}
                        </span>
                      </a>
                      <span className={styles.share}>
                        <button>
                          <FontAwesomeIcon
                            className={styles.icon}
                            icon={faShare}
                          />
                        </button>
                        <span>Share</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
      <aside className={styles.rightSidebar}>
        <PopularCommunities />
      </aside>
    </div>
  );
}

export default Main;

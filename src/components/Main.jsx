import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import styles from "./Main.module.css";
import { faUps } from "@fortawesome/free-brands-svg-icons";
import {
  faThumbsUp,
  faThumbsDown,
  faCommentAlt,
  faBell,
  faBookmark,
  faEyeSlash,
  faFlag,
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
                {" "}
                <FontAwesomeIcon icon={item.icon} />
              </span>
              <a href="/">{item.name}</a>
            </div>
          );
        })}
    </div>
  );
}

function Main() {
  const API_URL_POSTS = "http://localhost:3700/posts";
  const API_URL_USERS = "http://localhost:3700/users";

  const [posts, setPosts] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  const [users, setUsers] = useState([]);
  const [fetchUserError, setFetchUserError] = useState(null);

  const [isJoinId, setIsJoinId] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);


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
        {(fetchError && <p>{`Error:${fetchError}`}</p>) ||
          (fetchUserError && <p>{`Error:${fetchUserError}`}</p>)}
        {!fetchError &&
          posts.map((post) => {
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
                      <a href="">r/{userDetails?.username || "Unknown User"}</a>
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
                  <p className={styles.post}>{post.content}</p>
                  {post.images && <img src={post.images[0]} alt="" />}

                  <div className={styles.postFooter}>
                    <span className={styles.votesSystem}>
                      <button>
                        <FontAwesomeIcon
                          className={styles.icon}
                          icon={faThumbsUp}
                        />
                      </button>
                      <span>{post.votes}</span>
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
                      <span className="span">{post.votes}</span>
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
    </div>
  );
}

export default Main;

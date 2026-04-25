import react from "react";
import styles from "./PopularCommunities.module.css";

export default function PopularCommunities() {
    const communities = [
        {
            name: "r/React_js",
            members: "12,312,981 members",
            image: "https://picsum.photos/id/8/32"
        },
        {
            name: "r/newtonRU",
            members: "5012 members",
            image: "https://picsum.photos/id/4/32"
        },
        {
            name: "webTechnologies",
            members: "22,549,647 members",
            image: "https://picsum.photos/id/0/32"
        },
        {
            name: "Python🐍",
            members: "19,519,877 members",
            image: "https://picsum.photos/id/12/32"
        },
        {
            name: "Artificial-Intelligence",
            members: "6,404,505 members",
            image: "https://picsum.photos/id/17/32"
        }
    ]

    return (
        <>
            <div className={styles.container}>
                <h3 className={styles.title}>Popular Communities</h3>
                <div className={styles.list}>
                    {communities.map((community, index) => (
                        <div key={index} className={styles.item}>
                            <div className={styles.info}>
                                <img src={community.image} alt="" className={styles.communityImg} />
                                <div>
                                    <div className={styles.name}>{community.name}</div>
                                    <div className={styles.members}>{community.members}</div>
                                </div>
                            </div>
                            <button className={styles.joinBtn}>Join</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
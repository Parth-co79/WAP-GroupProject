import styles from "./CreatePost.module.css"

export default function CreatePost() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2 className={styles.title}>Create a Post</h2>
        <span className={styles.subtitle}>Share something intresting with community</span>
        <form action="" className={styles.form}>
          <label className={styles.label}>Title</label>
          <br />
          <input className={styles.input} type="text" placeholder="An intresting Title" />
          <br />
          <label className={styles.label}>Content</label>
          <br />
          <textarea className={styles.textarea} placeholder="What's on your mind?"></textarea>
          <br />
          <label className={styles.label}>Category</label>
          <br />
          <select className={styles.select}>
            <option value="">Technology</option>
            <option value="">Gaming</option>
            <option value="">Memes</option>
          </select>
          <div className={styles.buttonGroup}>
            <button className={styles.cancelButton}>Cancel</button>
            <button className={styles.postButton}>Post</button>
            </div>
        </form>
      </div>
    </div>
  )
}
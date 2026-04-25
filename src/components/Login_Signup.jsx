import { useState } from "react";
import styles from "./Login_Signup.module.css";

function Login_Signup({ handleLog }) {
  const [page, setPage] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "", confirm: "" });
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    if (!loginData.email || !loginData.password) {
      setMessage("Please fill in all fields.");
      return;
    }
    setMessage("Login successful! Welcome back.");
    handleLog();
  };

  const handleSignup = () => {
    if (!signupData.name || !signupData.email || !signupData.password || !signupData.confirm) {
      setMessage("Please fill in all fields.");
      return;
    }
    if (signupData.password !== signupData.confirm) {
      setMessage("Passwords do not match.");
      return;
    }
    setMessage("Account created successfully!");
    handleLog();
  };

  const switchPage = (target) => {
    setPage(target);
    setMessage("");
  };

  if (page === "login") {
    return (
      <div className={styles.page}>
        <div className={styles.card}>

          <div className={styles.logo}>
            <div className={styles.logoIcon}>r/</div>
            <span className={styles.logoText}>RedditX</span>
          </div>

          <h2 className={styles.heading}>Login</h2>
          <p className={styles.subheading}>Log in to continue to your Reddit experience.</p>

          <div className={styles.form}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              value={loginData.email}
              required
              placeholder="you@example.com"
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />

            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              required
              value={loginData.password}
              placeholder="Enter password"
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />

            {message && (
              <p className={`${styles.message} ${message.includes("successful") ? styles.messageSuccess : styles.messageError}`}>
                {message}
              </p>
            )}

            <button className={styles.btnPrimary} onClick={handleLogin}>Login</button>
          </div>

          <div className={styles.footer}>
            Don't have an account?{" "}
            <button className={styles.switchLink} onClick={() => switchPage("signup")}>Sign Up</button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        <div className={styles.logo}>
          <div className={styles.logoIcon}>r/</div>
          <span className={styles.logoText}>reddit</span>
        </div>

        <h2 className={styles.heading}>Sign Up</h2>
        <p className={styles.subheading}>Create your Reddit account to join the conversation.</p>

        <div className={styles.form}>
          <label className={styles.label}>Full Name</label>
          <input
            className={styles.input}
            type="text"
            required
            value={signupData.name}
            placeholder="John Doe"
            onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
          />

          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            required
            value={signupData.email}
            placeholder="you@example.com"
            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
          />

          <label className={styles.label}>Password</label>
          <input
            className={styles.input}
            type="password"
            required
            value={signupData.password}
            placeholder="Create a password"
            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
          />

          <label className={styles.label}>Confirm Password</label>
          <input
            className={styles.input}
            type="password"
            required
            value={signupData.confirm}
            placeholder="Repeat password"
            onChange={(e) => setSignupData({ ...signupData, confirm: e.target.value })}
          />

          {message && (
            <p className={`${styles.message} ${message.includes("successfully") ? styles.messageSuccess : styles.messageError}`}>
              {message}
            </p>
          )}

          <button className={styles.btnPrimary} onClick={handleSignup}>Create Account</button>
        </div>

        <div className={styles.footer}>
          Already have an account?{" "}
          <button className={styles.switchLink} onClick={() => switchPage("login")}>Login</button>
        </div>

      </div>
    </div>
  );
}

export default Login_Signup;

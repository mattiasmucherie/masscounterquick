import styles from "./Navbar.module.css"
import Link from "next/link"
import { useAuthState } from "react-firebase-hooks/auth"
import firebase from "../../firebase/clientApp"

const Navbar = () => {
  const [user, loading, error] = useAuthState(firebase.auth() as any)
  const signInText = user?.displayName || "Login"
  return (
    <ul className={styles.navbar}>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/auth">{loading ? "Loading" : signInText}</Link>
      </li>
    </ul>
  )
}

export default Navbar

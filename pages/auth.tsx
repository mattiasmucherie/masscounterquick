import firebase from "../firebase/clientApp"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { useAuthState } from "react-firebase-hooks/auth"

const uiConfig = {
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
}

const SignInScreen = () => {
  const [user, loading, error] = useAuthState(firebase.auth() as any)
  if (loading) {
    return <div>Loading...</div>
  }
  if (user) {
    return <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
  }
  return (
    <div>
      <h1>MassCounter Login</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  )
}

export default SignInScreen

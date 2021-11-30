import type { NextPage } from "next"
import { useAuthState } from "react-firebase-hooks/auth"
import firebase from "../firebase/clientApp"
import { useCollection } from "react-firebase-hooks/firestore"
import { useEffect, useState } from "react"
import debounce from "lodash.debounce"
import styles from "../styles/Home.module.css"

const Home: NextPage = () => {
  const [error, setError] = useState(false)
  const db = firebase.firestore()
  const increment = firebase.firestore.FieldValue.increment(0.5)
  const decrease = firebase.firestore.FieldValue.increment(-0.5)

  const [user, userLoading, userError] = useAuthState(firebase.auth() as any)
  const [drinks, drinksLoading, drinksError] = useCollection(
    firebase.firestore().collection("drinks") as any
  )
  const loading = userLoading && drinksLoading

  useEffect(() => {
    setError(!!userError && !!drinksError)
  }, [userError, drinksError])

  const updateDrinkDocument = async (inc: firebase.firestore.FieldValue) => {
    if (user && user.displayName) {
      try {
        await db
          .collection("drinks")
          .doc(user.displayName)
          .update({ drinks: inc })
      } catch (e: any) {
        if (e.code === "not-found") {
          db.collection("drinks").doc(user.displayName).set({ drinks: "0.5" })
        } else {
          setError(true)
        }
      }
    }
  }

  const debouncedAddDrink = debounce(() => updateDrinkDocument(increment), 100)
  const debouncedRemoveDrink = debounce(
    () => updateDrinkDocument(decrease),
    100
  )

  if (loading) {
    return <div className={styles.container}>Loading</div>
  }
  if (error) {
    return (
      <div className={styles.container}>Sorry, something went wrong :( </div>
    )
  }
  if (drinks) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          {drinks.docs
            .sort((d1, d2) => d2.data().drinks - d1.data().drinks)
            .map((doc) => (
              <section className={styles.player} key={`${doc.id}-container`}>
                <div key={`${doc.id}-name`}>{doc.id}</div>
                <div key={`${doc.id}-drinks`}>{doc.data().drinks}</div>
              </section>
            ))}
        </main>
        {user && (
          <div className={styles.btns}>
            <button onClick={debouncedAddDrink}>Add your drink</button>
            <button onClick={debouncedRemoveDrink}>Remove your drink</button>
          </div>
        )}
      </div>
    )
  }
  return null
}

export default Home

// import { Router } from "~/components/router/Router";
// import { setupFirebase } from "~/lib/firebase";
// import { useEffect } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { useSignIn, useSignOut } from "~/components/contexts/UserContext";
//
// function Main() {
//   const { signIn } = useSignIn();
//   const { signOut } = useSignOut();
//   useEffect(() => {
//     setupFirebase();
//
//     const auth = getAuth();
//
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         signIn(user);
//       } else {
//         signOut();
//       }
//     });
//   }, []);
//   return (
//     <main>
//       <Router />
//     </main>
//   );
// }
//
// export default Main;
import React from "react";
import { Router } from "~/components/router/Router";
import { setupFirebase } from "~/lib/firebase";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSignIn, useSignOut } from "~/components/auth/UserContext";
import { useAuthState } from "~/components/auth/UserContext";
import Login from "~/components/auth/Login";

const Main: React.FC = () => {
  const { state } = useAuthState();

    return (
        <main>
            <Router />
        </main>
    );
  // if (state.state === "SIGNED_IN") {
  //   return (
  //       <div className="container mx-auto">
  //         <h1>Welcome, {state.currentUser.displayName}!</h1>
  //       </div>
  //   );
  // } else {
  //   return (
  //       <main>
  //           <Router />
  //       </main>
  //   );
  // }
};

export default Main;

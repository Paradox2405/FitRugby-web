// add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({ email: adminEmail }).then(result => {
    console.log(result);
  });
});

// listen for auth status changes
auth.onAuthStateChanged(user => {
  console.log(user);
  if (user) {
    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      setupUI(user);
    });
    db.collection('workouts').onSnapshot(snapshot => {
      setupWorkouts(snapshot.docs);
    }, err => console.log(err.message));
  } else {
    setupUI();
    setupWorkouts([]);
  }
});

// create new workout
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('workouts').add({
    title: createForm.title.value,
    color: createForm.color.value,
    data:{
      data1: createForm.workouta.value,
      data2: createForm.workoutb.value,
      data3: createForm.workoutc.value,
      data4: createForm.workoutd.value,
      data5: createForm.workoute.value,
      data6: createForm.workoutf.value ,
      data7: createForm.workoutg.value,
      data8: createForm.workouth.value,
      data9:  createForm.workouti.value ,
      data10: createForm.workoutj.value,
      data11: createForm.workoutk.value,
      data12: createForm.workoutl.value ,
      data13: createForm.workoutm.value ,
      data14: createForm.workoutn.value,
      data15: createForm.workouto.value,
      data16: createForm.workoutp.value,
      data17: createForm.workoutq.value,
      data18: createForm.workoutr.value,
      data19: createForm.workouts.value,
      data20: createForm.workoutt.value ,
    }
  }).then(() => {
    // close the create modal & reset form
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(err => {
    console.log(err.message);
  });
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user & add firestore data
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
      bio: signupForm['signup-bio'].value
    });
  }).then(() => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    signupForm.querySelector('.error').innerHTML = ''
  }).catch(err => {
    signupForm.querySelector('.error').innerHTML = err.message;
  });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML = '';
  }).catch(err => {
    loginForm.querySelector('.error').innerHTML = err.message;
  });

});
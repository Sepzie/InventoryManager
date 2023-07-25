import React from 'react';
import AddCarForm from './AddCarForm';
import CarList from './CarList';
import Login from './Login';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';

function AdminDashboard() {
    const [user, setUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        
        return () => unsubscribe();
    }, [auth]);

    if (!user) {
        return <Login />;
    }
    
    return (
        <div className="AdminDashboard">
            <h1>ADMIN DASHBOARD</h1>
            <AddCarForm />
            {/* <CarList /> */}
        </div>
    );
}


// function AdminDashboard() {
//     return (
//         <div className="AdminDashboard">
//             <h1>ADMIN DASHBOARD</h1>
//             <AddCarForm />
//             <CarList />
//         </div>
//     );
// }

export default AdminDashboard;

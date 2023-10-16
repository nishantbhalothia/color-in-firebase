// import React, { useEffect, useState } from "react";
import db from "./db/firebase";
import { collection, addDoc, setDoc, doc, deleteDoc, query, where, getDocs, serverTimestamp,} from "firebase/firestore";

// we used addDoc to add data to firestore
export const addColor = async() => {
    const name = prompt("Enter color Name");
    const value = prompt("Enter color code");
    const payload = {name , value , createdAt:serverTimestamp()}
    const collectionRef = collection(db , 'colors')
    await addDoc(collectionRef , payload)
    console.log(collectionRef.id)
  };


//   ===========================================================edit color=======================================================
//   we used setDoc to edit data to firestore(because in setDoc we have to pass id of document if that id exist then it will update the data otherwise it will create new document)
export const editColor = async(id) => {
    const name = prompt("Enter color Name");
    const value = prompt("Enter color code");
    const payload = {name , value}
    const docRef = doc(db, "colors", id);
    await setDoc(docRef, payload);
}


//   ===========================================================delete color=======================================================
//   we used deleteDoc to delete data to firestore
export const deleteColor = async(id) => {
    const docRef = doc(db, "colors", id);
    await deleteDoc(docRef);
}


//  ================================================ delete multiple color =======================================================
//  we used query to delete multiple data to firestore
export const deleteMultipleColor = async() => {
    const userInputName = prompt("Enter color Name");
    const collectionRef = collection(db , 'colors')
    const q = query(collectionRef, where("name", "==", userInputName));
    const querySnapshot = await getDocs(q);
    const result =(querySnapshot.docs.map((doc) => ({...doc.data() , id:doc.id})));

    result.forEach(async (element) => {
        const docRef = doc(db, "colors", element.id);
        await deleteDoc(docRef);
    });
}
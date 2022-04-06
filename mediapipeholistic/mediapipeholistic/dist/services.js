
const db=firebase.firestore()
//This is used to query the communication coll
const coll = db.collection("/Dictionary");
class Signs {
  // gets all values in the coll.
  getAll() {
    return coll;
  }
  getDoc(id){
    return coll.doc(id);
  }
 //creates a text document
  create(name, id, value) {
    var signRef = coll.doc(name);
    signRef.set( { [id]: value}, {merge:true})
    
  }
//updates a text document
  update(value) {
    const docRef=coll.doc(value.charAt(0));
    docRef.update({
        words: firebase.firestore.FieldValue.arrayUnion(value)
    });
  }
//deletes a text document
  delete(id) {
    return coll.doc(id).delete();
  }
}

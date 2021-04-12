// indexedDB

console.log(indexedDB);

let request = indexedDB.open('QuizQuestDatabase', 1),db,tx,store,index

console.log(request);

request.onupgradeneeded = (e) => {
    db = request.result
    store = db.createObjectStore('QuestionsStore', {
        keyPath: 'qID'
    })
    // store = db.createObjectStore('QuestionsStore', {
    //     autoIncrement: true
    // })

index = store.createIndex('QuestionText', 'QuestionText', {unique: false})

}

request.onerror = (e) => {
    console.log(e);
    console.log(e.target.errorCode);
}

request.onsuccess = (e) => {
    db = request.result
    tx = db.transaction('QuestionsStore', 'readwrite')
    store = tx.objectStore('QuestionsStore')
    store.index('QuestionText')

    db.onerror = (e) => {
        console.log(e);
        console.log(e.target.errorCode);
    }

    store.put({qID: 1, questionText: 'The sky is blue', correctAnswer: true, studentAnswer: true, result: true})
    store.put({qID: 2, questionText: 'The grass is green', correctAnswer: true, studentAnswer: true, result: true})


    // let q1 = store.get(1)
    // let qs = index.get("The grass is green")

    // q1.onsuccess = () => {
    //     console.log(q1.result);
    // }

    // qs.onsuccess = () => {
    //     console.log(qs.result);
    // }

    

    tx.oncomplete = () => {
        db.close()
    }
}



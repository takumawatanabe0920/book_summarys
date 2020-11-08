var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import firebase from "../../firebase/config";
var db = firebase.firestore();
export var createSummary = function (values) {
    var title = values.title, content = values.content, category = values.category, user_id = values.user_id;
    if (!title || !content || !category || !user_id) {
        console.log("データがたりません");
        return;
    }
    db.collection("summary")
        .add(__assign({}, values))
        .then(function (res) { })
        .catch(function (error) { });
};
export var getSummaries = function () {
    var snapShot = db
        .collection("summary")
        .get()
        .then(function (res) {
        return res.docs.map(function (doc) {
            return __assign({ id: doc.id }, doc.data());
        });
    });
    return snapShot;
};
export var getSummaryBook = function (id) {
    var snapShot = db
        .collection("summary")
        .doc(id)
        .get()
        .then(function (doc) {
        if (doc.exists) {
            return doc.data();
        }
        else {
            console.log("404");
        }
    })
        .catch(function (error) {
        console.log("\u30C7\u30FC\u30BF\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F (" + error + ")");
    });
    return snapShot;
};
//# sourceMappingURL=summary.js.map
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import firebase from "../../firebase/config";
var db = firebase.firestore();
export var getUser = function (uid) {
    console.log(uid);
    var user = db
        .collection("user")
        .doc(uid)
        .get()
        .then(function (doc) {
        if (doc.exists) {
            return doc.data();
        }
        else {
            return "";
        }
    });
    return user;
};
export var getCurrentUser = function () {
    var currentUserData = localStorage.getItem("user");
    var currentUser = currentUserData
        ? JSON.parse(currentUserData)
        : "";
    return currentUser;
};
export var register = function (email, password, displayName, photoURL) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getUser(email)];
            case 1:
                user = _a.sent();
                if (user) {
                    console.log("ユーザーが存在しています");
                    return [2 /*return*/];
                }
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(function (result) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, result.user.updateProfile({
                                    displayName: displayName,
                                    photoURL: photoURL
                                })];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, setUser()];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })
                    .catch(function (error) {
                    console.log("error");
                });
                return [2 /*return*/];
        }
    });
}); };
export var login = function (email, password) {
    console.log(email, password);
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
    setUser();
};
export var logout = function () {
    firebase
        .auth()
        .signOut()
        .then(function () {
        // ログイン画面に戻る等
        console.log("ログアウトしました");
        deleteLocalStrage("user");
    }, function (err) {
        // エラーを表示する等
        console.log("\u30ED\u30B0\u30A2\u30A6\u30C8\u6642\u306B\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F (" + err + ")");
    });
};
//private
var setLocalStrage = function (user) {
    localStorage.setItem("user", JSON.stringify(user));
};
var deleteLocalStrage = function (key) {
    localStorage.removeItem(key);
};
var setUser = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user);
            // User is signed in.
            var uid = user.uid, displayName = user.displayName, email = user.email, photoURL = user.photoURL;
            var currentUser = {
                uid: uid,
                displayName: displayName,
                email: email,
                photoURL: photoURL
            };
            setLocalStrage(currentUser);
        }
        else {
            console.log("not login");
        }
    });
};
//not use
export var emailAuthMixin_sendVerifyMail = function () {
    var currentUser = firebase.auth().currentUser;
    if (!currentUser.emailVerified) {
        currentUser
            .sendEmailVerification()
            .then(function () {
            console.log("送信しました！");
        })
            .catch(function (error) {
            // 失敗した際の処理
        });
    }
};
//# sourceMappingURL=user.js.map
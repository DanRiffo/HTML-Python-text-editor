function init() {
    //// Initialize Firebase.
    var config = {
        apiKey: "AIzaSyBfcn0QLjIsWxc9V2E8aWOKWshiEwZo4Ac",
        authDomain: "html-python-text-editor.firebaseapp.com",
        projectId: "html-python-text-editor",
        databaseURL: "https://html-python-text-editor.firebaseio.com"
    };
    firebase.initializeApp(config);
    //// Get Firebase Database reference.
    var firepadRef = getExampleRef();
    //// Create ACE
    var editor = ace.edit("firepad-container");
    editor.setTheme("ace/theme/monokai");
    editor.setShowPrintMargin(false);
    var session = editor.getSession();
    session.setUseWrapMode(true);
    session.setUseWorker(false);
    session.setMode("ace/mode/python");
    //// Create Firepad.
    var firepad = Firepad.fromACE(firepadRef, editor, {
        defaultText: 'print("Hello, world!")'
    });

}
// Helper to get hash from end of URL or generate a random one.
function getExampleRef() {
    var ref = firebase.database().ref();
    var hash = window.location.hash.replace(/#/g, '');
    if (hash) {
        ref = ref.child(hash);
    } else {
        ref = ref.push(); // generate unique location.
        window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
    }
    if (typeof console !== 'undefined') {
        console.log('Firebase data: ', ref.toString());
    }
    return ref;
}


function startSystem() {
    const user = document.getElementById('user-input').value;
    const pass = document.getElementById('pass-input').value;

    if (user && pass.length >= 8) {
        document.getElementById('login-gate').style.display = 'none';
        document.getElementById('main-panel').style.display = 'block';
        updateConsole("تم تشغيل العقل البرمجي بنجاح. مرحباً " + user);
    } else {
        alert("يرجى إدخال اسم مستخدم وكلمة مرور (8 أرقام)");
    }
}

function createNewServer() {
    const name = document.getElementById('srv-name-input').value;
    if (!name) return alert("اكتب اسم السيرفر!");

    const ip = name.toLowerCase() + ".GGSDS.He";
    updateConsole("جاري إنشاء السيرفر: " + ip);
    
    setTimeout(() => {
        updateConsole("تم الإنشاء! السيرفر متاح الآن.");
        document.getElementById('download-btn').style.display = 'block';
        document.getElementById('server-status').innerText = "متصل";
        document.getElementById('server-status').style.color = "#00ff88";
    }, 2000);
}

function updateConsole(msg) {
    const con = document.getElementById('console-display');
    con.innerHTML += `<div>[${new Date().toLocaleTimeString()}] ${msg}</div>`;
    con.scrollTop = con.scrollHeight;
}

function downloadBridge() {
    const text = "@echo off\necho Connecting to SDS Cloud...\npause";
    const blob = new Blob([text], {type: 'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = "SDS_Connect.bat";
    a.click();
}

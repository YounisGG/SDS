// نظام إدارة البيانات (العقل)
const SDS_Engine = {
    isLoggedIn: false,
    serverActive: false,
    config: {
        username: "",
        serverIP: "",
        port: 0
    },

    // وظيفة التحقق من الدخول
    login: function(user, pass) {
        if(user.length > 3 && pass.length >= 8) {
            this.config.username = user;
            this.isLoggedIn = true;
            return true;
        }
        return false;
    },

    // وظيفة إنشاء السيرفر برمجياً
    createServer: function(name) {
        this.config.serverIP = name.toLowerCase() + ".GGSDS.He";
        this.config.port = Math.floor(Math.random() * (30000 - 25565) + 25565);
        this.serverActive = true;
        this.log(`تم إنشاء السيرفر بنجاح على العنوان: ${this.config.serverIP}`);
    },

    // نظام الكونسول الحي
    log: function(message) {
        const consoleEl = document.getElementById('console-out');
        const time = new Date().toLocaleTimeString();
        consoleEl.innerHTML += `<div>[${time}] ${message}</div>`;
        consoleEl.scrollTop = consoleEl.scrollHeight;
    },

    // توليد ملف الربط (Automation)
    generateBatch: function() {
        const script = `@echo off\ntitle SDS-BRIDGE: ${this.config.serverIP}\necho Connecting to Cloud...\necho Port: ${this.config.port}\npause`;
        const blob = new Blob([script], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "Connect_SDS.bat";
        a.click();
    }
};

// ربط الواجهة بالعقل
function handleAction(type) {
    if(type === 'login') {
        const u = document.getElementById('user').value;
        const p = document.getElementById('pass').value;
        if(SDS_Engine.login(u, p)) {
            document.getElementById('login-gate').style.display = 'none';
            document.getElementById('main-dashboard').style.display = 'block';
            SDS_Engine.log(`مرحباً بك ${u}، نظام الاستضافة جاهز.`);
        } else {
            alert("خطأ في البيانات!");
        }
    }
}

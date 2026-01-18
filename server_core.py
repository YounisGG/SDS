import os
import subprocess
import urllib.request
from flask import Flask, jsonify

app = Flask(__name__)

class MinecraftServerTool:
    def __init__(self):
        self.server_folder = "Minecraft_Server"
        self.jar_url = "https://piston-data.mojang.com/v1/objects/8410fd098631e3b4daac81903ed746813296ac96/server.jar"
        self.jar_name = "server.jar"

    def setup_environment(self):
        """إنشاء المجلد وتحميل السيرفر تلقائياً"""
        if not os.path.exists(self.server_folder):
            os.makedirs(self.server_folder)
        
        jar_path = os.path.join(self.server_folder, self.jar_name)
        if not os.path.exists(jar_path):
            print("[*] جاري تحميل ملفات ماين كرافت... يرجى الانتظار")
            urllib.request.urlretrieve(self.jar_url, jar_path)
            
        # الموافقة على EULA
        with open(os.path.join(self.server_folder, "eula.txt"), "w") as f:
            f.write("eula=true")

    def run_command(self, ram_gb=2):
        """تشغيل السيرفر الفعلي"""
        os.chdir(self.server_folder)
        command = f"java -Xmx{ram_gb}G -Xms{ram_gb}G -jar {self.jar_name} nogui"
        subprocess.Popen(command, shell=True)
        return "سيرفر ماين كرافت بدأ الآن!"

# --- إنشاء الجسر (API) لربط الموقع بالـ PC ---
server_tool = MinecraftServerTool()
server_tool.setup_environment()

@app.route('/start-server')
def start_api():
    try:
        msg = server_tool.run_command(ram_gb=2)
        return jsonify({"status": "success", "message": msg})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

@app.route('/status')
def status_api():
    return jsonify({"server_status": "Online", "owner_email": "xywns003@gmail.com"})

if __name__ == '__main__':
    print("--- [ PC-to-Server Pro الجسر يعمل الآن ] ---")
    print("الموقع الآن يستطيع التحكم في جهازك لتشغيل السيرفر.")
    app.run(host='0.0.0.0', port=5000)


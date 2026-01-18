import subprocess
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # للسماح للموقع بالتواصل مع الأداة

# متغير لتخزين عملية السيرفر
server_process = None

@app.route('/api/start')
def start():
    global server_process
    # تشغيل السيرفر مع إمكانية إدخال أوامر (stdin)
    server_process = subprocess.Popen(
        ['java', '-Xmx2G', '-jar', 'server.jar', 'nogui'],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        text=True,
        cwd='Minecraft_Server'
    )
    return jsonify({"msg": "Server Starting..."})

@app.route('/api/player')
def player_control():
    action = request.args.get('type') # ban, kick, op
    name = request.args.get('name')
    
    if server_process:
        # إرسال الأمر الفعلي لكونسول ماين كرافت
        command = f"{action} {name}\n"
        server_process.stdin.write(command)
        server_process.stdin.flush()
        return jsonify({"msg": f"Executed {action} on {name}"})
    return jsonify({"msg": "Server is not running!"})

if __name__ == '__main__':
    print("--- الجسر الاحترافي يعمل الآن على المنفذ 5000 ---")
    app.run(port=5000)



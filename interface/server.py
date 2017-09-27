import socket

HOST = '0.0.0.0'
PORT = 31415

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((HOST, PORT))
s.listen(5)


while True:
    conn, addr = s.accept()
    print ('Connected by ', addr)

    while True:
        data = conn.recv(1024)
        print (data)

        conn.send(bytes("server received you message.", encoding = "utf8"))
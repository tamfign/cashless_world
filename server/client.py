import socket
import json
HOST = 'ec2-52-36-241-1.us-west-2.compute.amazonaws.com'
PORT = 31415

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((HOST, PORT))
dic3 = json.dumps({'Type': 'GetCardInfo', 'UserId':'WRS'})
dic = json.dumps({'Type': 'TransferStart', 'UserId': 'xiayinong','Uuid':'1233211234567','Amount':'1','CardInfo':{'CardNumber': '001', 'HolderName':'002','ExpireDate':'003', 'CSV':'csv'}})
dic2 = json.dumps({'Type': 'TransferEnd', 'UserId': 'xiayinong','Uuid':'1233211234567'})
while True:
    try:
        print('Here')
        cmd = input("Please input msg:")
        s.send(bytes(dic3, encoding = "utf8"))
        data = s.recv(1024)
        print (data)
        s.send(bytes(dic2, encoding="utf8"))
        data2 = s.recv(1024)
        print (data2)
        s.send(bytes(dic, encoding="utf8"))
        data3 = s.recv(1024)
        print (data3)
    except BrokenPipeError:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((HOST, PORT))
        while True:
            try:
                print('Here')
                cmd = input("Please input msg:")
                s.send(bytes(cmd, encoding="utf8"))
                data = s.recv(1024)
                print (data)
                s.send(bytes(dic, encoding="utf8"))
                data2 = s.recv(1024)
                print (data2)
                s.send(bytes('laile', encoding="utf8"))
                data3 = s.recv(1024)
                print (data3)
            except BrokenPipeError:
                s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                s.connect((HOST, PORT))

    #s.close()

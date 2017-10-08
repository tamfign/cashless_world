import socket
import json
HOST = 'ec2-52-36-241-1.us-west-2.compute.amazonaws.com'
PORT = 31415

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((HOST, PORT))
dic = 'lalala'
dic3 = json.dumps({'Type': 'TransferStart', 'UserId': 'xiayinong', 'Uuid':'0001','CardInfo':{'CardNumber': '001', 'HolderName':'002','ExpireDate':'003', 'CSV':'csv'}})
dic2 = json.dumps({'Type': 'TransferEnd', 'UserId': 'xiayinong2','Uuid':'f01ca8c0-abe5-11e7-986e-c9c4718866b6'})
while True:
    try:
        print('Here')
        cmd = input("Please input msg:")
        s.send(bytes(dic2, encoding = "utf8"))
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

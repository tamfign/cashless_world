import socket
import json
# This file is used to test the live of server

'''The configuration of client socket'''
HOST = '0.0.0.0'
PORT = 31415
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((HOST, PORT))

'''The message for testing'''
dic_getcardinfo = json.dumps({'Type': 'GetCardInfo', 'UserId':'WRS'})
dic_transferstart = json.dumps({'Type': 'TransferStart', 'UserId': 'xiayinong','Uuid':'1233211234567','Amount':'1','CardInfo':{'CardNumber': '001', 'HolderName':'002','ExpireDate':'003', 'CSV':'csv'}})
dic_transferend = json.dumps({'Type': 'TransferEnd', 'UserId': 'xiayinong','Uuid':'1233211234567'})

'''Testing loop'''
while True:
    try:
        cmd = input("Please input msg:")
        s.send(bytes(dic_getcardinfo, encoding = "utf8"))
        data = s.recv(1024)
        print (data)
        s.send(bytes(dic_transferstart, encoding="utf8"))
        data = s.recv(1024)
        print (data)
        s.send(bytes(dic_transferend, encoding="utf8"))
        data = s.recv(1024)
        print (data3)
    except BrokenPipeError:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((HOST, PORT))

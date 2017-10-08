import socket
import sys
import struct
import binascii
import threading,getopt,sys,string
from message import message
import json
from userInstance import userInstance
from tranlst import tranlst
from dbInstance import mongodb

# This is the class that start the server and listening to the client by socket connection
class clwCluster(object):
    # init the socket connection and message queue, and also two dictionary to store user and transaction information
    def __init__(self):
        self.__messageQueue = []
        self.__tranlst = tranlst()
        self.__userList = tranlst()
        # Start the socket connection
        HOST = '0.0.0.0'
        PORT = 31415
        self.__serverSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.__serverSocket.bind((HOST, PORT))
        self.__serverSocket.listen(5)
    
    # add message to message queue
    def add_messageQueue(self,newMessage):
        #add new message in to the queue:
        self.__messageQueue.append(newMessage)
    
    # get message from message queue
    def get_messageQueue(self):
        try:
            message = self.__messageQueue[0]
        except:
            message = None
            print("Message Queue is empty")
        return message

# @ input: socket pair client and its address
# @ function: decode received message, ignore message head and unuseful message
# @ save json format message as message instance and operate
# @ save user instance in userlst
    def byteAnalysis(self,client,address):
        print('byteana in')
        messages = client.recv(2048)
        stringMessage = messages.decode("utf8")
        for line in stringMessage.split('\n'):
            try:
                a = str(line)
                jsonpara = eval(a)
                newmessages = message(line, client, self.__tranlst)
                # add new user to user list
                if newmessages.get_user() not in self.__userList.keys():
                    useri = userInstance(client,address,newmessages.get_user(),[])
                    self.__userList.set_lst(newmessages.get_user(),useri)
                    newmessages.set_userlst(self.__userList)
                self.newMessage(newmessages)
            except (AttributeError,NameError,SyntaxError):
                # The connection of http server will raise syntaxError
                # The un-json format will raise attributeError
                # undefined message will raise NameError
                pass
                #print (sys.exc_info())

# This function is used to add new message to the user, if the user has messages to deal with, the message will keep waiting to be done.     
    def newMessage(self,messages):
        user= self.__userList.get_lst()[messages.get_user()]
        user.add_messageQueue(messages)
        while len(user.get_messageQueue()) != 0:
            print('new message in')
            popMessage = user.get_messageQueue().pop()
            popMessage.run()

# Thread funcion, before thread killed, each thread keep trying to recev message and analysis
    def jonnyS(self,client, address):
        try:
            client.settimeout(500)
            print ('socket in')
            while True:
                try:
                    self.byteAnalysis(client,address)
                except OSError:
                    break;
                print('new thread start: ', address)
        except socket.timeout:
            print ('time out')

# keep listenning to new socket, for each socket connection, strat a new thread for it.
    def listen(self):
        while True:
            print('listening')
            conn, addr = self.__serverSocket.accept()
            thread = threading.Thread(target=self.jonnyS, args=(conn, addr))
            thread.start()

# add http head to each message before sending
    def add_head(self,message):
        content = 'HTTP/1.x 200 ok\r\nContent-Type: text/html\r\n\r\n'
        #content += '<br /><font color="green" size="7">register successs!</p>'
        content += message
        return content

# main function
def main():
    clwCluster().listen()

# Start main
if __name__ == '__main__':
    main()

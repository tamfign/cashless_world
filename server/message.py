import json
import os
from transaction import transaction
from dbInstance import mongodb
import sys
class message(object):
    def __init__(self, message,client, translst):
        print('nihaoamessage:', message)
        self.__transferLst = translst
        self.__userlst = None
        self.__message = message
        self.__jsonpara = None
        self.__client = client
        # connect to database and take use of function in class dbInstance 
        self.__dbinstance = mongodb('http://ec2-52-36-241-1.us-west-2.compute.amazonaws.com:5984/')
        # the format of message must be json
        try:
            self.__jsonpara = json.loads(message)
            print('message init in')
        except AttributeError:
            print('message type is not correctL ',type(message))
        # the json must include userid and type
        try:
            self.__user =('user'+ self.__jsonpara['UserId']).lower()
            self.__type = self.__jsonpara['Type']
        except:
            print('message user name error')
            self.__user = 'admain'
            self.__type = 'admain'
        self.__userInstance = None

    def get_type(self):
        return self.__type

    def get_jsonpara(self):
        return self.__jsonpara

    def get_user(self):
        return self.__user

    def set_userlst(self, userlst):
        self.__userlst = userlst

    def set_userInstance(self, user):
        self.__userInstance = user

    # add http head to message which will be send to client
    def add_head(self,message):
        content = 'HTTP/1.x 200 ok\r\nContent-Type: text/html\r\n\r\n'
        #content += '<br /><font color="green" size="7">register successs!</p>'
        content += 'URL\r\n'
        content += message
        return content

    def run(self):
        print('run in')
        # if user need to add new
        if self.__type == 'CardRegister':
            cardNumber = self.__jsonpara['CardInfo']['CardNumber']
            holderName = self.__jsonpara['CardInfo']['HolderName']
            expireDate = self.__jsonpara['CardInfo']['ExpireDate']
            csv =  self.__jsonpara['CardInfo']['CSV']
            self.__client.sendall(bytes(self.add_head(json.dumps({'Result':True})), encoding="utf8"))
            self.__client.close()
            print("sended")
            self.__dbinstance.createUser(self.__user)
            self.__dbinstance.userInfomationGenerate(self.__user,cardNumber,holderName,expireDate,csv)
            print('Saved')
        elif self.__type == 'GetCardInfo':
            print('getCardInfo')
            filename = os.getcwd()+ '/' + self.__user + '.json'
            print(self.__user)
            message = self.__dbinstance.get_card(self.__user)
            self.__client.sendall(bytes(self.add_head(json.dumps(message)), encoding="utf8"))
            self.__client.close()
        elif self.__type == 'TransferStart':
            uuid =  self.__jsonpara['Uuid']
            amount = self.__jsonpara['Amount']
            try:
                db = self.__dbinstance.get_couch()[self.__user]
                a = db.get('CardInfo')['DefaultCard']['balance']
            except:
                a = -1
            if int(a) < int(amount):
                self.__client.sendall(bytes(self.add_head(json.dumps({'Result':False})), encoding="utf8"))
                self.__client.close()
            else:
                transinstance = transaction(self.__user,amount)
                if not uuid in self.__transferLst.get_lst().keys():
                    self.__transferLst.get_lst()[uuid] = transinstance
                self.__client.send(bytes(self.add_head(json.dumps({'Result':True})), encoding="utf8"))
               # transinstance.run()
                try: 
                   self.__dbinstance.del_amount(self.__user,amount)
                except:
                   print (sys.exc_info())
                self.__client.close()
                print('statt sended')
               # transinstance.run()
        elif self.__type == 'TransferEnd':
            uuid = self.__jsonpara['Uuid']
            try:
                transinstance = self.__transferLst.get_lst()[uuid]
                amount = transinstance.get_amount()
                self.__client.send(bytes(self.add_head(json.dumps({'Result':True,'balance':'$'+amount+'.00'})), encoding="utf8"))
                transinstance.set_userlst(self.__userlst)
                transinstance.set_credit(self.__user)
                try:
                    self.__dbinstance.add_amount(self.__user,amount)
                except:
                    print (sys.exc_info())
                del self.__transferLst.get_lst()[uuid]
                self.__client.close()
            except:
                self.__client.sendall(bytes(self.add_head(json.dumps({'Result':False})), encoding="utf8"))
                self.__client.close()
#            self.__client.sendall(bytes(self.add_head(json.dumps({'Result':True})), encoding="utf8"))

        #self.__client.close()

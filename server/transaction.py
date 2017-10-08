import socket
import json
from dbInstance import mongodb
class transaction(object):
    def __init__(self, debit, transAmount,userlst = None):
        self.__debit = debit
        self.__credit = None
        self.__transState = False
        self.__transAmount = transAmount
        self.__userlst = userlst

    def isTransFinished(self):  
        return self.__transState
    
    def get_amount(self):
        return self.__transAmount
        
    def set_transState(self):
        #set if the transaction is done.
        # while false, listen to the response of bank server
        if not self.__credit == None:
            print('set_transState in',self.__credit)
            debit = self.__userlst.get_lst()[self.__debit].get_con()
            credit = self.__userlst.get_lst()[self.__credit].get_con()
            base = mongodb('http://ec2-52-36-241-1.us-west-2.compute.amazonaws.com:5984/')
            base.add_amount(self.__credit,self.__transAmount)
            print('get1.5:',self.__transAmount)
            base.del_amount(self.__debit,self.__transAmount)
            print('get2')
            credit.send(bytes(self.add_head(json.dumps({'Result':True,'balance':'$'+self.__transAmount+'.00'})), encoding="utf8"))
            self.__transState = True
            print('lalala,sended')
            credit.close()
            #debit.close()


    def run(self):
        while not self.isTransFinished():
            self.set_transState()
            #keep listening the bankserver
            #m = message(self.__bankServer.recv(1024))
        print ('trnsaction finished')
    def set_userlst(self,userlst):
        self.__userlst = userlst
    def set_credit(self, credit):
        self.__credit = credit
    def add_head(self,message):
        content = 'HTTP/1.x 200 ok\r\nContent-Type: text/html\r\n\r\n'
        #content += '<br /><font color="green" size="7">register successs!</p>'
        content += message
        return content



